use juniper::{graphql_object, FieldError, graphql_interface};
use crate::db::{Context};
use crate::objects::technologies::Technology;
use crate::objects::playlists::Playlist;
use crate::objects::coursings::Coursing;
use crate::objects::courseds::Coursed;
use crate::objects::modules::Module;
use juniper::futures::TryStreamExt;
use mongodb::{bson::{doc, oid::ObjectId}, options::FindOptions};
use base64::{decode, encode};

pub struct User {
  pub _id: ObjectId,
  pub email: String,
  pub username: String,
  pub default_technology_id: ObjectId,
  pub coursed: Vec<Coursed>
}

#[graphql_interface(for = User)]
pub trait Node {
  fn id<'ctx>(&self, context: &'ctx Context) -> juniper::ID;
}

impl Node for User {
  fn id<'ctx>(&self, _context: &'ctx Context) -> juniper::ID {
    return juniper::ID::from("".to_owned());
  }
}

#[graphql_object(context = Context, impl = NodeValue)]
impl User {
  fn id(&self) -> juniper::ID {
    let mut id: String = "User:".to_owned();
    id.push_str(&self._id.to_hex());
    juniper::ID::from(encode(id))
  }
  fn email(&self) -> &str {
      self.email.as_str()
  }
  fn username(&self) -> &str {
    self.username.as_str()
  }
  #[graphql(name = "default_technology_gid")]
  fn default_technology_gid(&self) -> juniper::ID {
    let mut id: String = "Technology:".to_owned();
    id.push_str(&self.default_technology_id.to_hex());
    juniper::ID::from(encode(id))
  }
  async fn technologies<'ctx>(&self, context: &'ctx Context) -> Result<Vec<Technology>, FieldError> {
    let mut result: Vec<Technology> = Vec::new();
    let mut cursor = context.technologies.find(None, None).await?;
    while let Some(technology) = cursor.try_next().await? {
        let technology_graphql = Technology {
          _id: technology._id,
          title: technology.title,
          total: technology.total,
          order: technology.order,
          default_module_gid: technology.default_module_id
        };
        result.push(technology_graphql);
    }
    Ok(result)
  }
  #[graphql(
    arguments(
      technology_gid(
        name = "technology_gid"
      ),
    ),
  )]
  async fn playlist<'ctx>(
    &self, 
    technology_gid: Option<juniper::ID>, 
    context: &'ctx Context
  ) -> Result<Vec<Playlist>, FieldError> {
    let technology_id: ObjectId;
    if technology_gid.is_some() {
      let gid = decode(technology_gid.unwrap().to_string()).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let oid = ObjectId::parse_str(vec[1]).unwrap();
      technology_id = oid;
     } else {
      technology_id = self.default_technology_id; 
    };
    let filter = doc! { "technology_id": technology_id };
    let find_options = FindOptions::builder().sort(doc! { "order": 1 }).build();
    let mut result: Vec<Playlist> = Vec::new();
    let mut cursor = context.playlists.find(filter, find_options).await?;
    while let Some(playlist) = cursor.try_next().await? {
        let playlist_graphql = Playlist {
          _id: playlist._id,
          title: playlist.title,
          thumbnail: playlist.thumbnail,
          duration: playlist.duration,
          order: playlist.order,
          technology_id: playlist.technology_id,
          module_id: playlist.module_id,
        };
        result.push(playlist_graphql);
    }
    Ok(result)
  }
  #[graphql(
    arguments(
      technology_gid(
        name = "technology_gid"
      ),
    ),
  )]
  async fn coursing<'ctx>(
    &self,
    technology_gid: Option<juniper::ID>,
    context: &'ctx Context
  ) -> Result<Vec<Coursing>, FieldError> {
    let mut result: Vec<Coursing> = Vec::new();
    let technology_id: ObjectId;
    if technology_gid.is_some() {
      let gid = decode(technology_gid.unwrap().to_string()).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let oid = ObjectId::parse_str(vec[1]).unwrap();
      technology_id = oid;
     } else {
      technology_id = self.default_technology_id; 
    };
    let filter = doc! { "technology_id": technology_id, "user_id": self._id  };
    let mut cursor = context.coursing.find(filter, None).await?;
    while let Some(coursing) = cursor.try_next().await? {
      let coursing_graphql = Coursing {
        _id: coursing._id,
        module_id: coursing.module_id,
        user_id: coursing.user_id,
        technology_id: coursing.technology_id,
        progress: coursing.progress,
        completed: coursing.completed
      };
      result.push(coursing_graphql);
    }
    Ok(result)
  }
  async fn coursed<'ctx>(&self, context: &'ctx Context) -> Result<Vec<Coursed>, FieldError> {
    let mut result: Vec<Coursed> = Vec::new();
    let filter = doc! { "user_id": self._id  };
    let mut cursor = context.coursed.find(filter, None).await?;
    while let Some(coursed) = cursor.try_next().await? {
      let coursed_graphql = Coursed {
        _id: coursed._id,
        technology_id: coursed.technology_id,
        total: coursed.total,
        default_module_id: coursed.default_module_id,
        user_id: coursed.user_id,
      };
      result.push(coursed_graphql);
    }
    Ok(result)
  }
  #[graphql(
    arguments(
      module_gid(
        name = "module_gid"
      ),
    ),
  )]
  async fn module<'ctx>(
    &self,
    module_gid: Option<juniper::ID>,
    context: &'ctx Context
  ) -> Result<Module, FieldError> {
    let mut module_id = ObjectId::parse_str("000000000000000000000000").unwrap();
    if module_gid.is_some() {
      let gid = decode(module_gid.unwrap().to_string()).unwrap();
      let decoded = String::from_utf8(gid).unwrap();
      let split = decoded.split(":");
      let vec = split.collect::<Vec<&str>>();
      let oid = ObjectId::parse_str(vec[1]).unwrap();
      module_id = oid;
    } else {
      let iter = self.coursed.iter();
      let default_technology_id = self.default_technology_id.to_hex();
      for coursed in iter {
        if coursed.technology_id.to_hex() == default_technology_id {
          module_id = coursed.default_module_id;
        }
      }      
    }
    let filter = doc! { "_id": module_id };
    let module = context.modules.find_one(filter, None).await?.expect("Missing 'Module' document.");
    let module_graphql = Module {
      _id: module._id,
      title: module.title,
      date: module.date,
      description: module.description,
    };
    Ok(module_graphql)
  }
}