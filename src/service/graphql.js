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

export const ENTRIES = gql`
  query($userId: ObjectId!) {
    entries(query: { userId: $userId }) {
      _id
      userId
      date
      stress
      activity
      social
      nutrition
      sleep
      spirituality
    }
  }
`;

export const INSERT_ENTRY = gql`
  mutation($data: EntryInsertInput!) {
    insertOneEntry(data: $data) {
      _id
    }
  }
`;
