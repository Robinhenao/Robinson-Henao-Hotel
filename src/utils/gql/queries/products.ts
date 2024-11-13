import { gql } from 'apollo-server-micro';

export const GET_PRODUCTS = gql`
  query Productss {
    productss {
      id
      name
      description
      price
      image
      stock
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Products($productsId: String!) {
    products(id: $productsId) {
      id
      name
      description
      price
      image
      stock
      createdAt
      updatedAt
    }
  }
`;
