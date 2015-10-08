# subpoly
A Web Audio subtractive, polyphonic synthesizer. Just need one voice? Check out [submono](https://github.com/okaybenji/submono)!

### Create a synth.
```
var audioCtx = new AudioContext();
var synth = new Polysynth(audioCtx);
```

**Your new `synth` has an array of [submono](https://github.com/okaybenji/submono) `voices` attached.**

### Play a note.
`synth.voices[i].start();`

### Stop playing.
`synth.voices[i].stop();`

### Play all voices.
`synth.start();`

### Stop all notes.
`synth.stop();`

### Use methods to access a voice's pitch and waveform...
```
synth.voices[i].pitch(440);              // in hertz
console.log(synth.voices[i].waveform()); // 'sawtooth'
```

### ...get or set any other properties directly.
```
synth.voices[i].maxGain = 0.5; // out of 1
synth.voices[i].attack = 1.0;  // in seconds
```

### Use methods to set any property for all voices at once.
```
synth.maxGain(0.5);         // out of 1
synth.attack(1.0);          // in seconds
synth.pitch(440);           // in hertz
synth.waveform('sawtooth'); // or sine, triangle, square
```

### Set the stereo width.
`synth.width(1.0); // out of 1`

### Configure any or all the properties on initialization.
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

### Demo
[musical typing](http://okaybenji.github.io/web-synth/)
