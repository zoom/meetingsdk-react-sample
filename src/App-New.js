import React, { useState } from "react";

import "./App-New.css";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import { generateSignature, language } from "./utils";

function App() {
  const client = ZoomMtgEmbedded.createClient();

  const [meetingNumber, setMeetingNumber] = useState("00000000000");
  const [passWord, setPassword] = useState("12345678");
  const [userName, setUserName] = useState("zoom");

  const [lang, setLang] = useState("en-US");
  const [role, setRole] = useState("0");

  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";

  const sdkKey = "";
  const sdkSecret = "";

  async function getSignature(e) {
    e.preventDefault();

    if (userName === "") return alert(language[lang].set_username_message);
    if (meetingNumber === "") return alert(language[lang].set_meeting_id_message);
    if (passWord === "") return alert(language[lang].set_password_message);

    const signature = generateSignature(sdkKey, sdkSecret, meetingNumber, role);
    startMeeting(signature);
  }

  function startMeeting(signature) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client
      .init({
        zoomAppRoot: meetingSDKElement,
        language: lang,
        patchJsMedia: true,
        customize: {
          video: {
            defaultViewType: "gallery",
          },
        },
      })
      .then(() => {
        client
          .join({
            signature: signature,
            sdkKey: sdkKey,
            meetingNumber: meetingNumber,
            password: passWord,
            userName: userName,
            userEmail: userEmail,
            tk: registrantToken,
            zak: zakToken,
          })
          .then(() => {
            console.log("joined successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main id="home">
      <h1 className="title">Zoom Meeting SDK React sample</h1>

      <div id="container">
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

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
      </div>
    </main>
  );
}

export default App;
