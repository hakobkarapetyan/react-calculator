import "./App.css";
import Display from "./Display";
import Keyboard from "./Keyboard";
import { useReducer} from "react";
import {calculatorReducer} from "../logic/CalculatorReducer";

function App() {
  const [result, dispatch] = useReducer(calculatorReducer, {
    prevOperand: "",
    prevShow: false,
    maxSymb: {
      count: 15,
      reached: false,
    },
    currentOperand: "0",
    operation: "",
  });

  return (
    <div className="App">
      <div className="calculatorWrapper">
        <Display result={result}/>
        <Keyboard dispatch={dispatch}/>
      </div>
    </div>
  );
}

export default App;
