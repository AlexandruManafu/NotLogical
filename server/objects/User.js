const ObjectToDatabaseEntry = require("./ObjectToDatabaseEntry");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

class User extends ObjectToDatabaseEntry{
    constructor(){
        super();
        this.fields["name"] = "";
        this.fields["password"] = "";
        this.fields["email"] = "";
        this.tableName = "users";
    }

    setPassword(plainPassword)
    {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainPassword, salt);
        this.set("password",hash);
        return this;
    }

    async exists()
    {
        let sql = "SELECT id FROM "+this.tableName + " WHERE name ='"+this.fields["name"]+"'";
        return await this.getDb().exists(sql);
    }

    async validPassword(password)
    {
        await this.load("password","name",this.fields["name"]);
        return await bcrypt.compare(password,this.fields["password"]);
    }

    async login(name,password)
    {
        this.set("name",name);
        userExists = await this.exists();
        if(userExists)
        {

        }
    }

    getPlainObject()
    {
        return {name : this.get("name"), password : this.get("password")};
    }

    generateJwtToken()
    {
        return jwt.sign(this.getPlainObject(),process.env.ACCESS_TOKEN_SECRET);
    }

    authenticate(accessToken)
    {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }



}
module.exports = User;