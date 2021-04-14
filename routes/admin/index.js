const express = require('express');
const { signIn, loginPage, indexPage, blockPage, transactionPage, getUser, mailPage, mailing, mailToAllPage, transaction } = require('../../controllers/admin');
const { protect } = require('../../middlewares/isLoggedIn.middleware');
const admin = express.Router();

admin.get('/', protect, indexPage);
admin.get('/login', loginPage);
admin.get('/block', protect, blockPage);
admin.get('/transaction', protect, transactionPage);
admin.get('/mail', protect, mailPage);
admin.get('/mail-to-all', protect, mailToAllPage)

admin.post('/add-messages', protect, mailing);
admin.post('/getUser', protect, getUser);
admin.post('/login', signIn);
admin.post('/transaction', protect, transaction)



module.exports = admin