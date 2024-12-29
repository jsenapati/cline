import * as vscode from "vscode"
import * as fs from "fs/promises"
import * as path from "path"

export async function downloadTask(timestamp: number, apiConversationHistory: any[]) {
    const filename = `cline-task-${timestamp}.json`
    const uri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file(filename),
        filters: {
            'JSON files': ['json']
        }
    })
    if (uri) {
        await fs.writeFile(uri.fsPath, JSON.stringify(apiConversationHistory, null, 2))
    }
}
