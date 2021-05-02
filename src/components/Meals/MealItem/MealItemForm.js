import classes from './MealItemForm.module.css';
import Input  from '../../UI/Input';
import { useRef, useState } from 'react'

const MealItemForm = props =>{
    const amountInputref = useRef();

    const [ amountIsValid , setAmountIsValid ] = useState(true);

    const submitHandler = event =>{
        event.preventDefault();

        const eneteredAmount = amountInputref.current.value;
        const amountNumber =+eneteredAmount;

        if(eneteredAmount.trim().legnth === 0 || amountNumber < 1 || amountNumber > 5){
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(amountNumber);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref={amountInputref}
            label= "amount" 
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min : '1',
                max : '5',
                step : '1',
                defaultValue : '1'
            }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please Enter Amount between 1 to 5</p>}
    </form>
} 
 export default MealItemForm