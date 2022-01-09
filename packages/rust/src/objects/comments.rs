use juniper::{graphql_object, FieldError, graphql_interface};
use base64::{encode, decode};
use mongodb::{bson::{oid::ObjectId, doc}, options::FindOptions};
use mongodb::bson::DateTime;
use crate::db::{Date, PageInfo};
use crate::db::{Context};
use juniper::futures::TryStreamExt;
use crate::objects::replies::{ReplyConnection, ReplyEdge, Reply};

pub struct Comment {
  pub _id: ObjectId,
  pub likes: i32,
  pub module_id: ObjectId,
  pub text: String,
  pub user_id: ObjectId,
  pub user_username: String,
  pub created_at: DateTime,
  pub updated_at: DateTime,
}

#[graphql_interface(for = Comment)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for Comment {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl Comment {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Comment:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn likes(&self) -> i32 {
    return self.likes;
  }
  #[graphql(name = "module_gid")]
  fn module_gid(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self.module_id.to_hex());
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
  #[graphql(
    arguments(
      comment_gid(
        name = "comment_gid"
      ),
    ),
  )]
  async fn replies<'ctx>(
    &self, 
    after: Option<String>,
    first: Option<i32>,
    comment_gid: Option<juniper::ID>,
    context: &'ctx Context
  ) -> Result<ReplyConnection, FieldError> {
    if comment_gid.is_none() || first.is_none() || first.unwrap() < 0 {
      let edges: Vec<Option<ReplyEdge>> = Vec::new();
      return Ok(ReplyConnection {
        edges: Some(edges),
        page_info: PageInfo {
          has_next_page: false,
          has_previous_page: false,
          start_cursor: None,
          end_cursor: None,
        },
      })
    }
    let first_unwrapped = first.unwrap();
    let limit = first.unwrap() + 1;
    let find_options = FindOptions::builder().limit(limit as i64).sort(doc! { "$natural": -1 }).build();
    let after_unwrapped = after.unwrap();
    let query = if after_unwrapped.is_empty() {
      doc! { "comment_id": self._id }
    } else {
      let gid = decode(after_unwrapped).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let comment_id = ObjectId::parse_str(vec[1]).unwrap();
      doc! { "comment_id": self._id, "_id": { "$lt": comment_id } }
    };
    let mut edges: Vec<Option<ReplyEdge>> = Vec::new();
    let mut cursor = context.replies.find(query, find_options).await?;
    while let Some(reply) = cursor.try_next().await? {
      let mut id: String = "arrayconnection:".to_owned();
      id.push_str(&reply._id.to_hex());
      let cursor = encode(id);
      let reply_edge_graphql = Some(ReplyEdge {
        node: Some(Reply {
          _id: reply._id,
          likes: reply.likes,
          comment_id: reply.comment_id,
          text: reply.text,
          user_id: reply.user_id,
          user_username: reply.user_username,
          created_at: reply.created_at,
          updated_at: reply.updated_at,
        }),
        cursor: cursor,
      });
      edges.push(reply_edge_graphql);
    }
    let length = edges.len();
    let start_cursor = if length == 0 { Some((&edges[0].as_ref().unwrap().cursor).to_owned()) } else { None };
    let end_cursor = if length == 0 { Some((&edges[length - 1].as_ref().unwrap().cursor).to_owned()) } else { None };
    let reply_connection = ReplyConnection {
      edges: Some(edges),
      page_info: PageInfo {
        has_next_page: length as i32 > first_unwrapped,
        has_previous_page: false,
        start_cursor: start_cursor,
        end_cursor: end_cursor,
      },
    };
    Ok(reply_connection)
  }
}

pub struct CommentEdge {
  pub node: Option<Comment>,
  pub cursor: String,
}

#[graphql_object(context = Context)]
impl CommentEdge {
  fn node(&self) -> &Option<Comment> {
    return &self.node;
  }
  fn cursor(&self) -> &str {
    return &self.cursor;
  }
}

pub struct CommentConnection {
  pub page_info: PageInfo,
  pub edges: Option<Vec<Option<CommentEdge>>>
}

#[graphql_object(context = Context)]
impl CommentConnection {
  fn pageInfo(&self) -> &PageInfo {
    return &self.page_info;
  }
  fn edges(&self) -> &Option<Vec<Option<CommentEdge>>> {
    return &self.edges;
  }
}