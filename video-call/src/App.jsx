import React, { useEffect, useRef } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function App() {
  const zpRef=useRef(null)

  const userID = "user"+Math.floor(Math.random()*1000); 
const userName = "react" + userID;
const appID = 1699384930;
const serverSecret = "d15fae78de5b6cf29718b9b695e0a959";
const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,null, userID, userName);
useEffect(()=>{
const zp = ZegoUIKitPrebuilt.create(TOKEN);
zpRef.current=zp
zp.addPlugins({ ZIM });
},[TOKEN])

function invite(callType) {
  const enteredUserID = prompt("Enter callee's userId");
  const enteredUserName = prompt("Enter callee's userName");

  if (!enteredUserID || !enteredUserName) {
    alert("Please enter both userId and userName.");
    return;
  }

  if (enteredUserID === userID) {
    alert("You cannot call yourself!");
    return;
  }

  const targetUser = {
    userID: enteredUserID,
    userName: enteredUserName
  };

  zpRef.current.sendCallInvitation({
    callees: [targetUser],
    callType,
    timeout: 60,
  })
  .then((res) => {
    console.warn("Call Invitation Sent:", res);
  })
  .catch((err) => {
    console.warn("Error Sending Call Invitation:", err);
  });
}

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center '>
      <div className='w-[500px] h-[400px] bg-[#0d1014] border-2 border-[#313030] flex flex-col items-center justify-center gap-[20px]'>
        <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>UserName:</span>{userName}</h2>
         <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>UserId:</span>{userID}</h2>
<button className='w-[200px] h-[50px] rounded-2xl bg-white text-black text-20px'onClick={()=>invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>Voice Call</button>
<button className='w-[200px] h-[50px] rounded-2xl bg-white text-black text-20px'onClick={()=>invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>Video Call</button>


      </div>
    </div>
  )
}

export default App
