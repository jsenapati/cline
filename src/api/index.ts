import { OpenAI } from "openai"
import { ApiConfiguration, ModelInfo } from "../shared/api"
import { OpenAiHandler } from "./providers/openai"
import { ApiStream } from "./transform/stream"

export interface ApiHandler {
	createMessage(systemPrompt: string, messages: OpenAI.Chat.ChatCompletionMessageParam[]): ApiStream
	getModel(): { id: string; info: ModelInfo }
}

export function buildApiHandler(configuration: ApiConfiguration): ApiHandler {
	const { apiProvider, ...options } = configuration
	switch (apiProvider) {
		case "openai":
			return new OpenAiHandler(options)
		default:
			return new OpenAiHandler(options)
	}
}
