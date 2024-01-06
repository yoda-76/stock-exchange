// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const zlib = require('zlib');
// const csv = require('csv-parser');
// const csvtojson = require('csvtojson');

// const url = 'https://assets.upstox.com/market-quote/instruments/exchange/complete.csv.gz';

// // Create the 'token_data' folder if it doesn't exist
// const folderPath = path.join(__dirname, 'token_data');
// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath);
// }

// const compressedFilePath = path.join(folderPath, 'instrument_data.csv.gz');
// const decompressedFilePath = path.join(folderPath, 'instrument_data.csv');
// const filteredFilePath = path.join(folderPath, 'instrument_data_filtered.csv');
// const jsonFilePath = path.join(folderPath, 'instrument_data.json');

// axios({
//   method: 'get',
//   url: url,
//   responseType: 'stream',
// })
//   .then((response) => {
//     const writer = fs.createWriteStream(compressedFilePath);
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on('finish', resolve);
//       writer.on('error', reject);
//     });
//   })
//   .then(() => {
//     // Decompress the gzip file
//     const input = fs.createReadStream(compressedFilePath);
//     const output = fs.createWriteStream(decompressedFilePath);
//     input.pipe(zlib.createGunzip()).pipe(output);

//     return new Promise((resolve, reject) => {
//       output.on('finish', resolve);
//       output.on('error', reject);
//     });
//   })
//   .then(() => {
//     // Read the decompressed CSV file and filter rows based on 'tradingsymbol' and 'instrument_type'
//     const filteredRows = [];
//     fs.createReadStream(decompressedFilePath)
//       .pipe(csv())
//       .on('data', (row) => {
//         const tradingSymbol = row['tradingsymbol']; // Assuming 'tradingsymbol' is a column name
//         const instrumentType = row['instrument_type']; // Assuming 'instrument_type' is a column name
//         if (
//           tradingSymbol &&
//           (tradingSymbol.startsWith('NIFTY') || tradingSymbol.startsWith('BANKNIFTY') || tradingSymbol.startsWith('FINNIFTY')) &&
//           instrumentType === 'OPTIDX'
//         ) {
//           filteredRows.push(row);
//         }
//       })
//       .on('end', () => {
//         // Save the filtered CSV data to a new file
//         fs.writeFileSync(filteredFilePath, filteredRows.map(row => Object.values(row).join(',')).join('\n'));
//       });
//   })
//   .then(() => {
//     // Convert filtered CSV to JSON
//     return csvtojson().fromFile(filteredFilePath);
//   })
//   .then((jsonArray) => {
//     // Save JSON to file
//     fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
//     console.log('File downloaded, decompressed, filtered, CSV converted to JSON, and saved successfully.');
//   })
//   .catch((error) => {
//     console.error('Error:', error.message || error);
//   });





// ...........................................................................................................................................

// ...........................................................................................................................................

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const csvtojson = require('csvtojson');

const url = 'https://assets.upstox.com/market-quote/instruments/exchange/complete.csv.gz';

// Create the 'token_data' folder if it doesn't exist
const folderPath = path.join(__dirname, 'token_data');
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const compressedFilePath = path.join(folderPath, 'instrument_data.csv.gz');
const decompressedFilePath = path.join(folderPath, 'instrument_data.csv');
const jsonFilePath = path.join(folderPath, 'instrument_data.json');
const jsonFilePath2 = path.join(folderPath, 'instrument_keys_data.json');


axios({
  method: 'get',
  url: url,
  responseType: 'stream',
})
  .then((response) => {
    const writer = fs.createWriteStream(compressedFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(() => {
    // Decompress the gzip file
    const input = fs.createReadStream(compressedFilePath);
    const output = fs.createWriteStream(decompressedFilePath);
    input.pipe(zlib.createGunzip()).pipe(output);

    return new Promise((resolve, reject) => {
      output.on('finish', resolve);
      output.on('error', reject);
    });
  })
  .then(() => {
    // Convert CSV to JSON
    return csvtojson().fromFile(decompressedFilePath);
  })
  .then((jsonArray) => {

    jsonArray=jsonArray.filter(i=>{
        if(i.instrument_type=="OPTIDX" && ["NIFTY","BANKNIFTY","FINNIFTY"].some(sub=>i.tradingsymbol.startsWith(sub))) return i
    })
    const jsonArray2=jsonArray.map(i=>{
        return i.instrument_key
    })
    // Save JSON to file
    fs.writeFileSync(jsonFilePath2, JSON.stringify(jsonArray2, null, 2));

    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    console.log('File downloaded, decompressed, CSV converted to JSON, and saved successfully.');
  })
  .catch((error) => {
    console.error('Error:', error.message || error);
  });

