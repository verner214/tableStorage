//s�tt f�rst environmentvariabler. kan g�ras med pluginnen 
//detta �r l�nken till storage https://portalvhdsgfh152bhy290k.blob.core.windows.net/ 
//c:\>set AZURE_STORAGE_ACCOUNT=portalvhdsgfh152bhy290k
//c:\>set AZURE_STORAGE_ACCESS_KEY=blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==
//bra l�nk nedan, de flesta andra verkar vara felaktiga.
//https://github.com/Azure/azure-content/blob/master/articles/storage-nodejs-how-to-use-table-storage.md
var azure = require('azure-storage');
var http = require('http')

var rowid = 0;

var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
    var tableSvc = azure.createTableService('portalvhdsgfh152bhy290k', 'blSI3p0IIYZJkojYyc27+5Jm82TmjaYbjEthG+f8fTT615DVeBJ2MMc3gNPyW5dSRaPpeWa2cJ/NE7ypqWTvkw==');
    /*
    tableSvc.queryEntity('tasktable', 'tasksSeattle', '1', function (error, serverEntity) {
        if (!error) {
            // Entity available in serverEntity variable
        }
    });
    */
    /*
    tableSvc.queryEntity('mytable', 'hometasks', '1', function (error, serverEntity) {
             if(!error){
                 console.log("query ok");
             }
         });
         */


//visa rad med nyckel '1'
    tableSvc.retrieveEntity('mytable', 'hometasks', '1', function (error, result, response) {
        if (!error) {
            console.log('f�rsta raden ?');
            console.log(result);
        }
    });

//visa fler rader
    var query = new azure.TableQuery()
      .top(5)
      .where('PartitionKey eq ?', 'hometasks');

    tableSvc.queryEntities('mytable', query, null, function (error, result, response) {
        if (!error) {
            console.log('flera rader');
            console.log(result);
        }
    });

	tableSvc.createTableIfNotExists('mytable', function (error, result, response) {
		if (!error) {
			console.log("Table exists or created1");

	        var entGen = azure.TableUtilities.entityGenerator;
	        var task = {
		        PartitionKey: entGen.String('hometasks'),
		        RowKey: entGen.String((rowid++).toString()),
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

