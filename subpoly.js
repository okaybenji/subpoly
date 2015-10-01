/*!
 *  subpoly - a Web Audio subtractive polyphonic synthesizer
 *  (c) 2015 Benji Kay
 *  MIT License
 */

var Polysynth = function(audioCtx, config) {

  var synth = this;
  config = config || {};
  config.cutoff = config.cutoff || {};
  
  synth.audioCtx = audioCtx;
  synth.voices = [];

  //synth defaults
  var numVoices     = config.numVoices    || 16;
  synth.stereoWidth = config.stereoWidth  || 0.5; //out of 1

  for (var i = 0; i < numVoices; i++) {
    synth.voices.push(new Monosynth(audioCtx, config));
  }

  function init() {
    synth.width(synth.stereoWidth);
  }

  //initialize and export
  init();
  return synth;

};

//update synth stereo width
Polysynth.prototype.width = function width(newWidth) {
  var synth = this;
  if (newWidth) {
    synth.stereoWidth = newWidth;
    synth.voices.forEach(function(voice, i) {
      var spread = 1/(synth.voices.length - 1);
      var xPos = spread * i * synth.stereoWidth;
      var zPos = 1 - Math.abs(xPos);
      voice.pan.setPosition(xPos, 0, zPos);
    });
  }
  
  return this.stereoWidth;
};

//apply attack, decay, sustain envelope
Polysynth.prototype.start = function startSynth() {
  this.voices.forEach(function(voice) {
    voice.start();
  });
};

//apply release envelope
Polysynth.prototype.stop = function stopSynth() {
  this.voices.forEach(function(voice) {
    voice.stop();
  });
};