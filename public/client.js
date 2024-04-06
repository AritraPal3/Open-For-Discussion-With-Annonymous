const socket = io("/");

let typed = document.getElementById("txb");
let btn = document.getElementById("temp");
let msg = document.getElementsByTagName("right");
let rep = document.getElementsByTagName("left");
let txtarea = document.getElementsByTagName("textarea");

btn.addEventListener("click", sendMsg);
txtarea[0].addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
})

let det = document.getElementsByTagName("name")[0].innerText;
console.log(det);
socket.emit("details", det);

socket.on("chatMessage", (reply) => {
  let para = document.createElement("recv");
  para.textContent = reply;
  rep[0].appendChild(para);
});

function sendMsg() {
  const data = typed.value;
  if (data.length > 0) {
    let para = document.createElement("send");
    para.textContent = data;
    msg[0].appendChild(para);
    //debugger;
    socket.emit("chatMessage", data);
    typed.value = "";
  }
}
