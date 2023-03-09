import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBl7-5jUMaaCtXmH36M0pEEdsGO4h-Iu4s",
  authDomain: "webrtc-projects.firebaseapp.com",
  projectId: "webrtc-projects",
  storageBucket: "webrtc-projects.appspot.com",
  messagingSenderId: "359262462709",
  appId: "1:359262462709:web:91b33d517e4c0e0132dbbc"
};

const app = initializeApp(firebaseConfig);
const store = getFirestore(app)

const servers = {
  iceServers : [
    {
      urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
    }
  ],
  iceCandidatePoolSize: 10,
}
let pc = new  RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');

webcamButton,onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  remoteStrean = new MediaStream();

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    })

    webcamVideo.srcObject = localStream
    remoteVideo.srcObject = remoteStream
  }
}

callButton.onclick = async () => {
  const callDoc = firestore.collection('calls').doc();
  const offerCandidates = callDoc.collection('offerCandidates');
  const answerCandidates = callDoc.collection('answerCandidates');

  callInput.value = callDoc.id;

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  pc.onicecandidate = event => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  }

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  }

  await callDoc.set({ offer });

  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  })
}