import { graphql } from "babel-plugin-relay/macro";
import { FC, useEffect, useState } from "react";
import { useFragment, useMutation, useRefetchableFragment } from "react-relay";
import { useParams } from "react-router";
import { Comments } from "../Components/Comments";
import { CoursingAddCommentMutation } from "./__generated__/CoursingAddCommentMutation.graphql";
import { logOut } from "../utils";
import { ConnectionHandler } from "relay-runtime";
import { tokensAndData } from "../App";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";
import { CoursingModuleRefetchUser } from "./__generated__/CoursingModuleRefetchUser.graphql";
import { CoursingModule_user$key } from "./__generated__/CoursingModule_user.graphql";
import { CoursingRefetchUser } from "./__generated__/CoursingRefetchUser.graphql";
import { Coursing_user$key } from "./__generated__/Coursing_user.graphql";
import { CoursingUser_user$key } from "./__generated__/CoursingUser_user.graphql";
import { CoursingUpdateDefaultModuleMutation } from "./__generated__/CoursingUpdateDefaultModuleMutation.graphql";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const coursingFragment = graphql`
  fragment Coursing_user on User
  @argumentDefinitions(
    technology_gid: { type: "ID" }
    module_gid: { type: "ID" }
  )
  @refetchable(queryName: "CoursingRefetchUser") {
    playlist(technology_gid: $technology_gid) {
      id
      title
      thumbnail
      duration
      order
      technology_gid
      module_gid
    }
    coursing(technology_gid: $technology_gid) {
      id
      module_gid
      user_gid
      technology_gid
      progress
      completed
    }
    default_technology_gid
    ...CoursingModule_user @arguments(module_gid: $module_gid)
  }
`;

const coursingModuleFragment = graphql`
  fragment CoursingModule_user on User
  @argumentDefinitions(module_gid: { type: "ID" })
  @refetchable(queryName: "CoursingModuleRefetchUser") {
    module(module_gid: $module_gid) {
      id
      title
      date
      duration
      likes {
        id
        comment_gid
        user_gid
        status
        created_at
        updated_at
      }
      ...Comments_module
    }
  }
`;

const coursingUserFragment = graphql`
  fragment CoursingUser_user on User {
    id
    username
    coursed {
      id
      technology_gid
      default_module_gid
      user_gid
      total
    }
    technologies {
      id
      title
      total
      order
      default_module_gid
    }
    ...Comments_data_user
  }
`;

type Props = {
  data: Coursing_user$key & CoursingUser_user$key;
};

