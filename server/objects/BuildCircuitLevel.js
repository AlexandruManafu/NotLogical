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
}
module.exports = BuildCircuitLevel;