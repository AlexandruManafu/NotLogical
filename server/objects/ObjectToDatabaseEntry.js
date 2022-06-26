const db = require('../database/database');
class ObjectToDatabaseEntry{

    id = 0;
    tableName = "";
    fields = [];

    constructor(){}

    setId(value)
    {
        this.id = value
        return this;
    }

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

    async save()
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

    async syncSave()
    {
        return await this.save();
    }

    update(fieldName, value)
    {
        if(this.id != 0)
        {
            let sql = "UPDATE " + this.tableName + " SET " + fieldName +" = ?" 
            sql += " WHERE id = "+ this.id +";";
            this.getDb().update(sql,[value])
        }
        return this
    }

    async load(fieldName, searchColumn = "id", searchValue = this.id)
    {
        let sql = "SELECT " + fieldName +" FROM "+this.tableName + " WHERE "+searchColumn+" = ?;";
        let selected = await db.select(sql,[searchValue]);
        if(fieldName == "id" && selected[0] != undefined)
            this.id = selected[0][fieldName]
        else if(selected[0] != undefined)
            this.fields[fieldName] = selected[0][fieldName];
        
        return this;
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

    parseJsonText(fieldName)
    {
        let text = this.get(fieldName);
        console.log(text)
        this.set(fieldName,JSON.parse(text));
    }

    isOwner(username)
    {
        return username == this.ownerName
    }

    getDb()
    {
        return db;
    }

    getFieldsAsObject()
    {
        return {...this.fields}
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

    async delete()
    {
        if(this.id != 0)
        {
            let sql = "DELETE FROM "+this.tableName+" WHERE id = ?";
            return await this.getDb().delete(sql, [this.id]);
        }
    }

}
module.exports = ObjectToDatabaseEntry;