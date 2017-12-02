export function getEndTime(){
    // Reference: https://docs.google.com/spreadsheets/d/1kcBmx9D2IZO0YFDPikSs4EkS04IIuDNZ8sTGItZqH0I/edit#gid=0
    // End Times (all in EST)
    // 2nd Dec 10:59
    // 2nd Dec 14:59
    // 3rd Dec 23:59 to 24 Dec 23:59 reset every day to that day's end
    // 
    // 2/12 10:59  - 1512230399000
    // 2/12 14:59  - 1512244799000
    // 2/12 23:59  - 1514955599000
    // 3/12 23:59  - 1515041999000
    // 4/12 23:59  - 1515128399000
    // 5/12 23:59  - 1515214799000
    // 6/12 23:59  - 1515301199000
    // 7/12 23:59  - 1515387599000
    // 8/12 23:59  - 1515473999000
    // 9/12 23:59  - 1515560399000
    // 10/12 23:59 - 1515646799000
    // 11/12 23:59 - 1515733199000
    // 12/12 23:59 - 1515819599000
    // 13/12 23:59 - 1515905999000
    // 14/12 23:59 - 1515992399000
    // 15/12 23:59 - 1516078799000
    // 16/12 23:59 - 1516165199000
    // 17/12 23:59 - 1516251599000
    // 18/12 23:59 - 1516337999000
    // 19/12 23:59 - 1516424399000
    // 20/12 23:59 - 1516510799000
    // 21/12 23:59 - 1516597199000
    // 22/12 23:59 - 1516683599000
    // 23/12 23:59 - 1516769999000
    // 24/12 23:59 - 1516856399000

    const endTimes = [
        1512193919000,
        1512230399000,
        1512244799000,
        1514955599000,
        1515041999000,
        1515128399000,
        1515214799000,
        1515301199000,
        1515387599000,
        1515473999000,
        1515560399000,
        1515646799000,
        1515733199000,
        1515819599000,
        1515905999000,
        1515992399000,
        1516078799000,
        1516165199000,
        1516251599000,
        1516337999000,
        1516424399000,
        1516510799000,
        1516597199000,
        1516683599000,
        1516769999000,
        1516856399000,
    ];

    const now = new Date().getTime()

    for(var i=0; i<endTimes.length; i++){
        if(now < endTimes[i]){
            return endTimes[i];
        }
    }

    return 0;
}