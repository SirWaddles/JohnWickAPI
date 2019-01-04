const fs = require('fs');

let assetList = [];

async function refreshAssetList() {
    let assetFile = await readFilePromise('./resources/assets.json');
    assetList = JSON.parse(assetFile);
}

function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function getAssetList() {
    return assetList;
}

function findAsset(term) {
    return assetList.filter(v => v.hasOwnProperty('name') && v.name.includes(term.toLowerCase()));
}

function getAsset(id) {
    return assetList.filter(v => v.id === id.toLowerCase()).pop();
}

refreshAssetList();

exports.getAsset = getAsset;
exports.getAssetList = getAssetList;
exports.findAsset = findAsset;
