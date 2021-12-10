self.onmessage = async (e) => {
  console.log("Message received", e);
  const { command, input } = e.data;
  if (command === "START") {
    const lines = input.split("\n").map((l) => parseInt(l));
    console.log(`${lines.length} lines of input`);

    const data = lines.map((l) => parseInt(l));

    let increases = 0;

    for (let i = 1; i < data.length - 2; i++) {
      console.log(`Window a [${i - 1},${i + 1}] b [${i},${i + 2}]`);
      if (
        data[i] + data[i + 1] + data[i + 2] >
        data[i - 1] + data[i] + data[i + 1]
      ) {
        increases++;
      }
    }
    postMessage({ command: "RESULT", result: increases }, null);
  }
};

console.log("Worker loaded");
