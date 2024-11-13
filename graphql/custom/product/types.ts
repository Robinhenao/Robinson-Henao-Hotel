import { gql } from 'apollo-server-micro';

const CustomProductTypes = gql`
  type Mutation {
    upsertProduct(
      data: ProductInput
      where: ProductsWhereUniqueInput!
    ): Products
  }

  input ProductInput {
    create: ProductsCreateInput
    update: ProductsUpdateInputCustom
  }

  input ProductsUpdateInputCustom {
    name: String
    description: String
    price: Float
    image: String
    stock: Int
  }
`;

export { CustomProductTypes };
