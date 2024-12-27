import React, { useState } from 'react'
import micIcon from './assets/mic.svg'

export default function App() {
  const [recordingStatus, setRecordingStatus] = useState(false);

  function micClick(){
    setRecordingStatus(pre => !pre);
  }

  return (
    <section className="main">
      <div className='header'>
        <h1>Record Audio</h1>
      </div>
      <div className="audio-control">
        <div className="audio-anim">
          <p>
            {recordingStatus ? "Stop ->": "Record ->"} 
          </p>
        </div>
        <div className={recordingStatus ? 'mic mic-recording': 'mic'} onClick={micClick}>
          <i className="fa-solid fa-microphone"></i>
        </div>
      </div>
    </section>
  )
}
