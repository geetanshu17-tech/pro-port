import React, { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import wallpaper from '../../assets/wallpapers/bgdesk.webp'
import { useNavigate } from 'react-router-dom'

const Desktop = () => {
  const [folders, setFolders] = useState([])

  // 🔗 Fetch data from backend
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch('http://localhost:3001/apps')
        const data = await res.json()

        // Optional: filter only visible apps
        const visibleData = data.filter(item => item.visible)

        setFolders(visibleData)
      } catch (err) {
        console.error("Error fetching folders:", err)
      }
    }

    fetchFolders()
  }, [])

  // 🚀 Open App Handler
  const navigate = useNavigate()

  const handleOpenApp = (route) => {
    navigate(route)
  }

  return (
    <div className="desktop-root">

      {/* Wallpaper */}
      <div
        className="desktop-wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      {/* Icon Grid */}
      <div className="desktop-grid">
        {folders.map((folder) => (
          <Icon
            key={folder._id}            // ✅ MongoDB ID
            label={folder.label}        // ✅ DB field
            // iconUrl={folder.icon}    // ✅ Use when icon is URL
            onDoubleClick={() => handleOpenApp(folder.route)}
          />
        ))}
      </div>

    </div>
  )
}

export default Desktop