const socket = io();

let typed = document.getElementById("txb");
let btn = document.getElementById("temp");
let msg = document.getElementsByTagName("right");
let rep=document.getElementsByTagName("left")
let txtarea=document.getElementsByTagName("textarea");

btn.addEventListener("click",sendMsg);
txtarea[0].addEventListener("keypress",(event)=>{
  if(event.key==="Enter")
  {
    event.preventDefault();
    btn.click();
  }
})

socket.on("details", (e) => {
  let det = document.getElementsByTagName("name")[0].innerText;
  console.log(det);
    socket.broadcast.emit("details", det);
});

   
socket.on("reply", (reply) => {
  let para = document.createElement("recv");
  para.innerText = reply;
  rep[0].appendChild(para);
});

function sendMsg()
{
  const data = typed.value;
  if (data.length > 0) {
    let para = document.createElement("send");
    para.innerText = data;
    msg[0].appendChild(para);

    socket.emit("chatMessage", data);
    typed.value = "";
  }
}