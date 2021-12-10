self.onmessage = async (e) => {
  console.log("Message received", e);
  const { command, input } = e.data;
  if (command === "START") {
    const lines = input.split("\n");
    console.log(`${lines.length} lines of input`);

    const data: [string, number][] = lines.map((l) => [
      l.split(" ").shift(),
      parseInt(l.split(" ").pop()),
    ]);

    let h = 0;
    let d = 0;

    for (const line of data) {
      if (line[0] === "forward") {
        h += line[1];
      } else if (line[0] == "down") {
        d += line[1];
      } else if (line[0] == "up") {
        d -= line[1];
      }
    }
    postMessage({ command: "RESULT", result: h * d }, null);
  }
};

console.log("Worker loaded");
