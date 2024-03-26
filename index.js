const express=require('express');
const port=8001;
const db=require('./config/mongoose');
const path=require('path');
const passportLocal=require('./config/passportLocal');
const session=require('express-session')
const passport=require('passport')
const app=express();
const connectFlash=require('connect-flash')
const customFlash=require('./config/customFlash')


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


const cookieParse=require('cookie-parser');
app.use(cookieParse());



app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name:'RnW',
    secret:'abc',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(connectFlash());
app.use(customFlash.setFlash)

app.use('/',require('./routes'));


app.listen(port,async(err)=>{
    err?console.log(err):console.log(`port is running on server ! ${port}`);
});