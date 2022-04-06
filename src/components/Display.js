import "./Display.css";

export default function Display ({result}) {
    let {currentOperand, prevOperand, prevShow, maxSymb: {count}} = result;
    let currentOperandStyles = {
        fontSize: null,
    }
    
    if(currentOperand.indexOf("/") !== -1) {
        currentOperand = currentOperand.replaceAll("/", "÷");
    }
    if(currentOperand.indexOf("*") !== -1) {
        currentOperand = currentOperand.replaceAll("*", "x");
    }

    if(currentOperand.length >= count) {
        currentOperandStyles.fontSize = '30px';
    }
  
    // console.log(currentOperand.length);
    if(currentOperand.length >= 19) {
        currentOperandStyles.fontSize = '20px';
    }

    if(currentOperand.length >= 28) {
        currentOperandStyles.fontSize = '18px';
    }

    return (
        <div className="display">
            <h2 className="previous-operand">{prevShow ? prevOperand : null}</h2>
            <h1 className="current-operand" style={currentOperandStyles}>{currentOperand}</h1>
        </div>                
    )
}