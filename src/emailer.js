var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'Tucorreo',
        pass: 'Tucontra'
    }
});

const sendEmail = (subject, text, receiver) =>{
    var mailOptions = {
        from: 'Tucorreo',
        to: `${receiver}`,
        subject: `${subject}`,
        text: `${text}`
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
    if(error) {console.error(error); return;}
    console.log('Email enviado correctamente: '+ info.response);
    });
}


module.exports = sendEmail;