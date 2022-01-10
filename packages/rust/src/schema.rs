use juniper::{EmptySubscription, RootNode, FieldError, graphql_object, GraphQLObject, GraphQLInputObject, graphql_interface};
use relay_rust::db::{Context, CommentMongo, ReplyMongo};
use relay_rust::user_gql::User;
use relay_rust::objects::modules::Module;
use relay_rust::objects::courseds::Coursed;
use relay_rust::objects::technologies::Technology;
use relay_rust::objects::comments::{Comment, CommentEdge};
use relay_rust::objects::replies::{Reply, ReplyEdge};
use relay_rust::objects::likes::Like;
use relay_rust::objects::playlists::Playlist;
use relay_rust::objects::coursings::Coursing;
use mongodb::{bson::{doc, DateTime, oid::ObjectId}, options::{FindOneAndUpdateOptions, ReturnDocument}};
use bcrypt::{verify, hash, DEFAULT_COST};
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use relay_rust::db::{ACCESSSECRET, REFRESHSECRET, Claims, UserMongo};
use juniper::futures::TryStreamExt;
use base64::{decode, encode as encodeId};

pub struct Query;

#[graphql_interface(for = [User, Module, Coursed, Technology, Comment, Reply, Like, Playlist, Coursing])]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for User {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Module {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Coursed {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Coursed:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Technology {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Comment {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Comment:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Reply {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Reply:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Like {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Like:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Playlist {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Playlist:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

impl Node for Coursing {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    let mut id: String = "Coursing:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encodeId(id))
  }
}

#[graphql_object(context = Context)]
impl Query {
  async fn user<'a>(&self, context: &'a Context) -> Result<User, FieldError> {
    if context.user_oid.is_empty() {
      let mut result: Vec<Coursed> = Vec::new();
      result.push(Coursed {
        _id: ObjectId::parse_str("000000000000000000000003").unwrap(),
        technology_id: ObjectId::parse_str("1095f055f92be2001a15885a").unwrap(),
        total: 0,
        default_module_id: ObjectId::parse_str("3095f055f92be2001a15885a").unwrap(),
        user_id: ObjectId::parse_str("7095f055f92be2001a15885a").unwrap(),
      });
      return Ok(User {
        _id: ObjectId::parse_str("000000000000000000000000").unwrap(),
        email: "".to_owned(),
        username: "".to_owned(),
        default_technology_id: ObjectId::parse_str("1095f055f92be2001a15885a").unwrap(),
        coursed: result
      })
    }
    let user_id = &context.user_oid;
    let filter = doc! { "_id": ObjectId::parse_str(user_id).unwrap() };
    let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
    let filter_coursed = doc! { "_id": ObjectId::parse_str(user_id).unwrap() };
    let mut cursor = context.coursed.find(filter_coursed, None).await?;
    let mut result: Vec<Coursed> = Vec::new();
    while let Some(coursed) = cursor.try_next().await? {
      let coursing_graphql = Coursed {
        _id: coursed._id,
        technology_id: coursed.technology_id,
        total: coursed.total,
        default_module_id: coursed.default_module_id,
        user_id: coursed.user_id,
      };
      result.push(coursing_graphql);
    }
    let user_graphql = User {
      _id: user._id,
      email: user.email,
      username: user.username,
      default_technology_id: user.default_technology_id,
      coursed: result
    };
    Ok(user_graphql)
  }
  async fn node<'a>(&self, id: juniper::ID, context: &'a Context) -> Result<NodeValue, FieldError> {
    let gid = decode(id.to_string()).unwrap();
    let decoded = String::from_utf8(gid).unwrap();
    let split = decoded.split(":");
    let vec = split.collect::<Vec<&str>>();
    let type_obj = vec[0];
    let oid = ObjectId::parse_str(vec[1]).unwrap();
    match type_obj {
      "User" => {
        if vec[1] == "000000000000000000000000" {
          let result: Vec<Coursed> = Vec::new();
          let human = User { 
            _id: ObjectId::parse_str("000000000000000000000000").unwrap(),
            email: "".to_owned(),
            username: "".to_owned(),
            default_technology_id: ObjectId::parse_str("1095f055f92be2001a15885a").unwrap(),
            coursed: result
          };
          let character: NodeValue = human.into();
          return Ok(character)
        } else {
          let filter = doc! { "_id": oid };
          let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
          let result: Vec<Coursed> = Vec::new();
          let node_interface = User {
            _id: user._id,
            email: user.email,
            username: user.username,
            default_technology_id: user.default_technology_id,
            coursed: result
          };
          let node_value: NodeValue = node_interface.into();
          return Ok(node_value)
        }
      },
      "Module" => {
        let filter = doc! { "_id": oid };
        let module = context.modules.find_one(filter, None).await?.expect("Missing 'Module' document.");
        let node_interface = Module {
          _id: module._id,
          title: module.title,
          date: module.date,
          description: module.description,
        };
        let node_value: NodeValue = node_interface.into();
        return Ok(node_value)
      },
      "Comment" => {
        let filter = doc! { "_id": oid };
        let comment = context.comments.find_one(filter, None).await?.expect("Missing 'Comment' document.");
        let node_interface = Comment {
          _id: comment._id,
          likes: comment.likes,
          module_id: comment.module_id,
          text: comment.text,
          user_id: comment.user_id,
          user_username: comment.user_username,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
        };
        let node_value: NodeValue = node_interface.into();
        return Ok(node_value)
      },
      "Reply" => {
        let filter = doc! { "_id": oid };
        let reply = context.replies.find_one(filter, None).await?.expect("Missing 'Reply' document.");
        let node_interface = Reply {
          _id: reply._id,
          likes: reply.likes,
          comment_id: reply.comment_id,
          text: reply.text,
          user_id: reply.user_id,
          user_username: reply.user_username,
          created_at: reply.created_at,
          updated_at: reply.updated_at,
        };
        let node_value: NodeValue = node_interface.into();
        return Ok(node_value)
      },
      _ => {
        return Err(FieldError::from("No matched type."))
      },
    }
  }
}

