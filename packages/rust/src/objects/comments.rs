use juniper::{graphql_object, FieldError};
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

#[graphql_object(context = Context)]
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
  async fn replies<'ctx>(
    &self, 
    after: String,
    first: i32,
    context: &'ctx Context
  ) -> Result<ReplyConnection, FieldError> {
    let limit = first + 1;
    let find_options = FindOptions::builder().limit(limit as i64).sort(doc! { "$natural": -1 }).build();
    let query = if after.to_owned().is_empty() {
      doc! { "module_id": self._id }
    } else {
      let gid = decode(after).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let comment_id = ObjectId::parse_str(vec[1]).unwrap();
      doc! { "module_id": self._id, "_id": { "$lt": comment_id } }
    };
    let mut edges: Vec<ReplyEdge> = Vec::new();
    let mut cursor = context.replies.find(query, find_options).await?;
    while let Some(reply) = cursor.try_next().await? {
      let mut id: String = "arrayconnection:".to_owned();
      id.push_str(&reply._id.to_hex());
      let cursor = encode(id);
      let reply_edge_graphql = ReplyEdge {
        node: Reply {
          _id: reply._id,
          likes: reply.likes,
          comment_id: reply.comment_id,
          text: reply.text,
          user_id: reply.user_id,
          user_username: reply.user_username,
          created_at: reply.created_at,
          updated_at: reply.updated_at,
        },
        cursor: cursor,
      };
      edges.push(reply_edge_graphql);
    }
    let reply_connection = ReplyConnection {
      edges: edges,
      pageInfo: PageInfo {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "".to_owned(),
        endCursor: "".to_owned(),
      },
    };
    Ok(reply_connection)
  }
}

pub struct CommentEdge {
  pub node: Comment,
  pub cursor: String,
}

#[graphql_object(context = Context)]
impl CommentEdge {
  fn node(&self) -> &Comment {
    return &self.node;
  }
  fn cursor(&self) -> &str {
    return &self.cursor;
  }
}

pub struct CommentConnection {
  pub pageInfo: PageInfo,
  pub edges: Vec<CommentEdge>
}

#[graphql_object(context = Context)]
impl CommentConnection {
  fn pageInfo(&self) -> &PageInfo {
    return &self.pageInfo;
  }
  fn edges(&self) -> &Vec<CommentEdge> {
    return &self.edges;
  }
}