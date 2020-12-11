const { validationResult } = require('express-validator');
const { Article } = require('./../models'), 
      response = require('./../api/apiUtils')

exports.articles = async (req, res) => {

 const data = await Article.findAll({
        where: { status: true}
    }, 
    {
    attributes: ['id','title','description'],
    order: [
        ['createdAt', 'DESC']
    ]
    })
    .then(result => result )
    .catch(err =>  {
        const errors = err;
        let errMessage = {};
        errors.map(item => errMessage[item.path] = item.message)
        res.status(530);
        response.failed("failed", errMessage,res); 
    });
    res.status(201);
    response.ok("success get all data", data, res);
} 

exports.createArticle = (req , res) => {
    const {title, description} = req.body;
    Article.create({
        title,description
    }).then(data => {
        res.status(201);
        response.ok("Success create article", data, res);
    })
    .catch(err => {
        const { errors } = err;
        let errMessage = {};
        errors.map(item => errMessage[item.path] = item.message)
        res.status(530);
        response.failed("failed", errMessage,res); 
    });
}
//update
exports.updateArticle = (req, res) => {
    const {id} = req.params;
    const {title, description, status} = req.body;
    
    Article.update({
        title,
        description,
        status
    },{ where: { id }
    }).then( async data => {
        if (data.join("") > 0) {
            const article = await Article.findOne({where: { id }})
            .then(result => result);

        res.status(200);
        response.ok("Success update article", article, res)
        return
        }
        response.failed("failed",{id: "id not found"},res);
    }).catch(err => console.log(err))
}
//delete
exports.deleteArticle = (req, res) => {
    const { id } = req.params;

    Article.destroy({where: { id } })
    .then(data => {
        if(data > 0){
            res.status(202);
            response.ok("delete success", {}, res);
            return
        }
        res.status(404);
        response.failed("delete failed",{d: "id not found"}, res);
       
    })
    .catch(err => console.log(err));
}
//detail
exports.detailArticle = async (req, res) => {
    const{ id } = req.params;

    const article = await Article.findOne({ where: {id}, raw: true })
    .then(result => result)
    .catch(err => console.log(err));
if(article) {
    Article.update({ view: +article.views + 1 }, {where: { id }});
    response.ok("success show data ", article, res);
}else{
    response.failed("article not found",undefined, res);
}
}