// import textToSpeech from '@google-cloud/text-to-speech';
// import googleApi from './headers';

// const fs = require('fs');
 
// // Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech');

// // Creates a client
// const client = new textToSpeech.TextToSpeechClient(googleApi);
 
// // The text to synthesize
// const text = 'Hello, world!';
 
// // Construct the request
// const request = {
//   input: {text: text},
//   // Select the language and SSML Voice Gender (optional)
//   voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
//   // Select the type of audio encoding
//   audioConfig: {audioEncoding: 'MP3'},
// };
 
// // Performs the Text-to-Speech request
// module.exports.speech = client.synthesizeSpeech(request, (err, response) => {
//   if (err) {
//     console.error('ERROR:', err);
//     return;
//   }
 
// //   Write the binary audio content to a local file
// // it looks like this creates the file that we can use to play ---- we can return this to the front end to play
// module.exports.read = fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
//     if (err) {
//       console.error('ERROR:', err);
//       return;
//     }
//     console.log('Audio content written to file: output.mp3');
//   });
// });