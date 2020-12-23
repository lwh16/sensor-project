//Import the sensor library
const fs = require('fs')

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var alltext = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFIle.send(null)
}

//open a specified location where the new file has appeared, access the contents and then print on the console
function logTextFile(file)
{
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;
        
        console.log(data);
    })
}

logTextFile('test.txt');
