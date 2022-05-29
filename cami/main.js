const a = () => {
  console.log("a");
  const elem = document.getElementById("title");
  elem.innerHTML = "Ya sabía que era yo";
  elem.style.color = "red";
};
const b = () => {
  console.log("b");
  const elem = document.getElementById("b");
  const x = window.innerWidth - elem.offsetWidth;
  const y = window.innerHeight - elem.offsetHeight;
  elem.style.left = random(x) + "px";
  elem.style.top = random(y) + "px";
};

const random = (max) => {
  return Math.floor(Math.random() * max);
};
