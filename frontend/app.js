// After deploying the backend, replace this URL with your Render service URL.
const API = window.FACE_API_URL || "http://localhost:8000";
const video=document.getElementById('video'), canvas=document.getElementById('canvas'), ctx=canvas.getContext('2d');
let stream=null;
function setStatus(x){document.getElementById('status').textContent=x}
async function startCamera(){try{stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480},facingMode:'user'},audio:false});video.srcObject=stream;setStatus('Camera ready ✓')}catch(e){setStatus('Camera permission/error: '+e.message)}}
function shot(){canvas.width=480;canvas.height=Math.round(480*video.videoHeight/video.videoWidth)||360;ctx.drawImage(video,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',0.65)}
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
async function capture(n,move=false){if(!stream) await startCamera();const arr=[];for(let i=0;i<n;i++){arr.push(shot());setStatus(`Capturing ${i+1}/${n}… ${move?'Move your head slightly':''}`);await wait(move?350:250)}return arr}
async function register(){const uid=document.getElementById('uid').value.trim(),name=document.getElementById('name').value.trim();if(!uid||!name)return alert('Enter User ID and full name.');const images=await capture(5);try{const r=await fetch(API+'/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:uid,name,images})});const d=await r.json();document.getElementById('result').textContent=JSON.stringify(d,null,2);setStatus(r.ok?'Registration complete ✓':'Registration failed')}catch(e){document.getElementById('result').textContent=e.message}}
async function unlock(){const images=await capture(8,true);try{const r=await fetch(API+'/authenticate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({images})});const d=await r.json();document.getElementById('result').textContent=JSON.stringify(d,null,2);setStatus(d.granted?'ACCESS GRANTED ✓':'ACCESS DENIED')}catch(e){document.getElementById('result').textContent=e.message}}
