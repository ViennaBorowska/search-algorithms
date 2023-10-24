const fs = require("fs");

// WRITING DATA TO FILE
// delete output csv file if exists
if (fs.existsSync("searchAlgRuntimes.csv"))
  fs.unlinkSync("searchAlgRuntimes.csv");
// create and write a header to the output csv file
fs.appendFile(
  "searchAlgRuntimes.csv",
  "N, Search Type, Average Guesses, Search Type, Average Guesses\n",
  (err) => {
    if (err) throw err;
  }
);

//LINEAR SEARCH
//Get array and target
//Loop through array
//Compare target to array item
//If target is found
//Return number of guesses taken (index of target once found)
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    } else {
      continue;
    }
  }
}

//BINARY SEARCH
//Get array and target
//Set start and end of search window
//WHILE start is less than end
//Count guesses
//Get middle of array
//IF target is found
////RETURN guesses
//IF target is less than middle
////Reset upper boundary to one less than current middle
//IF target is more than middle
////Reset lower boundary to one more than current middle

function binarySearch(array, target) {
  let lower = 0;
  let upper = array.length - 1;
  let numOfGuess = 0;

  while (lower <= upper) {
    numOfGuess++;
    const middle = lower + Math.floor((upper - lower) / 2);
    if (target === array[middle]) {
      return numOfGuess;
    }
    if (target < array[middle]) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  }
}

//Driver Code
const runs = 10;
for (let n = 500; n <= 600000; n = n + 500) {
  //Variables to calculate search runtime data
  let linearTotal = 0;
  let linearAverage = 0;
  let binaryTotal = 0;
  let binaryAverage = 0;

  //Generate array of numbers
  let testArray = [];
  for (let i = 0; i <= n; i++) {
    testArray.push(i);
  }

  //Select target randomly from testArray, excluding 0
  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  for (let r = 1; r <= runs; r++) {
    let randomNumberSelection = getRandom(1, n);
    // console.log(randomNumberSelection);

    //Call linear search & record data
    const linearResult = linearSearch(testArray, randomNumberSelection);
    linearTotal += linearResult;
    console.log(
      `Run ${r}: The target ${randomNumberSelection} was found after ${linearResult} guesses`
    );

    //Call binary search & record data
    const binaryResult = binarySearch(testArray, randomNumberSelection);
    binaryTotal += binaryResult;
    console.log(
      `Run ${r}: The target ${randomNumberSelection} was found after ${binaryResult} guesses.`
    );
  }
  //Calculate runtime average for set of 10 runs against each array size
  linearAverage = linearTotal / runs;
  binaryAverage = binaryTotal / runs;

  //Write data to file
  const searchData = `${n},Linear Search, ${linearAverage}, Binary Search, ${binaryAverage}\n`;
  fs.appendFile("searchAlgRuntimes.csv", searchData, (err) => {
    if (err) throw err;
  });
}
