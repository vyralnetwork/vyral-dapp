const config = process.env.NODE_ENV === 'development'
  ? require('../config/development.json')
  : require('../config/production.json')


export function getConfig(){
    return config
}