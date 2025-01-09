import "./App.css";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import jsrsasign from 'jsrsasign';
import {useEffect, useState} from "react";

function App() {
  const client = ZoomMtgEmbedded.createClient();

  const authEndpoint = "http://localhost:4000"; // http://localhost:4000
  const sdkKey = import.meta.env.VITE_APP_CLIENT_ID_SDK;
  const secret = import.meta.env.VITE_APP_CLIENT_SECRET_SDK;
  const meetingNumber = import.meta.env.VITE_APP_MN;
  const passWord = import.meta.env.VITE_APP_PASSCODE;
  // const zakToken = import.meta.env.VITE_APP_ZAKTOKEN;
  const role = 1;
  const userName = "Dhilip";
  const userEmail = "dhilipkumar2005@gmail.com";
  const registrantToken = "";
  const [zakToken,setZakTok] = useState("");

  // const getSignature = async () => {
  //   try {
  //     const req = await fetch(authEndpoint, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         meetingNumber: meetingNumber,
  //         role: role,
  //       }),
  //     });
  //     const res = await req.json()
  //     const signature = res.signature as string;
  //     startMeeting(signature)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  async function getAccessToken(){
    try {
      const response = await fetch(`${authEndpoint}/get-access-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error("Failed to fetch access token");
        return;
      }
  
      const data = await response.json();
      console.log("Access Token:", data.access_token);
      ZakToken(data.access_token);
    } catch (e) {
      console.error("Error fetching access token:", e);
    }
  }
   
  async function ZakToken(access_token: string){
    try {
      const response = await fetch(`${authEndpoint}/zakToken`, {
        method: "POST",
        body:JSON.stringify({
          "accesstoken":`${access_token}`
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        console.error("Failed to fetch access token");
        return;
      }
  
      const data = await response.json();
      console.log(data.token);
      setZakTok(data.token);
    } catch (e) {
      console.log(e);
    }
  }

  function getSignature(sdkKey: string,secret: string,meetingNumber: number,role: number){
      const signature = generateSignature(sdkKey,secret,meetingNumber,role);
      if(signature){
        startMeeting(signature);
      }else{
        console.log("signature not Exist");
      }
    }
  
    function generateSignature(key: string, secret: string, meetingNumber: number, role: number) {
  
      const iat = Math.round(new Date().getTime() / 1000) - 30
      // const iat = new Date().getTime() - 30000
      console.log(iat)
      const exp = iat + 60 * 60 * 2
      const oHeader = { alg: 'HS256', typ: 'JWT' }
    
      const oPayload = {
        sdkKey: key,
        appKey: key,
        mn: meetingNumber,
        role: role,
        iat: iat,
        exp: exp,
        tokenExp: exp
      }
    
      const sHeader = JSON.stringify(oHeader)
      const sPayload = JSON.stringify(oPayload)
      const sdkJWT = jsrsasign.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, secret)
      console.log(sdkJWT);
      return sdkJWT
    }

  async function startMeeting(signature: string) {
    const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      })
      await client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
      })
      console.log("joined successfully");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAccessToken()
  },[])

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <button onClick={()=>getSignature(sdkKey,secret,meetingNumber,role)}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
