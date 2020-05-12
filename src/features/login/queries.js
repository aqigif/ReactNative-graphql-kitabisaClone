import gql from "graphql-tag";

export const LOGIN = gql`
mutation loginFunction(
  $email: EmailAddress!,
  $password: String!
){
  login(input: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
      firstName
      lastName
    }
  }
}
`;