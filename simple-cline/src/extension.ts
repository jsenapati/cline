import * as vscode from 'vscode';
import OpenAI from 'openai';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-cline.startChat', () => {
        // Create and show panel
        const panel = vscode.window.createWebviewPanel(
            'simpleCline',
            'Simple Cline',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );

        // Set initial HTML content
        panel.webview.html = getWebviewContent();

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'sendMessage':
                        const apiKey = vscode.workspace.getConfiguration().get<string>('simpleCline.openaiApiKey');
                        
                        if (!apiKey) {
                            panel.webview.postMessage({
                                type: 'response',
                                text: 'Error: OpenAI API key not configured. Please set it in VSCode settings under "simpleCline.openaiApiKey".'
                            });
                            return;
                        }

                        const openai = new OpenAI({ apiKey });

                        try {
                            const response = await openai.chat.completions.create({
                                model: 'gpt-3.5-turbo',
                                messages: [{ role: 'user', content: message.text }]
                            });

                            const text = response.choices[0]?.message?.content ?? '(No response)';
                            panel.webview.postMessage({
                                type: 'response',
                                text: text
                            });
                        } catch (error) {
                            panel.webview.postMessage({
                                type: 'response',
                                text: 'Error calling OpenAI: ' + (error instanceof Error ? error.message : String(error))
                            });
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple Cline</title>
        <style>
            body { 
                margin: 0; 
                padding: 10px; 
                color: var(--vscode-editor-foreground);
                background-color: var(--vscode-editor-background);
            }
            #chat-container { 
                height: calc(100vh - 100px); 
                display: flex; 
                flex-direction: column; 
            }
            #messages { 
                flex-grow: 1; 
                overflow-y: auto; 
                margin-bottom: 10px;
                padding: 10px;
                border: 1px solid var(--vscode-input-border);
                border-radius: 4px;
            }
            #input-container { 
                display: flex; 
                gap: 8px;
            }
            #message-input { 
                flex-grow: 1; 
                padding: 8px;
                background: var(--vscode-input-background);
                color: var(--vscode-input-foreground);
                border: 1px solid var(--vscode-input-border);
                border-radius: 4px;
            }
            button { 
                padding: 8px 16px;
                background: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background: var(--vscode-button-hoverBackground);
            }
            .message {
                margin: 8px 0;
                padding: 8px;
                border-radius: 4px;
            }
            .user-message {
                background: var(--vscode-input-background);
                margin-left: 20%;
            }
            .assistant-message {
                background: var(--vscode-editor-inactiveSelectionBackground);
                margin-right: 20%;
            }
        </style>
    </head>
    <body>
        <div id="chat-container">
            <div id="messages"></div>
            <div id="input-container">
                <input type="text" id="message-input" placeholder="Type your message...">
                <button id="send-button">Send</button>
            </div>
        </div>
        <script>
            const vscode = acquireVsCodeApi();
            const messagesDiv = document.getElementById('messages');
            const messageInput = document.getElementById('message-input');
            const sendButton = document.getElementById('send-button');

            function addMessage(text, isUser = true) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${isUser ? 'user-message' : 'assistant-message'}\`;
                messageDiv.textContent = text;
                messagesDiv.appendChild(messageDiv);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }

            function sendMessage() {
                const text = messageInput.value.trim();
                if (text) {
                    addMessage(text, true);
                    vscode.postMessage({
                        command: 'sendMessage',
                        text: text
                    });
                    messageInput.value = '';
                }
            }

            window.addEventListener('message', event => {
                const message = event.data;
                switch (message.type) {
                    case 'response':
                        addMessage(message.text, false);
                        break;
                }
            });

            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        </script>
    </body>
    </html>`;
}

export function deactivate() {}
