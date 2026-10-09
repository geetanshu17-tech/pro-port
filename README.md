# Pro-Port — Interactive Desktop Portfolio

A personal portfolio designed to simulate a Windows desktop environment. Instead of navigating through traditional web pages, users can interact with desktop icons and open portfolio sections inside movable windows.

> **Status:** In Development 🚧

## Tech Stack

**Frontend**

* React 19
* Vite
* Tailwind CSS v4
* React Router
* CSS and React state management

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

## Current Features

* [x] Boot screen
* [x] Lock screen with live clock
* [x] Sign-in navigation to the desktop
* [x] Desktop wallpaper
* [x] Desktop icons fetched from MongoDB
* [x] Open application windows by double-clicking icons
* [x] Multiple windows open simultaneously
* [x] Focus windows by clicking them
* [x] Close windows using the close button
* [x] Drag windows using their title bars
* [x] Initial minimize-window state and UI implementation

## In Progress

* [ ] Test the minimize functionality
* [ ] Build the taskbar
* [ ] Restore minimized windows from the taskbar
* [ ] Improve window positioning and dragging
* [ ] Build the Projects application with actual project details

## Project Structure

```text
pro-port/
├── backend/
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── models/
│       ├── routes/
│       └── controllers/
│
└── frontend/
    └── src/
        ├── components/
        │   ├── apps/
        │   │   └── ProjectsApp.jsx
        │   ├── system/
        │   └── window/
        │       ├── useWindowManager.jsx
        │       ├── Window.jsx
        │       └── WindowManager.jsx
        ├── pages/
        │   └── Desktop.jsx
        └── App.jsx
```

*Note: The structure above highlights the files involved in the current implementation. Other folders and files may exist in the project.*

## How It Works

1. The application displays a boot screen, followed by the lock screen.
2. Signing in opens the desktop.
3. Desktop application data is fetched from the Express backend, which reads records from MongoDB.
4. Double-clicking an icon opens its application in a window.
5. The window manager tracks open windows, active-window state, stacking order, and minimized state.
6. Windows can be dragged, focused, and closed.
7. The planned taskbar will allow users to restore minimized windows.

## Backend

The Express server runs on port `3001`.

The frontend currently fetches desktop application data from:

```text
http://localhost:3001/apps
```

The app records contain fields such as:

* `label`
* `route`
* `appId`
* `icon`
* `order`
* `visible`

MongoDB connection used during local development:

```text
mongodb://127.0.0.1:27017/pro-port
```

## Running Locally

### Start the backend

```bash
cd backend
npm run dev
```

### Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Ensure MongoDB is running locally before starting the backend.

## Next Development Session

### First: Verify the current implementation

* Start the backend and frontend.
* Open Projects and another application.
* Test dragging, focusing, closing, and minimizing.
* Check the browser console and terminal for errors.

### Second: Complete the taskbar

* Add a taskbar at the bottom of the desktop.
* Display buttons for open applications.
* Highlight the active application.
* Show minimized applications in the taskbar.
* Restore a minimized window when its taskbar button is clicked.

### Third: Improve the portfolio applications

* Add actual project cards, descriptions, and links.
* Implement About, Skills, Contact, and Terminal applications.
* Improve window styling and responsiveness.

## Development Approach

Build the portfolio incrementally. Keep working features stable, make small changes, and test after each implementation step.

**Current checkpoint:** The basic desktop window system is working, and minimize support has been added to the window manager and UI. The next task is to test minimizing and implement the taskbar and restore functionality.
