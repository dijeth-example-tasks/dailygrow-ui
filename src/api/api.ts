import type { TSegment, TTaskRun, TTask, TSubmitTask } from '@/types'
import type { ResultContainer } from './httpClient/ResultContainer'
import { httpClient } from './httpClient/httpClient'

export const getSegments = (): Promise<ResultContainer<TSegment[]>> =>
  httpClient.get('/api/segments')

export const getTaskRuns = (): Promise<ResultContainer<TTaskRun[]>> =>
  httpClient.get('/api/task-runs')

export const getTasks = (): Promise<ResultContainer<TTask[]>> => httpClient.get('/api/tasks')

export const updateTask = (task: TTask): Promise<ResultContainer<TTask>> => {
  const { type, time, text, active, description, segment, name } = task
  return httpClient.put(`/api/tasks/edit/${task.id}`, {
    type,
    time,
    text,
    segment_id: segment.id,
    active,
    description,
    name,
  })
}

export const createTask = (task: TSubmitTask): Promise<ResultContainer<TTask>> => {
  return httpClient.post('/api/tasks/create', task)
}

export const deleteTask = (task: TTask): Promise<ResultContainer<TTask>> => {
  return httpClient.delete(`/api/tasks/${task.id}`)
}
