import React from 'react'
import { Link } from "gatsby"

function Product({ pageContext }) {
    console.log(pageContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <h2>{pageContext.title}</h2>
            <p>{pageContext.description}</p>
            <img src={pageContext.images[0].originalSrc} alt="display item" height="250" width="250" />

            <div>
                <span>Price:</span><span>
                    <strong>{pageContext.priceRange.maxVariantPrice.amount}</strong>
                </span>
            </div>

        </div>
    )
}

export default Product
