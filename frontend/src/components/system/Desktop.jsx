
import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import wallpaper from '../../assets/wallpapers/bgdesk.webp'
import useWindowManager from '../window/useWindowManager'
import WindowManager from '../window/WindowManager'
import ProjectsApp from '../apps/ProjectsApp'

const Desktop = () => {
  const [folders, setFolders] = useState([])

  const {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    closeWindow,
  } = useWindowManager();

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
    <div className="desktop-root">
      <div
        className="desktop-wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      <div className="desktop-grid">
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
    </div>
  )
}

export default Desktop

