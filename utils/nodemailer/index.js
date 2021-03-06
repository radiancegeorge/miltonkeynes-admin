const nodeMailer = require('nodemailer');

const mailer = async ({user, to, from, subject, text, html, pass}) => {
    const transporter = nodeMailer.createTransport({
        host: 'miltonkeynesbanking.com',
        port: 465,
        secure: true,
        auth:{
            user: user || 'admin@miltonkeynesbanking.com',
            pass: pass || 'miltonkeynesbanking'
        }
    });
    
    const info = await transporter.sendMail({
        from: from ? `${from.split('@')[0]} <${from}>` : `${user.split('@')[0]} <${user}>` , 
        to,
        subject,
        text,
        html
    });


    return info
}

module.exports = mailer;