use juniper::{graphql_object};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};

pub struct Coursed {
  pub _id: ObjectId,
  pub total: i32,
  pub default_module_id: ObjectId,
  pub user_id: ObjectId,
}

#[graphql_object]
impl Coursed {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Coursing:".to_owned();
    id.push_str(&self._id.to_hex());
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
