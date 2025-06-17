

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

// função que converte a lista de pokemons em uma lista de html
function convertPokemonToLi(pokemon) {
    return `<li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type">grass</li>
                    <li class="type">poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>
        </li>`
}
//document = documento atual que está na minha janela
const pokemonList = document.getElementById('pokemonList')

// converte os pokemons objetos em na lista de pokemons em html
pokeApi.getPokemons().then((pokemons = []) => {

        /* Rascunho: substituído pela função map
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
        
        //.map é uma função transformadora. Transsforma um elemento em outro elemento e retorna uma lista. (percorre a lista, pega um item, transforma ele e gera uma nova lista)
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('') // junta os itens da pokemon list em uma string com o separador especificado. '' significa juntar com string vazia = sem separador
    })
    

