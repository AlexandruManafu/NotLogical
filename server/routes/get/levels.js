const BuildCircuitLevel = require("../../objects/BuildCircuitLevel");
const CircuitEntry = require("../../objects/CircuitEntry");
const User =  require("../../objects/User");
module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('hello world')
      })

    app.get('/level/:id', async (req, res) => {
      const token = req.headers['auth'];
      let user = new User();
      let levelId = req.params.id
      try{
          if(token)
          {
            let plainUser = user.authenticate(token);
            user.set("name",plainUser.name)
            await user.loadIdByName()
          }
          let levelEntry = new BuildCircuitLevel();
          levelEntry.setId(levelId);
          let levelExists = await levelEntry.exists()
          if(!levelExists)
          {
            console.log("Does not exist")
            res.send({body : "GET circuit Failed"});
            return
          }
          await levelEntry.load("isPublic");
          await levelEntry.load("ownerId")
          if(levelEntry.get("ownerId") == user.id || levelEntry.get("isPublic"))
          {

            await levelEntry.load("name")
            await levelEntry.load("views")
            await levelEntry.load("instructions")
            await levelEntry.load("tests")
            await levelEntry.load("partialSolution")

            levelEntry.parseJsonText("tests")
            levelEntry.parseJsonText("partialSolution")

            levelEntry.update("views",levelEntry.get("views")+1)
            //levelEntry.parseJsonText("partialSolution")

            let response = levelEntry.getFieldsAsObject()
            await levelEntry.loadOwnerName()

            response.isOwner = levelEntry.ownerName == user.get("name")? true:false
            response.ownerId = 0
            response.id = levelEntry.id
            console.log(response)  
            res.send(response)
          }
          else
          {
            res.send({body : "No permissions"});
          }
          
      }catch(e)
      {
          res.send({body : "GET circuit Failed"});
          console.log(e)
      }
    })

    app.get('/levelCompleted/:id', async (req, res) => {
      let levelId = req.params.id
      try{
        level = new BuildCircuitLevel()
        level.setId(levelId);
        if(await level.exists())
        {
          await level.load("numberCorrectSubmissions")
          level.update("numberCorrectSubmissions", level.get("numberCorrectSubmissions") + 1)

          res.send({body:"Submitted"})
        }
        else
        {
          console.log("Level not found")
          res.send({body:"Level not found"})
        }

      }catch(e)
      {
          res.send({body : "Unknown Error"});
          console.log(e)
      }
    })

    app.get(['/levels/:search', '/levels'], async (req, res) => {
      const token = req.headers['auth'];
      let searchTerm = ""
      if(req.params.search)
        searchTerm = req.params.search == "any" ? "" : req.params.search
      else
        searchTerm = ""
      let user = new User();
      console.log("circuits")
      try{
          if(token)
          {
            let plainUser = user.authenticate(token);
            user.set("name",plainUser.name)
            await user.loadIdByName()
          }
          let level = new BuildCircuitLevel();
          level.set("ownerId",user.id)
          console.log("search : "+searchTerm)
          let result = await level.getVisibleEntries(searchTerm)
          console.log(result)
          res.send(result);
          
      }catch(e)
      {
          res.send({body:"GET circuits Failed"});
          console.log(e)
      }
    })
    
}