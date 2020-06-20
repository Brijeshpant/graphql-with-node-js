import {gql} from 'apollo-server-hapi'
export const typeDefs = gql`
 type Query {
     welcome:String,
     products: [ProductType],
     product(id: String): ProductType
 }
 type ProductType {
     id:String,
     name:String,
     brand:String,
     category:String,
     price:Float
 }

 input ProductInput {
     name:String,
     brand:String,
     category:String,
     price:Float
 }
 type Mutation {
     createProduct(product:ProductInput): ProductType
 }
`
