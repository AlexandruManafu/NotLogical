const User =  require("../../objects/User");
const BuildCircuitLevel = require("../../objects/BuildCircuitLevel");

module.exports = function(app){
    
      app.post('/uploadLevel', async (req, res) => {
        const received = req.body.content
        let token = req.body.token;
        let user = new User();
        if(token)
        {
            try{
                let plainUser = user.authenticate(token);
                user.set("name",plainUser.name)
                await user.loadIdByName()

                let entry = new BuildCircuitLevel();
                entry
                .set("name",received.level.name)
                .set("instructions",received.level.instructions)
                .set("ownerId",user.id)
                .set("partialSolution",received.partial)
                .set("tests",received.level.tests)
                await entry.syncSave();

                console.log("Level Uploaded");
                res.send("Level Upload Success");
            }catch(e)
            {
                res.send("Level Upload Failed");
                console.log(e)
            }
        }
      })
}