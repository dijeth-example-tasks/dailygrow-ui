export type TUser = {
  id: number
  email: string
}

export type TSegment = {
  id: string
  name?: string
  description?: string
  clients?: TClient[]
}

export type TTaskRun = {
  id: string
  messages_count: number
  errors_count: number
  date: string
  task?: TTask
}

export type TTaskType = 'once' | 'daily' | 'weekly' | 'monthly' | 'birthday'

export type TTask = {
  id: string
  time: number
  active: boolean
  type: TTaskType
  text: string
  description: string
  name: string
  segment: TSegment
  runs: TTaskRun[]
}

export type TClient = {
  id: string
  name: string
  phone: string
  birthday: string
}
