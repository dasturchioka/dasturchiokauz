import { useLocalStorage } from '@vueuse/core'

export function useTheme() {
  const theme = useLocalStorage<'light' | 'dark'>('theme', 'light')

  const setTheme = (value: 'light' | 'dark') => {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', value === 'dark')
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  // make sure to sync on hydration
  if (import.meta.client) {
    setTheme(theme.value)
  }

  return { theme, setTheme, toggleTheme }
}
