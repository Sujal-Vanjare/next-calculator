"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];
  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    if (calc === "") {
      return; // Do nothing if the input is empty
    }

    let expression = calc;

    // Check if the expression ends with an operator, and if it does, remove it
    const lastChar = expression.slice(-1);
    if (ops.includes(lastChar)) {
      expression = expression.slice(0, -1);
    }

    try {
      const result = eval(expression);
      setCalc(result.toString());
    } catch (error) {
      setCalc("Error"); // Handle potential evaluation errors
    }
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
    if (ops.includes(value.slice(-1))) {
      setResult(eval(value.toString().slice(0, -1)));
    } else {
      setResult(eval(value.toString()));
    }
  };

  const clearAll = () => {
    setCalc("");
    setResult("");
  };

  const clearCalc = () => {
    setCalc("");
  };

  return (
    <main>
      <div className={styles.parent}>
        <div className={styles.output}>
          <div className={styles.previousOperand}>{result || "0"}</div>
          <div className={styles.currentOperand}>{calc || "0"}</div>
        </div>
        <button className={styles.sign}>&#37;</button>
        <button className={styles.sign} onClick={clearCalc}>
          CE
        </button>
        <button className={styles.sign} onClick={clearAll}>
          C
        </button>
        <button className={styles.sign} onClick={deleteLast}>
          <img className={styles.icon} src="/backspace.svg" alt="backspace" />
        </button>
        <button className={styles.sign}>¹/&#119909;</button>
        <button className={styles.sign}>𝑥²</button>
        <button className={styles.sign}>√𝑥 </button>
        <button className={styles.sign} onClick={() => updateCalc("/")}>
          /
        </button>
        <button className={styles.num} onClick={() => updateCalc("7")}>
          7
        </button>
        <button className={styles.num} onClick={() => updateCalc("8")}>
          8
        </button>
        <button className={styles.num} onClick={() => updateCalc("9")}>
          9
        </button>
        <button className={styles.sign} onClick={() => updateCalc("*")}>
          &#215;
        </button>
        <button className={styles.num} onClick={() => updateCalc("4")}>
          4
        </button>
        <button className={styles.num} onClick={() => updateCalc("5")}>
          5
        </button>
        <button className={styles.num} onClick={() => updateCalc("6")}>
          6
        </button>
        <button className={styles.sign} onClick={() => updateCalc("-")}>
          &minus;
        </button>
        <button className={styles.num} onClick={() => updateCalc("1")}>
          1
        </button>
        <button className={styles.num} onClick={() => updateCalc("2")}>
          2
        </button>
        <button className={styles.num} onClick={() => updateCalc("3")}>
          3
        </button>
        <button className={styles.sign} onClick={() => updateCalc("+")}>
          &#x2B;
        </button>
        <button className={styles.num}>&#x2B;/&minus;</button>
        <button className={styles.num} onClick={() => updateCalc("0")}>
          0
        </button>
        <button className={styles.num} onClick={() => updateCalc(".")}>
          .
        </button>
        <button className={styles.equal} onClick={calculate}>
          =
        </button>
      </div>
    </main>
  );
}
