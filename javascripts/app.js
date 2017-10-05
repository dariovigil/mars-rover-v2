// Rover Object Goes Here
// ======================
const rover = {
  x: 5,
  y: 5,
  facingDirection: 'N',
  travelLog: [],
  printMovement(movement) {
    console.log(`Rover moves ${movement}, it's position is (${this.x}, ${this.y})`);
  },
  printTravelLog() {
    console.log(`TravelLog is updated: ${this.travelLog}`);
  },
  turn(turnDirection) {
    switch (turnDirection) {
      case 'left':
        if (this.facingDirection === 'N') {
          this.facingDirection = 'W';
        } else if (this.facingDirection === 'W') {
          this.facingDirection = 'S';
        } else if (this.facingDirection === 'S') {
          this.facingDirection = 'E';
        } else if (this.facingDirection === 'E') {
          this.facingDirection = 'N';
        }
        break;
      case 'right':
        if (this.facingDirection === 'N') {
          this.facingDirection = 'E';
        } else if (this.facingDirection === 'W') {
          this.facingDirection = 'N';
        } else if (this.facingDirection === 'S') {
          this.facingDirection = 'W';
        } else if (this.facingDirection === 'E') {
          this.facingDirection = 'S';
        }
        break;
      default:
        console.log('ERROR: The valid parameters are "left" or "right"');
    }
    console.log(`Mars rover has turned ${turnDirection}, now it is facing: ${this.facingDirection}`);
  },
  move(direction) {
    switch (direction) {
      case 'forward':
        if (this.facingDirection === 'N' && this.y > 0) {
          this.y -= 1;
        }
        if (this.facingDirection === 'S' && this.y < 9) {
          this.y += 1;
        }
        if (this.facingDirection === 'E' && this.x < 9) {
          this.x += 1;
        }
        if (this.facingDirection === 'W' && this.x > 0) {
          this.x -= 1;
        }
        break;
      case 'backwards':
      // To do
        console.log(`rover moves backwards, it's position is (${this.x}, ${this.y})`);
        break;
      default:
    }
    this.travelLog.push([`(${this.x}, ${this.y})`]);
    this.printMovement(direction);
    this.printTravelLog();
  },
};

// MAP

function createMap(rows, cols, defaultValue) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push([]);
    arr[i].push(new Array(cols));
    for (let j = 0; j < cols; j++) {
      arr[i][j] = defaultValue;
    }
  }
  return arr;
}
const marsMap = createMap(10, 10, '_');
marsMap[rover.x][rover.y] = 'X';
console.log(marsMap);

function setRoverPosition(posX, posY) {
  marsMap[posX][posY] = 'X';
  console.log(`Mars rover is in coordinates: ${rover.x}, ${rover.y}`);
  console.log(`Mars rover is facing: ${rover.facingDirection}`);
}
setRoverPosition(rover.x, rover.y);

// SEND COMMANDS

const sendCommandsBtn = document.getElementById('btn-send-commands');
const inputTextCommands = document.getElementById('input-text-commands');

// function sendCommands(commands) {
//   [...commands].forEach((char) => {
//     if (char === 'f') {
//       rover.move('forward');
//     } else if (char === 'b') {
//       rover.move('backwards');
//     }
//   });
//   rover.printTravelLog();
// }

function sendCommands(commands) {
  [...commands].forEach((char) => {
    switch (char) {
      case 'f':
        rover.move('forward');
        break;
      case 'b':
        rover.move('backwards');
        break;
      case 'r':
        rover.turn('right');
        break;
      case 'l':
        rover.turn('left');
        break;
      default:
        console.log('invalid input');
    }
  });
}

function validateCommands() {
  const commands = inputTextCommands.value;
  const re = new RegExp(/^['f', 'r', 'l', 'b']+$/);
  if (!commands) {
    console.log('Input field is empty!');
  } else if (commands.match(re)) {
    sendCommands(commands);
    inputTextCommands.value = '';
  } else {
    console.log('invalid command!');
  }
}


sendCommandsBtn.addEventListener('click', validateCommands);
