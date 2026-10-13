import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LockScreen = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/wallpapers/night-sky-colorful-1920x1080-12510.jpg')",
      }}
    ></div>


      <div className="absolute inset-0 backdrop-blur-lg bg-black/40"></div>

      <div className="relative flex flex-col items-center justify-center h-full text-white space-y-6">

        <div className="text-8xl font-light">
          {formattedTime}
        </div>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqlLXvQzap9hX2xdgmBKa-kxmoKP4G2ppPg&s"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => navigate('/desktop')}
          className="rounded-lg border border-white/30 bg-white/20 px-6 py-2 backdrop-blur-md transition-colors duration-200 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60">
          Sign in
        </button>

      </div>
    </div>
  );
};

export default LockScreen;
