//@ts-nocheck
import { h } from "preact";
import { useState } from "preact/hooks";
import { Block, InlineBlock, Col, Row } from "jsxstyle/preact";

const inputs = {
  1: import("../days/1/input.txt"),
  // 2: import("../days/2/input.txt"),
  // 3: import("../days/3/input.txt"),
  // 4: import("../days/4/input.txt"),
  // 5: import("../days/5/input.txt"),
  // 6: import("../days/6/input.txt"),
  // 7: import("../days/7/input.txt"),
  // 8: import("../days/8/input.txt"),
  // 9: import("../days/9/input.txt"),
  // 10: import("../days/10/input.txt"),
  // 11: import("../days/11/input.txt"),
  // 12: import("../days/12/input.txt"),
};

const workers = {
  "1.1": new Worker("../days/1/part1.ts"),
  "1.2": new Worker("../days/1/part2.ts"),
  // "2.1": new Worker("../days/2/part1.ts"),
  // "2.2": new Worker("../days/2/part2.ts"),
  // "3.1": new Worker("../days/3/part1.ts"),
  // "3.2": new Worker("../days/3/part2.ts"),
  // "4.1": new Worker("../days/4/part1.ts"),
  // "4.2": new Worker("../days/4/part2.ts"),
  // "5.1": new Worker("../days/5/part1.ts"),
  // "5.2": new Worker("../days/5/part2.ts"),
  // "6.1": new Worker("../days/6/part1.ts"),
  // "6.2": new Worker("../days/6/part2.ts"),
  // "7.1": new Worker("../days/7/part1.ts"),
  // "7.2": new Worker("../days/7/part2.ts"),
  // "8.1": new Worker("../days/8/part1.ts"),
  // "8.2": new Worker("../days/8/part2.ts"),
  // "9.1": new Worker("../days/9/part1.ts"),
  // "9.2": new Worker("../days/9/part2.ts"),
  // "10.1": new Worker("../days/10/part1.ts"),
  // "10.2": new Worker("../days/10/part2.ts"),
  // "11.1": new Worker("../days/11/part1.ts"),
  // "11.2": new Worker("../days/11/part2.ts"),
  // "12.1": new Worker("../days/12/part1.ts"),
  // "12.2": new Worker("../days/12/part2.ts"),
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
    // const worker = new Worker(`../days/${day}/part${part}.js`);
    // const worker = (() => {
    //   if (day === "1" && part === "1") {
    //     return new Worker("../days/1/part1.js");
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

    const input = (await inputs[day]).default;
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
