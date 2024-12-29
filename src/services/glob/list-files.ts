import * as vscode from "vscode"
import * as path from "path"
import { globby } from "globby"

export async function listFiles(
  cwd: string,
  includeHidden = false,
  maxFiles = 1000
): Promise<[string[], boolean]> {
  const patterns = ["**/*"]
  const options = {
    cwd,
    absolute: true,
    dot: includeHidden,
    onlyFiles: false,
    expandDirectories: true,
    gitignore: true,
  }

  const files = await globby(patterns, options)
  const truncated = files.length > maxFiles
  return [files.slice(0, maxFiles), truncated]
}
