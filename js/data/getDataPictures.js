export default async ( idPicture = false )=>{
    const dataJSON = await fetch("./js/JSON/pictures.json");
    
    if(dataJSON.ok){
      const data = await dataJSON.json()
      return idPicture ? data.filter( data => data.idPicture === idPicture ) : data
    }

    return [];
}
 