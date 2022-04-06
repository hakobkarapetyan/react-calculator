export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE: "delete",
    EQUAL: "equal"
}

export function calculatorReducer (state, {type, payload}) {
    if(type === ACTIONS.ADD_DIGIT) {
        if(state.maxSymb.reached === false && state.currentOperand.length <= 31) {
            if(state.currentOperand === "." && payload.digit === ".") return state;
            if(state.currentOperand.includes(".") && payload.digit === "." && state.operation === "") return state;
            if(state.currentOperand === "0" && payload.digit === "0") return state;

            if(state.operation !== "" && payload.digit === ".") {
                const lastDot = state.currentOperand.lastIndexOf(state.operation);
                if(state.currentOperand.slice(lastDot, state.currentOperand.length).includes(".")) {
                    return state;
                }
                return {
                    ...state,
                    prevShow: false,
                    currentOperand: `${state.currentOperand}${payload.digit}`,
                }
            }
            const lastDigit = state.currentOperand[state.currentOperand.length-1]; 
            if(lastDigit === "0" && state.operation !== "") {
                if(state.currentOperand[state.currentOperand.lastIndexOf(state.operation) + 1] !== "0") {
                    return {
                        ...state,
                        prevOperand: calculate(state, payload.digit, true),
                        currentOperand: `${state.currentOperand}${payload.digit}`,
                    }
                }
                return {
                    ...state,
                    prevOperand: calculate({...state, currentOperand: state.currentOperand.slice(0, -1)}, payload.digit, true),
                    currentOperand: `${state.currentOperand.slice(0, -1)}${payload.digit}`,
                }
            }
            if(state.prevOperand !== "" && payload.digit !== "" && state.operation !== "") {
                return {
                    ...state,
                    maxSymb: {
                        ...state.maxSymb,
                        reached: (state.currentOperand.length - state.maxSymb.count) >= state.maxSymb.count ? true : false,
                    },
                    prevOperand: calculate(state, payload.digit, true),
                    prevShow: true,
                    currentOperand: `${state.currentOperand}${payload.digit}`,
                }
            }
            return {
                ...state,
                maxSymb: {
                ...state.maxSymb,
                reached: state.currentOperand.length + 1 >= state.maxSymb.count ? true : false,
                },
                currentOperand: `${state.currentOperand !== "0" ? state.currentOperand : payload.digit === "." ? state.currentOperand : ""}${payload.digit}`,
            }
        }  
    }
    if(type === ACTIONS.CHOOSE_OPERATION) {
        if(state.currentOperand.length < 31) {
        const currentOperandLast = state.currentOperand[state.currentOperand.length - 1];

        if(state.currentOperand === "" && state.prevOperand === "") {
            return state;
        }

        if(state.prevOperand === "") {
            return {
            ...state,
            prevOperand: state.currentOperand,
            maxSymb: {
                ...state.maxSymb,
                reached: false,
            },
            currentOperand: `${state.currentOperand}${payload.operation}`,
            operation: payload.operation,
            }
        }
        
        if(currentOperandLast === "+" || currentOperandLast === "-" || currentOperandLast === "*" || currentOperandLast === "/") {
            if(currentOperandLast !== payload.operation) {
                return {
                    ...state,
                    prevShow: false, 
                    maxSymb: {
                    ...state.maxSymb,
                    reached: false,
                    },
                    currentOperand: `${state.currentOperand.slice(0, -1) + payload.operation}`,
                    operation: payload.operation,
                }
            } else return state;
        }
        return {
            ...state,
            prevOperand: calculate(state, "", true),
            prevShow: false, 
            maxSymb: {
            ...state.maxSymb,
            reached: false,
            },
            currentOperand: `${state.currentOperand}${payload.operation}`,
            operation: payload.operation,
        }
        }
    }
    if(type === ACTIONS.EQUAL) {
        return {
            ...state,
            currentOperand: calculate(state),
            prevShow: false,
        }
    }
    if(type === ACTIONS.DELETE) {
        if(state.prevOperand !== "") {
            const stateRemoved = state.currentOperand.slice(0, -1);
            if(stateRemoved[stateRemoved.length -1] === state.operation) {
                return {
                ...state,
                prevOperand: calculate({...state, currentOperand: state.currentOperand.slice(0, -2)}, "", true),
                currentOperand: state.currentOperand.slice(0, -1),
                }
            }
            return {
                ...state,
                prevOperand: calculate({...state, currentOperand: state.currentOperand.slice(0, -1)}, "", true),
                currentOperand: state.currentOperand.slice(0, -1),
            }
        }
        return {
            ...state,
            currentOperand: state.currentOperand.slice(0, -1),
        }
    }
    if(type === ACTIONS.CLEAR) {
        return {
            ...state,
            prevOperand: "",
            currentOperand: "",
            operation: "",
        }
    }
    return state;
}

function calculate (state, digit, calcPrev) {
    const {currentOperand} = state;
    if(currentOperand !== "") {
        const lastSymbol = currentOperand[currentOperand.length - 1];
        if(calcPrev) {
            if(`${currentOperand}${digit}` === "0/0") {
                return "0";
            }
            if(`${currentOperand}${digit}`.includes(".")) {
                return eval(`${currentOperand}${digit}`).toFixed(1).toString();
            }
            return eval(`${currentOperand}${digit}`).toString();
        }
  
        if(lastSymbol === "+" || lastSymbol === "-" || lastSymbol === "*" || lastSymbol === "/" || lastSymbol === "%" || lastSymbol === ".") {
            return currentOperand;
        }
    
        if(currentOperand === "0/0") {
            return "0";
        }
    
        if(`${currentOperand}`.includes(".")) {
            return eval(`${currentOperand}`).toFixed(1).toString();
        }
  
        return eval(currentOperand).toString();
    } else return "";
}