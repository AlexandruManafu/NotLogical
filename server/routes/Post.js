const User =  require("../objects/User");


module.exports = function(app){

    app.post('/register', async (req, res) => {
        const { email, name, password } = req.body
        try{
            if(name && password && email)
            {
                let user = new User();
                user.set("name",name);

                let userExists = await user.exists();
                if(!userExists)
                {
                    user.setPassword(password)
                    .set("email",email)
                    .save();
                    res.send(name);
                }
                else
                    res.send("User exists");
            }
            else
            {
                res.status(418);
                res.send("Improper data received");
            }
        }catch(e)
        {
            res.status(500);
        }
      })
      app.post('/login', async (req, res) => {
        const {name, password } = req.body
        try{
            if(name && password)
            {
                let user = new User();
                
                user.set("name", name);
                if(await user.exists())
                {
                    if(await user.validPassword(password))
                        res.send(user.generateJwtToken());
                    else
                        res.send("Wrong password");
                }
                else
                    res.send("No such user");     
            }
            else
            {
                res.status(418);
                res.send("Improper data received");
            }
        }catch(e)
        {
            res.status(500);
        }
      })

      app.post('/auth', async (req, res) => {
        const authHeader = req.headers['auth'];
        let token = "";
        if(authHeader.lenght >= 2)
            token = authHeader.split(" ")[1];
        let user = new User();
        if(token)
        {
            try{
                user.authenticate(token);
                res.send("Auth Success");
            }catch(e)
            {
                res.send("Auth Failed");
            }
        }
      })
}