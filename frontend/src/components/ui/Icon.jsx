
import { useState } from 'react'
import folder from '../../../src/assets/icons/folder.png'

const Icon = ({
  label = 'Folder',
  iconUrl = folder,
  onDoubleClick = () => {},
  isSelected = false,
}) => {
  const [selected, setSelected] = useState(isSelected)

  const handleClick = () => setSelected(true)
  const handleBlur = () => setSelected(false)

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-start gap-1 rounded-md px-1 py-1.5 outline-none transition-colors duration-150 hover:bg-white/10 focus:bg-white/15 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onBlur={handleBlur}
      title={label}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded p-0.5 transition-colors duration-150 ${
          selected
            ? 'bg-blue-400/35 shadow-[0_0_0_1px_rgba(100,160,255,0.6)]'
            : ''
        }`}
      >
        <img
          src={iconUrl}
          alt={label}
          draggable={false}
          className="h-11 w-11 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-100 hover:scale-[1.08]"
        />
      </div>

      <span
        className={`max-w-20 overflow-hidden rounded px-1 text-center text-[11px] leading-[1.3] font-medium whitespace-nowrap text-ellipsis text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_6px_rgba(0,0,0,0.7)] transition-colors duration-150 ${
          selected ? 'bg-blue-400/55' : ''
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default Icon
