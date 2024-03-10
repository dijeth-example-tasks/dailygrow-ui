import type { TUser } from '@/types'
import type { ResultContainer } from './httpClient/ResultContainer'
import { httpClient } from './httpClient/httpClient'

export const getUser = (): Promise<ResultContainer<TUser>> => {
  return httpClient.get('/api/user')
}

export const getToken = (): Promise<ResultContainer<TUser>> => {
  return httpClient.get('/sanctum/csrf-cookie')
}

export const loginUser = (email: string, password: string): Promise<ResultContainer<TUser>> => {
  return httpClient.post('/login', { email, password })
}

export const registerUser = (email: string, password: string): Promise<ResultContainer<TUser>> => {
  return httpClient.post('/register', { email, password })
}

export const logoutUser = (): Promise<ResultContainer<void>> => {
  return httpClient.post('/logout')
}
