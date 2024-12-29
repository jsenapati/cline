import { ModelInfo } from "../shared/types"

export function calculateApiCost(
  model: ModelInfo,
  tokensIn: number,
  tokensOut: number
): number {
  return (
    tokensIn * model.inputPricePerToken +
    tokensOut * model.outputPricePerToken
  )
}
