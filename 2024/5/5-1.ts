const [ruleInput, updateInput] = Deno.readTextFileSync(
  import.meta.dirname + "/input.txt"
).split("\n\n");

const rules = ruleInput
  .split("\n")
  .map((line) => line.split("|").map((number) => Number(number)));

const updates = updateInput
  .split("\n")
  .map((line) => line.split(",").map((number) => Number(number)));

const valid = updates.filter((update) => {
  return !rules
    .map(([first, second]) => {
      const firstIndex = update.indexOf(first);
      const secondIndex = update.indexOf(second);

      if (firstIndex === -1 || secondIndex === -1) return true;

      return firstIndex < secondIndex;
    })
    .includes(false);
});

const result = valid
  .map((update) => update[Math.floor(update.length / 2)])
  .reduce((accumulator, current) => accumulator + current);

console.log(result);
