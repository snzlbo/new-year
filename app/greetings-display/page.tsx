'use client'
import { Logs, ModelSortDirection, STATUS, TYPE } from '@/types/API'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Snowfall from 'react-snowfall'
import awsmobile from '@/aws-exports'
import { updateLogs } from '@/lib/graphql/mutations'
import { logByDate } from '@/lib/graphql/queries'
import { onUpdateLogs } from '@/lib/graphql/subscriptions'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { ThemeProvider } from '@/components/ThemeProvider'
import Crunker from 'crunker'
import { TypewriterEffect } from '@/components/text-generate'

import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'

Amplify.configure(awsmobile)
const client = generateClient()
const montserrat = Montserrat({ subsets: ['latin'] })

export default function GreetingsDisplayPage() {
  const [caption, setCaption] = useState<
    {
      text: string
      className?: string
    }[]
  >([{ text: 'Happy' }, { text: 'New' }, { text: 'Year' }])
  const [items, setItems] = useState<Logs[]>([])
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false)

  const list = async () => {
    const { data } = await client.graphql({
      query: logByDate,
      variables: {
        filter: { status: { eq: STATUS.not_played } },
        type: TYPE.new_year,
        sortDirection: 'ASC' as ModelSortDirection.ASC,
      },
    })
    setItems(data.logByDate.items)
  }

  const updateToPlayed = async (id: string) => {
    await client.graphql({
      query: updateLogs,
      variables: {
        input: {
          id: id,
          status: 'played' as STATUS.played,
        },
      },
    })
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
      console.log(items[0].username)
      setCaption([
        { text: 'Happy' },
        { text: 'New' },
        { text: 'Year' },
        {
          text: `${items[0].username}!`,
          className: 'text-blue-500 dark:text-blue-500',
        },
      ])
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
      <div>
        <div
          className={cn('size-full max-h-screen z-50', montserrat.className)}
        >
          <div className="grid grid-cols-3 max-h-screen mx-20 gap-8 justify-center items-center">
            <video
              className="absolute top-12"
              src="/DAMUJIN_VIDEO1.mp4"
              autoPlay
              loop
              muted
            />
            <div className="flex flex-col absolute bottom-12 items-center">
              <span className="text-xl font-bold">Scan here to greet us</span>
              <div className="p-2 size-auto rounded-2xl border border-border">
                <Image src="/qr.png" alt="qr" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
        <Snowfall />
      </div>
      <div
        className={cn(
          'z-50 absolute right-0 top-12 p-4 bg-white/10 w-full flex items-center justify-center text-center',
          montserrat.className
        )}
      >
        <TypewriterEffect key={caption.toString()} words={caption} />
      </div>
    </ThemeProvider>
  )
}
