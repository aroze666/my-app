const play = document.getElementById("play");
const pitch = document.getElementById("pitch");
const frequency = document.getElementById("display_pitch");
const notes = document.getElementsByClassName("note");
const harmony = document.getElementById("harmony");
const audioContext = new AudioContext();
const buffer = audioContext.createBuffer(
  1,
  audioContext.sampleRate * 1,
  audioContext.sampleRate
);
const channelData = buffer.getChannelData(0);
for (let i = 0; i < buffer.length; i++) {
  if (i % 2 == 0) {
    channelData[i] = Math.random() * 2 - 1;
  }
}

const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);
// const notes = {};

play.addEventListener("click", () => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.setValueAtTime(pitch.value, audioContext.currentTime);
  oscillator.connect(primaryGainControl);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1);
});
pitch.addEventListener("change", () => {
  frequency.innerHTML = "Frequency: " + pitch.value;
});

let playNote = [false, false, false, false];

for (let i = 0; i < 4; i++) {
  notes[i].addEventListener("change", (e) => {
    if (e.target.checked) {
      playNote[i] = true;
    } else {
      playNote[i] = false;
    }
  });
}

harmony.addEventListener("click", () => {
  for (let i = 0; i < 4; i++) {
    if (playNote[i]) {
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(
        playPitch(i),
        audioContext.currentTime
      );
      oscillator.connect(primaryGainControl);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    }
  }
});

function playPitch(num) {
  switch (num) {
    case 0:
      return 440;
    case 1:
      return 554.37;
    case 2:
      return 659.25;
    case 3:
      return 880;
  }
}
