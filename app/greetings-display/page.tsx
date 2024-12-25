'use client'
import { Logs, TYPE } from '@/types/API'
import { useEffect, useState } from 'react'

import awsmobile from '@/aws-exports'
import { getLogs, logByDate } from '@/lib/graphql/queries'
import { onUpdateLogs } from '@/lib/graphql/subscriptions'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

Amplify.configure(awsmobile)
const client = generateClient()

export default function GreetingsDisplayPage() {
  const [items, setItems] = useState<Logs[]>([])

  const list = async () => {
    const { data } = await client.graphql({
      query: logByDate,
      variables: {
        type: TYPE.new_year,
        filter: {
          status: {
            eq: 'not_played',
          },
        },
      },
    })
    setItems(data.logByDate.items)
  }

  const get = async (id: string) => {
    const { data } = await client.graphql({
      query: getLogs,
      variables: id,
    })
    setItems((prevItems) => [...prevItems, data.getLogs])
  }

  useEffect(() => {
    const fetchData = async () => {
      await list()
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      for (const item of items) {
        client
          .graphql({
            query: onUpdateLogs,
            variables: { filter: { id: { eq: item.id } } },
          })
          .subscribe({
            next: ({ data }) => {
              if (data && data.onUpdateLogs) {
                get(item.id)
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
    }
    fetchData()
  }, [items])

  const playAudio = () => {
    if (items.length > 0) {
      const audioFile = items[items.length - 1].audioFile
      if (audioFile) {
        const audio = new Audio(audioFile)
        audio.play()
      }
    }
  }

  return (
    <div className="flex bg-background">
      <div className="hidden">
        <button className="hidden" onClick={playAudio}>
          Play Audio
        </button>
        {items.map((item) => (
          <audio key={item.id} controls>
            <source src={item.audioFile ?? undefined} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ))}
      </div>
    </div>
  )
}
