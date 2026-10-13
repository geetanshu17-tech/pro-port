
import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import wallpaper from '../../assets/wallpapers/bgdesk.webp'
import Taskbar from '../system/Taskbar'
import useWindowManager from '../window/useWindowManager'
import WindowManager from '../window/WindowManager'
import ProjectsApp from '../apps/ProjectsApp'

  const Desktop = ({
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    closeWindow,
    clearWindows,
    onSleep,
    onSignOut,
    onShutdown,
  }) => {
    const [folders, setFolders] = useState([]);

  

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch('http://localhost:3001/apps')
        const data = await res.json()
        setFolders(data.filter(item => item.visible))
      } catch (err) {
        console.error('Error fetching apps:', err)
      }
    }

    fetchFolders()
  }, [])

  const renderApp = (appWindow) => {
    const appId = appWindow.appId.toLowerCase()

    if (appId.includes('project')) {
      return <ProjectsApp />
    }

    return (
      <div>
        <h2>{appWindow.title}</h2>
        <p>This app window is ready to be implemented.</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      <div className="absolute inset-0 z-[1] grid grid-cols-[repeat(auto-fill,88px)] auto-rows-[96px] content-start gap-1 p-3 pb-[52px]">
        {folders.map(folder => (
          <Icon
            key={folder._id}
            label={folder.label}
            onDoubleClick={() => openWindow(folder)}
          />
        ))}
      </div>

      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        focusWindow={focusWindow}
        minimizeWindow={minimizeWindow}
        closeWindow={closeWindow}
        renderApp={renderApp}
      />

      <Taskbar
        apps={folders}
        windows={windows}
        activeWindowId={activeWindowId}
        openWindow={openWindow}
        focusWindow={focusWindow}
        minimizeWindow={minimizeWindow}
        restoreWindow={restoreWindow}
        onSleep={onSleep}
        onSignOut={onSignOut}
        onShutdown={onShutdown}
      />
      
    </div>
  )
}

export default Desktop

