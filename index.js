console.log("node is working !");


// let fs = require("fs");
// let inquirer = require("inquirer");
// let qr = require("qr-image");

// import * as fs from "node:fs";
// import inquirer from 'inquirer';
// import qr from 'qr-image';

// inquirer
//   .prompt([
//     {
//       message: "Type in your URL: ",
//       name: "URL",
//     },
//   ])
//   .then((answers) => {
//     const url = answers.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream("qr_img.png"));

//     fs.writeFile("URL.txt", url, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });


import * as fs from 'node:fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      message: 'Type in your URL: ',
      name: 'URL',
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    try {
      const qr_svg = qr.image(url, { type: 'png' });
      const qrFile = fs.createWriteStream('./qr_img.png');
      qr_svg.pipe(qrFile);
      
      qrFile.on('finish', () => {
        console.log('QR code image file has been saved.');
      });

      qrFile.on('error', (err) => {
        console.error('Error writing QR code image file:', err);
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }

    fs.writeFile('./URL.txt', url, (err) => {
      if (err) {
        console.error('Error writing URL to file:', err);
      } else {
        console.log('The URL has been saved!');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('An error occurred:', error);
    }
  });
