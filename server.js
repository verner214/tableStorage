//s�tt f�rst environmentvariabler. kan g�ras med pluginnen 
//c:\>set AZURE_STORAGE_ACCOUNT=portalvhdsgfh152bhy290k
//c:\>set AZURE_STORAGE_ACCESS_KEY=blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==



var azure = require('azure-storage');
var http = require('http')
/*
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World, table storage\n');
}).listen(port);
*/
console.log(process.env.LARSEEE);

var tableSvc = azure.createTableService();

tableSvc.createTableIfNotExists('mytable', function (error, result, response) {
    if (!error) {
        console.log("Table exists or created");
    }
});

var entGen = azure.TableUtilities.entityGenerator;
var task = {
    PartitionKey: entGen.String('hometasks'),
    RowKey: entGen.String('1'),
    description: entGen.String('take out the trash'),
    dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
};

tableSvc.insertEntity('mytable', task, function (error, result, response) {
    if (!error) {
        console.log("entity inserted");
    }
});

