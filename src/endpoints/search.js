const app = require('../app');
const { findAsset } = require('../model/assets');

app.post('/search', (req, res) => {
    res.json({
        assets: findAsset(req.body.term),
    });
});
