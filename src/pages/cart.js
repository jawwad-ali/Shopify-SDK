import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'alibootcampstore.myshopify.com/',
    storefrontAccessToken: '99748b69008e3dcee6edbf7cb7a6d48c'
});

function Cart() {

    const [checkoutSession, setCheckoutSession] = useState()

    useEffect(() => {
        (async () => {
            const session = await client.checkout.fetch(localStorage.getItem("sessionID"))
            setCheckoutSession(session)
            console.log("session loaded", session)
        })()
    }, [])

    return (
        <div>
            <h2>Visit Cart</h2>

            <button onClick={() => window.open(checkoutSession.webUrl)}
                
            >
                Checkout
            </button>
            <hr />

            {
                checkoutSession && checkoutSession.lineItems.map((item) => (
                    <div key={item.id}>
                        <h4>Title:{item.title}</h4>
                        <h4> Quantity:{item.quantity}</h4>
                        <img height="250" width="350" src={item.variant.image.src} alt="show-cart-product" />
                        <div>Price:{item.variant.price}</div>

                        <button
                            onClick={async () => {
                                const sessionAdd = await client.checkout.updateLineItems(checkoutSession.id, [
                                    {
                                        id: item.id,
                                        quantity: item.quantity + 1,
                                    }
                                ])
                                setCheckoutSession(sessionAdd)
                                console.log("session ADD", sessionAdd)
                            }}
                        >+</button>

                        <button
                            onClick={async () => {
                                const sessionDec = await client.checkout.updateLineItems(checkoutSession.id, [
                                    {
                                        id: item.id,
                                        quantity: item.quantity - 1,
                                    }
                                ])
                                setCheckoutSession(sessionDec)
                                console.log("sessionDec", sessionDec)
                            }}
                        >-</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart
