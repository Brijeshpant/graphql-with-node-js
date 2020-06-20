import { products } from "./data";

export const resolvers = {
    Query: {
        welcome: () => "Welcome all",
        products: () => products,
        product:(parent, {id}) => products.find(product=> product.id == id)
    },
    Mutation: {
        createProduct: (parent, {product}) => {
            const id = products.length + 1;
            const newProduct = Object.assign(product, { id })
            console.log(`parent ${JSON.stringify(parent)}`)
            products.push(newProduct)
            console.log(`args ${JSON.stringify(newProduct)}`)

            return newProduct 
        }
    }
}