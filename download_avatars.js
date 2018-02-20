var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

 function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     headers: {
       'User-Agent': 'request',
       'Authorization' : 'token ' + secrets.GITHUB_TOKEN
     }
   };

   request(options, function(err, res, body) {
     cb(err, body);
   });
 }

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
	if(process.argv[2] === undefined || process.argv[3] === undefined){
		console.log("Error1");
	}
	else{
  var stringed = JSON.parse(result);
//  console.log(result);
  stringed.forEach(function(obj) {
  	downloadImageByURL(obj.avatar_url, obj.id )

  });
}



function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
  .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Headers: ', response.headers['content-type']);
         console.log('Downloading image...');
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath + ".jpg"));               // Note 4

}
 // console.log("Errors:", err);
  //console.log("Result:", result);
})

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");