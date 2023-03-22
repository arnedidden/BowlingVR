let frame = 1;
let score = 0;
let pins = 10;
let frames = [];

function rollBall() {
  let pinsHit = Math.floor(Math.random() * (pins + 1));
  pins -= pinsHit;
  score += pinsHit;
  console.log(`Rolled a ${pinsHit}!`);

  if (pins === 0) {
    frames.push(score);
    score = 0;
    pins = 10;
    frame++;
    console.log('Strike!');
  }

  if (frame === 11) {
    console.log('Game over!');
    console.log(`Final score: ${frames.reduce((total, current) => total + current, 0)}`);
    return;
  }

  console.log(`Pins left: ${pins}`);
  console.log(`Score: ${score}`);
  console.log(`Frame: ${frame}`);

  setTimeout(rollBall, 1000);
}

rollBall();
