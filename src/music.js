const play = document.getElementById("play");
const pitch = document.getElementById("pitch");

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
