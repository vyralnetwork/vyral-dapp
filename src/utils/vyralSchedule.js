// Reference: https://docs.google.com/spreadsheets/d/1kcBmx9D2IZO0YFDPikSs4EkS04IIuDNZ8sTGItZqH0I/edit#gid=0
// End Times (all in EST)
// 2nd Dec 10:59
// 2nd Dec 14:59
// 3rd Dec 23:59 to 24 Dec 23:59 reset every day to that day's end
//
// 2/12 10:59  - 1512230399000
// 2/12 14:59  - 1512244799000
// 2/12 23:59  - 1512277199000
// 3/12 23:59  - 1512363599000
// 4/12 23:59  - 1512449999000
// 5/12 23:59  - 1512536399000
// 6/12 23:59  - 1512622799000
// 7/12 23:59  - 1512709199000
// 8/12 23:59  - 1512795599000
// 9/12 23:59  - 1512881999000
// 10/12 23:59 - 1512968399000
// 11/12 23:59 - 1513054799000
// 12/12 23:59 - 1513141199000
// 13/12 23:59 - 1513227599000
// 14/12 23:59 - 1513313999000
// 15/12 23:59 - 1513400399000
// 16/12 23:59 - 1513486799000
// 17/12 23:59 - 1513573199000
// 18/12 23:59 - 1513659599000
// 19/12 23:59 - 1513745999000
// 20/12 23:59 - 1513832399000
// 21/12 23:59 - 1513918799000
// 22/12 23:59 - 1514005199000
// 23/12 23:59 - 1514091599000
// 24/12 23:59 - 1514177999000

const endTimes = [
    1512230399000,
    1512244799000,
    1512277199000,
    1512363599000,
    1512449999000,
    1512536399000,
    1512622799000,
    1512709199000,
    1512795599000,
    1512881999000,
    1512968399000,
    1513054799000,
    1513141199000,
    1513227599000,
    1513313999000,
    1513400399000,
    1513486799000,
    1513573199000,
    1513659599000,
    1513745999000,
    1513832399000,
    1513918799000,
    1514005199000,
    1514091599000,
    1514177999000,
];

export function getEndTime(){


    const now = new Date().getTime()

    for(var i=0; i<endTimes.length; i++){
        if(now < endTimes[i]){
            return endTimes[i];
        }
    }

    return 0;
}


export function getTimeToGo(endTime){
    let now = new Date().getTime()
    let timeStampDiff = Math.trunc((endTime - now) / 1000)
    let timeToGo = {}
    let days = Math.trunc(timeStampDiff / 60 / 60 / 24)
    let hours = Math.trunc(timeStampDiff / 60 / 60) % 24
    let minutes = Math.trunc(timeStampDiff / 60) % 60
    let seconds = timeStampDiff % 60

    return {
        days,
        hours,
        minutes,
        seconds
    }
}
