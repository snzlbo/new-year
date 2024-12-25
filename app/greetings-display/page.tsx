'use client'
import { useLogApi } from '@/lib/logs'
import { DeviceUUID } from 'device-uuid'
import { useEffect } from 'react'
import { TYPE } from '@/types/API'

export default function GreetingsDisplayPage() {
  const { isMobile } = new DeviceUUID().parse()
  const deviceId = new DeviceUUID().get()
  console.log(isMobile, deviceId)
  const { list, onUpdate } = useLogApi()

  useEffect(() => {
    const fetchData = async () => {
      const response = await list({
        type: TYPE.new_year,
      })
      if (!response?.items) {
        return
      }
      for (const item of response.items) {
        if (item?.id) {
          onUpdate(item.id)
        }
      }
      console.log('🚀 ~ fetchData ~ response:', response)
    }
    fetchData()
  }, [list, onUpdate])

  return <div className="flex">Greetings Display</div>
}
