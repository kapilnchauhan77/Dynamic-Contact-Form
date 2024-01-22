const heygen_API = {
  "apiKey": "MDkwMzA3ZTQ5YTY4NGY3M2EzYTU5Njk5OTU5ZmZlMWEtMTcwNTUwMDIxMg==",
  "serverUrl": "https://api.heygen.com"
}

const apiKey = heygen_API.apiKey;
const SERVER_URL = heygen_API.serverUrl;

if (apiKey === "YourApiKey" || SERVER_URL === "") {
  alert("Please enter your API key and server URL in the api.json file");
}

let sessionInfo:any = null;
let peerConnection:any = null;



function onMessage(event: any) {
  const message = event.data;
  console.log("Received message:", message);
}

// Create a new WebRTC session when clicking the "New" button
export const createNewSession = async(setVideoURL: any) => {

  const avatar = "";
  const voice = "";

  // call the new interface to get the server's offer SDP and ICE server to create a new RTCPeerConnection
  sessionInfo = localStorage.getItem("sessionInfo")
  if (sessionInfo == null) {
      sessionInfo = await newSession("high", avatar, voice);
      localStorage.setItem("sessionInfo", sessionInfo)
  }
  const { sdp: serverSdp, ice_servers2: iceServers } = sessionInfo;

  // Create a new RTCPeerConnection
  peerConnection = new RTCPeerConnection({ iceServers: iceServers });

  // When ICE candidate is available, send to the server
  peerConnection.onicecandidate = ({ candidate }: { candidate: any }) => {
    console.log("Received ICE candidate:", candidate);
    if (candidate) {
      handleICE(sessionInfo.session_id, candidate.toJSON());
    }
  };

  // When ICE connection state changes, display the new state
  peerConnection.oniceconnectionstatechange = (event: any) => {
      console.log(event)
  };

  // When audio and video streams are received, display them in the video element
  peerConnection.ontrack = (event: any) => {
    console.log("Received the track");
    if (event.track.kind === "audio" || event.track.kind === "video") {
        console.log("track event")
        console.log(event)
      setVideoURL(event.streams[0])
      // setVideoURL("https://media.w3.org/2010/05/sintel/trailer_hd.mp4")
    }
  };

    // When receiving a message, display it in the status element
  peerConnection.ondatachannel = (event:any) => {
    const dataChannel = event.channel;
    dataChannel.onmessage = onMessage;
  };

  // Set server's SDP as remote description
  const remoteDescription = new RTCSessionDescription(serverSdp);
  await peerConnection.setRemoteDescription(remoteDescription);

}

// Start session and display audio and video when clicking the "Start" button
export const startAndDisplaySession = async () => {
  if (!sessionInfo) {
    return;
  }


  // Create and set local SDP description
  const localDescription = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(localDescription);

  // Start session
  await startSession(sessionInfo.session_id, localDescription);
}


// When clicking the "Send Task" button, get the content from the input field, then send the tas
export const talkHandler = async (text: string) => {
  if (!sessionInfo) {

    return;
  }

  const resp = await talk(sessionInfo.session_id, text);
  console.log(resp)

}


// when clicking the "Close" button, close the connection
export const closeConnectionHandler = async() => {
  if (!sessionInfo) {
    return;
  }
  try {
    // Close local connection
    peerConnection.close();
    // Call the close interface
    const resp = await stopSession(sessionInfo.session_id);

    console.log(resp);
  } catch (err) {
    console.error("Failed to close the connection:", err);
  }
}


// new session
async function newSession(quality: string, avatar_name: string, voice_id: string) {
    if (sessionInfo){
        return sessionInfo
    }
    console.log(apiKey)
    console.log(quality)
    console.log(avatar_name)
    console.log("voice_id")
    console.log(voice_id)
  const response = await fetch(`${SERVER_URL}/v1/realtime.new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
      body: JSON.stringify({ "quality": "low" }),
  });
  if (response.status === 500) {
    console.error("Server error");

    throw new Error("Server error");
  }
  else if (response.status === 400) {
    console.log("error 400")
    // Close local connection
    peerConnection.close();
    // Call the close interface
    const resp = await stopSession(sessionInfo.session_id);

    console.log(resp);
    const data: any = await newSession("high", '', '');
    return data
  } else {
    const data = await response.json();
    console.log(data.data);
    return data.data;
  }
}

// start the session
async function startSession(session_id: string, sdp: string) {
  const response = await fetch(`${SERVER_URL}/v1/realtime.start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ session_id, sdp }),
  });
  if (response.status === 500) {
    console.error("Server error");
    throw new Error("Server error");
  } else {
    const data = await response.json();
    return data.data;
  }
}

// submit the ICE candidate
async function handleICE(session_id: any, candidate: any) {
  const response = await fetch(`${SERVER_URL}/v1/realtime.ice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ session_id, candidate }),
  });
  if (response.status === 500) {
    console.error("Server error");
    throw new Error("Server error");
  } else {
    const data = await response.json();
    return data;
  }
}

async function talk(session_id: string, text: string) {
  const task_type = "talk";
  const response = await fetch(`${SERVER_URL}/v1/realtime.task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ session_id, text, task_type }),
  });
  if (response.status === 500) {
    console.error("Server error");
    throw new Error("Server error");
  } else {
    const data = await response.json();
    return data.data;
  }
}


// stop session
async function stopSession(session_id: any) {
  const response = await fetch(`${SERVER_URL}/v1/realtime.stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ session_id }),
  });
  if (response.status === 500) {
    console.error("Server error");
    throw new Error("Server error");
  } else {
    const data = await response.json();
    return data.data;
  }
}

