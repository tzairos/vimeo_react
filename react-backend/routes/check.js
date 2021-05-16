var express = require('express');
var router = express.Router();

var client = require('../videoClient');

router.get('/:videoId', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
let result="";
console.log(req.params.videoId);
const uri=`/videos/${req.params.videoId}`;
  client.request(uri + '?fields=transcode.status', function (error, body, status_code, headers) {
    if (body.transcode.status === 'complete') {
        result="complete";
      console.log('Your video finished transcoding.')
    } else if (body.transcode.status === 'in_progress') {
        result="in_progress";
      console.log('Your video is still transcoding.')
    } else {
        result="error";
      console.log('Your video encountered an error during transcoding.')
    }
    res.json({isSuccess:true,result:result});
  })

});

module.exports = router;