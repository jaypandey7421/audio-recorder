import React, { useState, useRef } from 'react'


export default function App() {
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [audioURL, setAudioURL] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunkRef = useRef([]);


  const startRecording = async () =>{
    try{
      const mediaStream = await navigator.mediaDevices.getUserMedia({audio : true});
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event)=>{
        audioChunkRef.current.push(event.data);
      };

      mediaRecorder.onstop = () =>{
        const audioBLOB = new Blob(audioChunkRef.current, {type : "audio/webm"});
        const url = URL.createObjectURL(audioBLOB);
        setAudioURL(pre => [...pre, url ]);
        audioChunkRef.current = [];
      }

      mediaRecorder.start();
      setRecordingStatus(true);
    }catch (err){
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = ()=>{
    if(mediaRecorderRef.current){
      mediaRecorderRef.current.stop();
      setRecordingStatus(false);
    }
  };

  return (
    <section className="main">
      <div className='header'>
        <h1>Record Audio  </h1>
      </div>
      <div className="recording-control">
        <div className="audio-anim">
          <p>
            {recordingStatus ? "Stop ->": "Record ->"} <span className='h1-span'>visualizer in progress</span>
          </p>
        </div>
        <div className={recordingStatus ? 'mic mic-recording': 'mic'} 
        onClick={recordingStatus? stopRecording :startRecording}>
          <i className="fa-solid fa-microphone"></i>
        </div>
      </div>
      <div className="audio-list">
        {audioURL.length === 0 && <p className='no-recordings'>No Recordings</p>}
        {audioURL?.map((url, i) => (
          <div className='audio' key={i}>
            <p>your audio</p>
            <audio src={url} controls />
          </div>
        ))}
      </div>
    </section>
  )
}

