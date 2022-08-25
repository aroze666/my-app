const play = document.getElementById("play");
const pitch = document.getElementById("pitch");
const frequency = document.getElementById("display_pitch");
const notes = document.getElementsByClassName("note");
const harmony = document.getElementById("harmony");
const audioContext = new AudioContext();

//volume
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);

//play assigned frequency
play.addEventListener("click", () => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.setValueAtTime(pitch.value, audioContext.currentTime);
  oscillator.connect(primaryGainControl);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1);
});

//update slider value
pitch.addEventListener("change", () => {
  frequency.innerHTML = "Frequency: " + pitch.value;
});

//no note will be played by default
let playNote = [false, false, false, false];

//check if checkbox is checked
for (let i = 0; i < notes.length; i++) {
  notes[i].addEventListener("change", (e) => {
    if (e.target.checked) {
      playNote[i] = true;
    } else {
      playNote[i] = false;
    }
  });
}

//check which checkboxes are checked when play requested
harmony.addEventListener("click", () => {
  for (let i = 0; i < notes.length; i++) {
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

//return pitch by checkboxes
function playPitch(num) {
  switch (num) {
    case 0:
      return 440;
    case 1:
      return 880;
    case 2:
      return 660;
    case 3:
      return 586.67;
    case 4:
      return 733.33;
    case 5:
      return 550;
    case 6:
      return 704;
    case 7:
      return 528;
  }
}
