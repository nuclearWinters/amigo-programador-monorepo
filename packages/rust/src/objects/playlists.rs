use juniper::{graphql_object, graphql_interface};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use crate::db::{Context};

pub struct Playlist {
  pub _id: ObjectId,
  pub title: String,
  pub thumbnail: String,
  pub duration: String,
  pub order: i32,
  pub technology_id: ObjectId,
  pub module_id: ObjectId,
}

#[graphql_interface(for = Playlist)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Playlist {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl Playlist {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Playlist:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn title(&self) -> &str {
    return self.title.as_str();
  }
  fn thumbnail(&self) -> &str {
    return self.thumbnail.as_str();
  }
  fn duration(&self) -> &str {
    return self.duration.as_str();
  }
  fn order(&self) -> i32 {
    return self.order;
  }
  #[graphql(name = "technology_gid")]
  fn technology_gid(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self.technology_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "module_gid")]
  fn module_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.module_id.to_hex());
    return juniper::ID::from(encode(id));
  }
}