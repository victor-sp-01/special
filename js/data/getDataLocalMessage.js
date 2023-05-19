import { getLocalStorage } from "../api/apiLocalStorage.js";

export default async ( id = false ) => {
  const datas = await fetch("./js/JSON/message.json");
  const datas2 = await fetch("./js/JSON/users.json");

  if (!datas.ok) return [];
  if (!datas2.ok) return [];

  const [ users, message ] = [ await datas2.json(), await datas.json() ]
  const {datauser} = getLocalStorage('Auth', {}, true) 
  const out = message.map((data) => {
    const idUserMessage = data.idUserFirst !== datauser.id ? data.idUserFirst : data.idUserSecond
    const [userGet] = users.filter( user => user.id === idUserMessage )  
    return {
      id            : data.id, 
      idUserGet     : userGet.id, 
      avatarUserGet : userGet.avatar,
      usernameGet   : userGet.username,
      type          : data.type,
      mode          : data.mode
    } 
  }); 
 
  return id ? out.filter( data => data.id === id )[0] : out
}; 
