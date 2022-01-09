use juniper::{EmptySubscription, RootNode, FieldError, graphql_object, GraphQLObject};
use relay_rust::db::{Context};
use relay_rust::user_gql::{User};
use mongodb::{bson::{doc}};
use bcrypt::{verify};
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use relay_rust::db::{ACCESSSECRET, REFRESHSECRET, Claims};



pub struct Query;

#[graphql_object(context = Context)]
impl Query {
  async fn user<'a>(&self, context: &'a Context) -> Result<User, FieldError> {
    let filter = doc! { "username": "nuclearWinters" };
    let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
    let user_graphql = User {
      _id: user._id,
      email: user.email,
      username: user.username,
      default_technology_id: user.default_technology_id,
    };
    Ok(user_graphql)
  }
}

#[derive(GraphQLObject)]
pub struct SignIn {
  error: String,
  accessToken: String,
}

pub struct Mutations;

#[graphql_object(context = Context)]
impl Mutations {
  async fn signIn<'a>(&self, email: String, password: String, context: &'a Context) -> Result<SignIn, FieldError> {
    let filter = doc! { "email": email };
    let user = context.users.find_one(filter, None).await?.expect("Missing 'User' document.");
    let valid = verify(password, &user.password)?;
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
    let result = SignIn {
      error: "".to_owned(),
      accessToken: token_access,
    };
    Ok(result)
  }
}

pub type Schema = RootNode<'static, Query, Mutations, EmptySubscription<Context>>;

pub fn schema() -> Schema {
    Schema::new(Query {}, Mutations {}, EmptySubscription::<Context>::new())
}