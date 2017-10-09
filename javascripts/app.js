// Rover Object Goes Here
// ======================
const rover = {
  x: 0,
  y: 0,
  facingDirection: 'N',
  travelLog: [],
  printMovement(movement) {
    console.log(`Rover moves ${movement}, it's position is (${this.x}, ${this.y})`);
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
    window.updateMap();
  },
  move(direction) {
    let nextX = this.x;
    let nextY = this.y;
    switch (direction) {
      case 'forward':
        if (this.facingDirection === 'N' && this.y > 0) {
          nextY -= 1;
        }
        if (this.facingDirection === 'S' && this.y < 9) {
          nextY += 1;
        }
        if (this.facingDirection === 'E' && this.x < 9) {
          nextX += 1;
        }
        if (this.facingDirection === 'W' && this.x > 0) {
          nextX -= 1;
        }
        break;
      case 'backwards':
        if (this.facingDirection === 'S' && this.y > 0) {
          nextY -= 1;
        }
        if (this.facingDirection === 'N' && this.y < 9) {
          nextY += 1;
        }
        if (this.facingDirection === 'W' && this.x < 9) {
          nextX += 1;
        }
        if (this.facingDirection === 'E' && this.x > 0) {
          nextX -= 1;
        }
        break;
      default:
    }
    if (!(collisionDetection(nextX, nextY))) {
      this.x = nextX;
      this.y = nextY;
      this.travelLog.push([`(x:${this.x}, y:${this.y})`]);
      this.printMovement(direction);
      window.updateTravelLog();
      window.updateMap();
    } else {
      console.log('OBSTACLE ENCOUNTERED!');
    }
  },
};
//
// MAP
//
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

const mapDiv = document.getElementById('map');
const roverDiv = document.createElement('div');
const tileSize = 62;
roverDiv.id = 'rover';
mapDiv.appendChild(roverDiv);

marsMap.forEach((el) => {
  el.forEach(() => {
    const newDiv = document.createElement('div');
    mapDiv.appendChild(newDiv);
  });
});

function updateMap() {
  // MOVE
  roverDiv.style.left = `${rover.x * tileSize}px`;
  roverDiv.style.top = `${rover.y * tileSize}px`;
  // TURN
  switch (rover.facingDirection) {
    case 'E':
      roverDiv.style.transform = 'rotate(90deg)';
      break;
    case 'S':
      roverDiv.style.transform = 'rotate(180deg)';
      break;
    case 'W':
      roverDiv.style.transform = 'rotate(270deg)';
      break;
    case 'N':
      roverDiv.style.transform = 'rotate(360deg)';
      break;
    default:
  }
}
//
// OBSTACLES
//
const obstaclesArr = [[]];
(function generateObstacles() {
  for (let i = 0; i < 8; i += 1) {
    const randomnumberX = Math.ceil(Math.random() * 9);
    const randomnumberY = Math.ceil(Math.random() * 9);
    obstaclesArr[i] = [randomnumberX, randomnumberY];
    const obstacleDiv = document.createElement('span');
    obstacleDiv.classList.add('obstacle');
    obstacleDiv.style.left = `${obstaclesArr[i][0] * tileSize}px`;
    obstacleDiv.style.top = `${obstaclesArr[i][1] * tileSize}px`;
    mapDiv.appendChild(obstacleDiv);
  }
  // console.log(obstaclesArr);
}());
//
// UPDATE TRAVELLOG
//
const travelLogList = document.getElementById('travel-log');
function updateTravelLog() {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = rover.travelLog[(rover.travelLog.length) - 1];
  travelLogList.appendChild(newListItem);
}
//
// SEND COMMANDS
//
const sendCommandsBtn = document.getElementById('btn-send-commands');
const inputTextCommands = document.getElementById('input-text-commands');

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
        console.log('INVALID INPUT!');
    }
  });
}

function validateCommands(e) {
  e.preventDefault();
  const commands = inputTextCommands.value;
  const re = new RegExp(/^['f', 'r', 'l', 'b']+$/);
  if (!commands) {
    console.log('Input field is empty!');
  } else if (commands.match(re)) {
    sendCommands(commands);
    inputTextCommands.value = '';
  } else {
    console.log('INVALID COMMAND!');
  }
}

sendCommandsBtn.addEventListener('click', validateCommands);
