class indexDB {
    constructor(dbName, version = 1 ){
        this.IDBRequest = indexedDB.open(dbName, version)
        this.IDBRequest.addEventListener('upgradeneeded', ()=>{
            const db = this.IDBRequest.result
            db.createObjectStore('data', {
                keyPath: 'id'
            })
        })
    }

    getIDBtransaction(mode = false){
        return new Promise((resolve, reject) => {
            this.IDBRequest.addEventListener('success', e =>{ 
                const db = e.target.result 
                const IDBtransaction = db.transaction('data', mode ? 'readwrite' : 'readonly')
                const objectStore = IDBtransaction.objectStore('data')
                resolve([objectStore, IDBtransaction])
            })
            this.IDBRequest.addEventListener('error', err =>{
                reject(`Error to get student information: ${err}`)
            })
        })
    }

    async getItem(id = false){
        if( id === false ) return false

        const [objectStore] = await this.getIDBtransaction()
        const item = objectStore.get(id)

        return new Promise((resolve, reject) => {
            item.addEventListener('success', ()=> resolve(item.result))
            item.addEventListener('error', err => reject(`Error to get student information: ${err}`) )
        })
    }

    async getItemAll(){
        const [objectStore] = await this.getIDBtransaction()
        const item = objectStore.getAll()

        return new Promise((resolve, reject) => {
            item.addEventListener('success', ()=> resolve(item.result))
            item.addEventListener('error', err => reject(`Error to get student information: ${err}`) )
        })
    }

    async put(data){ 
        const [objectStore, IDBtransaction] = await this.getIDBtransaction(true)
        objectStore.put(data)

        return new Promise((resolve, reject) => {
            IDBtransaction.addEventListener('complete', ()=> resolve(data))
            IDBtransaction.addEventListener('error', err => reject(`Error to get student information: ${err}`) )
        })
    }

    async delete(id = false){ 
        if( id === false ) return false

        const [objectStore, IDBtransaction] = await this.getIDBtransaction(true)  
        objectStore.delete(id)

        return new Promise((resolve, reject) => { 
            IDBtransaction.addEventListener('complete', ()=> resolve(id))
            IDBtransaction.addEventListener('error', err => reject(`Error to get student information: ${err}`) )
        })
    }

    async deleteAll(ids = []){ 
        if( ids === [] ) return false 

        const [objectStore, IDBtransaction] = await this.getIDBtransaction(true)  
        ids.forEach(id => objectStore.delete(id));

        return new Promise((resolve, reject) => { 
            IDBtransaction.addEventListener('complete', ()=> resolve(true))
            IDBtransaction.addEventListener('error', err => reject(`Error to get student information: ${err}`) )
        }) 
    }
 
}
export default indexDB