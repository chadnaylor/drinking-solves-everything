const fs = require('fs')

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')['development']);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());
app.use(bodyParser.json());
var drinks_seed = JSON.parse(fs.readFileSync('./seed_drinks.json'))
var drinks = drinks_seed.drinks.map(drink => {
    var ingredients = []
    for (let i = 1; i < 15; i++) {
        if (drink['strIngredient' + i]!==null)
            ingredients.push(drink['strIngredient' + i])
    }
    return {
        name: drink.strDrink,
        instructions: drink.strInstructions,
        picture: drink.strDrinkThumb,
        ingredients: ingredients
    }
})

app.get('/drinks', (req, res) => {
    res.send(drinks)
})
app.get('/random', (req,res)=>{
    let index = Math.floor(Math.random()*drinks.length)
    res.send(drinks[index])
})
app.get('/problems', function (req, res) {
    knex
        .select('*')
        .from('problems')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

app.post('/problems', (req, res) => {
    knex

        .insert(req.body)
        .into('problems')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(400).json({
                message:
                    'Failed. You suck.'
            })
        );
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});
