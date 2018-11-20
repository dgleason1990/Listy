const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const { foodApi }  = require('./headers');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes";
let numberOfRecipes = "&number=10&ranking=0";

app.post('/recipes', async (req,res)=>{
    let ingredients = req.body.ingredients;
    console.log(typeof ingredients);
    ingredients.pop();
    console.log(ingredients);
    let config = {
        method: 'get',
        url: baseUrl + '/findByIngredients?ingredients=' + ingredients.join('%2C') + numberOfRecipes,
        headers: foodApi
    }
    try {
        let foodData = await axios(config);
        console.log(foodData.data);
        res.json(foodData.data);
    } catch (error) {
        console.log (error);
    }
})

app.get('/recipe/:id', async (req, res) => {
    try {
        let configData ={
            method: 'get',
            url: baseUrl + '/' + req.params.id + '/information',
            headers: foodApi
        }
        console.log(baseUrl + req.params.id + '/information');
        let recipeData = await axios(configData);
        console.log(recipeData.data)
        let configNutrition ={
            method: 'get',
            url: baseUrl + '/guessNutrition?title=' + recipeData.data.title.split(' ').join('+'),
            headers: foodApi
        }
        let nutritionData = await axios(configNutrition);
        
        let recipieInfo = {
            data: recipeData.data,
            nutrition: nutritionData.data
        }
        res.json(recipieInfo);
    } catch (error) {
        console.log(error);
    }
})


const fs = require('fs');
 
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: 'key_file.json'
});
 
// Performs the Text-to-Speech request
const read = (text) => {
    const request = {
        input: {text: text},
        // Select the language and SSML Voice Gender (optional)
        voice: {languageCode: 'en-AU', voiceName:'en-AU-Wavenet-B', ssmlGender: 'MALE'},
        // Select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
  client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

//   Write the binary audio content to a local file
    fs.writeFile('public/output.mp3', response.audioContent, 'binary', err => {
        if (err) {
        console.error('ERROR:', err);
        return;
        }
        console.log('Audio content written to file: output.mp3');
    });
})};

app.post('/read', async (req,res)=>{
    let text = 'Good Day Mate. I hope your ready for some cooking! ' + req.body.text + 'Although I would rather shrimp on the barbie, enjoy your meal! Cheers, mate';
    let recievedFile = await read(text);
    try {
        res.send('Message received');
        // fs.unlinkSync('/Users/davidgleason/Desktop/Dev/Listy/backend/output.mp3');
    } catch (error) {
        console.log (error);
    }
})

app.listen(8080, () => {
 console.log('you are connected to port 8080')
})