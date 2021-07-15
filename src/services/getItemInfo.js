const axios = require('axios').default;

const itemListFormatted = [
    // Raid armor
    [ { id: 80248, maxCount: 1 }, { id: 80131, maxCount: 1 }, { id: 80190, maxCount: 1 }, { id: 80111, maxCount: 1 }, { id: 80356, maxCount: 1 }, { id: 80399, maxCount: 1 } ],
    [ { id: 80296, maxCount: 1 }, { id: 80145, maxCount: 1 }, { id: 80578, maxCount: 1 }, { id: 80161, maxCount: 1 }, { id: 80252, maxCount: 1 }, { id: 80281, maxCount: 1 } ],
    [ { id: 80384, maxCount: 1 }, { id: 80435, maxCount: 1 }, { id: 80254, maxCount: 1 }, { id: 80205, maxCount: 1 }, { id: 80277, maxCount: 1 }, { id: 80557, maxCount: 1 } ],
    [ { id: 91536, maxCount: 7 }, { id: 91505, maxCount: 8 }]
];

export async function getItemInfo() {
    const apiItemInfo = await getApiItemInfo();
    return itemListFormatted.map(row => row.map(item => ({ ...item, ...getEnrichedApiInfo(apiItemInfo, item.id) })))
}

function getEnrichedApiInfo(apiItemInfo, id) {
    return apiItemInfo.find(item => item.id === id);
}

async function getApiItemInfo() {
    const ids = getFlattenedItemIdList().join(',')
    return (await axios.get('https://api.guildwars2.com/v2/items', {
        params: {
            ids,
            lang: 'en'
        }
    })).data;
}

function getFlattenedItemIdList() {
    return itemListFormatted.reduce((a, b) => a.concat(b), []).map(item => item.id);
}