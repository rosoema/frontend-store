import { gql } from "@apollo/client";

const data = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            value
            displayValue
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    currencies {
      label 
      symbol
    }
  }
`;

export default data;