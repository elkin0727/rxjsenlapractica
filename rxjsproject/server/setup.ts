const mockyeah = require('mockyeah');
import { mockServices, dataBaseMock } from './mock-data';

mockyeah.get(
    mockServices.pokemons.pattern, function (req, res, next) {
        res.send(dataBaseMock.pokemons);
    });

