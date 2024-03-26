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
  once: 'Точная дата и время рассылки',
  daily: 'Точное время рассылки',
  weekly: 'День недели и время рассылки',
  monthly: 'День месяца и время рассылки',
  birthday: 'Количество дней до дня рождения и время',
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
