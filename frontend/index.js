const express = require("express");
const path = require("path");
const app =express();
app.use(express.static('public'));
app.use(express.static('script'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './pages/login.html'))
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname, './pages/register.html'))
})
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname, './pages/home.html'))
})
app.get('/accountInfo',(req,res)=>{
    res.sendFile(path.join(__dirname, './pages/accountInfo.html'))
})

app.listen(3000,() =>{
    console.log('Frontend is listening on port 3000');

})

