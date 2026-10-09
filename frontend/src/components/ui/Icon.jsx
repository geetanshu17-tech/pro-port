import React, { useState } from 'react'
import folder from '../../../src/assets/icons/folder.png'

/**
 * Icon Component
 *
 * Represents a single desktop icon (folder/shortcut).
 *
 * 📌 MONGODB INTEGRATION:
 *  - This component will receive props fetched from MongoDB.
 *  - Each document in the "icons" collection should have:
 *      {
 *        _id: ObjectId,
 *        label: "Projects",       // Display name
 *        route: "/projects",      // React Router route or app identifier
 *        icon: "folder",          // Icon type: "folder" | custom URL
 *        position: { col, row },  // Optional: fixed grid position
 *        appId: "ProjectsApp"     // App to open on double-click
 *      }
 *  - Replace the hardcoded `label` and `src` with `props.label` and `props.iconUrl`
 *  - Hook up `onClick` / `onDoubleClick` to open the corresponding app via route/appId
 */

const Icon = ({
  label = 'Folder',       // 📌 Replace with data from MongoDB document field `label`
  iconUrl = folder,       // 📌 Replace with data from MongoDB field `icon` (URL or asset key)
  onDoubleClick = () => {}, // 📌 Wire this to open the app using `appId` from MongoDB
  isSelected = false,
}) => {
  const [selected, setSelected] = useState(isSelected)

  const handleClick = () => setSelected(true)
  const handleBlur = () => setSelected(false)

  return (
    <div
      className="desktop-icon"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onBlur={handleBlur}
      title={label}
    >
      <div className={`icon-img-wrapper ${selected ? 'selected' : ''}`}>
        <img
          src={iconUrl}
          alt={label}
          draggable={false}
          className="icon-img"
        />
      </div>
      <span className={`icon-label ${selected ? 'selected' : ''}`}>
        {label}
      </span>
    </div>
  )
}

export default Icon