#[derive(GraphQLInputObject)]
struct SignInInput {
  password: String,
  email: String,
  client_mutation_id: Option<String>,
}

#[derive(GraphQLObject)]
pub struct SignInPayload {
  error: String,
  access_token: String,
  client_mutation_id: Option<String>,
}

#[derive(GraphQLInputObject)]
struct SignUpInput {
  password: String,
  email: String,
  username: String,
  client_mutation_id: Option<String>,
}

#[derive(GraphQLObject)]
pub struct SignUpPayload {
  error: String,
  access_token: String,
  client_mutation_id: Option<String>,
}

#[derive(GraphQLInputObject)]
struct LogOutInput {
  client_mutation_id: Option<String>,
}

#[derive(GraphQLObject)]
pub struct LogOutPayload {
  error: String,
  client_mutation_id: Option<String>,
}

#[derive(GraphQLInputObject)]
struct AddCommentInput {
  comment: String,
  #[graphql(name="module_gid")]
  module_gid: juniper::ID,
  #[graphql(name="user_username")]
  user_username: String,
  client_mutation_id: Option<String>,
}

pub struct AddCommentPayload {
  pub error: String,
  pub access_token: String,
  pub comment_edge: Option<CommentEdge>,
  pub client_mutation_id: Option<String>,
}

#[graphql_object(context =  Context)]
impl AddCommentPayload {
  fn error(&self) -> &str {
    return &self.error;
  }
  fn access_token(&self) -> &str {
    return &self.access_token;
  }
  #[graphql(name = "comment_edge")]
  fn comment_edge(&self) -> &Option<CommentEdge> {
    return &self.comment_edge;
  }
  fn client_mutation_id(&self) -> &Option<String> {
    return &self.client_mutation_id;
  }
}

#[derive(GraphQLInputObject)]
struct AddReplyInput {
  comment: String,
  #[graphql(name="comment_gid")]
  comment_gid: juniper::ID,
  #[graphql(name="user_username")]
  user_username: String,
  client_mutation_id: Option<String>,
}

