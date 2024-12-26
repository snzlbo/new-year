'use client'
import awsmobile from '@/aws-exports'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Button } from '@/components/moving-border'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createLogs } from '@/lib/graphql/mutations'
import { TYPE } from '@/types/API'
import { Icon } from '@iconify/react'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from '../context/TranslationContext'

Amplify.configure(awsmobile)
const client = generateClient()

export default function Greetings() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()
  const { language, setLanguage } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (name.length < 1) {
      toast.error('Name must be at least 3 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const resp = await client.graphql({
        query: createLogs,
        variables: {
          input: {
            type: TYPE.new_year,
            username: name,
            language,
          },
        },
      })

      const speech = await fetch(
        'https://quvajuy6na.execute-api.ap-northeast-1.amazonaws.com/generate_speech',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: resp.data.createLogs.id,
          }),
        }
      )
      if (!speech.ok) {
        throw new Error('Speech generation failed')
      }
      setName('')
    } catch (error) {
      console.error(error)
      toast.error('Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative max-h-screen h-screen flex flex-col items-center pt-24 w-full px-4 z-40">
        <div className="w-full max-w-md mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg animate__animated animate__bounceInDown">
            {t('title')}
          </h1>
          <p className="text-2xl font-bold mb-6 animate__animated animate__backInLeft">
            {t('subtitle')}
          </p>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="space-y-2">
              <label>{t('nameLabel')}</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                required
                minLength={3}
              />
            </div>
            <div className="space-y-2">
              <label>{t('languageLabel')}</label>
              <Select
                defaultValue={language}
                onValueChange={(value) => {
                  setLanguage(value as 'en' | 'ja')
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">
                    <div className="flex items-center space-x-2">
                      <Icon icon="emojione:flag-for-japan" />
                      <div>日本語</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center space-x-2">
                      <Icon icon="emojione:flag-for-united-states" />
                      <div>English</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <p className="text-lg text-white text-center">{t('wishText')}</p> */}
            <Button
              type="submit"
              className="w-full bg-black dark:bg-white dark:text-black text-white flex justify-center relative"
            >
              <span
                className={`${
                  isSubmitting ? 'translate-x-60' : ''
                } text-center transition duration-500`}
              >
                {'Submit'}
              </span>
              <span
                className={`${
                  isSubmitting ? 'translate-x-0' : '-translate-x-60'
                } flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20`}
              >
                🎄
              </span>
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}
