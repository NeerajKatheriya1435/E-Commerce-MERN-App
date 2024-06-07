import React from 'react'
import Layout from '../component/Layout/Layout'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    console.log(cart)
    return (
        <Layout>
            <div className="container mt-2">
                <h2 className='text-center'>Hello {auth?.user.name}</h2>
                <h5 className='text-center'>You have {cart?.length} items in your cart</h5>
            </div>
            <div className="d-flex justify-content-around">
                {!cart?.length ? (<>
                    <h4 className='text-center m-4'>No Items to checkout</h4>
                </>) : (<>
                    <div className="col-md-6">
                        {cart?.length > 0 && cart?.map((prod) => (
                            <div key={prod._id} className="row card d-flex flex-row m-2 mx-4 container">
                                <div className="col-md-4">
                                    <img
                                        className="card-img-top mx-4"
                                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                        alt={prod.name}
                                        style={{ height: "100%", width: "25vh" }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h3 className="card-title m-2">{prod.name}</h3>
                                    <p className="card-text m-2">Description : {prod.description.substring(0, 30)}...</p>
                                    <p className="card-text m-2">Price : {prod.price}</p>
                                    <button
                                        onClick={() => { handleRemove(prod._id) }}
                                        className="btn btn-danger my-2">Remove Item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3 card text-center pt-2">
                        <h3>Cart Summary</h3>
                        <p>Total | Checkout | Payemnt</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                    </div>
                </>)}
            </div>

        </Layout>
    )
}

export default CartPage