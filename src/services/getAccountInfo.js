const axios = require('axios').default;

export async function getAccountInfo(access_token) {
    return (await axios.get('https://api.guildwars2.com/v2/account/legendaryarmory', {
        params: {
            access_token
        }
    })).data;
}