/*
  THIS IS MUSIC FOR MACHINES
  Grimes - Music 4 Machines
  cover by kaixi
*/

// the song should be 135 beats per minute, in 4/4 time
// 1 beat = 1 quarter note
// 4 quarter notes = 1 measure = 1 "cycle"
// 135 quarter notes per minute = 135/4 cycles per min
let cpm = 135/4;

// load in the vocals
// these are just from the original song by grimes ai
samples({
  vox: 'vox_chorus.wav',
}, 'https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/');

let drums = stack(
  // when you do sound() you are writing what goes in one cycle (measure)
  // you can write 4 quarter notes for the cycle like so:
  // sound("bd bd bd bd").bank("RolandTR909"),
  // or just writing it once and multiplying by 4
  // sound("<bd>*4").bank("RolandTR909"),
  // alternate between the sound and a rest using a '-'
  // sound("<- sd:10>*4").bank("RolandTR909"),
  // you could combine these like this
  // and layer a clap
  sound(`
    <bd>*4,
    <- sd>*4,
    <- cp:3>*4
  `).bank("RolandTR909"),
  // add a hihat on the off beat (8th note)
  sound("<- hh>*8").bank("LinnDrum").gain(.2),
  // add a shaker on every 8th note
  sound("<sh>*8").bank("RolandTR808").gain(.25)
);

// you can concatenate cycles to change up the notes on each measure
let bass = cat(
  "<c2>*4",
  "<g1>*4",
  // use flats with b and sharps with #
  "<eb1>*4",
  // !n will repeat the note n times
  // this is equivalent to "<eb1 eb1 f1 f1>*4"
  "<eb1!2 f1!2>*4",
  "<c2>*4",
  "<g1!2 bb1!2>*4",
  "<eb1>*4",
  "<f1>*4"
).note()
  .n(3).sound("gm_synth_bass_1")
  // use effects to modify a sound
  // low pass filter allows low frequencies to pass through
  .lpf(200).lpenv(5).lpa(.5).lps(.8).lpd(.1);

// you can also write notes based on a scale
// let scaleExample = cat(
//   "<3>*4",
//   "<0>*4",
//   "<-2>*4",
//   "<-2!2 -1!2>*4",
//   "<3>*4",
//   "<0!2 2!2>*4",
//   "<-2>*4",
//   "<-1!2>*4",
// ).n()
//   .scale("G:minor")
//   // lower by 2 octaves
//   .scaleTranspose(-7 * 2)
//   .n(3)
//   .sound("gm_synth_bass_1")
//   .lpf(200).lpenv(5).lpa(.5).lps(.8).lpd(.1);

let synth_arpeggio = cat(
  "<c3 c4 eb5 c3 c4 d5 c3 bb4>*8",
  "<g2 g3 bb4 g2 g3 a4 g2 g4>*8",
  "<eb2 eb3 g4 eb2 eb3 f4 eb2 g4>*8",
  "<eb2 eb3 g4 eb2 eb3 f4 f2 g4>*8",
  "<c3 c4 eb5 c3 c4 d5 c3 bb4>*8",
  "<g2 g3 bb4 g2 bb4 c5 bb2 g4>*8",
  "<eb2 eb3 g4 eb2 eb3 f4 eb2 g4>*8",
  "<f2 f3 g4 f2 f3 a4 f2 a4>*8",
).note()
  .n(1).sound("gm_pad_poly")
  .decay(.95).lpf(5000).lpenv(-3).lpa(.2)
  // add delay & reverb for an echo effect
  // format delay as "level:time:feedback"
  // delay level: relative volume (0 - 1)
  // delay time: in seconds
  // delay feedback: amt fed back into delay (0 - 1)
  .delay(".3:.225:.45")
  // room: reverb volume
  // rsize: reverb size
  .room(.8).rsize(2);

let synth_bass = cat(
  "<c3 c4 - c3 c4 - c3 ->*8",
  "<g2 g3 - g2 g3 - g2 ->*8",
  "<eb2 eb3 - eb2 eb3 - eb2 ->*8",
  "<eb2 eb3 - eb2 eb3 - f2 ->*8",
  "<c3 c4 - c3 c4 - c3 ->*8",
  "<g2 g3 - g2 g3 - bb2 ->*8",
  "<eb2 eb3 - eb2 eb3 - eb2 ->*8",
  "<f2 f3 - f2 f3 - f2 ->*8"
).note()
  .n(0).sound("gm_synth_bass_1")
  .attack(.1).decay(.25).release(.25)
  .lpf(2250).lpenv(2).lpa(.03).lpr(.2).lpd(.3)
  .gain(.5);

let synth_lead = cat(
  "<- - eb5 - - d5 - bb4>*8",
  "<- - bb4 - - a4 - g4>*8",
  "<- - g4 - - f4 - g4>*8",
  "<- - g4 - - f4 - g4>*8",
  "<- - eb5 - - d5 - bb4>*8",
  "<- - bb4 - bb4 c5 - g4>*8",
  "<- - g4 - - f4 - g4>*8",
  "<- - g4 - - a4 - a4>*8",
).note()
  .n(1).sound("gm_pad_metallic")
  .decay(.95).delay(".3:.225:.45")
  .room(.4).rsize(2).gain(.6);

// use custom samples based on the name you assigned them earlier
let intro_vocals = s("vox").room(.3).rsize(2);

// modify when the sample begins and ends
// this sample has 4 lines and we want the first one
// so start at 0 and cut it just after 1/4
let vocals01 = s("vox").begin(0).end(.25 + (.25 * .25 * .5))
  .attack(.25).delay(".25:.45:.4").room(.2).rsize(2);
// start the second one at 1/4 and cut it just after 2/4
let vocals02 = s("vox").begin(.25).end(.5 + (.25 * .25 * .5))
  .attack(.25).delay(".25:.45:.4").room(.2).rsize(2);

// create sections to divide up your song
let section00 = stack(
  intro_vocals.mask("<1 0 0 0 0 0 0 0>")
);

let section01 = stack(
  drums,
  bass,
  synth_arpeggio,
  synth_bass,
  synth_lead
);

let section02 = stack(
  drums,
  bass,
  synth_arpeggio,
  synth_bass,
  synth_lead,
  vocals01.mask("<1 0 0 0 0 0 0 0>"),
  vocals02.mask("<0 0 0 0 1 0 0 0>")
);

let end = stack(
  vocals01.mask("<1 0 0 0 0 0 0 0>")
);

// arrange the number of cycles for each section
arrange (
  [8, section00],
  [8, section01],
  [8, section02],
  [8, end]
).cpm(cpm);
