const networks = {
    mainnet: 1,
    morden: 2,
    ropsten: 3,
    rinkeby: 4,
    kovan: 42,
}

const abi = [];


export const VyralConfig = {
    launchDateTime: 1512122400000,
    contractAddress: '0x0c1f00e6749b1fda244d4e3b075efd8073e187ca',
    networks: networks,
    abi: abi,
    baseUrl: 'https://vyral.network',
    referralBaseUrl: 'https://vyral.network?referrer=',
    referralCodePrefix: '0xec8ac4d8000000000000000000000000'
};