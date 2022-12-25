// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql, request } from "graphql-request"

const graphcms_api    = process.env.NEXT_GRAPHCMS_API_ENDPONT
const graphcms_token  = process.env.GRAPHCMS_TOKEN

export default async function CommentHandler(req, res) {
  const graphQLClient = new GraphQLClient(graphcms_api, {
    headers: {
      Authorization: `Bearer ${graphcms_token}`,
    },
  });

  const query = gql`
    mutation ($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: { slug: $slug }}}) { id }
    }
  `
  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}