pub struct AddReplyPayload {
  pub error: String,
  pub access_token: String,
  pub reply_edge: Option<ReplyEdge>,
  pub client_mutation_id: Option<String>,
}

#[graphql_object(context =  Context)]
impl AddReplyPayload {
  fn error(&self) -> &str {
    return &self.error;
  }
  fn access_token(&self) -> &str {
    return &self.access_token;
  }
  #[graphql(name = "reply_edge")]
  fn reply_edge(&self) -> &Option<ReplyEdge> {
    return &self.reply_edge;
  }
  fn client_mutation_id(&self) -> &Option<String> {
    return &self.client_mutation_id;
  }
}

#[derive(GraphQLInputObject)]
struct UpdateDefaultModuleInput {
  #[graphql(name="module_gid")]
  module_gid: juniper::ID,
  #[graphql(name="technology_gid")]
  technology_gid: juniper::ID,
  client_mutation_id: Option<String>,
}

pub struct UpdateDefaultModulePayload {
  error: String,
  access_token: String,
  coursed_module: Option<Coursed>,
  client_mutation_id: Option<String>,
}

#[graphql_object(context =  Context)]
impl UpdateDefaultModulePayload {
  fn error(&self) -> &str {
    return &self.error;
  }
  fn access_token(&self) -> &str {
    return &self.access_token;
  }
  fn coursed_module(&self) -> &Option<Coursed> {
    return &self.coursed_module;
  }
  fn client_mutation_id(&self) -> &Option<String> {
    return &self.client_mutation_id;
  }
}

pub struct Mutation;

