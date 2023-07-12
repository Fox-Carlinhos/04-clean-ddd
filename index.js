function compress(text) {
  let counter = 1;
  let compressed = "";

  for (let i = 0; i < text.length; i++) {
    let actualLetter = text[i];
    if (actualLetter === text[i + 1]) {
      counter += 1;
    } else if (counter !== 1) {
      compressed = compressed + actualLetter + "x" + counter;
      counter = 1;
    } else {
      compressed = compressed + actualLetter;
      counter = 1;
    }
  }

  return compressed;
}

console.log(compress("bbaacacacc"));
