import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/cart-context'

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber , item ) =>{
        return currentNumber + item.amount;
    },0);

    const [buttonIsHighlighted,setButtonIsHighlighted] = useState(false);


    const buttonClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0 ){
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false); 
        },300);

        return() =>{
            clearTimeout(timer)
        };
        
    },[items])

    

    return (<button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>

        <span>Your Card</span>

        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>)
}

export default HeaderCartButton;