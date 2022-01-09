use juniper::{graphql_object, FieldError};
use base64::{encode, decode};
use mongodb::{bson::{doc, oid::ObjectId}, options::FindOptions};
use crate::db::{Context};
use crate::objects::likes::Like;
use juniper::futures::TryStreamExt;
use mongodb::bson::DateTime;
use crate::db::{Date, PageInfo};
use crate::objects::comments::{CommentConnection, CommentEdge, Comment};

pub struct Module {
  pub _id: ObjectId,
  pub title: String,
  pub date: DateTime,
  pub description: String,
}

#[graphql_object(context = Context)]
impl Module {
  fn id(&self) -> juniper::ID {
    let mut id: String = "Module:".to_owned();
    id.push_str(&self._id.to_hex());
    return juniper::ID::from(encode(id));
  }
  fn title(&self) -> &str {
    return &self.title;
  }
  fn date(&self) -> Date {
    return Date::new(self.date);
  }
  fn duration(&self) -> &str{
    return &self.description;
  }
  async fn likes<'ctx>(&self, context: &'ctx Context) -> Result<Vec<Like>, FieldError> {
    let mut result: Vec<Like> = Vec::new();
    let user_id = ObjectId::parse_str("7095f055f92be2001a15885a").unwrap();
    let filter = doc! { "module_id": self._id, "user_id:": user_id };
    let mut cursor = context.likes.find(filter, None).await?;
    while let Some(like) = cursor.try_next().await? {
        let like_graphql = Like {
          _id: like._id,
          comment_id: like.comment_id,
          user_id: like.user_id,
          status: like.status,
          created_at: like.created_at,
          updated_at: like.updated_at,
        };
        result.push(like_graphql);
    }
    Ok(result)
  }
  async fn comments<'ctx>(
    &self, 
    after: String,
    first: i32,
    context: &'ctx Context
  ) -> Result<CommentConnection, FieldError> {
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
    let mut edges: Vec<CommentEdge> = Vec::new();
    let mut cursor = context.comments.find(query, find_options).await?;
    while let Some(comment) = cursor.try_next().await? {
      let mut id: String = "arrayconnection:".to_owned();
      id.push_str(&comment._id.to_hex());
      let cursor = encode(id);
      let comment_edge_graphql = CommentEdge {
        node: Comment {
          _id: comment._id,
          likes: comment.likes,
          module_id: comment.module_id,
          text: comment.text,
          user_id: comment.user_id,
          user_username: comment.user_username,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
        },
        cursor: cursor,
      };
      edges.push(comment_edge_graphql);
    }
    let comment_connection = CommentConnection {
      edges: edges,
      pageInfo: PageInfo {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "".to_owned(),
        endCursor: "".to_owned(),
      },
    };
    Ok(comment_connection)
  }
}