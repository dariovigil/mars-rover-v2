function collisionDetection(objX, objY) {
  for (let i = 0; i < obstaclesArr.length; i += 1) {
    if (objX === obstaclesArr[i][0] && objY === obstaclesArr[i][1]) {
      return true;
    }
  }
  return false;
}
