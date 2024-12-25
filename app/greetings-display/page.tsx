'use client'
import { Logs, TYPE } from '@/types/API'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import awsmobile from '@/aws-exports'
import { getLogs, logByDate } from '@/lib/graphql/queries'
import { onUpdateLogs } from '@/lib/graphql/subscriptions'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { updateLogs } from '@/lib/graphql/mutations'
import { Button } from '@/components/ui/button'

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
        filter: {
          status: {
            eq: 'not_played',
          },
        },
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
      for (const item of items) {
        client
          .graphql({
            query: onUpdateLogs,
            variables: { filter: { id: { eq: item.id } } },
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
    }
    fetchData()
  }, [items])

  async function audioPlay() {
    if (items.length > 0) {
      const audio =
        'https://hypersona-file-bucket.s3.ap-northeast-1.amazonaws.com/8984533a-1786-4e83-8b79-aaf97b288da6.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQ3EGPFDT6733S6WX%2F20241225%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241225T080456Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaDmFwLW5vcnRoZWFzdC0xIkcwRQIgEAgyPvFRJK0U5%2Fi3Xc7UzqqUuBELyKdp%2BUinWYJ2GTwCIQCDZtdfXxWlGi8LXgdkN%2FWCqjy52W3xFlhxFOOrAZkafyqSAwgREAAaDDA1ODI2NDA3MDM3NSIMnjWzhMEMsy%2BZt59HKu8CvcXQdDMdwikyckTt58GFRPHF97p99WdQf38jrYQo8wqtQUScJoziRniNaNcqSosC3sCoqWIPgdm6gd7MHU1kEguV8mcvfd74WLEtBg%2FW%2FB5fmq4fT15ziv6sKBFTzo%2FgNAiWnzCWCX0cfvnyrfLuSx4IgWUTm8mBa%2FfoZmlBmApZhpMWawcmLSCz1lS4cWYqfriRh%2B3jtdsb7miDXC6kMdT1a5Jq%2B9lm2Yobw%2BvBBB1iHQbgdDPnTfMhn75ACTBlxoHvnybu3R96mtP7iprx0u61Rm%2BXsipTuE41kPCyjTcUAah08k%2Fuy3OHiu6QMfruqFwLvTFZO5x2JgZ3kYWVjsWC85BfyHbRufs5rlmmJtYUudGDrGoLvBj5q34APo7MmCWNub93pAYcxw%2BpYfeoAla9d84FfHsmXI95eVbj8Ah0aVVphkaCw%2BVwaAE%2BTQyyr438x7eO886lHqWm40vFc47bcwnbSavP8rYaUBwuXzCP9q67BjqdAdJe%2FrVac6f4vjWNCYdy5K3IIyE8ZYSwnsACRU3Y1s9VPqxAcklCRSJav2OXMzqrzMBqsgHif3DRW4RJo9l%2B%2B5SCFAX0NqdKkk46xn%2FXGRrP9n8ajd1dimdkRI%2FlUUiZ5idAUH4UD5IfchsiyxEkXsZBSCZnibWTH%2F5nVcnF7d2Fzc%2FQKa2dDAUSBEDMqTc1exeNKz0dbmpaCzpCtX8%3D&X-Amz-Signature=cd53e76bc3c57e81fcf05e50e7154273a59ac88eee0fd7bbca85004e6574638d&X-Amz-SignedHeaders=host&x-id=GetObject'
      // if (!audio) return
      // const audioBlob = new Blob(
      //   [await fetch(audio).then((res) => res.arrayBuffer())],
      //   { type: 'audio/mp3' }
      // )
      // const audioUrl = URL.createObjectURL(audioBlob)
      // console.log('🚀 ~ audioPlay ~ audioUrl:', audioUrl)
      // const audioElement = new Audio(audioUrl)
      // const audioElement = document.getElementById('')
      const audioElement = document.getElementById(
        'audioPlayer'
      ) as HTMLAudioElement
      audioElement.src = audio
      console.log('🚀 ~ audioPlay ~ audioElement:', audioElement)
      audioElement.load()
      audioElement.play()
    }
  }

  useEffect(() => {
    audioPlay()
  }, [items])

  return (
    <div className="grid grid-cols-3 max-h-screen max-w-7xl gap-4 mx-auto justify-center items-center">
      <video
        className="col-span-2 max-h-screen"
        src="/pro.mp4"
        autoPlay
        controls
      />
      <div className="flex flex-col items-center space-y-8">
        <span className="text-2xl font-bold text-white">
          Some Cringe Slogan here
        </span>
        <div className="p-2 size-auto rounded-2xl border border-white">
          <Image src="/qr.svg" alt="qr" width={500} height={500} />
        </div>
        <iframe
          id="audioPlayer"
          src="'https://hypersona-file-bucket.s3.ap-northeast-1.amazonaws.com/8984533a-1786-4e83-8b79-aaf97b288da6.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQ3EGPFDT6733S6WX%2F20241225%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241225T080456Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaDmFwLW5vcnRoZWFzdC0xIkcwRQIgEAgyPvFRJK0U5%2Fi3Xc7UzqqUuBELyKdp%2BUinWYJ2GTwCIQCDZtdfXxWlGi8LXgdkN%2FWCqjy52W3xFlhxFOOrAZkafyqSAwgREAAaDDA1ODI2NDA3MDM3NSIMnjWzhMEMsy%2BZt59HKu8CvcXQdDMdwikyckTt58GFRPHF97p99WdQf38jrYQo8wqtQUScJoziRniNaNcqSosC3sCoqWIPgdm6gd7MHU1kEguV8mcvfd74WLEtBg%2FW%2FB5fmq4fT15ziv6sKBFTzo%2FgNAiWnzCWCX0cfvnyrfLuSx4IgWUTm8mBa%2FfoZmlBmApZhpMWawcmLSCz1lS4cWYqfriRh%2B3jtdsb7miDXC6kMdT1a5Jq%2B9lm2Yobw%2BvBBB1iHQbgdDPnTfMhn75ACTBlxoHvnybu3R96mtP7iprx0u61Rm%2BXsipTuE41kPCyjTcUAah08k%2Fuy3OHiu6QMfruqFwLvTFZO5x2JgZ3kYWVjsWC85BfyHbRufs5rlmmJtYUudGDrGoLvBj5q34APo7MmCWNub93pAYcxw%2BpYfeoAla9d84FfHsmXI95eVbj8Ah0aVVphkaCw%2BVwaAE%2BTQyyr438x7eO886lHqWm40vFc47bcwnbSavP8rYaUBwuXzCP9q67BjqdAdJe%2FrVac6f4vjWNCYdy5K3IIyE8ZYSwnsACRU3Y1s9VPqxAcklCRSJav2OXMzqrzMBqsgHif3DRW4RJo9l%2B%2B5SCFAX0NqdKkk46xn%2FXGRrP9n8ajd1dimdkRI%2FlUUiZ5idAUH4UD5IfchsiyxEkXsZBSCZnibWTH%2F5nVcnF7d2Fzc%2FQKa2dDAUSBEDMqTc1exeNKz0dbmpaCzpCtX8%3D&X-Amz-Signature=cd53e76bc3c57e81fcf05e50e7154273a59ac88eee0fd7bbca85004e6574638d&X-Amz-SignedHeaders=host&x-id=GetObject'"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  )
}
