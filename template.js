/*
  THIS IS MUSIC FOR MACHINES
  Grimes - Music 4 Machines
  TEMPLATE FILE
*/

// define the cycles per minute
let cpm = 135/4;

// define instruments here
let drums = stack(
  sound("bd bd bd bd").bank("RolandTR909"),
);

// define sections here
let section01 = stack(
  drums
);

// arrange the number of cycles for each section
arrange (
  [8, section01],
).cpm(cpm);
