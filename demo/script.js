var audioCtx;
if (typeof AudioContext !== "undefined") {
  audioCtx = new AudioContext();
} else {
  audioCtx = new webkitAudioContext();
}

var synthConfig = {
  waveform: 'sawtooth',
  maxGain: 0.1,
  attack: 0.1,
  decay: 0.0,
  sustain: 1.0,
  release: 0.2,
  stereoWidth: 0.5,
  numVoices: 18,
  cutoff: {
    maxValue: 7500,
    attack: 0.2,
    decay: 0.2,
    sustain: 0.2
  }
};

var synth = new Polysynth(audioCtx, synthConfig);
synth.createSetters();

// get the frequency in hertz of a given piano key
function getFreq(keyNum) {
  return Math.pow(2, (keyNum-49)/12) * 440;
}

function getKeyColor(keyNum) {
  var scaleValue = (keyNum - 4) % 12;
  var keyColor;
  switch (scaleValue) {
    case 1:
    case 3:
    case 6:
    case 8:
    case 10:
      keyColor = 'black';
      break;
    default:
      keyColor = 'white';
  }

  return keyColor;
}

var leftOffset = 0;
var lastKeyColor = 'white';

synth.voices.forEach(function(voice, i) {
  var keyNum = i + 40;
  var keyColor = getKeyColor(keyNum);
  voice.pitch(getFreq(keyNum));

  var key = document.createElement('DIV');
  key.className = keyColor;

  if (keyColor === 'black') {
    leftOffset += 30;
  } else {
    if (lastKeyColor === 'black') {
      leftOffset += 20;
    } else {
      leftOffset += 50;
    }
  }
  lastKeyColor = keyColor;
  key.style.left = leftOffset + 'px';
  key.onmousedown = voice.start.bind(voice);
  key.onmouseup = voice.stop.bind(voice);
  document.body.appendChild(key);
});

function handleKey(eventType, voiceIndex) {
  switch (eventType) {
    case 'keydown':
      synth.voices[voiceIndex].start();
      break;
    case 'keyup':
      synth.voices[voiceIndex].stop();
      break;
  }
}

// allow playing instrument with computer keyboard
function handleKeyEvent(event) {
  if (!event.repeat) { // ignore repeat keystrokes when holding down keys
    switch (event.keyCode) {
      case 65: // A = key #40 C
        handleKey(event.type, 0);
        break;
      case 87:
        handleKey(event.type, 1);
        break;
      case 83:
        handleKey(event.type, 2);
        break;
      case 69:
        handleKey(event.type, 3);
        break;
      case 68:
        handleKey(event.type, 4);
        break;
      case 70:
        handleKey(event.type, 5);
        break;
      case 84:
        handleKey(event.type, 6);
        break;
      case 71:
        handleKey(event.type, 7);
        break;
      case 89:
        handleKey(event.type, 8);
        break;
      case 72:
        handleKey(event.type, 9);
        break;
      case 85:
        handleKey(event.type, 10);
        break;
      case 74:
        handleKey(event.type, 11);
        break;
      case 75:
        handleKey(event.type, 12);
        break;
      case 79:
        handleKey(event.type, 13);
        break;
      case 76:
        handleKey(event.type, 14);
        break;
      case 80:
        handleKey(event.type, 15);
        break;
      case 186:
        handleKey(event.type, 16);
        break;
      case 222:
        handleKey(event.type, 17);
        break;
    }
  }
}
  
document.addEventListener('keydown', handleKeyEvent); 
document.addEventListener('keyup', handleKeyEvent);