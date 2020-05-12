import gql from "graphql-tag";

export const GET_ARTICLES = gql`
{
  articles {
    id
    title
    imageUrl
    description
    createdAt
  }
}`;
export const GET_ARTICLE = gql`
query getArticle($id: String!){
	article(id:$id){
    id
    title
    imageUrl
    description
    createdAt
  }
}`;