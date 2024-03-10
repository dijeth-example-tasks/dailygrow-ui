import type { TUser } from '@/types'
import { getUser, loginUser, logoutUser, getToken } from '../api/authApi'
import { setUser } from '@/store'

export const loginService = async (email: string, password: string): Promise<boolean> => {
  await getToken()
  const response = await loginUser(email, password)

  if (response.error) {
    setUser(null)
    return false
  }

  setUser(email)
  return true
}

export const logoutService = async () => {
  await logoutUser()
  setUser(null)
}

export const getUserService = async (): Promise<TUser> => {
  const response = await getUser()
  if (!response.success) {
    throw new Error('Cannot get user info')
  }

  const {
    data: { email, id },
  } = response

  setUser(email)

  return { id, email }
}
