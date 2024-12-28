# Cline Architecture Diagram

```mermaid
graph TB
    %% Core VSCode Extension Components
    subgraph VSCode["VSCode Extension"]
        ClineAPI["ClineAPI<br/>(Extension Interface)"]
        ClineProvider["ClineProvider<br/>(Webview Management)"]
    end

    %% React UI Components
    subgraph UI["React Webview UI"]
        ChatView["ChatView<br/>(Conversation Interface)"]
        SettingsView["SettingsView<br/>(Configuration)"]
        HistoryView["HistoryView<br/>(Task History)"]
        McpView["McpView<br/>(Protocol Management)"]
    end

    %% API Provider System
    subgraph APISystem["Multi-Provider AI System"]
        ApiHandler["ApiHandler<br/>(Provider Management)"]
        Anthropic["Anthropic Provider"]
        OpenRouter["OpenRouter Provider"]
        OpenAI["OpenAI Provider"]
        Bedrock["AWS Bedrock Provider"]
    end

    %% Task Management
    subgraph TaskSystem["Task Management"]
        ConversationManager["Conversation Manager"]
        TaskTracker["Task Tracker"]
        ContextManager["Context Manager"]
    end

    %% Tool Integration System
    subgraph Tools["Tool Integration"]
        FileSystem["File System Operations"]
        TerminalManager["Terminal Manager"]
        BrowserSession["Browser Automation"]
        LanguageParser["Code Parser & Analyzer"]
    end

    %% MCP System
    subgraph MCP["Model Context Protocol"]
        McpHub["McpHub<br/>(Protocol Management)"]
        CustomTools["Custom Tools"]
        Resources["External Resources"]
    end

    %% Connections
    ClineAPI --> ClineProvider
    ClineProvider --> UI
    ClineAPI --> ApiHandler
    ApiHandler --> Anthropic & OpenRouter & OpenAI & Bedrock
    
    ClineAPI --> TaskSystem
    ConversationManager --> ApiHandler
    TaskTracker --> Tools
    
    ClineAPI --> Tools
    Tools --> McpHub
    McpHub --> CustomTools
    McpHub --> Resources
    
    ChatView --> ConversationManager
    SettingsView --> ClineProvider
    HistoryView --> TaskTracker
    McpView --> McpHub

    %% Tool Interactions
    TerminalManager --> FileSystem
    BrowserSession --> FileSystem
    LanguageParser --> FileSystem

    %% Styling
    classDef primary fill:#2374ab,stroke:#2374ab,stroke-width:2px,color:#fff
    classDef secondary fill:#68a2cc,stroke:#68a2cc,stroke-width:2px,color:#fff
    classDef tertiary fill:#91c1e2,stroke:#91c1e2,stroke-width:2px,color:#fff

    class ClineAPI,ApiHandler,McpHub primary
    class ClineProvider,ConversationManager,TaskTracker,ContextManager secondary
    class FileSystem,TerminalManager,BrowserSession,LanguageParser tertiary
```

This architecture diagram illustrates the core components and interactions of the Cline VSCode extension:

1. **VSCode Extension Layer**
   - ClineAPI: Primary interface for the VSCode extension
   - ClineProvider: Manages webview and extension state

2. **React Webview UI**
   - ChatView: Main conversation interface
   - SettingsView: Configuration management
   - HistoryView: Task history tracking
   - McpView: Protocol management interface

3. **Multi-Provider AI System**
   - ApiHandler: Manages multiple AI provider integrations
   - Supported providers: Anthropic, OpenRouter, OpenAI, AWS Bedrock

4. **Task Management System**
   - Conversation Manager: Handles AI interactions
   - Task Tracker: Manages task state and progress
   - Context Manager: Handles sliding window context

5. **Tool Integration System**
   - File System Operations: File management and modifications
   - Terminal Manager: Command execution and monitoring
   - Browser Session: Web automation and testing
   - Language Parser: Code analysis across languages

6. **Model Context Protocol (MCP)**
   - McpHub: Central protocol management
   - Custom Tools: Extensible tool system
   - External Resources: Resource management

The arrows indicate the flow of data and control between components, showing how the different systems interact to provide a cohesive development environment.
