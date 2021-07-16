const axios = require('axios').default;

const itemListFormatted = [
    // Raid armor
    [ { id: 80248, maxCount: 1 }, { id: 80131, maxCount: 1 }, { id: 80190, maxCount: 1 }, { id: 80111, maxCount: 1 }, { id: 80356, maxCount: 1 }, { id: 80399, maxCount: 1 } ],
    [ { id: 80296, maxCount: 1 }, { id: 80145, maxCount: 1 }, { id: 80578, maxCount: 1 }, { id: 80161, maxCount: 1 }, { id: 80252, maxCount: 1 }, { id: 80281, maxCount: 1 } ],
    [ { id: 80384, maxCount: 1 }, { id: 80435, maxCount: 1 }, { id: 80254, maxCount: 1 }, { id: 80205, maxCount: 1 }, { id: 80277, maxCount: 1 }, { id: 80557, maxCount: 1 } ],
    // Back pieces / Trinkets
    [ { id: 74155, maxCount: 1 }, { id: 77474, maxCount: 1 }, { id: 81462, maxCount: 1 }, { id: 81908, maxCount: 1 }, { id: 91048, maxCount: 1 }, { id: 92991, maxCount: 1 }, { id: 91234, maxCount: 1 }, { id: 93105, maxCount: 2 }],
    // One-handed weapons in both hands
    [ { id: 30684, maxCount: 4 }, { id: 76158, maxCount: 4 }, { id: 30687, maxCount: 4 }, { id: 87109, maxCount: 4 }, { id: 30692, maxCount: 4 }, { id: 79562, maxCount: 4 }, { id: 30693, maxCount: 4 }, { id: 72713, maxCount: 4 }, { id: 30699, maxCount: 4 }, { id: 81957, maxCount: 4 }],
    // One-handed weapons in one hand only
    [ { id: 30695, maxCount: 2 }, { id: 88576, maxCount: 2 }, { id: 30688, maxCount: 2 }, { id: 86098, maxCount: 2 }, { id: 30696, maxCount: 2 }, { id: 79802, maxCount: 2 }, { id: 30700, maxCount: 2 }, { id: 81206, maxCount: 2 }, { id: 30702, maxCount: 2 }, { id: 87687, maxCount: 2 }],
    // Two-handed weapons
    [ { id: 30703, maxCount: 2 }, { id: 30704, maxCount: 2 }, { id: 30689, maxCount: 2 }, { id: 90551, maxCount: 2 }, { id: 30690, maxCount: 2 }, { id: 81839, maxCount: 2 }, { id: 30685, maxCount: 2 }, { id: 89854, maxCount: 2 }, { id: 30694, maxCount: 2 }, { id: 80488, maxCount: 2 }, { id: 30686, maxCount: 2 }, { id: 78556, maxCount: 2 }, { id: 30698, maxCount: 2 }, { id: 71383, maxCount: 2 }],
    // Upgrades
    [ { id: 91536, maxCount: 7 }, { id: 91505, maxCount: 8 }],
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