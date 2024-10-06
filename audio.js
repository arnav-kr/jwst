export default function initAudio() {
  let audio = new Audio('/assets/background.webm');
  audio.loop = true;
  audio.volume = 0.5;
  let playEl = document.getElementById("play");
  let pauseEl = document.getElementById("pause");
  audio.onplay = () => {
    playEl.classList.toggle("hidden", audio.paused);
    pauseEl.classList.toggle("hidden", !audio.paused);
  }
  audio.onpause = () => {
    playEl.classList.toggle("hidden", audio.paused);
    pauseEl.classList.toggle("hidden", !audio.paused);
  }
  document.getElementById("player-control").addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  return audio;
}