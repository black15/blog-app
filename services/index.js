import {request, gql} from 'graphql-request'
import {API} from '../config'

const graphcms_api = process.env.NEXT_GRAPHCMS_API_ENDPONT

export const getPosts = async () => {

  const query = gql`
    query Fetcher {
      postsConnection {
        edges {
          node {
            createdAt
            excerpt
            slug
            title
            image {
              url
            }
            content {
              raw
            }
            categories {
              id
              name
              slug
            }
            author {
              bio
              name
              id
              image {
                url
              }
            }
          }
        }
      }
    }
  `

  const data = await request(graphcms_api, query)

  return data.postsConnection.edges;
}

export const getRecentPosts = async () => {

  const query = gql`
    query getRecentPostDetails {
      posts(
        orderBy: createdAt_DESC
        last: 3
      ){
        title
        image {
          url
        }
        createdAt
        slug
        excerpt
      }
    }
  `

  const data = await request(graphcms_api, query)
  return data.posts;
}

export const getRelatedPosts = async (slug, categories) => {

  const query = gql`
    query GetRelatedPosts($slug: String!, $categories: [String!]) {
      posts (
        where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}} }
        last: 3
      )
      {
        title
        slug
        excerpt
        createdAt
        image {
          url
        }
      }
    }
  `

  const data = await request('https://api-ca-central-1.hygraph.com/v2/clbuumc9u31s101us7xrq9ybc/master', query, {slug, categories})

  return data.posts;
}

export const getCategories = async () => {

  const query = gql`
    query GetCategories {
      categories{
        id
        name
        slug
      }
    }
  `

  const data = await request('https://api-ca-central-1.hygraph.com/v2/clbuumc9u31s101us7xrq9ybc/master', query)

  return data.categories;
}

export const getPostBySlug = async (slug) => {

  const query = gql`
    query GetPostBySlug($slug: String!) {
      post(where: {slug: $slug}) {
        id
        title
        excerpt
        content {
          raw
        }
        slug
        createdAt
        updatedAt
        author {
          id
          name
          bio
          createdAt
          image {
            url
          }
        }
        image {
          url
        }
        categories {
          id
          name
          slug
        }
        comments {
          comment
          email
          name
          id
          createdAt
        }
      }
    }
  `

  const data = await request(graphcms_api, query, {slug})

  return data.post;
}