# subpoly
a WebAudio subtractive, polyphonic synthesizer

### create a synth
```
var audioCtx = new AudioContext();
var synth = new Polysynth(audioCtx);
```

### play a note
`synth.voices[i].start();`

### stop playing
`synth.voices[i].stop();`

### play all notes
`synth.start();`

### stop all notes
`synth.stop();`

### change the volume, attack duration, frequency, waveform for a voice...
```
synth.voices[i].maxGain = 0.5;        // out of 1
synth.voices[i].attack = 1.0;         // in seconds
synth.voices[i].pitch(440);           // in hertz
synth.voices[i].waveform('sawtooth'); // or sine, triangle, square
```

### or all at once...
```
synth.maxGain(0.5);         // out of 1
synth.attack(1.0);          // in seconds
synth.pitch(440);           // in hertz
synth.waveform('sawtooth'); // or sine, triangle, square
```

### set the stereo width
`synth.width(1.0); // out of 1`

### configure any or all the properties on initialization
```
var config = {
  waveform: 'sawtooth', // or sine, triangle, square
  pitch: 440,           // in hertz
  maxGain: 0.5,         // out of 1
  attack: 0.1,          // in seconds
  decay: 0.0,           // in seconds
  sustain: 1.0,         // out of 1
  release: 0.8,         // in seconds
  stereoWidth: 0.5,     // out of 1
  numVoices: 5,         // unlimited
  cutoff: {
    maxFrequency: 7500, // in hertz
    attack: 0.1,        // in seconds
    decay: 2.5,         // in seconds
    sustain: 0.2        // 0-5; maxFrequency multiplied by this
  }
};

var synth = new Polysynth(audioCtx, config);
```

### demo
[musical typing](http://okaybenji.github.io/web-synth/)
