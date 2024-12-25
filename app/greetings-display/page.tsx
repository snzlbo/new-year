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

Amplify.configure(awsmobile)
const client = generateClient()

export default function GreetingsDisplayPage() {
  const [items, setItems] = useState<Logs[]>([])

  const list = async () => {
    const { data } = await client.graphql({
      query: logByDate,
      variables: {
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
    }
    fetchData()
  }, [items])

  async function audioPlay() {
    if (items.length > 0) {
      const audioUrl = items[0].audioFile
      if (!audioUrl) return
      const audio = new Audio(audioUrl)
      audio.load()
      audio.play()
      audio.onended = () => {
        updateToPlayed(items[0].id)
      }
    }
  }

  useEffect(() => {
    audioPlay()
  }, [items])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="grid grid-cols-3 max-h-screen max-w-7xl gap-4 mx-auto justify-center items-center">
        <video
          className="col-span-2 w-full aspect-auto max-h-screen"
          src="/DAMUJIN_VIDEO1.mp4"
          autoPlay
          loop
        />
        <div className="flex flex-col items-center space-y-8">
          <span className="text-2xl font-bold">Scan here to greet us</span>
          <div className="p-2 size-auto rounded-2xl border border-border">
            <Image src="/qr.svg" alt="qr" width={500} height={500} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
