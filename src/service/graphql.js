import { gql } from "@apollo/client";

export const USER = gql`
  query($email: String!, $password: String!) {
    user(query: { email: $email, password: $password }) {
      _id
      email
      password
    }
  }
`;
