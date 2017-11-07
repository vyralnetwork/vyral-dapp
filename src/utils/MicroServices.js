import { findConstructor, getconstructorParams, toFixed } from './Utils'

export function getEncodedABIClientSide(web3, abi, data, cb) {
    // get ABI Constructor from the ABI Object
    // In our case it should be...
    // 1. Ethereum Address of User
    // 2. ETH Amount
    // 3. Referrer ID
    const abiConstructor = findConstructor(abi, data)

    // Here we want to grab all the inputs user has provided and create two arrays from it.
    // We will take an object as an argument and only accept the Keys 
    // which are a part of ABI Constructor and throw away the rest of them
    // 
    // Array 1 contains TYPE of all the inputs
    // Array 2 contains VALUE of all the inputs
    let params = getconstructorParams(abiConstructor, data);

    getABIencoded(web3, params.types, params.vals, function(encoded) {
        cb(encoded);
    });
}

function getABIencoded(web3, types, vals, cb) {
    if (vals) {
        for (let i = 0; i < vals.length; i++) {
            let val = vals[i];
            if( Object.prototype.toString.call( val ) === '[object Array]' ) {
                for (let j = 0; j < val.length; j++) {
                    if (val[j]) {
                        vals[i][j] = toFixed(val[j]);
                    }
                }
            }
        }
    }

    console.log(types);
    console.log(vals);

    let encoded = web3.eth.abi.encodeParameters(types, vals);
    cb(encoded.toString("hex"));
}