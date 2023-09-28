// background.js
let speaking = false;
let utterance = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'speak' && request.text && !speaking) {
    speakText(request.text);
  } else if (request.action === 'stop' && speaking) {
    window.speechSynthesis.cancel();
    speaking = false;
  }
});

function speakText(text) {
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
  speaking = true;
  utterance.onend = function() {
    speaking = false;
  };
}
