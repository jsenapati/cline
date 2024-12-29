// Simplified mentions functionality for OpenAI-only version
export async function parseMentions(text: string, cwd: string): Promise<string> {
  return text // No mention parsing in simplified version
}

export function openMention(text: string): void {
  // No-op in simplified version
}
