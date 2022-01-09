use juniper::{EmptySubscription, RootNode, FieldError, graphql_object, GraphQLObject, GraphQLInputObject, graphql_interface};
use relay_rust::db::{Context};
use relay_rust::user_gql::User;
use relay_rust::objects::modules::Module;
use relay_rust::objects::courseds::Coursed;
use relay_rust::objects::technologies::Technology;
use relay_rust::objects::comments::Comment;
use relay_rust::objects::replies::Reply;
use relay_rust::objects::likes::Like;
use relay_rust::objects::playlists::Playlist;
use relay_rust::objects::coursings::Coursing;
use mongodb::{bson::{doc, oid::ObjectId}};
use bcrypt::{verify};
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use relay_rust::db::{ACCESSSECRET, REFRESHSECRET, Claims};
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
}

#[derive(GraphQLObject)]
pub struct SignInPayload {
  error: String,
  access_token: String,
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
    };
    Ok(Some(result))
  }
}

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn schema() -> Schema {
    Schema::new(Query {}, Mutation {}, EmptySubscription::<Context>::new())
}