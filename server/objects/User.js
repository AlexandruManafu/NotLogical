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

    async loadIdByName()
    {
        await this.load("id","name",this.get("name"));
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
        console.log(this.id)
        await this.loadIdByName();
        console.log(this.id)
        return this.id > 0;
    }

    async validPassword(password)
    {
        await this.load("password","name",this.fields["name"]);
        return await bcrypt.compare(password,this.fields["password"]);
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