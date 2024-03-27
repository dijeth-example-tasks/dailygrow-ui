export type TUser = {
  id: number
  email: string
}

export type TSegment = {
  id: number
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
export const TaskTimeLabel: { [k in TTaskType]: string } = {
  once: 'Дата и время',
  daily: 'Точное время',
  weekly: 'День недели и время',
  monthly: 'День месяца и время',
  birthday: 'Дней до дня рождения и время',
} as const

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

export type TSubmitTask = Omit<TTask, 'id' | 'runs' | 'segment'> & { segment_id: number }
export type TSubmitClient = Omit<TClient, 'id' | 'segment'> & { segment_id: number }

export type TClient = {
  id: string
  name: string
  phone: string
  birthday: string
}
