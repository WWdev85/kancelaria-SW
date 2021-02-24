const mailer = require('express-mailer');
const express = require('express');
const app = express();
const path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(
    path.join(__dirname, '/build')
));



app.listen(3000  , ()=>{
    console.log('Server is listening at http://localhost:3000',path.join(__dirname, '/build'));
} );


mailer.extend(app, {
    from: 'biuro@wasek-kancelaria.pl',
    host: 'mail48.mydevil.net', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'formularz@wasek-kancelaria.pl',
        pass: ''
    }
});





app.post('/message/:email', (req, res) => {
    
    const {email} = req.params;
    let data = JSON.parse(email);
    let text = "";

    for(let i = 0; i < data[2].length ; i++){
        
       text += data[2][i] + `<br>` ;
        
    }
    
     text = text.split("*$*").join("?");
    console.log(__dirname);
      app.mailer.send('email1', {
        to: "wasekw@gmail.com", 
        subject: 'Formularz kontaktowy', 
        email:data[1],
        name: data[0],
        content: text,
        picture: ` <img src="./public/images/pobrane.jpg" class="logo"  alt="Logo">`,
        }, function (err) {
        if (err) {   
            res.jason(err);
        return;
        }
    });

    app.mailer.send('email2', {
        to: data[1], 
        subject: 'Potwierdzenie wysłania wiadomości',
        name: data[0],
        content: text,
        }, function (err) {
        if (err) {   
           res.jason(err);
        return;
        }
    });
    setTimeout(() => { 
        res.json("wysłano");
        res.end();

    },1000);
        
    })
 

