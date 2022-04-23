const User = require("./objects/User");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

class MockActions{

    createUser()
    {
        let user = new User();
        user
        .set("name","login")
        .set("password","qwertyuiop")
        .set("email","a@a.com")
        .save();
    }

    async loginUser()
    {
        let userName = "login"
        let receivedPassword = "qwertyuiop"
        let user = new User();
        user.set("name", userName);
        if(await user.exists() && await user.validPassword(receivedPassword) )
        {
            console.log("Login mock success");
            console.log(user.fields["password"]);
        }
    }

    async jwtLogin(){
        let userName = "login"
        let receivedPassword = "qwertyuiop"
        let user = new User();
        user.set("name", userName);
        if(await user.exists() && await user.validPassword(receivedPassword))
        {
            let plainUser = user.getPlainObject();
            //generate jwt token
            const token = jwt.sign(plainUser,process.env.ACCESS_TOKEN_SECRET);
            console.log("JWT Login mock success");
            console.log(token);
        }
    }

    authenticate()
    {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG9naW4iLCJwYXNzd29yZCI6IiQyYiQxMCRQbE9vWUhYZ3l0andKdWNYRXVILjQudGd0WVZZWE9VUHBvQ1FIL3NFRzZZVFdnd0ZtSnpWYSIsImlhdCI6MTY1MDM1NTg5M30.BA1c1qvAcoTffjXUNoQWUpSTmhPrGf3zXahWR28Pg1E";
        let wrongToken = token.slice(0,token.length - 1);
        try{
            let user = new User();
            user.authenticate(token);
            console.log("Auth mock success");
        }catch(e)
        {
            console.log("Auth mock failed");
        }

    }
}
let mock = new MockActions();
module.exports = mock;