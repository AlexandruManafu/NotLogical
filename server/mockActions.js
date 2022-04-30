const User = require("./objects/User");
const CircuitEntry = require("./objects/CircuitEntry");
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
            let plainUser = user.authenticate(token);
            console.log("Auth mock success");
            console.log("Username : "+plainUser.name)
        }catch(e)
        {
            console.log("Auth mock failed");
        }

    }

    async createCircuitEntry()
    {
        let normalizedCircuit = '{"numberCyclesAllowed":1,"gates":[{"id":"InputGate1","type":"InputGate","positionXY":[480,180]},{"id":"OutputGate1","type":"OutputGate","positionXY":[660,180]}],"wires":[{"id":"InputGate1OutputGate10","idIncoming":"InputGate1","idOutgoing":"OutputGate1","outPosition":0,"xSegments":[{"start":{"x":535,"y":207},"end":{"x":660,"y":207}}],"ySegments":[]}]}'
        let user = new User();
        user.set("name","login");
        await user.loadIdByName();

        let entry = new CircuitEntry();
        entry
        .set("name","mockSave")
        .set("ownerId",user.id)
        .set("normalizedCircuit",normalizedCircuit)
        .save()
        
    }

    async updateCircuitEntry()
    {
        let normalizedCircuit = '{"numberCyclesAllowed":1,"gates":[{"id":"InputGate1","type":"InputGate","positionXY":[480,180]},{"id":"OutputGate1","type":"OutputGate","positionXY":[660,180]}],"wires":[]}'
        let user = new User();
        user.set("name","login");
        await user.loadIdByName();

        this.createCircuitEntry()
        let entry = new CircuitEntry();
        entry
        .set("name", user.get("name"))
        .set("ownerId", user.id)
        if(await entry.exists())
        {
            entry.update("normalizedCircuit",normalizedCircuit)
        }  
    }

    async shareCircuitEntry()
    {
        let targetCircuit = 25;
        let user = new User();
        user.set("name","login");
        await user.loadIdByName();
        
        let entry = new CircuitEntry();
        entry
        .setId(targetCircuit)
        .set("ownerId", user.id)
        if(await entry.hasProperOwnership())
        {
            entry.update("isPublic",true)
        }  
    }
}
let mock = new MockActions();
module.exports = mock;