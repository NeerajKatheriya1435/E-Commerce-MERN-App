
import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        let existingCartProduct = localStorage.getItem("cart")
        if (existingCartProduct) {
            setCart(JSON.parse(existingCartProduct));
        }
        // eslint-disable-next-line
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}
//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider }