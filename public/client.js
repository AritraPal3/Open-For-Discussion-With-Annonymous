const socket = io("/");

let typed = document.getElementById("txb");
let btn = document.getElementById("temp");
let resp = document.getElementsByClassName("log");
//let msg = document.getElementsByClassName("right");
let rep = document.getElementsByClassName("left");
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
  let para = document.createElement("div");
  para.classList.add("recv")
  para.classList.add("left")
  para.textContent = reply;
  resp[0].appendChild(para);
  rep[0].appendChild(para);
});

function sendMsg() {
  const data = typed.value;
  if (data.length > 0) {
    let para = document.createElement("div");
    para.classList.add("send")
    para.classList.add("right")
    para.textContent = data;
    resp[0].appendChild(para);
    //msg[0].appendChild(para);
    //debugger;
    socket.emit("chatMessage", data);
    typed.value = "";
  }
}
