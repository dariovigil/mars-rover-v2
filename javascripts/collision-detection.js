// function collisionDetection(objX, objY) {
//   //return true;
//   //console.log(objX, objY);
//   //console.log(obstaclesArr);
//   obstaclesArr.forEach((obstacle) => {
//      console.log(obstacle[0]);
//      //console.log(objX);
//     if (objX === obstacle[0] && objY === obstacle[1]) {
//       console.log('collision');
//       return true;
//     }
//     return false;
//   });
// }

function collisionDetection(objX, objY) {
  for (let i = 0; i < obstaclesArr.length; i += 1) {
    if (objX === obstaclesArr[i][0] && objY === obstaclesArr[i][1]) {
      return true;
    }
  }
  return false;
}
// function collisionDetection(objX, objY) {
//   console.log(objX, objY);
//   console.log(obstaclesArr);
//   obstaclesArr.some((obstacle) => {
//     // console.log(obstacle[0]);
//     // console.log(objX);
//     return objX === obstacle[0] && objY === obstacle[1];
//       //console.log('collision');
//   });
// }
