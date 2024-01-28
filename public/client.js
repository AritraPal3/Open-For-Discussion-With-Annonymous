const socket = io();
let typed = document.getElementById("txb");
let btn = document.getElementById("temp");
let msg = document.getElementsByClassName("msg");
let txtarea=document.getElementsByTagName("textarea");

btn.addEventListener("click",sendMsg);
txtarea[0].addEventListener("keypress",(event)=>{
  if(event.key==="Enter")
  {
    // event.preventDefault();
    btn.click();
  }
})

socket.on("details", (e) => {
  let det = document.getElementsByTagName("name")[0].innerText;
  console.log(det);
    socket.broadcast.emit("details", det);
});


socket.on("reply", (reply) => {
  let para = document.createElement("p");
  para.innerText = reply;
  msg[0].appendChild(para);
  para.classList.add("log");
});

function sendMsg()
{
  const data = typed.value;
  if (data.length > 0) {
    let para = document.createElement("p");
    para.innerText = data;
    msg[0].appendChild(para);
    para.classList.add("my");
    socket.emit("chatMessage", data);
    typed.value = "";
  }
}