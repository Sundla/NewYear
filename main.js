let sx = 0, ex = 0, state = "none";
const overlay = document.getElementById('overlay');
const audio = document.getElementById('audio');
const song = document.getElementById('song');

document.addEventListener("touchstart", e => sx = e.changedTouches[0].screenX);
document.addEventListener("touchend", e => {
  ex = e.changedTouches[0].screenX;
  if (state === "none") {
    if (ex - sx > 60) open("audio");
    else if (sx - ex > 60) open("song");
  } else {
    if (Math.abs(ex - sx) > 60) closePanels();
  }
});

function open(p) {
  closePanels();
  document.getElementById(p).classList.add("active");
  overlay.style.display = "block";
  state = p;
}

function closePanels() {
  stopAll();
  audio.classList.remove("active");
  song.classList.remove("active");
  overlay.style.display = "none";
  state = "none";
}

function stopAll() {
  document.querySelectorAll("iframe").forEach(i => i.src = "");
  document.querySelectorAll(".videoBox").forEach(b => b.style.display = "none");
}

function play(id) {
  stopAll();
  let box = document.getElementById(id);
  box.style.display = "block";
  
  // Video ID mapping (clean embed URLs only)
  const videoMap = {
    // SONGS
    's1': '8iCxEzYcRRM',  // India Unravel
    's2': '8AmQ99-ZN2Y',  // Lo Lo
    's3': 'pGe2KQ30mYM',  // Blue Hawaii
    's4': 'xqQCOKOpbBw',  // Bink's Sake Hindi
    's5': 'WPDpgSBEWaI',  // Wasteland
    
    // AUDIOBOOKS
    'a1': 'K6JX649vEXo',  // Origin of Species
    'a2': 'Yb0T40VZUWc',  // The Prince
    'a3': 'QJJeHtJC52g',  // The Almanack of Ravikant
    'a4': '_8Ph6tJ3uwA',  // Meditations
    'a5': 'uPvcNp6Q4-8',  // Brothers Karamazov
    'a6': 'JZDKv8y4PKo',  // Brothers Karamazov 2
    'a7': 'UJDIvebdG8U',  // The Cthulhu Mythos
    'a8': 'I5UcyuiKYFI',  // Dhammapada
    'a9': 'WUW6cjZgi7Y',  // Das Kapital
    'a10': 'Bb70lU1fSbA'  // The Gay Science
  };
  
  if (videoMap[id]) {
    // Clean embed URL - no account info
    box.querySelector("iframe").src = "https://www.youtube.com/embed/" + videoMap[id] + "?autoplay=1";
  } else {
    box.querySelector("iframe").src = "";
  }
}

function rate(e, box) {
  let stars = [...box.children];
  let idx = stars.indexOf(e.target);
  stars.forEach((s, i) => s.classList.toggle("active", i <= idx));
}

function submit(btn) {
  btn.nextElementSibling.style.display = "block";
}