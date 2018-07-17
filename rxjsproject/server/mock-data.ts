export const dataBaseMock = {
    pokemons: {
        // 'vocabulary': null,
        'payload': [
            {
                name: 'Pikachu',
                nivel: 1
            },
            {
                name: 'Chalmander',
                nivel: 1
            },
            {
                name: 'Riachu',
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
        pattern: '/Api/pokemons',
        ok: dataBaseMock.pokemons,
        ko: {
            status: 500,
            json: { errorCode: 'UnexpectedException' }
        }
    }
};

