import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`;

export const TRANSACTION = gql`
mutation createTrx(
  $beneficiaryId: String!,
  $amount: Float!,
  $timeline: Int! = 1,
  $paymentProof: Upload,
  $total: Float
){
  createTransaction(input: {
    beneficiaryId: $beneficiaryId,
    timeline: $timeline,
    amount: $amount,
    paymentProof: $paymentProof,
    total: $total
  }) {
    id
    beneficiary{
      firstName
      lastName
      categories{
        name
      }
    }
    total
    amount
    paymentProof
  }
}
`;

export const GET_BENEFICIARIES_BY_BEN_ID = gql`
query getBeneficaries($id: String!){
  beneficiary(id: $id)  {
    id
    firstName
    lastName
    categories {
      name
    }
  }
}`;

export const GET_BENEFICIARIES_BY_CATEGORIES_ID = gql`
query getBeneficaries($categoriesId: String!){
  beneficiariesConnection(
    where: {categoriesId: $categoriesId}
  )  {
    total
    limit
    data {
      id
      firstName
      lastName
      categories {
        name
      }
    }
  }
}`;

export const GET_BENEFICIARIES = gql`
{
  beneficiaries {
    id
    firstName
    lastName
    categories {
      name
    }
  }
}`;