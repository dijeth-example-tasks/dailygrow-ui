import { ref } from 'vue'

const user = ref<string | null>(localStorage.getItem('logged') || null)

export const setUser = (email: string | null) => {
  user.value = email
  localStorage.setItem('logged', email || '')
}

export const isAuthorize = () => !!user.value
export const useUser = () => user