#[graphql_object(context = Context)]
impl Mutation {
  async fn signIn<'a>(&self, input: SignInInput, context: &'a Context) -> Result<Option<SignInPayload>, FieldError> {
    let filter = doc! { "email": input.email };
    let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
    let _valid = verify(input.password, &user.password)?;
    let key_access = ACCESSSECRET.as_bytes();
    let key_refresh = REFRESHSECRET.as_bytes();
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();
    let my_claims_access =
        Claims { _id: user._id.to_hex(), exp: (since_the_epoch + 900) as usize };
    let token_access = match encode(&Header::default(), &my_claims_access, &EncodingKey::from_secret(key_access)) {
        Ok(t) => t,
        Err(_) => panic!(), // in practice you would return the error
    };
    let my_claims_refresh =
        Claims { _id: user._id.to_hex(), exp: (since_the_epoch + 2592000) as usize };
    let token_refresh = match encode(&Header::default(), &my_claims_refresh, &EncodingKey::from_secret(key_refresh)) {
        Ok(t) => t,
        Err(_) => panic!(), // in practice you would return the error
    };
    let mut new_cookie = context.new_cookie.write().await;
    *new_cookie = token_refresh;
    let result = SignInPayload {
      error: "".to_owned(),
      access_token: token_access,
      client_mutation_id: None,
    };
    Ok(Some(result))
  }
  async fn signUp<'a>(&self, input: SignUpInput, context: &'a Context) -> Result<Option<SignUpPayload>, FieldError> {
    let email_input = &input.email;
    let username_input = &input.username;
    let filter = doc! { "$or": [{ "email": email_input.to_owned(), "username": username_input.to_owned() }] };
    let user = context.users.find_one(filter, None).await?;
    if user.is_some() {
      let user_unwrapped = user.unwrap();
      if user_unwrapped.email == email_input.to_owned() {
        return Ok(Some(SignUpPayload {
          error: "El email ya esta siendo usado.".to_owned(),
          access_token: "".to_owned(),
          client_mutation_id: None,
        }))
      } else {
        return Ok(Some(SignUpPayload {
          error: "El username ya esta siendo usado.".to_owned(),
          access_token: "".to_owned(),
          client_mutation_id: None,
        }))
      }
    }
    let hashed = hash(input.password, DEFAULT_COST)?;
    let _id = ObjectId::new();
    let new_doc = UserMongo {
      _id: _id,
      email: email_input.to_owned(),
      password: hashed,
      username: username_input.to_owned(),
      default_technology_id: ObjectId::parse_str("3095f055f92be2001a15885a").unwrap(),
   };
    let insert_result = context.users.insert_one(new_doc, None).await?;
    let key_access = ACCESSSECRET.as_bytes();
    let key_refresh = REFRESHSECRET.as_bytes();
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();
    let my_claims_access =
        Claims { _id: insert_result.inserted_id.as_str().unwrap().to_owned(), exp: (since_the_epoch + 900) as usize };
    let token_access = match encode(&Header::default(), &my_claims_access, &EncodingKey::from_secret(key_access)) {
        Ok(t) => t,
        Err(_) => panic!(), // in practice you would return the error
    };
    let my_claims_refresh =
        Claims { _id: insert_result.inserted_id.as_str().unwrap().to_owned(), exp: (since_the_epoch + 2592000) as usize };
    let token_refresh = match encode(&Header::default(), &my_claims_refresh, &EncodingKey::from_secret(key_refresh)) {
        Ok(t) => t,
        Err(_) => panic!(), // in practice you would return the error
    };
    let mut new_cookie = context.new_cookie.write().await;
    *new_cookie = token_refresh;
    let result = SignUpPayload {
      error: "".to_owned(),
      access_token: token_access,
      client_mutation_id: None,
    };
    Ok(Some(result))
  }
  async fn logOut<'a>(&self, _input: LogOutInput, context: &'a Context) -> Result<Option<LogOutPayload>, FieldError> {
    let mut new_cookie = context.new_cookie.write().await;
    *new_cookie = "delete".to_owned();
    Ok(Some(
      LogOutPayload {
      error: "".to_owned(),
      client_mutation_id: None,
    }))
  }
  async fn addComment<'a>(&self, input: AddCommentInput, context: &'a Context) -> Result<Option<AddCommentPayload>, FieldError> {
    let valid_access_token = &context.valid_access_token;
    let user_oid = &context.user_oid;
    if context.valid_access_token.is_empty() || context.user_oid.is_empty() {
      return Ok(Some(
        AddCommentPayload {
        error: "No logged user.".to_owned(),
        access_token: valid_access_token.to_owned(),
        comment_edge: None,
        client_mutation_id: None,
      }))
    }
    let user_username = &input.user_username;
    let comment = &input.comment;
    let date = DateTime::now();
    let gid = decode(input.module_gid.to_string()).unwrap();
    let decoded = String::from_utf8(gid).unwrap();
    let split = decoded.split(":");
    let vec = split.collect::<Vec<&str>>();
    let module_oid = ObjectId::parse_str(vec[1]).unwrap();
    let user_oid = ObjectId::parse_str(user_oid).unwrap();
    let comment_oid = ObjectId::new();
    let new_doc = CommentMongo {
      _id: comment_oid,
      text: comment.to_owned(),
      user_id: user_oid,
      user_username: user_username.to_owned(),
      module_id: module_oid,
      created_at: date,
      updated_at: date,
      likes: 0
   };
    let insert_result = context.comments.insert_one(new_doc, None).await?;
    let mut id: String = "arrayconnection:".to_owned();
    id.push_str(insert_result.inserted_id.as_str().unwrap());
    let cursor = encodeId(id);
    Ok(Some(
      AddCommentPayload {
      error: "".to_owned(),
      access_token: valid_access_token.to_owned(),
      comment_edge: Some(CommentEdge {
        node: Some(
          Comment {
            _id: comment_oid,
            likes: 0,
            module_id: module_oid,
            text: comment.to_owned(),
            user_id: user_oid,
            user_username: user_username.to_owned(),
            created_at: date,
            updated_at: date,
          }
        ),
        cursor: cursor,
      }),
      client_mutation_id: None,
    }))
  }
  async fn addReply<'a>(&self, input: AddReplyInput, context: &'a Context) -> Result<Option<AddReplyPayload>, FieldError> {
    let valid_access_token = &context.valid_access_token;
    let user_oid = &context.user_oid;
    if context.valid_access_token.is_empty() || context.user_oid.is_empty() {
      return Ok(Some(
        AddReplyPayload {
        error: "No logged user.".to_owned(),
        access_token: valid_access_token.to_owned(),
        reply_edge: None,
        client_mutation_id: None,
      }))
    }
    let user_username = &input.user_username;
    let comment = &input.comment;
    let date = DateTime::now();
    let gid = decode(input.comment_gid.to_string()).unwrap();
    let decoded = String::from_utf8(gid).unwrap();
    let split = decoded.split(":");
    let vec = split.collect::<Vec<&str>>();
    let module_oid = ObjectId::parse_str(vec[1]).unwrap();
    let user_oid = ObjectId::parse_str(user_oid).unwrap();
    let comment_oid = ObjectId::new();
    let new_doc = ReplyMongo {
      _id: comment_oid,
      text: comment.to_owned(),
      user_id: user_oid,
      user_username: user_username.to_owned(),
      comment_id: module_oid,
      created_at: date,
      updated_at: date,
      likes: 0
   };
    let insert_result = context.replies.insert_one(new_doc, None).await?;
    let mut id: String = "arrayconnection:".to_owned();
    id.push_str(insert_result.inserted_id.as_str().unwrap());
    let cursor = encodeId(id);
    Ok(Some(
      AddReplyPayload {
      error: "".to_owned(),
      access_token: valid_access_token.to_owned(),
      reply_edge: Some(ReplyEdge {
        node: Some(
          Reply {
            _id: comment_oid,
            likes: 0,
            comment_id: module_oid,
            text: comment.to_owned(),
            user_id: user_oid,
            user_username: user_username.to_owned(),
            created_at: date,
            updated_at: date,
          }
        ),
        cursor: cursor,
      }),
      client_mutation_id: None,
    }))
  }
  async fn updateDefaultModule<'a>(&self, input: UpdateDefaultModuleInput, context: &'a Context) -> Result<Option<UpdateDefaultModulePayload>, FieldError> {
    let user_oid_str = &context.user_oid;
    if context.valid_access_token.is_empty() || context.user_oid.is_empty() {
      return Ok(Some(
        UpdateDefaultModulePayload {
          access_token: "".to_owned(),
          error: "No logged user.".to_owned(),
          coursed_module: None,
          client_mutation_id: None,
        }
      ));
    }
    let user_oid = ObjectId::parse_str(user_oid_str.to_owned()).unwrap();

    let gid_module = decode(input.module_gid.to_string()).unwrap();
    let decoded_module = String::from_utf8(gid_module).unwrap();
    let split_module = decoded_module.split(":");
    let vec_module = split_module.collect::<Vec<&str>>();
    let module_oid = ObjectId::parse_str(vec_module[1]).unwrap();

    let gid_technology = decode(input.technology_gid.to_string()).unwrap();
    let decoded_technology = String::from_utf8(gid_technology).unwrap();
    let split_technology = decoded_technology.split(":");
    let vec_technology = split_technology.collect::<Vec<&str>>();
    let technology_oid = ObjectId::parse_str(vec_technology[1]).unwrap();

    let filter = doc! { "user_id": user_oid, "technology_id": technology_oid };
    let update = doc! { "$set": { "default_module_id": module_oid }, "$setOnInsert": { "user_id": user_oid, "technology_id": technology_oid, "total": 0 } };
    let find_options = FindOneAndUpdateOptions::builder().upsert(true).return_document(ReturnDocument::After).build();
    let result = context.coursed.find_one_and_update(filter, update, find_options).await?;
    let coursed = result.unwrap();
    Ok(Some(
      UpdateDefaultModulePayload {
        access_token: "".to_owned(),
        error: "".to_owned(),
        coursed_module: Some(
          Coursed {
            _id: coursed._id,
            technology_id: coursed.technology_id,
            total: coursed.total,
            default_module_id: coursed.default_module_id,
            user_id: coursed.user_id,
          }
        ),
        client_mutation_id: None,
      }
    ))
  }
}

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn schema() -> Schema {
    Schema::new(Query {}, Mutation {}, EmptySubscription::<Context>::new())
}