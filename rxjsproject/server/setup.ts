const mockyeah = require('mockyeah');
import { mockServices, dataBaseMock } from './mock-data';

mockyeah.get(
    mockServices.pokemons.pattern, function (req, res, next) {
        res.send(dataBaseMock.pokemons);
    });

mockyeah.put(
    mockServices.pokemon.pattern, function (req, res, next) {
        setTimeout(() => {
            if (false) {
                res.status(500).send('Error');
            } else {
                res.send(dataBaseMock.pokemons);
            }
        }, 2000);
    });

mockyeah.post(
    mockServices.newpokemon.pattern, function(req, res, next) {
        setTimeout(() => {
           res.status(200).send(); 
        }, 1000);
    }
)