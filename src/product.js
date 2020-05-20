import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInputObjectType } from "graphql";

export const ProductType = new GraphQLObjectType({
    name: "Product",
    description: "Product type",
    fields: () =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        brand: {type: GraphQLString},
        category: {type: GraphQLString},
        price: {type: GraphQLFloat},

    })
})

