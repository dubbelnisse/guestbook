export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addPost: Post;
  updatePost: Post;
  removePost?: Maybe<Scalars['Boolean']>;
  likePost?: Maybe<Scalars['Boolean']>;
};


export type MutationAddPostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationRemovePostArgs = {
  post_id: Scalars['String'];
};


export type MutationLikePostArgs = {
  post_id: Scalars['String'];
};

export type Post = {
   __typename?: 'Post';
  id: Scalars['String'];
  text: Scalars['String'];
  author_id: Scalars['String'];
  author_name: Scalars['String'];
  author_avatar: Scalars['String'];
  likes?: Maybe<Scalars['Int']>;
  created: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  user: User;
};

export type Subscription = {
   __typename?: 'Subscription';
  postAdded: Post;
};

export type UpdatePostInput = {
  text: Scalars['String'];
  post_id: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  avatar_url: Scalars['String'];
};
