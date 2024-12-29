import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ClineMessage } from "../../../../src/shared/ExtensionMessage"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { vscode } from "../../utils/vscode"
import ChatRow from "./ChatRow"
import ChatTextArea from "./ChatTextArea"

interface ChatViewProps {
	isHidden: boolean
}

const ChatView = ({ isHidden }: ChatViewProps) => {
	const { clineMessages: messages } = useExtensionState()

	const [inputValue, setInputValue] = useState("")
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const [textAreaDisabled, setTextAreaDisabled] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messages.length === 0) {
			setTextAreaDisabled(false)
		}
	}, [messages.length])

	const handleSendMessage = useCallback((text: string) => {
		text = text.trim()
		if (text) {
			if (messages.length === 0) {
				vscode.postMessage({ type: "newTask", text })
			} else {
				vscode.postMessage({ type: "askResponse", askResponse: "messageResponse", text })
			}
			setInputValue("")
			setTextAreaDisabled(true)
		}
	}, [messages.length])

	useEffect(() => {
		// Focus text area when component becomes visible
		if (!isHidden) {
			textAreaRef.current?.focus()
		}
	}, [isHidden])

	useEffect(() => {
		// Auto-scroll to bottom when new messages arrive
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: isHidden ? "none" : "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}>
			<div style={{ flexGrow: 1, overflowY: "auto", padding: "10px" }}>
				{messages.map((message) => (
					<ChatRow key={message.ts} message={message} />
				))}
				<div ref={messagesEndRef} />
			</div>
			<div style={{ padding: "10px" }}>
				<ChatTextArea
					ref={textAreaRef}
					inputValue={inputValue}
					setInputValue={setInputValue}
					textAreaDisabled={textAreaDisabled}
					placeholderText="Type your message..."
					onSend={() => handleSendMessage(inputValue)}
				/>
				<VSCodeButton
					appearance="primary"
					style={{ marginTop: "10px", width: "100%" }}
					disabled={textAreaDisabled || !inputValue.trim()}
					onClick={() => handleSendMessage(inputValue)}>
					Send
				</VSCodeButton>
			</div>
		</div>
	)
}

export default ChatView
