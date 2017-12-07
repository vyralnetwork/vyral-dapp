import {getEndTime} from './vyralSchedule'

const dayBonuses = {
    1512230399000: 0, //Pre-sale is not yet started.
    1512244799000: 70,
    1512277199000: 50,
    1512363599000: 45,
    1512449999000: 44,
    1512536399000: 43,
    1512622799000: 42,
    1512709199000: 41,
    1512795599000: 40,
    1512881999000: 39,
    1512968399000: 38,
    1513054799000: 37,
    1513141199000: 36,
    1513227599000: 35,
    1513313999000: 34,
    1513400399000: 33,
    1513486799000: 32,
    1513573199000: 31,
    1513659599000: 30,
    1513745999000: 29,
    1513832399000: 28,
    1513918799000: 27,
    1514005199000: 26,
    1514091599000: 20,
    1514177999000: 15,
};

export function getBonusForToday(){
    const endTime = getEndTime()
    if(dayBonuses.hasOwnProperty(endTime)){
        return dayBonuses[endTime]
    }

    return 0
}

export function getBonusByDay(endTime){
    if(dayBonuses.hasOwnProperty(endTime)){
        return dayBonuses[endTime]
    }

    return 0
}