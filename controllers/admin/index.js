const asyncHandler = require('express-async-handler');
const {Admin, User, AdminMessage} = require('../../models');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');
const mailer = require('../../utils/nodemailer')


const indexPage = asyncHandler(async(req, res, next)=>{
    const data = {};
    res.render('welcome', {data});
})

const loginPage = asyncHandler(async (req, res, next)=>{
    const data = {};
    res.render('login', {data});
});

const blockPage = asyncHandler(async (req, res, next)=>{
    const data = {};
    data.users = await User.findAll();
    res.render('block', {data});
})

const mailPage = asyncHandler(async (req, res, next)=>{
    const data = {};
    res.render('mail', {data})
})

const transactionPage = asyncHandler(async(req, res, next)=>{
    const data = {};
    res.render('transaction', {data});
})

const mailToAllPage = asyncHandler(async(req, res, next)=>{
    const data = {};
    res.render('mail-to-all', {data});
})

const getUser = asyncHandler(async (req, res, next)=>{
    const data = {};
    const {detail} = req.body
    const user = await User.findOne({
        where: {
            [Op.or]: {
                email: detail,
                phoneNumber: detail
            }
        }
    });
    if(user){
        data.user = user;
        res.render('transaction', {data});
    }else{
        data.message = 'No user Found';
        res.render('transaction',{data});
    }
})

const signIn = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body
    try{
        const data = {}
        const user = await  Admin.findOne({
            where:{
                email
            }
        });
        console.log(user)
        if(user){
            const isUser = await bcrypt.compare(password, user.password);
            if(isUser){
                res.render('welcome', {data});
                req.app.locals.isLoggedIn = true;
            }else{
                data.error = 'Invalid Password';
                res.render('login', data);
            }
        }else{
            data.error = 'Invalid Email'
            res.render('login', {data})
        }
    }catch(err){
        console.log(err)
        res.redirect('/login')
    }
})

const block = asyncHandler(async (req, res, next)=>{
    const {user_id} = req.body;
    const user = await User.findOne({
        where: {
            id: user_id
        }
    });
    const {active} = user;
    User.update({
        active: !active
    }, {
        where: {id: user_id}
    }).then(result=>{
        res.status(200).send()
    }).catch(err=>{
        res.status(500);
        console.log(err)
    })

})


//for all kinds of mailing

const mailing = asyncHandler(async (req, res, next)=>{
    const data = {}
    const {type} = req.query;
    const {message} = req.body;
    if(type === 'mail' || type === 'welcome' ){
        AdminMessage.create({
           message, type 
        });
        data.message = 'Mail successfully saved!';
        res.render(type, {data})
    }else if(type === 'mail-to-all'){
        const users = await User.findAll();
        if(users.length > 0){
            const allMails = users.map(user => user.email);
            const response = await mailer({
                to: allMails,
                text: message,
                // from: 'admin@miltonkeynesbanking.com',
                subject: 'Notice'
            })
            console.log(response);
            data.message = 'All mail sent successfully';
            res.render(type, {data})
        }else{
            data.message = 'No user available'
            res.render(type, {data})
        }
    }
    
})

const transaction = asyncHandler(async (req, res, next) => {
    const data = {};
    const {user_id: id, type, amount} = req.body;
    const user = await User.findOne({
        where: {
         id 
        }
    });
    const {balance} = user;
    const newBalance = type === 'credit' ? Number(balance) + Number(amount) : Number(balance) - Number(amount);
    User.update({
        balance: newBalance, 
    }, 
    {
        where:{
            id
        }
    });
    data.message = `${user.fullName} has been ${type}ed`
    res.render('transaction', {data})
})

module.exports = {
    signIn, loginPage, indexPage, blockPage, block, getUser, transactionPage, mailPage, mailing, mailToAllPage, transaction
}
