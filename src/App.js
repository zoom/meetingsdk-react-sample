import { useState } from "react";

import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";
import { generateSignature, language } from "./utils";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {

  const [meetingNumber, setMeetingNumber] = useState("00000000000");
  const [passWord, setPassword] = useState("12345678");
  const [userName, setUserName] = useState("zoom");

  const [lang, setLang] = useState("en-US");
  const [role, setRole] = useState("0");

  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "http://localhost:3000"

  const sdkKey = ""
  const sdkSecret = ""

  async function getSignature(e) {
    e.preventDefault();

    await ZoomMtg.i18n.load(lang);

    if (userName === "") return alert(language[lang].set_username_message);
    if (meetingNumber === "") return alert(language[lang].set_meeting_id_message);
    if (passWord === "") return alert(language[lang].set_password_message);

    const signature = generateSignature(sdkKey, sdkSecret, meetingNumber, role);
    startMeeting(signature);
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block"

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <main id="home">
      <h1 className="title">Zoom Meeting SDK React sample</h1>

      <div id="form">
        <span>{language[lang].language}</span>
        <select
          name="ml"
          id="ml"
          value={lang}
          onChange={(e) => setLang(e.currentTarget.value)}
        >
          <option value="de-DE">German | Deutsch</option>
          <option value="es-ES">Spanish | Español</option>
          <option value="en-US">English | English</option>
          <option value="fr-FR">French | Français</option>
          <option value="jp-JP">Japanese | 日本語</option>
          <option value="pt-PT">Portuguese | Português</option>
          <option value="ru-RU">Russian | Русский</option>
          <option value="zh-CN">Simplified Chinese | 简体中文</option>
          <option value="zh-TW">Traditional Chinese | 繁體中文</option>
          <option value="ko-KO">Korean | 한국어</option>
          <option value="vi-VN">Vietnamese | Tiếng Việt</option>
          <option value="it-IT">Italian | Italiano</option>
          <option value="id-ID">Indonesian | Bahasa Indonesia</option>
          <option value="nl-NL">Dutch | Nederlands</option>
        </select>

        <span>{language[lang].name}</span>
        <input
          type="text"
          name="mun"
          id="mun"
          placeholder="⚠️"
          value={userName}
          onInput={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />

        <span>{language[lang].meeting_id}</span>
        <input
          type="number"
          name="mid"
          id="mid"
          placeholder="000 000 0000"
          value={meetingNumber}
          onInput={(e) => {
            setMeetingNumber(e.currentTarget.value);
          }}
        />

        <span>{language[lang].password}</span>
        <input
          type="password"
          name="mpass"
          id="mpass"
          placeholder="**********"
          value={passWord}
          onInput={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />

        <span>{language[lang].role}</span>
        <select
          name="ml"
          id="ml"
          value={role}
          onChange={(e) => setRole(e.currentTarget.value)}
        >
          <option value="0">{language[lang].participant}</option>
          <option value="1">{language[lang].host}</option>
        </select>

        <button id="btn" onClick={getSignature}>
          {language[lang].join}
        </button>
      </div>
    </main>
  );
}

export default App;
