let Vimeo = require('vimeo').Vimeo;
console.log(process.env.VIMEO_CLIENT_ID);
const client = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_CLIENT_TOKEN);



module.exports = client;