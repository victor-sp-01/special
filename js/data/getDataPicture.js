export default async ()=>{
    const dataJSON = await fetch("./js/JSON/picture.json");
    
    if(dataJSON.ok)
      return await dataJSON.json()

    return [];
}
 