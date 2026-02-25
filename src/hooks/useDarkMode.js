import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const v = localStorage.getItem('ma:dark')
    return v === '1'
  })

  useEffect(() => {
    localStorage.setItem('ma:dark', dark ? '1' : '0')
  }, [dark])

  return [dark, setDark]
}
