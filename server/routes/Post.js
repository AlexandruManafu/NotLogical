const User =  require("../objects/User");
const CircuitEntry = require("../objects/CircuitEntry");

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

      app.post('/uploadCircuit', async (req, res) => {
        const received = req.body
        let token = received.token;
        let user = new User();
        if(token)
        {
            try{
                let plainUser = user.authenticate(token);
                user.set("name",plainUser.name)
                await user.loadIdByName();

                let entry = new CircuitEntry();
                entry
                .set("name",received.name)
                .set("ownerId",user.id)
                await entry.loadId();
                if(await entry.exists())
                {
                    entry.update("normalizedCircuit",received.normalizedCircuit)
                    console.log("Circuit Updated")
                }
                else
                {
                    entry
                    .set("normalizedCircuit",received.normalizedCircuit)
                    .save()
                    console.log("Circuit Uploaded");
                }
                await entry.loadId()
                res.send(entry.id.toString());
            }catch(e)
            {
                res.send("Circuit Upload Failed");
                console.log(e)
            }
        }
      })

      app.post('/shareCircuit', async (req, res) => {
        const received = req.body
        let token = received.token;
        let user = new User();
        if(token)
        {
            try{
                let plainUser = user.authenticate(token);
                user.set("name",plainUser.name)
                await user.loadIdByName();

                let entry = new CircuitEntry();
                entry
                .setId(received.circuitId)
                .set("ownerId",user.id)
                if(await entry.hasProperOwnership())
                {
                    entry.update("isPublic", true)
                    console.log("Circuit shared")
                    res.send("Success");
                }
                else
                {
                    res.send("Failed");
                }
            }catch(e)
            {
                res.send("Circuit Upload Failed");
                console.log(e)
            }
        }
      })

      app.post('/unshareCircuit', async (req, res) => {
        const received = req.body
        let token = received.token;
        let user = new User();
        if(token)
        {
            try{
                let plainUser = user.authenticate(token);
                user.set("name",plainUser.name)
                await user.loadIdByName();

                let entry = new CircuitEntry();
                entry
                .setId(received.circuitId)
                .set("ownerId",user.id)
                if(await entry.hasProperOwnership())
                {
                    entry.update("isPublic", false)
                    console.log("Circuit shared")
                    res.send("Success");
                }
                else
                {
                    res.send("Failed");
                }
            }catch(e)
            {
                res.send("Circuit Upload Failed");
                console.log(e)
            }
        }
      })

      app.post('/deleteCircuit', async (req, res) => {
        const received = req.body
        let token = received.token;
        let user = new User();
        if(token)
        {
            try{
                let plainUser = user.authenticate(token);
                user.set("name",plainUser.name)
                await user.loadIdByName();

                let entry = new CircuitEntry();
                entry
                .setId(received.circuitId)
                .set("ownerId",user.id)
                if(await entry.hasProperOwnership())
                {
                    await entry.delete()
                    console.log("Circuit deleted")
                    res.send("Success");
                }
                else
                {
                    res.send("Failed");
                }
            }catch(e)
            {
                res.send("Circuit Delete Failed");
                console.log(e)
            }
        }
      })
}