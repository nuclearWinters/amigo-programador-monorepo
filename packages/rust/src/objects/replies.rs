use juniper::{graphql_object, GraphQLObject};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use mongodb::bson::DateTime;
use crate::db::{Date, PageInfo};

pub struct Reply {
  pub _id: ObjectId,
  pub likes: i32,
  pub comment_id: ObjectId,
  pub text: String,
  pub user_id: ObjectId,
  pub user_username: String,
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

#[graphql_object]
impl Reply {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Reply:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn likes(&self) -> i32 {
    return self.likes;
  }
  #[graphql(name = "comment_gid")]
  fn comment_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.comment_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn text(&self) -> &str {
    return &self.text;
  }
  #[graphql(name = "user_gid")]
  fn user_gid(&self) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self.user_id.to_hex());
    return juniper::ID::from(encode(id));
  }
  #[graphql(name = "user_username")]
  fn user_username(&self) -> &str {
    return &self.user_username;
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

#[derive(GraphQLObject)]
pub struct ReplyEdge {
  pub node: Option<Reply>,
  pub cursor: String,
}

#[derive(GraphQLObject)]
pub struct ReplyConnection {
  pub pageInfo: PageInfo,
  pub edges: Option<Vec<Option<ReplyEdge>>>
}