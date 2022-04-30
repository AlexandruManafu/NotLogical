const ObjectToDatabaseEntry = require("./ObjectToDatabaseEntry");
const utils = require("./Utils");
class CircuitEntry extends ObjectToDatabaseEntry{
    constructor(){
        super();
        this.fields["name"] = "";
        this.fields["ownerId"] = 0;
        this.fields["normalizedCircuit"] = "";
        this.fields["views"] = 0;
        this.fields["isPublic"] = false;
        this.ownerName = ""
        
        this.tableName = "circuit_entries";
        this.usersTable = "users"
    }

    async loadId()
    {
        let name = this.fields["name"]
        let ownerId = this.fields["ownerId"]
        let sql = "SELECT id FROM "+this.tableName + " WHERE name = ? AND ownerId = ?";

        let id = 0
        let selectResult = await this.getDb().select(sql,[name,ownerId]);
        if(selectResult != undefined && selectResult[0] != undefined)
        {
            id = selectResult[0].id
            this.setId(id);
        }
        return this.id > 0;
    }

    async loadOwnerName()
    {
        if(this.get("ownerId")!= 0 && this.id != 0)
        {
            let users = this.usersTable
            let ownerId = this.get("ownerId")
            let sql = "SELECT name FROM( "
            sql +="SELECT t1.name FROM "+ users +" t1 "
            sql +="RIGHT JOIN "+ this.tableName +" t2 ON t2.ownerId = t1.id "
            sql +="AND t2.ownerId = ? AND t2.id = ? "
            sql +="ORDER BY t1.id "
            sql +=") t WHERE name IS NOT NULL"

            let selectResult = await this.getDb().select(sql,[ownerId,this.id]);
            if(selectResult != undefined && selectResult[0] != undefined)
            {
                let name = selectResult[0].name
                this.ownerName=name
            }

        }
    }

    async exists()
    {
        let sql = "SELECT 1 FROM "+this.tableName + " WHERE id = ?";

        let selectResult = await this.getDb().select(sql,[this.id]);
        if(selectResult != undefined && selectResult[0] != undefined)
        {
            return true
        }
        return false
    }

    async hasProperOwnership()
    {
        let id = this.id
        let ownerId = this.fields["ownerId"]
        let sql = "SELECT 1 FROM "+this.tableName + " WHERE id = ? AND ownerId = ?";

        let selectResult = await this.getDb().select(sql,[id,ownerId]);
        if(selectResult != undefined && selectResult[0] != undefined)
        {
            return true
        }
        return false
    }

    parseNormalizedCircuit()
    {
        let textCircuit = this.get("normalizedCircuit");
        this.set("normalizedCircuit",JSON.parse(textCircuit));
    }

    getPreviewObject()
    {
        return {
            id: this.id,
            name: this.get("name"), 
            views: this.get("views"),
            ownerName : this.ownerName
        }
    }

    isSearched(searchTerm)
    {
        let name = this.get("name")
        let owner = this.ownerName
        return utils.isSubstring(searchTerm,name) ||  utils.isSubstring(searchTerm,owner)
    }

    async getVisibleEntries(searchTerm = "")
    {
        let ownerId = this.fields["ownerId"]
        let sql = "SELECT * FROM "+this.tableName + " WHERE isPublic = TRUE OR ownerId = ? ORDER BY views DESC";
        let selectResult = await this.getDb().select(sql,[ownerId]);
        let result = []
        for(let i = 0; i<selectResult.length; i++)
        {
            let temp = new CircuitEntry();
            temp.setId(selectResult[i].id)
            await temp.load("name");
            await temp.load("views");
            await temp.load("ownerId");
            await temp.loadOwnerName();

            if(searchTerm == "" || temp.isSearched(searchTerm))
            {
                result.push(temp.getPreviewObject())
            }
        }
        return result
    }

    isOwner(username)
    {
        return username == this.ownerName
    }

    async delete()
    {
        if(this.id != 0)
        {
            let sql = "DELETE FROM "+this.tableName+" WHERE id = ?";
            return await this.getDb().delete(sql, [this.id]);
        }
    }
}
module.exports = CircuitEntry;