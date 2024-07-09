import { MainCTXData, WhoamiMsgResBody, WSMessage } from "./definitions";
import wsMessageTypes from "./ws-message-types";
import WSMessageTypes from "./ws-message-types";

if (process.env.SECRET === undefined) {
  throw new Error("SECRET environment variable is not defined (next.config.mjs)")
}

// Funcion para menajar la conexion websocket. La funcion tiene como objetivo recibir mensajes de respuesta de la conexion websocket y con ello modificar los datos del contexto. Ademas tiene recibe el token guardado en la cookie de la aplicacion (en caso de haber una sesion guardada). Nada mas establecer la conexion websocket con el servidor se manda un mensaje whoami al servidor y este verifica el token y responde coxxn los claims del token (en este caso los claims del token consiste en un objeto con el user_id del usuario en la base de datos)
export default function handleConn(conn: WebSocket, ctx: MainCTXData, token: string | null): void {
  conn.addEventListener('error', function (event) {
    console.error(event)
    console.error("websocket error")
  })
  conn.addEventListener("close", function (event) {
    console.error(event)
    console.error("websocket connection is closed")
  })
  conn.addEventListener("open", function () {
    console.log("websocket connection established")
    // Si el token es null quiere decir que no hay cookie con el token de sesion y por lo tanto no hay que ejecutar whoami
    if (token === null) return
    // Verificando la firma del token y obteniendo el payload del token
    const resM = {
      type: WSMessageTypes.whoami,
      body: JSON.stringify({
        token
      })
    }
    conn.send(JSON.stringify(resM))
  })
  conn.addEventListener("message", function (event) {
    handleMessage(event.data, ctx)
  })
}

function checkWSMessageType<T>(targetType: WSMessageTypes, msg: WSMessage<any>): msg is WSMessage<T> {
  return targetType === msg.type
}

function handleMessage(message: string, ctx: MainCTXData) {
  const resM = JSON.parse(message) as WSMessage<any>
  const isWhoami = checkWSMessageType<WhoamiMsgResBody>(WSMessageTypes.whoami, resM)
  if (isWhoami) {
    ctx.user = resM.body.user
  }
}