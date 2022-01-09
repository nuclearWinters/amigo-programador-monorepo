use std::io;
use actix_cors::Cors;
use actix_web::{
    http::header,
    middleware,
    web::{self, Data, Payload},
    App, Error, HttpResponse, HttpServer, HttpRequest,
    cookie::{Cookie, SameSite, time::OffsetDateTime},
};
mod schema;
use mongodb::{Client, options::ClientOptions, Collection};
use relay_rust::db::{UserMongo, TechnologyMongo, CommentMongo, ReplyMongo, PlaylistMongo, ModuleMongo, CoursingMongo, LikeMongo, CoursedMongo, MONGO_DB};
use crate::schema::{schema, Schema};
use relay_rust::db::{Context, refresh_token_middleware};
use juniper_actix::{graphql_handler, graphiql_handler};
use tokio::sync::RwLock;
use std::time::{SystemTime, UNIX_EPOCH};

pub async fn post_graphql_handler_custom(response: actix_web::HttpResponse, new_cookie_mut: RwLock<String>) -> Result<HttpResponse, Error> {
    let mut result = response;
    let new_cookie = new_cookie_mut.read().await;
    let new_cookie_str = &*new_cookie;
    if !new_cookie_str.is_empty() {
        let start = SystemTime::now();
        let since_the_epoch = start
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_secs();
        let expiration_date = OffsetDateTime::from_unix_timestamp((since_the_epoch + 2592000) as i64).unwrap();
        let refresh_cookie = Cookie::build("refreshToken", new_cookie_str)
            .expires(expiration_date)
            .same_site(SameSite::Strict)
            .path("/")
            .http_only(true)
            .finish();
        result.add_cookie(&refresh_cookie).unwrap();
    }
    return Ok(result);
}

pub struct AppState {
    pub users: Collection<UserMongo>,
    pub technologies: Collection<TechnologyMongo>,
    pub comments: Collection<CommentMongo>,
    pub replies: Collection<ReplyMongo>,
    pub playlists: Collection<PlaylistMongo>,
    pub modules: Collection<ModuleMongo>,
    pub coursing: Collection<CoursingMongo>,
    pub likes: Collection<LikeMongo>,
    pub coursed: Collection<CoursedMongo>,
}

fn get_access_token<'a>(req: &'a HttpRequest) -> Option<String> {
    let mut result: Option<String> = Some("".to_owned());
    let access_token = req.headers().get("authorization");
    if access_token.is_some() {
        result = Some(access_token.unwrap().to_str().unwrap().to_owned());
    }
    return result;
}

fn get_refresh_token<'a>(req: &'a HttpRequest) -> Option<String> {
    let mut result: Option<String> = Some("".to_owned());
    let refresh_token = req.cookie("refreshToken");
    if refresh_token.is_some() {
        result = Some(refresh_token.unwrap().value().to_owned());
    }
    return result;
}

async fn graphql(
    req: HttpRequest,
    payload: Payload,
    schema: Data<Schema>,
    app_state: Data<AppState>,
) -> Result<HttpResponse, Error> {
    let access_token = get_access_token(&req);
    let refresh_token = get_refresh_token(&req);
    let auth = refresh_token_middleware(access_token, refresh_token).unwrap();
    let context = Context {
        users: app_state.get_ref().users.to_owned(),
        technologies: app_state.get_ref().technologies.to_owned(),
        comments: app_state.get_ref().comments.to_owned(),
        replies: app_state.get_ref().replies.to_owned(),
        playlists: app_state.get_ref().playlists.to_owned(),
        modules: app_state.get_ref().modules.to_owned(),
        coursing: app_state.get_ref().coursing.to_owned(),
        likes: app_state.get_ref().likes.to_owned(),
        coursed: app_state.get_ref().coursed.to_owned(),
        new_cookie: RwLock::new("".to_owned()),
        valid_access_token: auth.valid_access_token,
        user_oid: auth.user_oid,
    };
    let response = graphql_handler(&schema, &context, req, payload).await?;
    let result = post_graphql_handler_custom(response, context.new_cookie).await;
    return result
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let client_options = ClientOptions::parse(MONGO_DB).await.expect("ClientOptions failed!");

    let client = Client::with_options(client_options).expect("with_options failed!");

    let db = client.database("courses");

    let users = db.collection::<UserMongo>("users");
    let technologies = db.collection::<TechnologyMongo>("technologies");
    let comments = db.collection::<CommentMongo>("comments");
    let replies = db.collection::<ReplyMongo>("replies");
    let playlists = db.collection::<PlaylistMongo>("playlist");
    let modules = db.collection::<ModuleMongo>("module");
    let coursing = db.collection::<CoursingMongo>("coursing");
    let likes = db.collection::<LikeMongo>("likes");
    let coursed = db.collection::<CoursedMongo>("coursed");

    let app_state = Data::new(AppState {
        users: users,
        technologies: technologies,
        comments: comments,
        replies: replies,
        playlists: playlists,
        modules: modules,
        coursing: coursing,
        likes: likes,
        coursed: coursed
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .app_data(Data::new(schema()))
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec!["POST", "GET"])
                    .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                    .allowed_header(header::CONTENT_TYPE)
                    .supports_credentials()
                    .max_age(3600),
            )
            .wrap(middleware::Compress::default())
            .wrap(middleware::Logger::default())
            .service(
                web::resource("/graphql")
                    .route(web::post().to(graphql))
                    .route(web::get().to(|| graphiql_handler("/graphql", None))),
            )
    })
    .bind("0.0.0.0:4001")?
    .run()
    .await
}