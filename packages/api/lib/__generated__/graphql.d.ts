import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  _empty: Maybe<Scalars['String']>,
  addPost: Post,
  updatePost: Post,
  removePost: Maybe<Scalars['Boolean']>,
  likePost: Maybe<Scalars['Boolean']>,
};


export type MutationAddPostArgs = {
  input: PostInput
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput
};


export type MutationRemovePostArgs = {
  post_id: Scalars['String']
};


export type MutationLikePostArgs = {
  post_id: Scalars['String']
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['String'],
  text: Scalars['String'],
  author_id: Scalars['String'],
  author_name: Scalars['String'],
  author_avatar: Scalars['String'],
  likes: Maybe<Scalars['Int']>,
  created: Scalars['String'],
};

export type PostInput = {
  text: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  _empty: Maybe<Scalars['String']>,
  posts: Maybe<Array<Post>>,
  user: User,
};

export type Subscription = {
   __typename?: 'Subscription',
  postAdded: Post,
};

export type UpdatePostInput = {
  text: Scalars['String'],
  post_id: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  name: Scalars['String'],
  avatar_url: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Post: ResolverTypeWrapper<Post>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  User: ResolverTypeWrapper<User>,
  Mutation: ResolverTypeWrapper<{}>,
  PostInput: PostInput,
  UpdatePostInput: UpdatePostInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Subscription: ResolverTypeWrapper<{}>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Post: Post,
  Int: Scalars['Int'],
  User: User,
  Mutation: {},
  PostInput: PostInput,
  UpdatePostInput: UpdatePostInput,
  Boolean: Scalars['Boolean'],
  Subscription: {},
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
};

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge: Maybe<Maybe<Scalars['Int']>>,
  scope: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  addPost: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationAddPostArgs, 'input'>>,
  updatePost: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>,
  removePost: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'post_id'>>,
  likePost: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'post_id'>>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  text: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author_id: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author_name: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author_avatar: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  likes: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  created: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posts: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>,
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  postAdded: SubscriptionResolver<ResolversTypes['Post'], "postAdded", ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  avatar_url: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Mutation: MutationResolvers<ContextType>,
  Post: PostResolvers<ContextType>,
  Query: QueryResolvers<ContextType>,
  Subscription: SubscriptionResolvers<ContextType>,
  Upload: GraphQLScalarType,
  User: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated: IsAuthenticatedDirectiveResolver<any, any, ContextType>,
  cacheControl: CacheControlDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;