const express = require('express');
const app = express();
const port = 4000;
const db = require('./models');
const admin = require('./routes/admin');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');


app.use('/', admin);
app.use('/', express.static('public/'));



db.sequelize.sync()
.then(req =>{
    app.listen(port, () => {
        console.log(`Server started on port :: ${port}`);
    });
}).catch(err=>{
    console.log(err)
})
