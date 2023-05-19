const getData =async( _path )=>{
    const data = await fetch( _path ) 
    return data.ok ? data.json() : []
} 

const setData =async( _data, _path, _type = 'POST' )=>{ 
    const data = await fetch(_path, { method : _type, body : _data, Headers : 
        { 
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
        } 
    })
    return data.ok ? data.json() : []
}

export { getData, setData }

 