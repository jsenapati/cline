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

export interface ApiHandlerOptions {
  openAiApiKey: string
  openAiBaseUrl?: string
  openAiModelId?: string
  azureApiVersion?: string
}

export interface ModelInfo {
  id: string
  name: string
  contextWindow: number
  maxCompletionTokens: number
  tokensPerMessage: number
  inputPricePerToken: number
  outputPricePerToken: number
  maxRequestsPerMinute?: number
  cacheWritesPrice?: number
  cacheReadsPrice?: number
}

export interface Block {
  type: string
  text: string
}

export interface TextBlock extends Block {
  type: 'text'
  text: string
}

export interface ImageBlock extends Block {
  type: 'image'
  text: string
  content: string
}

export interface ContentBlock {
  type: string
  text: string
  content?: string | ContentBlock[]
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string | Block[]
  name?: string
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  name?: string
  tool_call_id?: string
  tool_calls?: Array<{
    id: string
    type: 'function'
    function: {
      name: string
      arguments: string
    }
  }>
}

export interface OpenAIStreamResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    delta: {
      content?: string
      role?: string
    }
    finish_reason: string | null
  }[]
}

export interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: OpenAIMessage
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export const azureOpenAiDefaultApiVersion = '2024-02-15-preview'

export const openAiModelInfoSaneDefaults: ModelInfo = {
  id: 'gpt-4-turbo-preview',
  name: 'GPT-4 Turbo',
  contextWindow: 128000,
  maxCompletionTokens: 4096,
  tokensPerMessage: 3,
  inputPricePerToken: 0.01 / 1000,
  outputPricePerToken: 0.03 / 1000,
  maxRequestsPerMinute: 500
}
