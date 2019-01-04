let express = require('express');

const app = express();

app.set('trust proxy', true);

app.listen(8719, () => {
    console.log("Express started");
});

module.exports = app;
