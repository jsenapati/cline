export type ApiProvider = "openai"

export interface ApiConfiguration {
    openAiApiKey?: string
    openAiModelId?: string
    openAiBaseUrl?: string
}

// Models
export interface ModelInfo {
    maxTokens?: number
    contextWindow?: number
    supportsImages?: boolean
    inputPrice?: number
    outputPrice?: number
    description?: string
}

// OpenAI Models
export const openAiModels = {
    "gpt-4-turbo-preview": {
        maxTokens: 4096,
        contextWindow: 128_000,
        supportsImages: true,
        inputPrice: 0.01,
        outputPrice: 0.03,
        description: "Most capable GPT-4 model, great for tasks that require creativity and advanced reasoning"
    },
    "gpt-4": {
        maxTokens: 8192,
        contextWindow: 8192,
        supportsImages: false,
        inputPrice: 0.03,
        outputPrice: 0.06,
        description: "More capable than GPT-3.5 in complex tasks, particularly good at coding"
    },
    "gpt-3.5-turbo": {
        maxTokens: 4096,
        contextWindow: 16384,
        supportsImages: false,
        inputPrice: 0.0005,
        outputPrice: 0.0015,
        description: "Most capable GPT-3.5 model, optimized for chat at a lower cost"
    }
} as const satisfies Record<string, ModelInfo>

export type OpenAiModelId = keyof typeof openAiModels
export const defaultModelId: OpenAiModelId = "gpt-4-turbo-preview"
