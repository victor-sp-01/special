export default (startDate = new Date(), endDate = new Date())=>{

    startDate   = parseInt(startDate) || startDate 
    endDate     = parseInt(endDate) || endDate 

    if( typeof startDate === 'number' ){
        startDate = new Date(startDate)
    }

    if( typeof endDate === 'number' ){
        endDate = new Date(endDate)
    }
    
    const startDateYear = startDate.getFullYear()
    const endDateYear   = endDate.getFullYear()

    const startDateUTC   = startDate.getTime()
    const endDateUTC   = endDate.getTime() 

    const leapYear =()=>{

        const startMarch    = (new Date(`${ startDateYear }-03-01`)).getTime()
        const endMarch      = (new Date(`${ endDateYear }-03-01`)).getTime()

        let incrementar = 0

        for (let i = startDateYear; i <= endDateYear; i++) {
            if( i % 4 !== 0 ) continue
            if( i === startDateYear && startMarch < startDateUTC ) continue
            if( i === endDateYear && endMarch > endDateUTC ) continue
            incrementar++
        }
        
        return incrementar
    } 

    const leap_days = leapYear() 

    const seconds = 1000
    const minutes = seconds * 60
    const hours   = minutes * 60

    const days  = hours * 24
    const year  = days * 365
    const month = year / 12
    const weeks = days * 7 
    
    const diffDate      = endDateUTC - startDateUTC
    const diffYear      = (diffDate - (days * leap_days)) / year
    const diffmonth     = ((diffDate - (days * leap_days)) % year) / month
    const diffDay       = ((diffDate - (days * leap_days)) % month) / days
    const diffHour      = (diffDate % days) / hours
    const diffMinutes   = (diffDate % hours) / minutes
    const diffSecond    = (diffDate % minutes) / seconds

    return {
        year    : Math.floor(diffYear),
        month   : Math.floor(diffmonth),
        day     : Math.floor(diffDay),
        hour     : Math.floor(diffHour),
        minute     : Math.floor(diffMinutes),
        second     : Math.floor(diffSecond),
    }
}