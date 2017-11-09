const networks = {
    mainnet: 1,
    morden: 2,
    ropsten: 3,
    rinkeby: 4,
    kovan: 42,
    // oraclesTest: 12648430
}

const abi = [];


export const VyralConfig = {
    launchDateTime: 1512122400000,
    contractAddress: '0xc5a21a3e32d9d614ed46e4b2352670fcb21009ee',
    networks: networks,
    abi: abi,
    baseUrl: 'https://vyral.network',
    referralBaseUrl: 'https://vyral.network?referrer=',
};