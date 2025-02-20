import { useState } from "react";

export default function App() {
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState("0");
  const [lastResult, setLastResult] = useState(null);

  const handleNumberClick = (num) => {
    if (expression.endsWith("=")) {
      setExpression(num);
      setInput(num);
      setLastResult(null);
    } else {
      setExpression((prev) => prev + num);
      setInput((prev) => (prev === "0" || prev === "Error" ? num : prev + num));
    }
  };

  const handleOperatorClick = (operator) => {
    if (expression.endsWith("=")) {
      setExpression(lastResult ? lastResult + operator : operator);
      setInput(operator);
    } else {
      setExpression((prev) => {
        if (
          prev.charAt(prev.length - 1) === "-" &&
          "+*/".includes(prev.charAt(prev.length - 2))
        ) {
          return prev.slice(0, -2) + operator;
        }
        if (/[\+\-\*\/]$/.test(prev) && operator === "-") {
          return prev + operator;
        }
        if (/[\+\-\*\/]$/.test(prev)) {
          return prev.slice(0, -1) + operator;
        }

        return prev + operator;
      });
      setInput(operator);
    }
  };

  const calculateOutput = () => {
    try {
      const sanitizedExpression = expression.replace(/--/g, "+");
      const result = eval(sanitizedExpression);
      setInput(result.toString());
      setExpression(expression + "=");
      setLastResult(result.toString());
    } catch (err) {
      setInput("Error");
      setExpression("");
    }
  };

  const handleClear = () => {
    setExpression("");
    setInput("0");
    setLastResult(null);
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setExpression((prev) => (expression.endsWith("=") ? "0." : prev + "."));
      setInput((prev) => (prev === "Error" ? "0." : prev + "."));
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="prev-display">{expression}</div>
          <div id="display">{input}</div>
        </div>
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button id="divide" onClick={() => handleOperatorClick("/")}>
          /
        </button>
        <button id="multiply" onClick={() => handleOperatorClick("*")}>
          X
        </button>
        <button id="seven" onClick={() => handleNumberClick("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumberClick("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumberClick("9")}>
          9
        </button>
        <button id="subtract" onClick={() => handleOperatorClick("-")}>
          -
        </button>
        <button id="four" onClick={() => handleNumberClick("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumberClick("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumberClick("6")}>
          6
        </button>
        <button id="add" onClick={() => handleOperatorClick("+")}>
          +
        </button>
        <button id="one" onClick={() => handleNumberClick("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumberClick("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumberClick("3")}>
          3
        </button>
        <button id="equals" onClick={calculateOutput}>
          =
        </button>
        <button id="zero" onClick={() => handleNumberClick("0")}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  );
}
