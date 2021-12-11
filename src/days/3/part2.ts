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

    let o = [...data];
    let i = 0;
    while (o.length > 1 && i < o[0].length) {
      const counts = o[0].map((_) => [0, 0]);
      for (const line of o) {
        for (const i in line) {
          counts[i][line[i]]++;
        }
      }
      const max = counts[i][0] > counts[i][1] ? 0 : 1;

      o = o.filter((l) => l[i] === max);
      i++;
    }

    let c = [...data];
    i = 0;
    while (c.length > 1 && i < c?.[0].length) {
      const counts = c[0].map((_) => [0, 0]);
      for (const line of c) {
        for (const i in line) {
          counts[i][line[i]]++;
        }
      }
      const min = counts[i][0] <= counts[i][1] ? 0 : 1;

      c = c.filter((l) => l[i] === min);
      i++;
    }

    // debugger;
    postMessage(
      {
        command: "RESULT",
        result: parseInt(o[0].join(""), 2) * parseInt(c[0].join(""), 2),
      },
      null
    );
  }
};

console.log("Worker loaded");
