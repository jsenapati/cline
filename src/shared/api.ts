export type ApiProvider = "openai"

export interface ApiHandlerOptions {
	openAiBaseUrl?: string
	openAiApiKey?: string
	openAiModelId?: string
}

export type ApiConfiguration = ApiHandlerOptions & {
	apiProvider?: ApiProvider
}

// Models

export interface ModelInfo {
	maxTokens?: number
	contextWindow?: number
	supportsImages?: boolean
	supportsComputerUse?: boolean
	supportsPromptCache: boolean
	inputPrice?: number
	outputPrice?: number
	description?: string
}

export const openAiModelInfoSaneDefaults: ModelInfo = {
	maxTokens: -1,
	contextWindow: 128_000,
	supportsImages: true,
	supportsPromptCache: false,
	inputPrice: 0,
	outputPrice: 0,
}
