const ObjectToDatabaseEntry = require("./ObjectToDatabaseEntry");
const utils = require("./Utils");
class BuildCircuitLevel extends ObjectToDatabaseEntry{
    constructor(){
        super();
        this.fields["ownerId"] = 0;
        this.fields["name"] = "";
        this.fields["instructions"] = "";

        this.fields["tests"] = "";
        this.fields["partialSolution"] = "";

        this.fields["views"] = 0;
        this.fields["numberCorrectSubmissions"] = 0;
        this.fields["isPublic"] = true;

        this.ownerName = ""
        this.tableName = "build_circuit_levels";
        this.usersTable = "users"
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

    getPreviewObject()
    {
        return {
            id: this.id,
            name: this.get("name"), 
            views: this.get("views"),
            correctSubmissions: this.get("numberCorrectSubmissions"),
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
            let temp = new BuildCircuitLevel();
            temp.setId(selectResult[i].id)
            await temp.load("name");
            await temp.load("views");
            await temp.load("numberCorrectSubmissions");
            await temp.load("ownerId");
            await temp.loadOwnerName();

            if(searchTerm == "" || temp.isSearched(searchTerm))
            {
                result.push(temp.getPreviewObject())
            }
        }
        return result
    }
}
module.exports = BuildCircuitLevel;