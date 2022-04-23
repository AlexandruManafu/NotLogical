const db = require('../database/database');
class ObjectToDatabaseEntry{

    id = 0;
    tableName = "";
    fields = [];

    constructor(){}

    set(fieldName, value)
    {
        if(fieldName in this.fields)
            this.fields[fieldName] = value
        return this;
    }

    get(fieldName)
    {
        if(fieldName in this.fields)
            return this.fields[fieldName]
    }

    save()
    {
        console.log(this.fields);
        if(this.id==0)
        {
            let keysArray = [];
            let valuesArray = [];
            let valuesSql = "";
            let i = 0
            for (const [key, value] of Object.entries(this.fields))
            {
                valuesSql+="?, ";
                keysArray.push(key);
                valuesArray.push(value);
                i++;
            }
            valuesSql = valuesSql.slice(0,valuesSql.length-2);
            valuesSql += ");";

            let sql = "INSERT INTO "+this.tableName+" ("+keysArray.join()+")"
            sql += " VALUES (";
            sql +=valuesSql;
            
            db.insert(sql,valuesArray);
        }
    }

    async load(fieldName, searchColumn = "id", searchValue = this.id)
    {
        let sql = "SELECT " + fieldName +" FROM "+this.tableName + " WHERE "+searchColumn+" = ?;";
        let selected = await db.select(sql,[searchValue]);
        this.fields[fieldName] = selected[0][fieldName];
    }

    getDb()
    {
        return db;
    }

}
module.exports = ObjectToDatabaseEntry;