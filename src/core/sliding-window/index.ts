// Simplified sliding window functionality for OpenAI-only version
import { OpenAIMessage } from "../../shared/types"

export function truncateHalfConversation(messages: OpenAIMessage[]): OpenAIMessage[] {
  if (messages.length <= 2) {
    return messages
  }
  
  const systemMessage = messages[0]
  const recentMessages = messages.slice(-2)
  return [systemMessage, ...recentMessages]
}
