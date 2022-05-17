import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    likes: [Like]!
    likesCount: Int!
    username: String!
    createdAt: String!
    commentsCount: Int!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    toggleLike(postId: ID!): Post!
    deletePost(postId: ID!): String!
    createPost(body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    createComment(postId: String!, body: String!): Post!
  }

  type Subscription {
    postCreated: Post!
  }
`;
