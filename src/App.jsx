import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const generateOtp = () =>{
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    setOtp(code);
    setTime(5);
  }
  useEffect(() =>{
    if(time > 0){
      timerRef.current = setInterval(() => {
        setTime(t => t - 1)
      },1000);
    }
    if(time === 0 && timerRef.current){
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [time]);
  let timerMessage = "";

  if (time > 0) {
    timerMessage = `Expires in: ${time} seconds`;
  } else if (otp && time === 0) {
    timerMessage =
      "OTP expired. Click the button to generate a new OTP.";
  }
  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">
        {otp ? otp : "Click 'Generate OTP' to get a code"}
      </h2>
      <p id="otp-timer" aria-live="polite">
        {timerMessage}
      </p>
      <button 
        id="generate-otp-button" 
        onClick={generateOtp} 
        disabled={time > 0}
      >Generate OTP</button>
    </div>
  )
}

export default App
