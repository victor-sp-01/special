import Main from "../components/Main.js"
import updateRoute from "./updateRoute.js"
import Auth from "../auth/Auth.js"
const updatePage =()=>{

    document.getElementById('root').textContent = ''
    Auth()
    Main()
    updateRoute()
}
export default updatePage