
//Objeto de manipulação da API
const pokeApi ={}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types // Array destruction - está pegando o primeiro item da array. Eqquivale a: pokemon.type = pokemon.types.get(0)

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
} 

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon) // converter no nosso modelo (pokemon-model.js) e não no da poke api.
}

//getPokemons = método
//offset = em qual página, limit = quantos itens da página selecionada serão buscados
// função que consome a API e nos dá o result pronto
pokeApi.getPokemons = function (offset = 0, limit = 5) {
    // Consumindo API
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()) // converte para json
        .then((jsonBody) => jsonBody.results) // pega dentro do json: "results" que neste caso é o nome do campo chave que nos interessa
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // pegamos a lista e transformamos ela em uma nova lista de promeças do detalhe do pokemon. Converte para json
        .then((detailRequests) => Promise.all(detailRequests)) // Promise.all = recebe um array de promise
        .then((pokemonDetails) => pokemonDetails)
        //.catch((error) => console.error(error))
        //.finally(() => console.log('Requisição concluída!'))
}

/* Rascunho de pensamento para se chegar na função getPokemons
    Mesmo conceito:
        try {
        } catch(erros) {
        } finally {
        }

    --> Por funções declarativas:
    fetch(url)
        .then(function (response) {
            return response.json() 
        }) // por padrão o fetch retorna uma stream "ReadableStream". Este comando transforma em json
        .then(function (jsonBody) {
            console.log(jsonBody)
        }) // Já recebe o response convertido em json pelo then anterior
        .catch(function (error) {
            console.error(error)
        })
        .finally(function () {
            console.log('Requisição concluída!')
        })

    // -- > Por Arrow functions (para diminuir a verbosidade): 
    // Em arrow function, se tiver apenas uma linha, não precisa declarar o corpo da função.
*/
