const element = document.getElementById("timeline");

let time_seconds = -5;
let stage = "STARLINK";

const events = [
  {
    time: 0,
    name: "STARTUP",
    up: false,
  },
  {
    time: 30,
    name: "LITOFF",
    up: true,
  },
  {
    time: 80,
    name: "MAX-Q",
    up: false,
  },
  {
    time: 150,
    name: "MECO",
    up: true,
  },
  {
    time: 175,
    name: "FAIRING",
    up: false,
  },
  {
    time: 450,
    name: "AWS",
    up: true,
  },
];

const drawCanvas = () => {
  const ctx = element.getContext("2d");
  const width = element.width;
  const height = element.height;

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
  ctx.arc(width / 2, width * 1.2, width, 0, parseHexRad(300), false);
  ctx.stroke();

  // Progress
  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  ctx.arc(width / 2, width * 1.2, width, 0, parseHexRad(270), false);
  ctx.stroke();

  // Time
  ctx.textAlign = "start";
  ctx.fillStyle = "#fff";
  ctx.font = "40px Poppins";
  let text = `T${time_seconds < 0 ? "- " : "+ "}`;
  text += formatTime(Math.floor(Math.abs(time_seconds) / (60 * 60)) % 24) + ":"; // Hours
  text += formatTime(Math.floor(Math.abs(time_seconds) / 60) % 60) + ":"; // Minutes
  text += formatTime(Math.abs(time_seconds) % 60); // Secconds
  ctx.fillText(text, width / 2 - (text.length / 2) * 20, 350);

  // Stage
  ctx.fillStyle = "#aaa";
  ctx.font = "25px Poppins";
  ctx.fillText(stage, width / 2 - (stage.length / 2) * 15, 390);

  printPoints({
    ctx,
    time: time_seconds,
    width,
    height,
    radius: 2,
  });
};

const printPoints = ({ ctx, time, height, width, radius }) => {
  const lapse = 60 * 9;
  for (const event of events) {
    if (time - event.time > lapse / 2 || event.time - time > lapse / 2)
      continue;
    const relativeTime = event.time - time;
    const x = map_range(lapse / 2 + relativeTime, 0, lapse, 0, width);
    const y_angle = map_range(lapse / 2 + relativeTime, 0, lapse, 240, 300);
    const y = width * 1.2 + Math.sin(parseHexRad(y_angle)) * width;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    if (event.up) {
      ctx.lineTo(
        x + Math.cos(parseHexRad(y_angle)) * 13,
        y + Math.sin(parseHexRad(y_angle)) * 13
      );

      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "10px Poppins";
      ctx.fillText(
        event.name,
        x + Math.cos(parseHexRad(y_angle)) * 20,
        y + Math.sin(parseHexRad(y_angle)) * 20
      );
    } else {
      ctx.lineTo(
        x - Math.cos(parseHexRad(y_angle)) * 13,
        y - Math.sin(parseHexRad(y_angle)) * 13
      );

      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "12px Poppins";
      ctx.fillText(
        event.name,
        x - Math.cos(parseHexRad(y_angle)) * 26,
        y - Math.sin(parseHexRad(y_angle)) * 26
      );
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#000";
    ctx.lineWidth = 2;
    ctx.arc(x, y, 8, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    if (lapse / 2 + relativeTime <= lapse / 2) {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    // console.log(x, y, height, Math.sin(y_angle));
  }
};

const parseHexRad = (hex) => {
  return (hex / 180) * Math.PI;
};

const formatTime = (time) => {
  return time >= 10 ? time : "0" + time;
};

setInterval(() => {
  drawCanvas();
}, 1000 / 60);

setInterval(() => {
  time_seconds++;
  for (const event of events) {
    if (time_seconds >= event.time) stage = event.name;
  }
}, 1000);

drawCanvas();

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

/*
 Esto fue solo una prueba que queria hacer,
 porque no sabia usar canvas api entonces asi aprendi
 like y suscribete :D !

 $ git push origin master

 Parte 2?
*/
