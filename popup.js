let speaking = false;
let utterance = null;
let speechRate = 0.5; // Initial speech rate set to "slow"

function speakText() {
  const textToSpeak = document.getElementById('textToSpeak').value;
  if (textToSpeak) {
    if (speaking) {
      window.speechSynthesis.cancel();
      speaking = false;
    } else {
      utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      speaking = true;
      utterance.onend = function() {
        speaking = false;
      };
      window.speechSynthesis.speak(utterance);
    }
  }
}

document.getElementById('speakButton').addEventListener('click', speakText);

document.getElementById('stopButton').addEventListener('click', function() {
  if (speaking) {
    window.speechSynthesis.cancel();
    speaking = false;
  }
});

// Update speech rate when slider value changes
const rateSlider = document.getElementById('speechRate');
const rateValue = document.getElementById('rateValue');

rateSlider.addEventListener('input', function() {
  speechRate = parseFloat(rateSlider.value);
  rateValue.textContent = speechRate.toFixed(1);
  if (speaking) {
    utterance.rate = speechRate;
  }
});
