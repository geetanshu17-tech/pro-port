import React from 'react'
import icon from '../../assets/icons/booticon-removebg-preview.png'

const BootScreen = () => {
  return (
    <div className='bg-black h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-12'>
        
        <img 
          src={icon} 
          className='w-40 h-40' 
          alt="Boot Icon" 
        />

        {/* Realistic Windows 11 Loader */}
        <div className="relative w-25 h-12.5">
          {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <div
              key={i}
              className="win-dot"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default BootScreen
