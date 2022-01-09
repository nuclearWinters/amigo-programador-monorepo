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
    after: Option<String>,
    first: Option<i32>,
    context: &'ctx Context
  ) -> Result<CommentConnection, FieldError> {
    if first.is_none() || first.unwrap() < 0 {
      let edges: Vec<Option<CommentEdge>> = Vec::new();
      return Ok(CommentConnection {
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
      doc! { "module_id": self._id }
    } else {
      let gid = decode(after_unwrapped).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let comment_id = ObjectId::parse_str(vec[1]).unwrap();
      doc! { "module_id": self._id, "_id": { "$lt": comment_id } }
    };
    let mut edges: Vec<Option<CommentEdge>> = Vec::new();
    let mut cursor = context.comments.find(query, find_options).await?;
    while let Some(comment) = cursor.try_next().await? {
      let mut id: String = "arrayconnection:".to_owned();
      id.push_str(&comment._id.to_hex());
      let cursor = encode(id);
      let comment_edge_graphql = Some(CommentEdge {
        node: Some(Comment {
          _id: comment._id,
          likes: comment.likes,
          module_id: comment.module_id,
          text: comment.text,
          user_id: comment.user_id,
          user_username: comment.user_username,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
        }),
        cursor: cursor,
      });
      edges.push(comment_edge_graphql);
    }
    let length = edges.len();
    let start_cursor = if length == 0 { Some((&edges[0].as_ref().unwrap().cursor).to_owned()) } else { None };
    let end_cursor = if length == 0 { Some((&edges[length - 1].as_ref().unwrap().cursor).to_owned()) } else { None };
    let comment_connection = CommentConnection {
      edges: Some(edges),
      page_info: PageInfo {
        has_next_page: length as i32 > first_unwrapped,
        has_previous_page: false,
        start_cursor: start_cursor,
        end_cursor: end_cursor,
      },
    };
    Ok(comment_connection)
  }
}