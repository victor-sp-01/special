export default (date)=>{
    date = parseInt(date) ||date

    if( typeof date === 'number' ){
        date = new Date(date)
    }

    const num = parseInt(`${ date.getMonth() + 1 }${ ( '0' + date.getDate()).slice(-2) }`)  
    const signs = [
        { start : 120, end : 218, value : 'acuario' },
        { start : 219, end : 320, value : 'piscis' },
        { start : 321, end : 419, value : 'aries' },
        { start : 420, end : 520, value : 'tauro' },
        { start : 521, end : 620, value : 'geminis' },
        { start : 621, end : 722, value : 'cancer' },
        { start : 723, end : 822, value : 'leo' },
        { start : 823, end : 922, value : 'virgo' },
        { start : 923, end : 1022, value : 'libra' },
        { start : 1023, end : 1121, value : 'escorpio' },
        { start : 1122, end : 1221, value : 'sagitario' },
        { start : 1222, end : 119, value : 'capricornio' }
    ]

    for(const sing of signs) 
        if( num >= sing.start && num<= sing.end )
            return sing.value

    return 'capricornio'
}