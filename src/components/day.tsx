//@ts-nocheck
import { h } from "preact";
import { useState } from "preact/hooks";
import { Block, InlineBlock, Col, Row } from "jsxstyle/preact";

// import input1 from "bundle-text:../days/1/input.txt";
const inputs = {};
import("bundle-text:../days/1/input.txt").then((v) => (inputs[1] = v));
import("bundle-text:../days/2/input.txt").then((v) => (inputs[2] = v));
import("bundle-text:../days/3/input.txt").then((v) => (inputs[3] = v));

const workers = {
  "1.1": new Worker(new URL("../days/1/part1.ts", import.meta.url)),
  "1.2": new Worker(new URL("../days/1/part2.ts", import.meta.url)),
  "2.1": new Worker(new URL("../days/2/part1.ts", import.meta.url)),
  "2.2": new Worker(new URL("../days/2/part2.ts", import.meta.url)),
  "3.1": new Worker(new URL("../days/3/part1.ts", import.meta.url)),
  "3.2": new Worker(new URL("../days/3/part2.ts", import.meta.url)),
  // "4.1": new Worker(new URL("../days/4/part1.ts", import.meta.url)),
  // "4.2": new Worker(new URL("../days/4/part2.ts", import.meta.url)),
  // "5.1": new Worker(new URL("../days/5/part1.ts", import.meta.url)),
  // "5.2": new Worker(new URL("../days/5/part2.ts", import.meta.url)),
  // "6.1": new Worker(new URL("../days/6/part1.ts", import.meta.url)),
  // "6.2": new Worker(new URL("../days/6/part2.ts", import.meta.url)),
  // "7.1": new Worker(new URL("../days/7/part1.ts", import.meta.url)),
  // "7.2": new Worker(new URL("../days/7/part2.ts", import.meta.url)),
  // "8.1": new Worker(new URL("../days/8/part1.ts", import.meta.url)),
  // "8.2": new Worker(new URL("../days/8/part2.ts", import.meta.url)),
  // "9.1": new Worker(new URL("../days/9/part1.ts", import.meta.url)),
  // "9.2": new Worker(new URL("../days/9/part2.ts", import.meta.url)),
  // "10.1": new Worker(new URL("../days/10/part1.ts", import.meta.url)),
  // "10.2": new Worker(new URL("../days/10/part2.ts", import.meta.url)),
  // "11.1": new Worker(new URL("../days/11/part1.ts", import.meta.url)),
  // "11.2": new Worker(new URL("../days/11/part2.ts", import.meta.url)),
  // "12.1": new Worker(new URL("../days/12/part1.ts", import.meta.url)),
  // "12.2": new Worker(new URL("../days/12/part2.ts", import.meta.url)),
};
const Day = ({ day }) => {
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const start = async (part) => {
    if (isRunning) {
      return;
    }
    console.log("Starting");
    setIsRunning(true);
    setResult(null);
    const worker = workers[`${day}.${part}`];
    // const worker = new Worker(new URL(`../days/${day}/part${part}.js`, import.meta.url));
    // const worker = (() => {
    //   if (day === "1" && part === "1") {
    //     return new Worker(new URL("../days/1/part1.js", import.meta.url));
    //   }
    // })();
    worker.onmessage = (e) => {
      // console.log("Messag from worker", e);
      const { command } = e.data;
      if (command === "RESULT") {
        console.log("Result", e.data.result);
        setResult(e.data.result);
        setProgress(1);
        setIsRunning(false);
      } else if (command === "PROGRESS") {
        const { complete, total } = e.data;
        // console.log("Progress", complete / total);
        setProgress(complete / total);
      }
    };

    const input = await inputs[day];
    worker.postMessage({ command: "START", input });
  };

  return (
    <Col border="1px solid black" padding="2rem" alignItems="center">
      <Block fontWeight={500} fontSize="2rem" marginBottom="1rem">
        Day {day}
      </Block>
      {result !== null ? (
        <pre>{result}</pre>
      ) : isRunning ? (
        <InlineBlock
          component="progress"
          width="100%"
          margin="2px 0"
          props={{
            max: 1,
            value: progress ? progress.toString() : undefined,
          }}
        />
      ) : null}
      <Row marginTop="1rem">
        <InlineBlock
          component="button"
          margin="0 auto"
          marginRight="0.5rem"
          props={{ onClick: () => start("1") }}
        >
          Part 1
        </InlineBlock>
        <InlineBlock
          component="button"
          margin="0 auto"
          props={{ onClick: () => start("2") }}
        >
          Part 2
        </InlineBlock>
      </Row>
    </Col>
  );
};

export default Day;
