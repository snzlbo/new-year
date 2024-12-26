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
import { LANGUAGE, TYPE } from '@/types/API'
import { Icon } from '@iconify/react'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import Snowfall from 'react-snowfall'
import { FlipWords } from '@/components/flip-words'

Amplify.configure(awsmobile)
const client = generateClient()
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Greetings() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()
  const { language, setLanguage } = useTranslation()
  const words = {
    en: ['magical', 'joyous', 'sparkling', 'memorable'],
    ja: ['素敵な', '楽しい', 'きらめく', '思い出に残る'],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (name.length < 1) {
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
            language: language as LANGUAGE,
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
      <div
        className={cn(
          'relative max-h-screen h-screen flex flex-col items-center pt-24 w-full px-4 z-40',
          montserrat.className
        )}
      >
        <div className="w-full mx-auto text-start mb-8">
          <div className="h-fit flex justify-start items-start px-4">
            <div className="text-3xl font-normal text-neutral-600 dark:text-neutral-400">
              <div className="mb-1">{t('title')}</div>
              {t('greeting1')}
              <FlipWords words={language === 'en' ? words.en : words.ja} />{' '}
              {t('greeting2')}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 p-4">
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
        <Snowfall color="#eeeeee" snowflakeCount={100} />
      </div>
    </ThemeProvider>
  )
}
