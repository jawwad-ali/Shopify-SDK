import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import Client from 'shopify-buy';
import { navigate } from "gatsby"

const client = Client.buildClient({
  domain: 'alibootcampstore.myshopify.com/',
  storefrontAccessToken: '99748b69008e3dcee6edbf7cb7a6d48c'
});

export default function Home({ data }) {
  // console.log(data)

  const [checkoutSession, setCheckoutSession] = useState()

  useEffect(() => {
    (async () => {
      const session = await client.checkout.create()
      console.log("session = ", session)
      setCheckoutSession(session)
      localStorage.setItem("sessionID", session.id)
    })()
  }, [])


  return <div>
    <h1>PRODUCTS</h1>

    <div className="cart-desc-div">
      <div className="price">
        <span>Total Price: </span><span>{checkoutSession && checkoutSession.totalPrice}</span>
      </div>
      <div className="items">
        <span>Total Items: </span><span>{checkoutSession && checkoutSession.lineItems.length}</span>
      </div>
      <div className="cart-navigate">
        <button onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>
    </div>

    <div className="product-container">
      {
        data.allShopifyProduct.edges.map(({ node }) =>
          <div key={node.id} className="product" >
            <h2> {node.title}</h2>
            <p className="product-desc">{node.description}</p>
            <span>Price:</span><span>
              {/* <strong>{node.priceRange.minVariantPrice.amount}</strong> */}
              <strong>{node.variants[0].price}</strong>
            </span>
            <div className="btn-div" >
              <Link to={`/${node.shopifyId}`}>
                <button className="view-product-btn">
                  View Product
                </button>
              </Link>
              <button className="add-to-cart" onClick={async () => {
                const session = await client.checkout.addLineItems(checkoutSession.id, [
                  {
                    variantId: node.variants[0].id.split("__")[2],
                    quantity: 1
                  }
                ])
                setCheckoutSession(session)
                console.log("Onclick test =>", session)
              }}>
                Add To Cart
              </button>
            </div>
          </div>
        )
      }
    </div>
  </div>
}

export const query = graphql`{
      allShopifyProduct(sort: {fields: [title] }) {
      edges {
      node {
        id
        title
        images {
          originalSrc
        }
        shopifyId
        description
        availableForSale
        variants{
          price
          id
        }
  
    }
  }
      }
}`