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
                resolve: (parent,args, context) => {
                    const { user } = context;
                    if (user.role != 'ADMIN' && user.role != 'CUST') {
                        throw new Error('UnAuthorized')
                    }
                    console.log(`products ${JSON.stringify(products)}`)
                    return products;
                }
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
                    const { user } = context;
                    if (user.role != 'ADMIN') {
                        throw new Error('UnAuthorized')
                    }
                    const id = products.length + 1;
                    const newProduct = Object.assign(input, {id})
                    products.push(newProduct)
                    console.log(`newProduct ${JSON.stringify(newProduct)}`)
                    return newProduct
                }
            }
        })
    })

})
