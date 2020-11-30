require('dotenv').config()

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ],
}
