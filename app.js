const express = require('express');
const Sequelize = require('sequelize');
const {link} = require("./database/model/link")
// Set up the Express app and define the port
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const crypto = require('crypto');
require('dotenv').config()
app.engine('blade.html', mustacheExpress());
app.set('view engine', 'blade.html');
app.use(bodyParser.json());

// Configure Sequelize to connect to the database

//
// app.post('/api/links', (req, res) => {
//     // Generate a unique short code for the link
//     const shortCode = generateShortCode();
//
//     // Create a new Link record in the database
//     Link.create({
//         originalUrl: req.body.url,
//         shortCode: shortCode
//     }).then(link => {
//         // Send the short code back to the client
//         res.send({ shortCode: link.shortCode });
//     }).catch(error => {
//         res.status(500).send(error);
//     });
// });
function generateRandomString() {
    const randomBytes = crypto.randomBytes(2); // generates 2 random bytes
    return randomBytes.toString('hex').slice(0, 4); // convert to hexadecimal string and slice to get the first 4 characters
}
app.post("/add",(req,res) =>{
    var validUrl = require('valid-url');

    var code = generateRandomString();

            if (validUrl.isUri(req.body.link)) {

            }else{
                res.status(500).json({success:false,code:code,msg:"حدث خطأ ، ليش رابط"});
                return;
            }
    link.create({
        link: req.body.link,
        code: code
    }).then((user) => {
        res.status(200).json({success:true,code:code});
    }).catch((err) => {
        console.log(err)
        res.status(500).json({success:false,code:code,msg:"حدث خطأ"});
    }); 

})
app.get("/",(req,res) => {
    res.render("index",{url:process.env.URL})
})

app.get('/:code', (req, res) => {
    const {code} = req.params;
        link.findOne({
            where: {
                code: code
            }
        }).then(({link}) => {
            res.redirect(link);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000');
});