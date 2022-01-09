use juniper::{graphql_object, graphql_interface};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use crate::db::{Context};

pub struct Coursed {
  pub _id: ObjectId,
  pub technology_id: ObjectId,
  pub total: i32,
  pub default_module_id: ObjectId,
  pub user_id: ObjectId,
}

#[graphql_interface(for = Coursed)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Coursed {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl Coursed {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Coursed:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "technology_gid")]
  fn technology_gid(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self.technology_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn total(&self) -> i32 {
    return self.total;
  }
  #[graphql(name = "default_module_gid")]
  fn default_module_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.default_module_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "user_gid")]
  fn user_gid(&self) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self.user_id.to_hex());
    return juniper::ID::from(encode(id));
  }
}
