import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useEffect, useRef, useState } from "react";

// Remove any other initialization code and just keep these
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meetingDetails, setMeetingDetails] = useState({
    meetingNumber: "",
    password: "",
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Update these configurations
  const authEndpoint = "https://meetingsdk-auth-endpoint-sample-production-b48b.up.railway.app/";
  const sdkKey = "bXCDgKajRuqACxyJcpQ8rQ";
  const meetingNumber = ""; // Will be filled by user input
  const role = 0;
  const userName = "EZNURTURE Assistant";
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "http://localhost:5173"; 

  // Add new state for meetings history
  const [meetingsHistory, setMeetingsHistory] = useState<{
    id: string;
    date: string;
    recording?: string;
    chat?: string[];
  }[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false // Explicitly disable video
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // More compatible format
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = []; // Reset chunks

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordingUrl(audioUrl);
        
        // Save to meetings history
        const meetingId = meetingDetails.meetingNumber;
        const currentDate = new Date().toLocaleString();
        
        setMeetingsHistory(prev => [...prev, {
          id: meetingId,
          date: currentDate,
          recording: audioUrl,
          chat: messages
        }]);

        // Save to localStorage
        localStorage.setItem(`meeting-${meetingId}-recording`, audioUrl);
        localStorage.setItem(`meeting-${meetingId}-chat`, JSON.stringify(messages));
      };

      mediaRecorder.start(1000); // Record in 1-second chunks
      setIsRecording(true);
      console.log("Recording started successfully");
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording. Please check microphone permissions.");
    }
  };

  const getSignature = async () => {
    try {
      console.log("Requesting signature for meeting:", meetingDetails.meetingNumber);
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingDetails.meetingNumber,
          role: role,
        }),
      });
      
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      
      const res = await req.json();
      console.log("Signature response:", res);
      
      if (!res.signature) {
        throw new Error("No signature received");
      }
      
      return res.signature;
    } catch (e) {
      console.error("Error getting signature:", e);
      throw e;
    }
  };

  const joinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);
    setError(null);

    try {
      const signature = await getSignature();
      document.getElementById("zmmtg-root")!.style.display = "block";

      ZoomMtg.init({
        leaveUrl: leaveUrl,
        patchJsMedia: true,
        success: () => {
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingDetails.meetingNumber,
            userName: userName,
            sdkKey: sdkKey,
            passWord: meetingDetails.password,
            success: async () => {
              console.log("Joined meeting successfully");
              await startRecording();
              setIsJoining(false);

              // Add event listeners using the correct method
              ZoomMtg.inMeetingServiceListener('onUserJoin', {
                callback: (data: any) => {
                  console.log('User joined:', data);
                }
              });

              ZoomMtg.inMeetingServiceListener('onUserLeave', {
                callback: (data: any) => {
                  console.log('User left:', data);
                  if (data.success && data.reason === 'leave') {
                    stopRecording();
                    saveMeetingData();
                  }
                }
              });

              // Listen for chat messages
              ZoomMtg.inMeetingServiceListener('onChatReceived', {
                callback: (data: any) => {
                  if (data && data.message) {
                    handleMessage(`${data.sender.name}: ${data.message}`);
                  }
                }
              });
            },
            error: (error: any) => {
              console.error("Failed to join meeting:", error);
              setIsJoining(false);
              setError("Failed to join meeting. Please check your details.");
              document.getElementById("zmmtg-root")!.style.display = "none";
            }
          });
        },
        error: (error: any) => {
          console.error("Failed to initialize Zoom:", error);
          setIsJoining(false);
          setError("Failed to initialize Zoom. Please try again.");
          document.getElementById("zmmtg-root")!.style.display = "none";
        }
      });
    } catch (error) {
      console.error("Error joining meeting:", error);
      setIsJoining(false);
      setError("Failed to join meeting. Please try again.");
    }
  };

  const handleMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
    // Save messages to local storage or your preferred storage method
    localStorage.setItem('meeting-messages', JSON.stringify(messages));
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDownloadRecording = (url?: string) => {
    const downloadUrl = url || recordingUrl;
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `meeting-recording-${Date.now()}.webm`;
      link.click();
    }
  };

  const handleDownloadChat = (chatMessages?: string[]) => {
    const chatContent = (chatMessages || messages).join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-chat-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Add function to save meeting data
  const saveMeetingData = () => {
    const meetingId = meetingDetails.meetingNumber;
    const currentDate = new Date().toLocaleString();
    
    const newMeeting = {
      id: meetingId,
      date: currentDate,
      recording: recordingUrl,
      chat: messages
    };

    setMeetingsHistory(prev => [...prev, newMeeting]);

    // Save to localStorage
    const existingHistory = JSON.parse(localStorage.getItem('meetingsHistory') || '[]');
    const updatedHistory = [...existingHistory, newMeeting];
    localStorage.setItem('meetingsHistory', JSON.stringify(updatedHistory));
  };

  // Load meeting history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('meetingsHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMeetingsHistory(parsedHistory);
      } catch (e) {
        console.error('Error loading meeting history:', e);
      }
    }
  }, []);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  // Add a meetings history component
  const MeetingsHistory = () => (
    <div className="meetings-history">
      <h3>Previous Meetings</h3>
      {meetingsHistory.map((meeting, index) => (
        <div key={index} className="meeting-record">
          <div className="meeting-info">
            <h4>Meeting ID: {meeting.id}</h4>
            <p>Date: {meeting.date}</p>
          </div>
          {meeting.recording && (
            <div className="meeting-recording">
              <h5>Recording</h5>
              <audio controls src={meeting.recording} />
              <button onClick={() => handleDownloadRecording(meeting.recording)}>
                Download Recording
              </button>
            </div>
          )}
          {meeting.chat && meeting.chat.length > 0 && (
            <div className="meeting-chat">
              <h5>Chat History</h5>
              <button onClick={() => handleDownloadChat(meeting.chat)}>
                Download Chat
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div id="zmmtg-root"></div>
      <div className="App">
        <main>
          <div className="agent-container">
            <div className="agent-header">
              <img 
                src="/eznurture-logo.png" 
                alt="EZNURTURE Logo" 
                className="logo"
              />
              <h1>EZNURTURE Meeting Assistant</h1>
            </div>

            {!isJoining ? (
              <>
                <div className="join-form">
                  <h2>Invite Assistant to Your Meeting</h2>
                  <p>Enter your Zoom meeting details below to add the EZNURTURE assistant to your meeting.</p>
                  <div className="important-note">
                    <strong>Important:</strong> Make sure to enable "Waiting Room" in your Zoom meeting settings.
                  </div>
                  
                  <form onSubmit={joinMeeting}>
                    <div className="form-group">
                      <label htmlFor="meetingNumber">Meeting ID:</label>
                      <input
                        type="text"
                        id="meetingNumber"
                        name="meetingNumber"
                        value={meetingDetails.meetingNumber}
                        onChange={(e) => setMeetingDetails(prev => ({
                          ...prev,
                          meetingNumber: e.target.value
                        }))}
                        placeholder="Enter Meeting ID"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Meeting Passcode:</label>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={meetingDetails.password}
                        onChange={(e) => setMeetingDetails(prev => ({
                          ...prev,
                          password: e.target.value
                        }))}
                        placeholder="Enter Meeting Passcode"
                        required
                      />
                    </div>

                    <button type="submit" className="join-button">
                      Add Assistant to Meeting
                    </button>
                  </form>

                  {error && (
                    <div className="error-message">
                      {error}
                      <button onClick={() => setError(null)}>✕</button>
                    </div>
                  )}

                  <div className="features">
                    <h3>Assistant Features:</h3>
                    <ul>
                      <li>✓ Automatic meeting recording</li>
                      <li>✓ Chat message logging</li>
                      <li>✓ Meeting transcription</li>
                      <li>✓ Secure data storage</li>
                    </ul>
                  </div>
                </div>
                
                {meetingsHistory.length > 0 && <MeetingsHistory />}
              </>
            ) : (
              <div className="joining-status">
                <div className="loader"></div>
                <h2>EZNURTURE Assistant is joining the meeting...</h2>
                <p>Please accept the join request in your Zoom meeting.</p>
                <p className="waiting-room-note">
                  If you have Waiting Room enabled, please admit the bot from the Participants panel.
                </p>
              </div>
            )}

            {isRecording && (
              <div className="recording-status">
                <div className="recording-indicator"></div>
                <span>Recording in progress...</span>
                <button 
                  onClick={stopRecording}
                  className="stop-recording"
                >
                  Stop Recording
                </button>
              </div>
            )}

            {recordingUrl && (
              <div className="recording-playback">
                <h3>Latest Recording</h3>
                <audio ref={audioPlayerRef} controls src={recordingUrl} />
                <button onClick={() => handleDownloadRecording(recordingUrl)} className="download-button">
                  Download Recording
                </button>
              </div>
            )}

            {messages.length > 0 && (
              <div className="chat-section">
                <div className="chat-header">
                  <h3>Meeting Chat</h3>
                  <button onClick={() => handleDownloadChat(messages)} className="download-button">
                    Download Chat
                  </button>
                </div>
                <div className="messages-list">
                  {messages.map((msg, index) => (
                    <div key={index} className="message">
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
