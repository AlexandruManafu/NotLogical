const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./database/database');
const mockActions = require('./mockActions');

app.use(cors());
//app.use(express.urlencoded());
app.use(express.json());

require('./routes/get/circuits')(app);
require('./routes/post/general')(app);
require('./routes/post/circuits')(app);
require('./routes/post/levels')(app);


app.listen(3000, function(){
    //db.createDefaultTables(true);
    let mock = mockActions;
    //mock.loginUser();
    //mock.jwtLogin();
    //mock.authenticate();
    //mock.updateCircuitEntry()
    //mock.shareCircuitEntry()
    console.log("Server started on port 3000");  

});
