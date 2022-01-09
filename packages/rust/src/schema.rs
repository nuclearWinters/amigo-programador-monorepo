use juniper::{EmptySubscription, RootNode, FieldError, graphql_object, GraphQLObject, GraphQLInputObject};
use relay_rust::db::{Context};
use relay_rust::user_gql::{User};
use mongodb::{bson::{doc, oid::ObjectId}};
use bcrypt::{verify};
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use relay_rust::db::{ACCESSSECRET, REFRESHSECRET, Claims};
use juniper::futures::TryStreamExt;
use relay_rust::objects::courseds::Coursed;

pub struct Query;

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
}

#[derive(GraphQLInputObject)]
#[graphql(description = "A humanoid creature in the Star Wars universe")]
struct SignInInput {
    password: String,
    email: String,
}

#[derive(GraphQLObject)]
pub struct SignInPayload {
  error: String,
  accessToken: String,
}

pub struct Mutation;

#[graphql_object(context = Context)]
impl Mutation {
  async fn signIn<'a>(&self, input: SignInInput, context: &'a Context) -> Result<Option<SignInPayload>, FieldError> {
    let filter = doc! { "email": input.email };
    let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
    let valid = verify(input.password, &user.password)?;
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
      accessToken: token_access,
    };
    Ok(Some(result))
  }
}

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn schema() -> Schema {
    Schema::new(Query {}, Mutation {}, EmptySubscription::<Context>::new())
}