import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline } from 'stream';

function getDate() {
  const date = new Date();
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ].join('-');
}

const csvFilePath = path.join(__dirname, 'nodejs-hw1-ex1.csv');
const txtFilePath = path.join(__dirname, `${getDate()}.txt`);

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  fs.createWriteStream(txtFilePath),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
