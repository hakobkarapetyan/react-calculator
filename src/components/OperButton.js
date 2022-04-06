import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ACTIONS} from "../logic/CalculatorReducer"; 


export default function OperButton ({icon, operation, dispatch}) {
    if(operation === "=") {

    }
    
    return (
        <button className={`btn oper-btn ${icon.iconName === "equals" ? "equal" : ""}`} onClick={() => {
            dispatch({
                type: operation === "=" ? ACTIONS.EQUAL : operation === "clear" ? ACTIONS.CLEAR : operation === "del" ? ACTIONS.DELETE : ACTIONS.CHOOSE_OPERATION,
                payload: {
                    operation: operation,
                }
            })
        }}>
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}