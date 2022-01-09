use juniper::{graphql_object};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};

pub struct Technology {
  pub _id: ObjectId,
  pub title: String,
  pub total: i32,
  pub order: i32,
  pub default_module_gid: ObjectId,
}

#[graphql_object]
impl Technology {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn title(&self) -> &str {
    return self.title.as_str();
  }
  fn total(&self) -> i32 {
    return self.total;
  }
  fn order(&self) -> i32 {
    return self.order;
  }
  #[graphql(name = "default_module_gid")]
  fn default_module_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.default_module_gid.to_hex());
    return juniper::ID::from(encode(id));
  }
}