# Simple Cline

A simplified version of Cline - AI chat interface for VSCode. This is a basic proof of concept that demonstrates a minimal chat interface within VSCode.

## Features

- Simple chat interface with VSCode theming
- Basic message handling (echo responses)
- Clean and minimal implementation

## Requirements

- VSCode 1.85.0 or higher

## Development Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Press F5 to start debugging

## Usage

1. Open Command Palette (Ctrl+Shift+P)
2. Type "Simple Cline: Start Chat"
3. A chat panel will open where you can send messages
4. The extension will echo back your messages

## Extension Structure

- `src/extension.ts`: Main extension code
- `package.json`: Extension manifest
- `tsconfig.json`: TypeScript configuration

## Building

```bash
npm run compile
```

This will create the `out` directory with the compiled JavaScript files.

## Contributing

This is a minimal proof of concept. Feel free to extend it with additional features while keeping the codebase simple and focused.

## License

MIT
