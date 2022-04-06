import "./Keyboard.css";
import { faDivide, faEquals, faDeleteLeft, faPlus, faMinus, faXmark, faC} from '@fortawesome/free-solid-svg-icons';
import DigitButton from "./DigitButton";
import OperButton from "./OperButton";

export default function Keyboard ({dispatch}) {
    return (
        <div className="keyboard">
             <div className="btn-row">
                <OperButton icon={faC} operation="clear" dispatch={dispatch}/>
                <button className="btn">()</button>
                <OperButton icon={faDeleteLeft} operation="del" dispatch={dispatch}/>
                <OperButton icon={faDivide} operation="/" dispatch={dispatch}/>
            </div>
            <div className="btn-row">
                <DigitButton digit="9" dispatch={dispatch}/>
                <DigitButton digit="8" dispatch={dispatch}/>
                <DigitButton digit="7" dispatch={dispatch}/>
                <OperButton icon={faXmark} operation="*" dispatch={dispatch}/>
            </div>
            <div className="btn-row">
                <DigitButton digit="6" dispatch={dispatch}/>
                <DigitButton digit="5" dispatch={dispatch}/>
                <DigitButton digit="4" dispatch={dispatch}/>
                <OperButton icon={faMinus} operation="-" dispatch={dispatch}/>
            </div>
            <div className="btn-row">
                <DigitButton digit="3" dispatch={dispatch}/>
                <DigitButton digit="2" dispatch={dispatch}/>
                <DigitButton digit="1" dispatch={dispatch}/>
                <OperButton icon={faPlus} operation="+" dispatch={dispatch}/>
            </div>
            <div className="btn-row">
                <DigitButton digit="." dispatch={dispatch}/>
                <DigitButton digit="0" dispatch={dispatch}/>
                <OperButton icon={faEquals} operation="=" dispatch={dispatch}/>
            </div>
        </div>
    )
}