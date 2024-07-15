import { WhoamiMsgResBody, ShoutMsgResBody, MainCTXData, WSMessage, MessageMsgResBody, LoginMsgResBody, ErrorMsgBody, WhoisMsgResBody } from "./definitions";
import { sendMessages, sendWhoami, MessageTypes, checkWSMsg } from "./ws-messages";
import { SetCookie } from "./cookie";
import { checkConn, WSConnErr } from "./connection";

// Funcion para menajar la conexion websocket. La funcion tiene como objetivo recibir mensajes de respuesta de la conexion websocket y con ello modificar los datos del contexto. Ademas tiene recibe el token guardado en la cookie de la aplicacion (en caso de haber una sesion guardada). Nada mas establecer la conexion websocket con el servidor se manda un mensaje whoami al servidor y este verifica el token y responde coxxn los claims del token (en este caso los claims del token consiste en un objeto con el user_id del usuario en la base de datos)
export default function handleConn(ctx: MainCTXData, token: string | null): void | never {
  const [connInfo, setConnInfo] = ctx.connInfo
  if (!checkConn(connInfo, true)) throw new WSConnErr("disconnected from websocket")
  const conn = connInfo.conn!
  conn.addEventListener('error', function (event) {
    setConnInfo(prev => {
      return { ...prev, state: WebSocket.CLOSING }
    }) // Refrescar el estado con la informacion de la conexion
    console.error(event)
    console.error("websocket error")
  })
  conn.addEventListener("close", function (event) {
    setConnInfo(prev => {
      return { ...prev, state: WebSocket.CLOSED }
    })
    console.error(event)
    console.error("websocket connection is closed")
  })
  conn.addEventListener("open", function () {
    setConnInfo(prev => {
      return { ...prev, state: WebSocket.OPEN }
    })
    console.log("websocket connection established")
    sendMessages(conn)
    // Si el token es null quiere decir que no hay cookie con el token de sesion y por lo tanto no hay que mandar whoami
    if (token === null) return
    sendWhoami(conn, token)
  })
  conn.addEventListener("message", function (event) {
    handleMessage(event.data, ctx)
  })
}

// Manejador centralizado de mensajes del servidor
function handleMessage(message: string, ctx: MainCTXData) {
  const resM = JSON.parse(message) as WSMessage<any>

  if (checkWSMsg<ShoutMsgResBody>(MessageTypes.shout, resM)) {
    const [_, setMessages] = ctx.messages
    setMessages(prev => {
      const newMessages = [...prev, resM.body]
      return newMessages
    })
  }
  else if (checkWSMsg<MessageMsgResBody>(MessageTypes.messages, resM)) {
    const [_, setMessages] = ctx.messages
    setMessages(resM.body.messages)
  }
  else if (checkWSMsg<LoginMsgResBody>(MessageTypes.login, resM)) {
    console.log(resM.body)
    SetCookie('token', resM.body.token)
  }
  else if (checkWSMsg<WhoamiMsgResBody>(MessageTypes.whoami, resM)) {
    const [_, setUser] = ctx.user
    setUser(resM.body.user)
  }
  else if (checkWSMsg<WhoisMsgResBody>(MessageTypes.whois, resM)) {
    const [_, handleWhoisMessage] = ctx.requiredUsers
    handleWhoisMessage(resM)
  }
  else if (checkWSMsg<ErrorMsgBody>(MessageTypes.error, resM)) {
    throw new Error(resM.body.error)
  }
}