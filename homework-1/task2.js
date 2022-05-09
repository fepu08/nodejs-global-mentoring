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

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

pipeline(readStream, csv(), writeStream, (error) => {
  if (error) {
    console.error(error);
  }
});
