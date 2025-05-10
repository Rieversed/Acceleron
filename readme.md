# Acceleron - App Optimization & Debloating Tool

Acceleron is a powerful desktop application built with Tauri, React, TypeScript, and Deno that helps optimize and debloat other applications by applying specialized scripts to improve their performance, reduce resource usage, and enhance privacy.

<p align="center">
  <img src="frontend/src-tauri/icons/icon.svg" alt="Acceleron Logo" width="120" />
</p>

## ✨ New UI Features

- **Modern Interface**: Clean, intuitive design with smooth animations
- **Custom Title Bar**: macOS-style traffic light controls for window management
- **Dark/Light Mode**: Smooth transition between themes with animated toggle
- **Responsive Layout**: Adapts perfectly to different screen sizes
- **Hidden Scrollbars**: Clean UI with functional but visually minimal scrollbars

## Features

### Core Features

- **App Optimization Library**: Pre-configured optimization scripts for popular applications
- **Debloating Scripts**: Remove unnecessary components and features from applications
- **Performance Enhancement**: Improve startup times, memory usage, and overall responsiveness
- **Modern UI**: Clean, intuitive interface with animations and responsive design
- **Search & Filter**: Easily find applications by name, category, or description
- **Detailed Results**: View comprehensive statistics and improvements after optimization

### Optimization Categories

- **Memory Usage Optimization**: Reduce memory footprint of applications
- **Startup Performance**: Improve application launch times
- **Privacy Enhancement**: Disable telemetry and tracking features
- **Disk Space Recovery**: Clean up unnecessary files and caches
- **System Integration**: Optimize how apps interact with the operating system

### Supported Applications

Acceleron includes optimization scripts for many popular applications, including:

- **Web Browsers**: Google Chrome, Mozilla Firefox
- **Productivity**: Visual Studio Code, Adobe Creative Cloud
- **Gaming**: Steam
- **Media & Entertainment**: Spotify
- **Social & Communication**: Discord
- **System**: Windows core optimization

## Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **UI Design**: Custom CSS with animations and responsive design
- **Desktop Framework**: Tauri (Rust-based)
- **Backend**: Deno
- **Communication**: HTTP API between frontend and backend

## Project Structure

```
Acceleron/
├── frontend/                # React + TypeScript frontend
│   ├── src/                 # Source files
│   │   ├── App.tsx         # Main application component
│   │   └── App.css         # Styling with animations
│   ├── public/              # Static assets
│   └── src-tauri/           # Tauri configuration
└── backend/                 # Deno backend
    └── server.ts            # API server with optimization scripts
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
   npm run tauri:dev
   ```

## How It Works

1. **Browse Applications**: View the list of supported applications, searchable by name or category
2. **Select an App**: Click on an application to view available optimization scripts
3. **Choose Scripts**: Select which optimization scripts to run (recommended scripts are pre-selected)
4. **Run Optimization**: Execute the selected scripts to optimize the application
5. **View Results**: See detailed statistics and improvements made by the optimization process

## Building for Production

### Using the Build Script

For convenience, a build script is included that automates the entire build process:

```batch
.\build-acceleron.bat
```

This script will:
1. Check for the correct directory structure
2. Install all necessary dependencies
3. Build the Tauri application
4. Create installer files (MSI, EXE)
5. Copy the installers to an output directory

### Manual Build Process

If you prefer to build manually:

```bash
cd frontend
npm install
npm run tauri:build
```

This will create executable binaries and installers in the `frontend/src-tauri/target/release` directory.

### Running the Application

Use the included startup script to properly launch all components:

```batch
.\start-acceleron.bat
```

This script handles starting both the backend server and the frontend application, and ensures proper process cleanup when closing.

## Development Notes

- The Deno backend runs on port 8000 by default
- The frontend communicates with the backend via HTTP requests
- For production, you may want to bundle the Deno executable with your Tauri app
- The optimization scripts in this demo simulate actual system modifications
- In a production version, the scripts would perform actual system changes

## Future Enhancements

- **User-defined Scripts**: Allow users to create and share custom optimization scripts
- **Scheduled Optimization**: Set up regular optimization schedules for applications
- **System Monitoring**: Track application performance before and after optimization
- **Backup & Restore**: Create system restore points before making changes
- **Cloud Sync**: Sync optimization profiles across devices

## License

MIT

---

© 2025 Acceleron - App Optimization Tool