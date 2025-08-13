import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
<<<<<<< master
  const authEndpoint = "https://zoom-meeting-sdk-auth-sample-rn55.onrender.com"; // http://localhost:4000
  const sdkKey = "31mTq8crR1awQ1k37phHoQ";
  const meetingNumber = "9083285683";
  const passWord = "280443";
  const role = 1;
=======
  const authEndpoint = ""; // http://localhost:4000
  const meetingNumber = "";
  const passWord = "";
  const role = 0;
>>>>>>> master
  const userName = "React";
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "https://bstef.github.io/thanks.html";

  const getSignature = async () => {
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

  function startMeeting(signature: string) {
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

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting on AWS Amplify</h1>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
