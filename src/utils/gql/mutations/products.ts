import { gql } from 'apollo-server-micro';

export const UPSERT_PRODUCT = gql`
  mutation UpsertProduct(
    $where: ProductsWhereUniqueInput!
    $data: ProductInput
  ) {
    upsertProduct(where: $where, data: $data) {
      id
      name
      description
      price
    }
  }
`;
