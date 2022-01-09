use juniper::{graphql_object};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};

pub struct Playlist {
  pub _id: ObjectId,
  pub title: String,
  pub thumbnail: String,
  pub duration: String,
  pub order: i32,
  pub technology_id: ObjectId,
  pub module_id: ObjectId,
}

#[graphql_object]
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
  fn technology_id(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self.technology_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "module_gid")]
  fn module_id(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.module_id.to_hex());
    return juniper::ID::from(encode(id));
  }
}