// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"
import { ClineProvider } from "./core/webview/ClineProvider"
import { createClineAPI } from "./exports"
import "./utils/path" // necessary to have access to String.prototype.toPosix

/*
Built using https://github.com/microsoft/vscode-webview-ui-toolkit

Inspired by
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/frameworks/hello-world-react-cra

*/

let outputChannel: vscode.OutputChannel

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	outputChannel = vscode.window.createOutputChannel("Cline")
	context.subscriptions.push(outputChannel)

	outputChannel.appendLine("Cline extension activated")

	// Create and register the main webview provider
	const sidebarProvider = new ClineProvider(context, outputChannel)
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ClineProvider.sideBarId, sidebarProvider, {
			webviewOptions: { retainContextWhenHidden: true },
		}),
	)

	// Register command to open in new tab
	const openClineInNewTab = async () => {
		const panel = vscode.window.createWebviewPanel(ClineProvider.tabPanelId, "Cline", vscode.ViewColumn.Two, {
			enableScripts: true,
			retainContextWhenHidden: true,
			localResourceRoots: [context.extensionUri],
		})

		panel.iconPath = {
			light: vscode.Uri.joinPath(context.extensionUri, "assets", "icons", "robot_panel_light.png"),
			dark: vscode.Uri.joinPath(context.extensionUri, "assets", "icons", "robot_panel_dark.png"),
		}

		const tabProvider = new ClineProvider(context, outputChannel)
		tabProvider.resolveWebviewView(panel)
	}

	context.subscriptions.push(vscode.commands.registerCommand("cline.openInNewTab", openClineInNewTab))

	return createClineAPI(outputChannel, sidebarProvider)
}

// This method is called when your extension is deactivated
export function deactivate() {
	outputChannel.appendLine("Cline extension deactivated")
}
