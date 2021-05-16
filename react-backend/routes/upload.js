var express = require('express');
var router = express.Router();
var rootDir=require('path').resolve('./');
var client = require('../videoClient');

/* GET users listing. */
router.post('/' ,function(req, res) {
    let sampleFile;
    let uploadPath;
    let url;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath =  rootDir+ '/public/videos/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
        else{
            vimeo_upload(uploadPath,completedCallBack);
        }
     
    });
    const completedCallBack=(uri)=>{
        console.log('Your video URI is: ' + uri);
        url=uri;
        res.json({isSuccess:true,url:url});
    }
    

   
  });


 

  async function  vimeo_upload(file_name,completedCallback){
    
    client.upload(
      file_name,
      {
        'name': 'Untitled',
        'description': 'The description goes here.'
      },
      completedCallback,
      function (bytes_uploaded, bytes_total) {
        var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
        console.log(bytes_uploaded, bytes_total, percentage + '%')
      },
      function (error) {
        console.log('Failed because: ' + error)
      }
    )
  }

module.exports = router;



