import Config from "../config/dev.js"
import {getConfig} from './config.js'
const config = getConfig()
const VyralSaleAbi = require("../contracts/VyralSale.json")
const ShareAbi = require("../contracts/Share.json")


export function getWeb3(){
    if(typeof web3 !== 'undefined'){
        web3 = new Web3(web3.currentProvider)
    } else{
        web3 = new Web3(new Web3.providers.HttpProvider(config.infura))
    }

    return web3
}


export function getVyralSaleContract(web3){
    let abi = web3.eth.contract(VyralSaleAbi);
    return abi.at(config.vyralSaleContractAddress);
}


export function getShareContract(web3){
    let abi = web3.eth.contract(ShareAbi);
    return abi.at(config.shareContractAddress);
}