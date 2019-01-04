const app = require('../app');

app.get('/', (req, res) => {
    res.json({
        intro: 'This is the API for the JohnWick Discord Bot.',
    });
});
