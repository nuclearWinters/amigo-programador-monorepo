use juniper::{graphql_object, graphql_interface};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use crate::db::{Context};

pub struct Coursing {
  pub _id: ObjectId,
  pub module_id: ObjectId,
  pub user_id: ObjectId,
  pub technology_id: ObjectId,
  pub progress: String,
  pub completed: bool,
}

#[graphql_interface(for = Coursing)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Coursing {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl Coursing {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Coursing:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "module_gid")]
  fn module_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.module_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "user_gid")]
  fn user_gid(&self) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self.user_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "technology_gid")]
  fn technology_gid(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self.technology_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn progress(&self) -> &str {
    return self.progress.as_str();
  }
  fn completed(&self) -> bool {
    return self.completed;
  }
}
