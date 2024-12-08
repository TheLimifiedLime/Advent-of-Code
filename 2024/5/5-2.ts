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

const invalid = updates.filter((update) => {
  return !valid.some((validUpdate) => {
    if (validUpdate.length !== update.length) return false;

    return validUpdate.every((value, index) => value === update[index]);
  });
});

function checkUpdate(update: number[]) {
  const checks = rules.map(([first, second]) => {
    const firstIndex = update.indexOf(first);
    const secondIndex = update.indexOf(second);

    if (firstIndex === -1 || secondIndex === -1) return true;

    return firstIndex < secondIndex ? true : [first, second];
  });

  return checks;
}

const fixed = invalid.map((invalidUpdate) => {
  const fixedUpdate: number[] = [...invalidUpdate];
  let checks = checkUpdate(fixedUpdate);
  let failedChecks = checks.filter((check) => check !== true);

  while (checks.every((check) => check === true) !== true) {
    const [first, second] = failedChecks[0];

    const firstIndex = fixedUpdate.indexOf(first);
    const secondIndex = fixedUpdate.indexOf(second);

    fixedUpdate[firstIndex] = second;
    fixedUpdate[secondIndex] = first;

    checks = checkUpdate(fixedUpdate);
    failedChecks = checks.filter((check) => check !== true);
  }

  return fixedUpdate;
});

const result = fixed
  .map((update) => update[Math.floor(update.length / 2)])
  .reduce((accumulator, current) => accumulator + current);

console.log(result);
