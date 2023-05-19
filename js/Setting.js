import { createLocalStorage } from "./api/apiLocalStorage.js"

const Setting =()=>{ 
    const version = 'v2023.05.18.20.58.000'
 
    const Setting = {
        General : {},
        color   : '#96adc8',
        colors  : ['#f5f8de', '#c2a878', '#70798c', '#96adc8', '#ff6b6c', '#85baa1', '#88d9e6'],
        photo   : '',
        photos  : [ ...Array( 23 ).keys() ].map( i => (`${ ++i }`) ),
        noteOrder : 'month',
        chats   : {
            sliderBar : false
        }
    }

    const test = {
        play : {
            type : "NUMBER",
            limit: 1000,
            casillas: 10
        },
        generate : {
            type : "NUMBER",
            limit: 1000 
        }
    }

    const Auth = [
        { token : '' },
        { auth : {
            id : 'ViguHfIuocazFD7',
            name:'victor',
            lastname : 'salas peña',
            username : 'lastname',
            avatar   : '18.jpg',
        }}
    ] 

    if( version !== localStorage.getItem( 'Version' ) ) localStorage.clear() 
    localStorage.setItem( 'Time', Date.now() )

    createLocalStorage( 'Version', version )
    createLocalStorage( 'Setting', Setting, true)
    createLocalStorage( 'DataNumber', test, true) 
    createLocalStorage( 'Chat', [], 'true' )
    createLocalStorage( 'User', [], true)
    createLocalStorage( 'Auth', false, true) 
   
}

export default Setting