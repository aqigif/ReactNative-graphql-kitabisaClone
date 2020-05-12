import gql from "graphql-tag";

export const GET_USER_BY_ID = gql`
query getUserId($id: String!){
  user(id:$id) {
    id
    firstName
    lastName
    email
    phoneNumber
  }
}`;

export const GET_HISTORY_BY_ID = gql`
query getHistory($id: String!){
	transactions(where:{
    createdById:$id
  },
  orderBy: createdAt_DESC
  ){
    id
    total
    beneficiary{
      firstName
      lastName
      categories{
        name
      }
    }
    createdAt
  }
}
`;

export const GET_HISTORY_BY_TRX_ID = gql`
query getHistory($id: String!){
	transaction(id:$id){
    id
    total
    amount
    timeline
    beneficiary{
      firstName
      lastName
      categories{
        name
      }
    }
    createdAt
  }
}
`;