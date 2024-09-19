import React, { useState, useEffect } from 'react';
import Chat from './components/chat';
import Footer from './components/footer';
import Wel from "./components/wel";

function App() {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    if (isSplashActive) {
     
      const timer = setTimeout(() => {
        setIsSplashActive(false);
        setIsChatActive(true);
      }, 5000);  

   
      return () => clearTimeout(timer);
    }
  }, [isSplashActive]);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      {isSplashActive ? (
        <Wel />
      ) : (
        <>
          {isChatActive && <Chat onNewChat={() => setIsChatActive(false)} />}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
