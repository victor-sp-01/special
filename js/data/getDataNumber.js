export default ( type, limit = 1000 )=>{
    if( type === 'NUMBER' )  
        return [ ...Array( limit + 1 ).keys() ].map( i => ({ id : i, value : i++ }) )

    if( type === 'ABC' ) 
        return 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map(  (i, index) => ({ id : index, value : i }) )

    if( type === 'MONTH' )  
        return [ 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO','JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE' ].map(  (i, index) => ({ id : index, value : i }) )

    if( type === 'DAY' )    
        return [ 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES','VIERNES', 'SABADO' ].map(  (i, index) => ({ id : index, value : i }) )

    if( type === 'PLANET' ) 
        return [ 'MERCURIO', 'VENUS', 'TIERRA', 'MARTE', 'JUPITER','SATURNO', 'URANO', 'NEPTUNO' ].map(  (i, index) => ({ id : index, value : i }) )

    if( type === 'BIBLE' ) 
        return [ 'GÉNESIS', 'ÉXODO', 'LEVÍTICO', 'NÚMEROS', 'DEUTERONOMIO','JOSUÉ', 'JUECES', 'RUT', '1° DE SAMUEL', 
            '2° DE SAMUEL', '1° DE REYES', '2° DE REYES', '1° DE CRONICAS', '2° DE CRONICAS', 'NEHEMÍAS', 'ESDRAS', 'ESTER', 'JOB', 'SALMOS', 'PROVERBIOS',
            'ECLESIASTÉS', 'CANTARES', 'ISAÍAS', 'JEREMÍAS', 'LAMENTACIONES', 'EZEQUIEL', 'DANIEL', 'OSEAS', 'JOEL', 'AMÓS', 'ABDÍAS', 'JONÁS', 'MIQUEAS',
            'NAHUM', 'HABACUC', 'SOFONÍAS', 'HAGEO', 'ZACARÍAS', 'MALAQUÍAS' ].map(  (i, index) => ({ id : index, value : i }) )

    return []
        
}