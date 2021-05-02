import {useReducer} from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0
}
const cardReducer = (state,action) => {
    if(action.type === 'ADD'){
        
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const exitstingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
  
        const exitstingCartItem = state.items[exitstingCartItemIndex];

        let updatedItems;

        if(exitstingCartItem){
            const updatedItem = {
                ...exitstingCartItem,
                amount: exitstingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[exitstingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        
        const exitstingCartItemIndex = state.items.findIndex((item) => item.id === action.id); 
        const exitstingCartItem = state.items[exitstingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - exitstingCartItem.price;

        let updatedItems;
        if(exitstingCartItem.amount === 1){
            updatedItems = state.items.filter(item =>item.id !== action.id)
        } else {
            const updatedItem = {...exitstingCartItem,amount:exitstingCartItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[exitstingCartItemIndex] = updatedItem;
        }

        return{
            items: updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState , dispatchCartOption ] = useReducer(cardReducer,defaultCartState);

    const addItemToCartHandler = (item) => { 
        dispatchCartOption({
            type:'ADD',
            item:item
        });
    }

    const removeItemToCartHandler = id => {
        dispatchCartOption({
            type:'REMOVE',
            id:id
        });
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider> 
    );
}

export default CartProvider;