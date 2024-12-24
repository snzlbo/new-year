'use client'
import { useLogApi } from '@/services/logs'
import { DeviceUUID } from 'device-uuid'
import { useEffect } from 'react'

export default function Greetings() {
  const { isMobile } = new DeviceUUID().parse()
  const deviceId = new DeviceUUID().get()
  console.log(isMobile, deviceId)

  const logApi = useLogApi();

  useEffect(() => {
    logApi.list({})
  }, [logApi])

  return (
    <div className="flex">
      Greetings
    </div>
  );
}
