import type { TSegment, TTaskRun } from '@/types'
import type { ResultContainer } from './httpClient/ResultContainer'
import { httpClient } from './httpClient/httpClient'

export const getSegments = (): Promise<ResultContainer<TSegment[]>> =>
  httpClient.get('/api/segments')

export const getTaskRuns = (): Promise<ResultContainer<TTaskRun[]>> =>
  httpClient.get('/api/task-runs')
