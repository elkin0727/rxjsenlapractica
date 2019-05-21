const mockyeah = require('mockyeah');
import { mockServices, dataBaseMock } from './mock-data';

mockyeah.get(
    mockServices.getPokemonsByName.pattern, function (req, res, next) {
        const filterByName = req.params['name'];
        const allPokemons = dataBaseMock.pokemons.payload;
        const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().indexOf(filterByName.toLowerCase()) !== -1)
        
        res.send(
            filteredPokemons
        );
        
    });