export const Coursing: FC<Props> = (props) => {
  const dataUser = useFragment<CoursingUser_user$key>(
    coursingUserFragment,
    props.data
  );
  const { technology_gid } = useParams();
  const technology_title =
    dataUser.technologies.find((tech) => tech.id === technology_gid)?.title ??
    "";
  const [data, refetch] = useRefetchableFragment<
    CoursingRefetchUser,
    Coursing_user$key
  >(coursingFragment, props.data);
  const saved_technology_gid = data.default_technology_gid;
  const [dataModule, refetchModule] = useRefetchableFragment<
    CoursingModuleRefetchUser,
    CoursingModule_user$key
  >(coursingModuleFragment, data);
  useEffect(() => {
    refetch(
      {
        technology_gid: technology_gid,
        module_gid:
          (dataUser.coursed.find(
            (tech) => tech.technology_gid === technology_gid
          )?.default_module_gid ||
            dataUser.technologies.find((tech) => tech.id === technology_gid)
              ?.default_module_gid) ??
          "",
      },
      { fetchPolicy: "store-or-network" }
    );
  }, [refetch, technology_gid, saved_technology_gid, refetchModule, dataUser]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [commit] = useMutation<CoursingAddCommentMutation>(graphql`
    mutation CoursingAddCommentMutation($input: AddCommentInput!) {
      addComment(input: $input) {
        error
        comment_edge {
          cursor
          node {
            id
            likes
            module_gid
            text
            user_gid
            user_username
            created_at
            updated_at
          }
        }
        accessToken
      }
    }
  `);
  const [commitUpdateModule] =
    useMutation<CoursingUpdateDefaultModuleMutation>(graphql`
      mutation CoursingUpdateDefaultModuleMutation(
        $input: UpdateDefaultModuleInput!
      ) {
        updateDefaultModule(input: $input) {
          error
          coursedModule {
            id
            technology_gid
            default_module_gid
            user_gid
            total
          }
          accessToken
        }
      }
    `);
  const [code, setCode] = useState(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div>Hola</div>
    </body>
  </html>`);
  const template = `${code}
  <script>
    function send() {
      const element = document.querySelector("div");
      if (element.textContent === "hola mundo") {
        alert('¡Contiene hola mundo!')
      } else {
        alert('¡NO contiene hola mundo!')
      }
    }
  </script>
  <button onclick="send()">Enviar</button>`;
  return (
    <div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={container}>
          <div style={{ position: "relative", height: 507, width: 832 }}>
            <YouTube
              videoId="2g811Eo7K8U"
              opts={{
                height: "390",
                width: "640",
              }}
            />
          </div>
          <div style={playlistContainer}>
            <div style={headerPlayList}>
              <div style={title}>{technology_title}</div>
            </div>
            {data.playlist.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 6,
                  paddingTop: 6,
                  backgroundColor: true ? "rgba(0,0,0,0.06)" : "#fff",
                }}
                onClick={() => {
                  if (technology_gid) {
                    refetchModule(
                      { module_gid: item.module_gid },
                      { fetchPolicy: "network-only" }
                    );
                    commitUpdateModule({
                      variables: {
                        input: {
                          user_gid: dataUser.id,
                          technology_gid: technology_gid,
                          module_gid: item.module_gid,
                        },
                      },
                      updater: (store, data) => {
                        try {
                          const user = store.get(
                            data.updateDefaultModule.coursedModule.user_gid
                          );
                          if (user) {
                            const coursed = user.getLinkedRecords("coursed");
                            const exists = coursed?.find(
                              (el) =>
                                el.getValue("id") ===
                                data.updateDefaultModule.coursedModule.id
                            );
                            if (!exists) {
                              const payload = store.getRootField(
                                "updateDefaultModule"
                              );
                              const newCoursedModule =
                                payload.getLinkedRecord("coursedModule");
                              user.setLinkedRecords(
                                coursed
                                  ? [...coursed, newCoursedModule]
                                  : [newCoursedModule],
                                "coursed"
                              );
                            }
                          }
                        } catch (e) {}
                      },
                    });
                  }
                }}
              >
                <div
                  style={{
                    width: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "dimgray",
                  }}
                >
                  {dataModule.module.id === item.module_gid ? (
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      size="2x"
                      color="rgba(0,0,0,0.6)"
                    />
                  ) : (
                    index + 1
                  )}
                </div>
                <img src={""} height="60" width="80" alt={item.title} />
                <div
                  style={{
                    paddingTop: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </div>
                <div>{item.duration}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={bottomVideoContainer}>
          <div style={comentariosContainer}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, display: "flex" }}>
                  {dataModule.module.title}
                </div>
              </div>
              <div style={descripcionVideo}>{dataModule.module.duration}</div>
              <div style={linea} />
              <div style={{ height: 40 }}></div>
            </div>
          </div>
        </div>
      </div>
      <div>Post comment</div>
      <input
        type="text"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setComment("");
          commit({
            variables: {
              input: {
                comment,
                user_gid: dataUser.id,
                user_username: dataUser.username,
                module_gid: dataModule.module.id,
              },
            },
            onCompleted: (response) => {
              if (response.addComment.error) {
                if (response.addComment.error === "jwt expired") {
                  logOut();
                }
                return window.alert(response.addComment.error);
              }
              tokensAndData.accessToken = response.addComment.accessToken;
            },
            updater: (store) => {
              try {
                const moduleRecord = store.get(dataModule.module.id);
                if (!moduleRecord) throw new Error("No module record.");
                const connectionRecord = ConnectionHandler.getConnection(
                  moduleRecord,
                  "Comments_query_comments"
                );
                if (!connectionRecord) {
                  throw new Error("No connection found (addComment).");
                }
                const payload = store.getRootField("addComment");
                const serverEdge = payload.getLinkedRecord("comment_edge");
                const newEdge = ConnectionHandler.buildConnectionEdge(
                  store,
                  connectionRecord,
                  serverEdge
                );
                if (!newEdge) {
                  throw new Error("No new edge (addComment).");
                }
                ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
              } catch (e) {}
            },
          });
        }}
      >
        Comment
      </button>
      <Comments data={dataModule.module} user={dataUser} />
      <h2>Exercise</h2>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Show
      </button>
      {show && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "5%",
            right: "5%",
            bottom: "10%",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </button>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.html, "html")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
          <iframe title="iframe_amigo_programador" srcDoc={template} />
        </div>
      )}
    </div>
  );
};

const {
  tarea,
  instruciones,
  tareaContainer,
  totalComentarios,
  linea,
  descripcionVideo,
  comentariosContainer,
  bottomVideoContainer,
  modo,
  title,
  headerPlayList,
  playlistContainer,
  container,
}: Record<
  | "tarea"
  | "instruciones"
  | "tareaContainer"
  | "totalComentarios"
  | "linea"
  | "descripcionVideo"
  | "comentariosContainer"
  | "bottomVideoContainer"
  | "modo"
  | "title"
  | "headerPlayList"
  | "playlistContainer"
  | "container",
  React.CSSProperties
> = {
  tarea: {
    padding: "8px 12px",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  instruciones: {
    padding: "0px 12px",
    fontSize: 16,
    border: "1px solid black",
  },
  tareaContainer: {
    width: 410,
    marginLeft: 30,
    border: "1px rgba(0,0,0,0.15) solid",
    backgroundColor: "white",
  },
  totalComentarios: { paddingTop: 14, paddingBottom: 24 },
  linea: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 1,
    marginTop: 24,
    alignSelf: "center",
  },
  descripcionVideo: { display: "flex", fontSize: 16, marginTop: 16 },
  comentariosContainer: {
    width: 832,
    display: "flex",
  },
  bottomVideoContainer: {
    paddingTop: 14,
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
  },
  modo: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    paddingRight: 4,
    paddingLeft: 12,
    alignSelf: "center",
    fontSize: 20,
    color: "rgba(0,0,0,0.8)",
  },
  headerPlayList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
  },
  playlistContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "column",
    width: 410,
    marginLeft: 30,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
    paddingTop: 30,
  },
};
