'use client'
import { DeviceUUID } from 'device-uuid'

export default function Greetings() {
  const { isMobile } = new DeviceUUID().parse()
  const deviceId = new DeviceUUID().get()
  console.log(isMobile, deviceId)

  return <div className="flex">Greetings</div>
}
