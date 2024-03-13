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
  once: 'Количество часов до запуска',
  daily: 'Количество часов от начала дня',
  weekly: 'Количество часов от начала недели',
  monthly: 'Количество часов от начала месяца',
  birthday: 'Количество часов до дня рождения',
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
