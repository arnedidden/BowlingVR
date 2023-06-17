let frame = 1;
let score = 0;
let pins = 10;
let frames = [];

function rollBall() {
  let pinsHit = Math.floor(Math.random() * (pins + 1));
  pins -= pinsHit;
  score += pinsHit;
  console.log(`Rolled a ${pinsHit}!`);


  // EXTRA --- Strike is geïmplementeerd, maar als dit geen vereiste is kan deze achteraf nog worden weggehaald.
  // Wanneer het aantal overgebleven kegels na een worp 0 is, dan heb je een strike!
  if (pins === 0) {
    frames.push(score);
    score = 0;
    pins = 10;
    frame++;
    console.log('Strike!');
  }

  if (frame === 11) {
    console.log('Einde Spel!');
    console.log(`Eindscore: ${frames.reduce((total, current) => total + current, 0)}`);
    return;
  }

  console.log(`Aantal kegels over: ${pins}`);
  console.log(`Score: ${score}`);
  console.log(`Frame: ${frame}`);

  setTimeout(rollBall, 1000);
}

rollBall();
