# Acceleron - App Optimization Tool

Acceleron is a desktop application built with Tauri, React, TypeScript, and Deno that helps optimize other applications by analyzing and improving their performance metrics.

## Features

- **Memory Usage Optimization**: Analyze and optimize memory consumption
- **CPU Performance**: Improve CPU utilization and reduce processing overhead
- **Network Optimization**: Enhance network request efficiency
- **Storage Efficiency**: Optimize storage usage and file operations

## Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **Desktop Framework**: Tauri (Rust-based)
- **Backend**: Deno
- **Communication**: HTTP API between frontend and backend

## Project Structure

```
Acceleron/
├── frontend/            # React + TypeScript frontend
│   ├── src/             # Source files
│   ├── public/          # Static assets
│   └── src-tauri/       # Tauri configuration
└── backend/             # Deno backend
    └── server.ts        # API server
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Deno](https://deno.land/) (v1.32 or higher)
- [Rust](https://www.rust-lang.org/) (for Tauri)

### Installation

1. Clone the repository

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Start the Deno backend
   ```bash
   cd backend
   deno run --allow-net server.ts
   ```

4. Start the Tauri development environment
   ```bash
   cd frontend
   npm run tauri dev
   ```

## Building for Production

```bash
cd frontend
npm run tauri build
```

This will create executable binaries in the `frontend/src-tauri/target/release` directory.

## Development Notes

- The Deno backend runs on port 8000 by default
- The frontend communicates with the backend via HTTP requests
- For production, you may want to bundle the Deno executable with your Tauri app

## License

MIT