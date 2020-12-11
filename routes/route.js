
const {
    articles, 
    createArticle,
    updateArticle,
    deleteArticle,
    detailArticle
} = require('./../controllers/article');


module.exports = app =>{
    app.get('/', (req, res) => {
        res.json({message: "Hello Hello"});
    });

    app.get('/article', articles);
    app.post('/article',createArticle);
    app.put('/article/:id',updateArticle);
    app.delete('/article/:id',deleteArticle);
    app.get('/article/:id',detailArticle);
};