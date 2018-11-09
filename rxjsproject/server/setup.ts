const mockyeah = require('mockyeah');
import { mockServices, dataBaseMock } from './mock-data';

mockyeah.get(
    mockServices.pokemons.pattern, function (req, res, next) {
        res.send(dataBaseMock.pokemons);
    });

mockyeah.post(
    mockServices.pokemon.pattern, function (req, res, next) {
        setTimeout(() => {
            //res.status(500).send('Error');
            res.status(200).send({
                number: req["params"]["number"],
                pokemonname: req["params"]["pokemonname"],
            });
        }, 2000);
    });


