use juniper::{graphql_object, graphql_interface};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use mongodb::bson::DateTime;
use crate::db::{Date, Context};

pub struct Like {
  pub _id: ObjectId,
  pub comment_id: ObjectId,
  pub user_id: ObjectId,
  pub status: bool,
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

#[graphql_interface(for = Like)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Like {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl Like {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Like:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "comment_id")]
  fn comment_id(&self) -> juniper::ID {
    let mut id: String = "Comment:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "user_id")]
  fn user_id(&self) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn status(&self) -> bool {
    return self.status;
  }
  #[graphql(name = "created_at")]
  fn created_at(&self) -> Date {
    return Date::new(self.created_at);
  }
  #[graphql(name = "updated_at")]
  fn updated_at(&self) -> Date {
    return Date::new(self.updated_at);
  }
}