const input = Deno.readTextFileSync(import.meta.dirname + "/input.txt")
  .split("\n")
  .map((line) => line.split(""));

const directions = [
  [-1, -1], // up left
  [0, -1], // up
  [1, -1], // up right
  [-1, 0], // left
  [1, 0], // right
  [-1, 1], // bottom left
  [0, 1], // bottom
  [1, 1], // bottom right
];
let count = 0;
input.forEach((line, lineIndex) => {
  line.forEach((_character, characterIndex) => {
    directions.forEach(([x, y]) => {
      const foundChars = [];
      for (let charCount = 0; charCount < 4; charCount++) {
        const char =
          input[lineIndex + charCount * y]?.[characterIndex + charCount * x];
        if (!char) return;
        foundChars.push(char);
      }
      if (foundChars.join("") === "XMAS") count++;
    });
  });
});

console.log(count);
