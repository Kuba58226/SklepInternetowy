import React, {useReducer,useContext,createContext} from 'react';

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            for (const element of state) {
                if (element.id===action.item.id){
                    element.count+=1
                    return state;
                }
            }
            return [...state,{id: action.item.id, name: action.item.name, count: 1, price: action.item.price}]
        case "REMOVE":
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        default:
            throw new Error()
    }
}

export const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)