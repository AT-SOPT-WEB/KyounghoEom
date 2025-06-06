import React, { useState, useEffect, useRef } from 'react'
import { LIMITS, TIMING } from '../constants'
import { startCountdown } from '../utils/countdown'

const NumberBaseball: React.FC = () => {
  const generateAnswer = (): string => {
    const digits = Array.from({ length: 10 }, (_, i) => i.toString())
    let res = ''
    while (res.length < LIMITS.NUMBER_LENGTH) {
      const idx = Math.floor(Math.random() * digits.length)
      res += digits.splice(idx, 1)[0]
    }
    return res
  }

  const [answer, setAnswer] = useState(generateAnswer())
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState<{ guess: string; result: string }[]>([])
  const [tries, setTries] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<number | null>(null)

  const resetGame = () => {
    setAnswer(generateAnswer())
    setGuess('')
    setMessage('')
    setAttempts([])
    setTries(0)
  }

  const calculateSB = (g: string, a: string): [number, number] => {
    let s = 0
    let b = 0
    for (let i = 0; i < LIMITS.NUMBER_LENGTH; i++) {
      if (g[i] === a[i]) s++
      else if (a.includes(g[i])) b++
    }
    return [s, b]
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tries >= LIMITS.MAX_ATTEMPTS) return

    if (!/^\d{3}$/.test(guess)) {
      setMessage('숫자 3글자를 입력하세요')
      setGuess('')
      return
    }
    if (new Set(guess).size !== LIMITS.NUMBER_LENGTH) {
      setMessage('중복 없이 3글자를 입력하세요')
      setGuess('')
      return
    }

    const [s, b] = calculateSB(guess, answer)
    const resultStr = s === 0 && b === 0 ? '아웃' : `${s}스트라이크 ${b}볼`
    const nextTry = tries + 1
    setAttempts(prev => [...prev, { guess, result: resultStr }])
    setTries(nextTry)

    if (s === LIMITS.NUMBER_LENGTH) {
      setMessage('정답!')
      startCountdown(TIMING.SUCCESS_RESET, resetGame, countdownRef, timeoutRef)
    } else if (nextTry >= LIMITS.MAX_ATTEMPTS) {
      setMessage(`패배... 정답은 ${answer}`)
      startCountdown(TIMING.FAILURE_RESET, resetGame, countdownRef, timeoutRef)
    } else {
      setMessage(resultStr)
    }
    setGuess('')
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  useEffect(() => {
    console.log('정답:', answer)
  }, [answer])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="3자리 숫자 입력"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          maxLength={LIMITS.NUMBER_LENGTH}
        />
        <button type="submit">확인</button>
      </form>
      <div>{message}</div>
      <ul>
        {attempts.map((v, i) => (
          <li key={i}> {v.guess} - {v.result} </li>
        ))}
      </ul>
    </div>
  )
}

export default NumberBaseball 