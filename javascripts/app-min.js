// Rover Object Goes Here
// ======================
const rover = {
  x: 0,
  y: 0,
  facingDirection: 'N',
  travelLog: [],
  printTravelLog() {
    console.log(`travelLog is updated: ${this.travelLog}`);
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
    console.log(this.facingDirection);
  },
  move(direction) {
    switch (direction) {
      case 'forward':
        if (this.facingDirection === 'N') {
          this.y -= 1;
          // Check if out of bounds
          this.travelLog.push([`(${this.x}, ${this.y})`]);

          console.log(`rover moves forward, it's position is (${this.x}, ${this.y})`);
        }
        if (this.facingDirection === 'S') {
          this.y += 1;
          // Check if out of bounds
          console.log(this.y);
        }
        break;
      case 'backwards':
      // To do
        console.log(`rover moves backwards, it's position is (${this.x}, ${this.y})`);
        break;
      default:
    }
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
marsMap[9][0] = 'X';
console.log(marsMap);

function setRoverPosition(posX, posY) {
  marsMap[posX][posY] = 'X';
  console.log(`Mars rover is in coordinates: ${rover.x}, ${rover.y}`);
}
setRoverPosition(rover.x, rover.y);

// SEND COMMANDS

const sendCommandsBtn = document.getElementById('btn-send-commands');
const inputTextCommands = document.getElementById('input-text-commands');

function sendCommands(commands) {
  [...commands].forEach((char) => {
    if (char === 'f') {
      rover.move('forward');
    } else if (char === 'b') {
      rover.move('backwards');
    }
  });
  rover.printTravelLog();
}

function validateCommands() {
  const commands = inputTextCommands.value;
  const re = new RegExp(/^['f', 'r', 'l', 'b']+$/);
  if (!commands) {
    console.log('commands field is empty!');
  } else if (commands.match(re)) {
    sendCommands(commands);
  } else {
    console.log('invalid command!');
  }
}


sendCommandsBtn.addEventListener('click', validateCommands);


