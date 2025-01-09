import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";
import jsrsasign from 'jsrsasign';
import { useEffect, useState } from "react";


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const authEndpoint = "http://localhost:4000"; // http://localhost:4000
  const sdkKey = import.meta.env.VITE_APP_CLIENT_ID_SDK;
  const secret = import.meta.env.VITE_APP_CLIENT_SECRET_SDK;
  const meetingNumber = import.meta.env.VITE_APP_MN;
  const passWord = import.meta.env.VITE_APP_PASSCODE;
  // const zakToken = import.meta.env.VITE_APP_ZAKTOKEN;
  const leaveUrl = import.meta.env.VITE_APP_LEAVEURL;
  const role = 0; //0 represents participant and 1 represents host
  const userName = "Dhilip";
  const userEmail = "dhilipkumar2005@gmail.com";
  const registrantToken = "";
  const [zakToken,setZakTok] = useState("");
  
 
   // need to generate based on meeting id - using - role by default 0 = javascript
  

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


  const getSignature_request = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json()
      const signature = res.signature as string;
      startMeeting(signature)
    } catch (e) {
      console.log(e);
    }
  };
  function getSignature(sdkKey: string,secret: string,meetingNumber: number,role: number){
    const signature = generateSignature(sdkKey,secret,meetingNumber,role);
    if(signature){
      startMeeting(signature);
    }else{
      console.log("signature doesn't exit");
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

  function startMeeting(signature: any) {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        // can this be async?
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
          },
          error: (error: unknown) => {
            console.log(error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  }


  useEffect(()=>{
    getAccessToken();
  },[])
  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button onClick={()=>getSignature(sdkKey,secret,meetingNumber,role)}>Join Meeting</button>
        <button onClick={getSignature_request}>Join Meeting (Backend Request)</button>
      </main>
    </div>
  );
}

export default App;
