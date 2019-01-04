const fs = require('fs');
const app = require('../app');
const { getAsset } = require('../model/assets');

app.get('/texture/:asset_id', (req, res) => {
    let asset = getAsset(req.params.asset_id);
    if (!asset || !asset.hasOwnProperty('image')) {
        res.status(500).json({error: 'Asset not found'});
        return;
    }

    let filePath = './textures/' + asset.image;
    if (!fs.existsSync(filePath)) {
        res.status(500).json({error: 'Texture not found'});
        return
    }

    res.sendFile(filePath, {
        root: __dirname + '/resources/',
    });
});
