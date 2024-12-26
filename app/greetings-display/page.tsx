'use client'
import { Logs, STATUS, TYPE } from '@/types/API'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import awsmobile from '@/aws-exports'
import { updateLogs } from '@/lib/graphql/mutations'
import { logByDate } from '@/lib/graphql/queries'
import { onUpdateLogs } from '@/lib/graphql/subscriptions'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { ThemeProvider } from '@/components/ThemeProvider'
import Crunker from 'crunker'
import { BackgroundBeams } from '@/components/background-beam'
import { TextGenerateEffect } from '@/components/text-generate'

Amplify.configure(awsmobile)
const client = generateClient()

export default function GreetingsDisplayPage() {
  const [items, setItems] = useState<Logs[]>([])
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false)
  const [caption, setCaption] = useState<string>('Happy New Year')

  const list = async () => {
    const { data } = await client.graphql({
      query: logByDate,
      variables: {
        filter: { status: { eq: STATUS.not_played } },
        type: TYPE.new_year,
        sortDirection: 'ASC',
      },
    })
    setItems(data.logByDate.items)
  }

  const updateToPlayed = async (id: string) => {
    const { data } = await client.graphql({
      query: updateLogs,
      variables: {
        input: {
          id: id,
          status: 'played',
        },
      },
    })
    setItems(data.logByDate.items)
  }

  const concatAudioFiles = async (
    language: string,
    nameAudio: string
  ): Promise<Blob> => {
    const response = await fetch(nameAudio)
    const audioContext = new window.AudioContext()
    const arrayBuffer = await response.arrayBuffer()

    const decodedAudioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    const inputSampleRate = 48000
    const crunker = new Crunker({ sampleRate: inputSampleRate })
    if (language === 'en') {
      const buffers = await crunker.fetchAudio('/en.mp3', '/en_2.mp3')
      const merged = await crunker.concatAudio([
        buffers[0],
        decodedAudioBuffer,
        buffers[1],
      ])
      const output = await crunker.export(merged, 'audio/mp3')
      return output.blob
    } else {
      const buffers = await crunker.fetchAudio(
        '/ja_3.mp3',
        '/ja_4.mp3',
        '/ja_5.mp3'
      )
      const merged = await crunker.concatAudio([
        decodedAudioBuffer,
        buffers[0],
        decodedAudioBuffer,
        buffers[1],
        decodedAudioBuffer,
        buffers[2],
      ])
      const output = await crunker.export(merged, 'audio/mp3')
      return output.blob
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await list()
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      client
        .graphql({
          query: onUpdateLogs,
          variables: { filter: { status: { eq: STATUS.not_played } } },
        })
        .subscribe({
          next: async ({ data }) => {
            if (data && data.onUpdateLogs) {
              await list()
            }
          },
          error: (error) => {
            console.error('Subscription error:', error)
          },
          complete: () => {
            console.log('Subscription complete')
          },
        })

      client
        .graphql({
          query: onUpdateLogs,
          variables: { filter: { status: { eq: STATUS.played } } },
        })
        .subscribe({
          next: async ({ data }) => {
            if (data && data.onUpdateLogs) {
              await list()
            }
          },
          error: (error) => {
            console.error('Subscription error:', error)
          },
          complete: () => {
            console.log('Subscription complete')
          },
        })
    }
    fetchData()
  }, [items])

  async function audioPlay() {
    if (items.length > 0 && items[0].audioFile) {
      setAudioPlaying(true)
      setCaption(`Happy New Year ${items[0].username}`)
      const mergedBlob = await concatAudioFiles(
        items[0].language as string,
        items[0].audioFile as string
      )
      const audioUrl = URL.createObjectURL(mergedBlob)
      if (!audioUrl) return
      const audio = new Audio(audioUrl)
      audio.load()
      audio.play()
      audio.onended = () => {
        updateToPlayed(items[0].id)
        setTimeout(() => {
          setAudioPlaying(false)
        }, 2000)
      }
    }
  }

  useEffect(() => {
    if (!audioPlaying) {
      audioPlay()
    }
  }, [items, audioPlaying])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="size-full max-h-screen z-50">
        <div className="grid grid-cols-3 max-h-screen max-w-7xl gap-4 mx-auto justify-center items-center">
          <video
            className="col-span-2 w-full aspect-auto max-h-screen"
            src="/DAMUJIN_VIDEO1.mp4"
            autoPlay
            loop
          />
          <div className="flex flex-col items-center space-y-8">
            <span key={caption} className="text-4xl font-bold">
              <TextGenerateEffect words={caption} />
            </span>
            <div className="flex flex-col space-y-2 items-center">
              <span className="text-xl font-bold">Scan here to greet us</span>
              <div className="p-2 size-auto rounded-2xl border border-border">
                <Image src="/qr.svg" alt="qr" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </ThemeProvider>
  )
}
