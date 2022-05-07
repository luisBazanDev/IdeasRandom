const element = document.getElementById("timeline");

let time_seconds = -12;
let stage = "STARLINK";

const drawCanvas = () => {
  const ctx = element.getContext("2d");
  const width = element.width;
  const height = element.height;

  console.log(width, height);

  ctx.clearRect(0, 0, width, height);

  // Text Background
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    width * 1.2,
    width - 45,
    width - 45,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.stroke();

  // Border
  ctx.beginPath();
  ctx.strokeStyle = "#4f4f4f";
  ctx.lineWidth = 4;
  ctx.arc(width / 2, width * 1.2, width, 0, parseHexRad(360), false);
  ctx.stroke();

  // Progress
  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  ctx.arc(width / 2, width * 1.2, width, 0, parseHexRad(270), false);
  ctx.stroke();

  // Time
  ctx.fillStyle = "#fff";
  ctx.font = "44px Arial";
  let text = `T${time_seconds < 0 ? "- " : "+ "}`;
  text += formatTime(Math.floor(Math.abs(time_seconds) / (60 * 60)) % 24) + ":"; // Hours
  text += formatTime(Math.floor(Math.abs(time_seconds) / 60) % 60) + ":"; // Minutes
  text += formatTime(Math.abs(time_seconds) % 60); // Secconds
  ctx.fillText(text, width / 2 - (text.length / 2) * 22, 350);

  // Stage
  ctx.fillStyle = "#aaa";
  ctx.font = "25px Arial";
  ctx.fillText(stage, width / 2 - (stage.length / 2) * 15, 390);
};

const parseHexRad = (hex) => {
  return (hex / 180) * Math.PI;
};

const formatTime = (time) => {
  return time >= 10 ? time : "0" + time;
};

setInterval(() => {
  time_seconds++;
  drawCanvas();
}, 1000);

drawCanvas();


/*
 Esto fue solo una prueba que queria hacer,
 porque no sabia usar canvas api entonces asi aprendi
 like y suscribete :D !

 $ git push origin master

 Parte 2?
*/