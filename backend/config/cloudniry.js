const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dez8duodw",
  api_key: "596327167256874",
  api_secret: "OYWLH8sNWen1OAi8cG3wem-dIzE", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
