//sätt först environmentvariabler. kan göras med pluginnen 
//detta är länken till storage https://portalvhdsgfh152bhy290k.blob.core.windows.net/ 
//c:\>set AZURE_STORAGE_ACCOUNT=portalvhdsgfh152bhy290k
//c:\>set AZURE_STORAGE_ACCESS_KEY=blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==

var azure = require('azure-storage');
var http = require('http')

var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
	var tableSvc = azure.createTableService('portalvhdsgfh152bhy290k', 'blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==');

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
		else {
		    console.log({ grr: error });
		    //res.end({ grr: error });
		}
	});
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World, har sparat i tebell gick bra.\n');
}).listen(port);

//console.log(process.env.LARSEEE);
//res.send({ Grrr: error });

/*
var tableSvc = azure.createTableService('portalvhdsgfh152bhy290k', 'blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==');

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
	else {
        console.log(error);
	}
});
*/

