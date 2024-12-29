// Simplified types for OpenAI-only version

export interface ApiReqInfo {
  request?: string
  tokensIn?: number
  tokensOut?: number
  cacheWrites?: number
  cacheReads?: number
  cost?: number
  cancelReason?: string
  streamingFailedMessage?: string
}

export type ApiReqCancelReason = 
  | "user_abort"
  | "error"
  | "too_many_mistakes"
  | "task_completed"
