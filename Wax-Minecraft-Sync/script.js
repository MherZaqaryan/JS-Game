const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);

autoLogin();

async function autoLogin() {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
        let userAccount = wax.userAccount;
        let pubKeys = wax.pubKeys;
        let str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        document.getElementById('autologin').insertAdjacentHTML('beforeend', str);
    }
    else {
        document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
    }
}

async function login() {
    let response = document.getElementById('loginresponse');
    if (document.getElementById('fname').value.length == 0) {
        return response.innerHTML = "Please type your minecraft username first!";
    }
    response.innerHTML = await getId(document.getElementById('fname').value);
    return;
    try {
        let userAccount = await wax.login();        
        response.innerHTML = userAccount;
    } 
    catch (e) {
        response.innerHTML = e.message;
    }
} 

async function getId(playername) {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playername}`)
    .then(data => data.json())
    .then(player => player.id);
    return response.id;
}

async function sign() {
    const response = document.getElementById('response');
    if(!wax.api) {
        return response.innerHTML = '* Login first *';
    }
    try {
        const result = await wax.api.transact({
            actions: [{
                    account: 'eosio',
                    name: 'delegatebw',
                    authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                    data: {
                    from: wax.userAccount,
                    receiver: wax.userAccount,
                    stake_net_quantity: '0.00000001 WAX',
                    stake_cpu_quantity: '0.00000000 WAX',
                    transfer: false,
                    memo: 'This is a WaxJS/Cloud Wallet Demo.'
                },
            }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
        });
        response.innerHTML = JSON.stringify(result, null, 2);
    } catch(e) {
        response.innerHTML = e.message;
    }
}