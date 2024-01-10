// awsConfig.js

const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: 'AKIAZ7LWFQK45LJWU7RM',
  secretAccessKey: 'JoU0weoql66QMPOFcALgBz4neA4wmZC+Vla6tR4P',
  region: 'ap-south-1', // Replace with your desired AWS region
});

const s3 = new aws.S3();

module.exports = s3;
