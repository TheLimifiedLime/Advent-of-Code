const input = Deno.readTextFileSync(import.meta.dirname + "/input.txt")
  .split("\n")
  .map((line) => line.split(""));

let count = 0;
input.forEach((line, lineIndex) => {
  line.forEach((_character, characterIndex) => {
    const [x1, y1] = [1, 1]; // bottom right
    const mas1 = [];
    for (let charCount = 0; charCount < 3; charCount++) {
      const char =
        input[lineIndex + charCount * y1]?.[characterIndex + charCount * x1];
      if (!char) return;
      mas1.push(char);
    }

    const [x2, y2] = [-1, 1]; // bottom left
    const mas2 = [];
    for (let charCount = 0; charCount < 3; charCount++) {
      const char =
        input[lineIndex + charCount * y2]?.[
          characterIndex + charCount * x2 + 2
        ];
      if (!char) return;
      mas2.push(char);
    }

    if (
      (mas1.join("").includes("MAS") || mas1.join("").includes("SAM")) &&
      (mas2.join("").includes("MAS") || mas2.join("").includes("SAM"))
    ) {
      count++;
    }
  });
});

console.log(count);
