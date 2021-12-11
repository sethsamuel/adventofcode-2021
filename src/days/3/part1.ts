self.onmessage = async (e) => {
  console.log("Message received", e);
  const { command, input } = e.data;
  if (command === "START") {
    const lines = input.split("\n");
    console.log(`${lines.length} lines of input`);

    const data: number[][] = lines.map((l) =>
      l.split("").map((i) => parseInt(i))
    );

    const counts = data[0].map((_) => [0, 0]);
    for (const line of data) {
      for (const i in line) {
        counts[i][line[i]]++;
      }
    }
    const g = parseInt(counts.map((c) => (c[0] > c[1] ? 0 : 1)).join(""), 2);
    const e = parseInt(counts.map((c) => (c[0] < c[1] ? 0 : 1)).join(""), 2);

    postMessage({ command: "RESULT", result: g * e }, null);
  }
};

console.log("Worker loaded");
