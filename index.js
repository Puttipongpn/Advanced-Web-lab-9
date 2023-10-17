const expressFunction = require("express");
const expressApp = expressFunction();

expressApp.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Option,Authorization')
    return next()
})

expressApp.use(expressFunction.json())

expressApp.use('/user',require('./routes/signup'))
expressApp.use('/login',require('./routes/signin'))
expressApp.use('/api',require('./routes/location'))


expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
});