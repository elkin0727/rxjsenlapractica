export const dataBaseMock = {
    pokemons: {
        // 'vocabulary': null,
        'payload': [
            {
                name: 'Pikachu',
                nivel: 1
            },
            {
                name: 'Charmander',
                nivel: 1
            },
            {
                name: 'Raichu',
                nivel: 2
            },
            {
                name: 'Charmilion',
                nivel: 2
            }
        ]
    }
};


export const mockServices = {
    pokemons: {
        pattern: '/api/pokemons',
        ok: dataBaseMock.pokemons,
        ko: {
            status: 200,
            json: { errorCode: 'UnexpectedException' }
        }
    },
    pokemon: {
        pattern: '/api/pokemon/:number/:pokemonname',
        ok: {},
        ko: {
            status: 200,
            json: { errorCode: 'UnexpectedException' }
        }
    },
    newpokemon: {
        pattern: '/api/pokemon/',
        ok: {},
        ko: {
            status: 200,
            json: { errorCode: 'UnexpectedException' }
        }
    }
};

