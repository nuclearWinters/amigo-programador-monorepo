use serde::{Deserialize, Serialize};
use mongodb::{bson::oid::ObjectId};
use mongodb::{Collection};
use mongodb::bson::DateTime;
use juniper::{ParseScalarResult, Value, ParseScalarValue, GraphQLObject};
use tokio::sync::RwLock;
use jsonwebtoken::errors::ErrorKind;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserMongo {
  pub _id: ObjectId,
  pub email: String,
  pub password: String,
  pub username: String,
  pub default_technology_id: ObjectId,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TechnologyMongo {
  pub _id: ObjectId,
  pub title: String,
  pub total: i32,
  pub order: i32,
  pub default_module_id: ObjectId
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CoursedMongo {
  pub _id: ObjectId,
  pub technology_id: ObjectId,
  pub total: i32,
  pub default_module_id: ObjectId,
  pub user_id: ObjectId,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PlaylistMongo {
  pub _id: ObjectId,
  pub title: String,
  pub thumbnail: String,
  pub duration: String,
  pub order: i32,
  pub technology_id: ObjectId,
  pub module_id: ObjectId,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ModuleMongo {
  pub _id: ObjectId,
  pub title: String,
  pub date: DateTime,
  pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CoursingMongo {
  pub _id: ObjectId,
  pub user_id: ObjectId,
  pub module_id: ObjectId,
  pub progress: String,
  pub completed: bool,
  pub technology_id: ObjectId,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentMongo {
  pub _id: ObjectId,
  pub module_id: ObjectId,
  pub likes: i32,
  pub text: String,
  pub user_id: ObjectId,
  pub user_username: String, //if user updates username then what?
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ReplyMongo {
  pub _id: ObjectId,
  pub comment_id: ObjectId,
  pub likes: i32,
  pub text: String,
  pub user_id: ObjectId,
  pub user_username: String, //if user updates username then what?
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LikeMongo {
  pub _id: ObjectId,
  pub comment_id: ObjectId,
  pub user_id: ObjectId,
  pub status: bool,
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

pub struct Context {
  pub users: Collection<UserMongo>,
  pub technologies: Collection<TechnologyMongo>,
  pub comments: Collection<CommentMongo>,
  pub replies: Collection<ReplyMongo>,
  pub playlists: Collection<PlaylistMongo>,
  pub modules: Collection<ModuleMongo>,
  pub coursing: Collection<CoursingMongo>,
  pub likes: Collection<LikeMongo>,
  pub coursed: Collection<CoursedMongo>,
  pub new_cookie: RwLock<String>,
  pub user_oid: String,
  pub valid_access_token: String,
}

impl juniper::Context for Context {}

pub struct Date(DateTime);

impl Date {
  pub fn new(date: DateTime) -> Date {
    Date(date)
  }
}

#[juniper::graphql_scalar(description = "Date")]
impl<S> GraphQLScalar for Date
where
  S: ScalarValue
{
  fn resolve(&self) -> Value {
    Value::scalar(self.0.timestamp_millis() as f64)
  }
  fn from_input_value(value: &InputValue) -> Option<Date> {
    value.as_string_value()
      .map(|s| Date(DateTime::from_millis(s.parse::<i64>().unwrap())))
  }
  fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
    <String as ParseScalarValue<S>>::from_str(value)
  }
}

#[derive(GraphQLObject)]
pub struct PageInfo {
  pub has_next_page: bool,
  pub has_previous_page: bool,
  pub start_cursor: Option<String>,
  pub end_cursor: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
  pub _id: String,
  pub exp: usize,
}

pub const MONGO_DB: &str = "mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
pub const REFRESHSECRET: &str = "REFRESHSECRET";
pub const ACCESSSECRET: &str = "ACCESSSECRET";
pub const REDIS: &str = "redis://redis-courses:6379";

pub struct Auth {
  pub user_oid: String,
  pub valid_access_token: String,
}

pub fn refresh_token_middleware(access_token: Option<String>, refresh_token: Option<String>) -> Result<Auth, String> {
  if access_token.is_none() {
    return Ok(Auth {
      user_oid: "".to_owned(),
      valid_access_token: "".to_owned()
    })
  }
  let access_token_unwrapped = access_token.unwrap();
  let validation = Validation { ..Validation::default() };
  let token_data = match decode::<Claims>(&access_token_unwrapped, &DecodingKey::from_secret(REFRESHSECRET.as_bytes()), &validation) {
      Ok(c) => c,
      Err(err) => match *err.kind() {
          ErrorKind::InvalidToken => {
            let refresh_token_unwrapped = refresh_token.unwrap();
            let refresh_token_data = match decode::<Claims>(&refresh_token_unwrapped, &DecodingKey::from_secret(REFRESHSECRET.as_bytes()), &validation) {
              Ok(c) => c,
              Err(err) => match *err.kind() {
                _ => {
                  return Ok(Auth {
                    user_oid: "".to_owned(),
                    valid_access_token: "".to_owned()
                  })
                },
              }
            };
            return Ok(Auth {
              user_oid: refresh_token_data.claims._id,
              valid_access_token: refresh_token_unwrapped
            })
          },
          ErrorKind::ExpiredSignature => {
            let refresh_token_unwrapped = refresh_token.unwrap();
            let refresh_token_data = match decode::<Claims>(&refresh_token_unwrapped, &DecodingKey::from_secret(REFRESHSECRET.as_bytes()), &validation) {
              Ok(c) => c,
              Err(err) => match *err.kind() {
                _ => {
                  return Ok(Auth {
                    user_oid: "".to_owned(),
                    valid_access_token: "".to_owned()
                  })
                },
              }
            };
            let key_access = ACCESSSECRET.as_bytes();
            let _id = &refresh_token_data.claims._id;
            let start = SystemTime::now();
            let since_the_epoch = start
                .duration_since(UNIX_EPOCH)
                .expect("Time went backwards")
                .as_secs();
            let my_claims_access =
                Claims { _id: _id.to_owned(), exp: (since_the_epoch + 900) as usize };
            let token_access = match encode(&Header::default(), &my_claims_access, &EncodingKey::from_secret(key_access)) {
                Ok(t) => t,
                Err(_) => panic!(), // in practice you would return the error
            };
            return Ok(Auth {
              user_oid: _id.to_owned(),
              valid_access_token: token_access
            })
          },
          _ => {
            return Ok(Auth {
              user_oid: "".to_owned(),
              valid_access_token: "".to_owned()
            })
          },
      },
  };
  Ok(Auth {
    user_oid: token_data.claims._id,
    valid_access_token: access_token_unwrapped,
  })
}