import * as vscode from "vscode"

export function openImage(path: string) {
    if (path) {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(path))
    }
}

export function openFile(path: string) {
    if (path) {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(path))
    }
}
