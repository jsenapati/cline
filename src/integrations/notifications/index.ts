import * as vscode from "vscode"

export interface NotificationMessage {
  subtitle?: string
  message: string
}

export function showSystemNotification(message: string | NotificationMessage): void {
  if (typeof message === 'string') {
    vscode.window.showInformationMessage(message)
  } else {
    vscode.window.showInformationMessage(`${message.subtitle}: ${message.message}`)
  }
}
