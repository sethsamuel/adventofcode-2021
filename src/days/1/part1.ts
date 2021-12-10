self.onmessage = async (e) => {
  console.log("Message received", e);
  const { command, input } = e.data;
  if (command === "START") {
    const lines = input.split("\n").map((l) => parseInt(l));
    console.log(`${lines.length} lines of input`);

    const data = lines.map((l) => parseInt(l));

    let increases = 0;

    for (let i = 1; i < lines.length; i++) {
      if (lines[i] > lines[i - 1]) {
        increases++;
      }
    }
    postMessage({ command: "RESULT", result: increases }, null);
  }
};

console.log("Worker loaded");
