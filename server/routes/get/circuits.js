const CircuitEntry = require("../../objects/CircuitEntry");
const User =  require("../../objects/User");
module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('hello world')
      })

    app.get('/circuit/:id', async (req, res) => {
      const token = req.headers['auth'];
      let user = new User();
      let circuitId = req.params.id
      try{
          if(token)
          {
            let plainUser = user.authenticate(token);
            user.set("name",plainUser.name)
            await user.loadIdByName()
          }
          let circuitEntry = new CircuitEntry();
          circuitEntry.setId(circuitId);
          let circuitExists = await circuitEntry.exists()
          if(!circuitExists)
          {
            console.log("Does not exist")
            res.send({body : "GET circuit Failed"});
            return
          }
          await circuitEntry.load("isPublic");
          await circuitEntry.load("ownerId")
          if(circuitEntry.get("ownerId") == user.id || circuitEntry.get("isPublic"))
          {
            await circuitEntry.load("normalizedCircuit")
            await circuitEntry.load("name")
            await circuitEntry.load("views")
            circuitEntry.update("views",circuitEntry.get("views")+1)
            circuitEntry.parseJsonText("normalizedCircuit")
            let response = circuitEntry.getFieldsAsObject()
            await circuitEntry.loadOwnerName()
            response.isOwner = circuitEntry.isOwner(user.get("name"))
            response.ownerId = 0
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

    app.get(['/circuits/:search', '/circuits'], async (req, res) => {
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
          let circuitEntry = new CircuitEntry();
          circuitEntry.set("ownerId",user.id)
          console.log("search : "+searchTerm)
          let result = await circuitEntry.getVisibleEntries(searchTerm)
          console.log(result)
          res.send(result);
          
      }catch(e)
      {
          res.send({body:"GET circuits Failed"});
          console.log(e)
      }
    })
    
}