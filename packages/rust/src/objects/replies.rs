use juniper::{graphql_object, graphql_interface};
use base64::{encode};
use mongodb::{bson::{oid::ObjectId}};
use mongodb::bson::DateTime;
use crate::db::{Date, PageInfo};
use crate::db::{Context};

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

#[graphql_interface(for = Reply)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Reply {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
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

pub struct ReplyEdge {
  pub node: Option<Reply>,
  pub cursor: String,
}

#[graphql_object(context = Context)]
impl ReplyEdge {
  fn node(&self) -> &Option<Reply> {
    return &self.node;
  }
  fn cursor(&self) -> &str {
    return &self.cursor;
  }
}

pub struct ReplyConnection {
  pub page_info: PageInfo,
  pub edges: Option<Vec<Option<ReplyEdge>>>
}

#[graphql_object(context = Context)]
impl ReplyConnection {
  fn page_info(&self) -> &PageInfo {
    return &self.page_info;
  }
  fn edges(&self) -> &Option<Vec<Option<ReplyEdge>>> {
    return &self.edges;
  }
}