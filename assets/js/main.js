

/* requisição
- function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
- o fetch retorna uma promise (promeça de uma resposta)
- por padrão o fetch utiliza o método GET
*/

/* métodos:
- them = método para processar o sucesso de uma promise.
- catch = caso tenha um erro
- finally = após a requisição fazer alguma ação
*/

// Documentação: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

/*
// função que converte a lista de pokemons em uma lista de html. Vinha da Poke API. Quando criamos nosso próprio modelo ela não se fez mais necessária
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}
*/

//document = documento atual que está na minha janela
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0;
const maxRecords = 11;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`
}

function loadPokemonItens(offset, limit) {
    // converte os pokemons objetos em na lista de pokemons em html
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            //.map é uma função transformadora. Transsforma um elemento em outro elemento e retorna uma lista. (percorre a lista, pega um item, transforma ele e gera uma nova lista)
            const newHtml = pokemons.map(convertPokemonToLi).join('') // .join('') = junta os itens da pokemon list em uma string com o separador especificado. '' significa juntar com string vazia = sem separador
            pokemonList.innerHTML += newHtml

            /* Rascunho de pensamento: substituído pela função map
                const listItens = []

                // debugger // forma fácil de debugar
                for (let i = 0; i < pokemons.length; i++) {
                    const pokemon = pokemons[i]; 
                    listItens.push(convertPokemonToLi(pokemon)) // adiciona mais um item na lista
                }
                console.log(listItens)

                //.map é uma função transformadora. Transsforma um elemento em outro elemento e retorna uma lista. (percorre a lista, pega um item, transforma ele e gera uma nova lista)
                const newList = pokemons.map((pokemon) => {
                    return convertPokemonToLi(pokemon)
                })
            */
        })

}

// assim que a aplicação é aberta carrega-se as primeiras definições sem alteração
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    debugger
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton) // remover o botão quando atingir o limite especificado
    } else {
        loadPokemonItens(offset, limit)
    }
})

    

