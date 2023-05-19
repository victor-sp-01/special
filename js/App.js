import updatePage from "./routes/updatePage.js"
import Setting from "./Setting.js" 
// import getPruebaDataMessage from "./data/getPruebaDataMessage.js"
const App =()=>{ 
    Setting()
    updatePage()
    // getPruebaDataMessage()
    addEventListener( 'hashchange', updatePage )

    //console.log( new Date('2000-12-01 00:00:000').getTime() )
}

export default App