export default (startDate = new Date(), endDate = new Date())=>{

    startDate   = parseInt(startDate) || startDate 
    endDate     = parseInt(endDate) || endDate 

    if( typeof startDate === 'number' ){
        startDate = new Date(startDate)
    }

    if( typeof endDate === 'number' ){
        endDate = new Date(endDate)
    }

    const startDateUTC   = startDate.getTime()
    const endDateUTC   = endDate.getTime() 
 
    const seconds = 1000
    const minutes = seconds * 60
    const hours   = minutes * 60

    const days  = hours * 24 
    
    const diffDate      = endDateUTC - startDateUTC 
    const diffDay       = diffDate / days
    const diffHour      = (diffDate % days) / hours
    const diffMinutes   = (diffDate % hours) / minutes
    const diffSecond    = (diffDate % minutes) / seconds

    return { 
        day     : Math.floor(diffDay),
        hour    : Math.floor(diffHour),
        minute  : Math.floor(diffMinutes),
        second  : Math.floor(diffSecond)
    }
}