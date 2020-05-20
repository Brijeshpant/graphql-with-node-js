import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLNonNull } from "graphql";
import { ProductType, ProductInputType } from './product'
import { products } from './data'
export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "QueryType",
        description: "root type for queries",
        fields: () => ({
            welcome: {
                type: GraphQLString,
                description: "Welcome type",
                args: {
                    id: { type: GraphQLString }
                },
                resolve: (parent, args) => {
                    console.log(`parent ${JSON.stringify(parent)}`)
                    console.log(`args ${JSON.stringify(args)}`)
                    return `Welcome all ${args.id}`
                }
            },
            product: {
                type: ProductType,
                description: "Product type",
                args: {
                    id: { type: GraphQLString }
                },
                resolve: (parent, args) => products.find(p => p.id == args.id)
            },
            products: {
                type: new GraphQLList(ProductType),
                description: "List of products",
                resolve: () => products
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: "MutationType",
        description: "Root type for mutation",
        fields: () => ({
            createProduct: {
                type: ProductType,
                args: {
                    input: {type: ProductInputType}
                },
                resolve: (parent, { input}, context) => {
                    const id = products.length + 1;
                    const newProduct = Object.assign(input, {id})
                    console.log(`context ${JSON.stringify(context)}`)
                    console.log(`parent ${JSON.stringify(parent)}`)
                    products.push(newProduct)
                    console.log(`args ${JSON.stringify(newProduct)}`)

                    return newProduct
                }
            }
        })
    })

})
