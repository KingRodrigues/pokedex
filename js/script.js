// API = pokeapi.co

/* RENDERIZAR POKÉMON */
const pokemonNome = document.querySelector(".pokemon_nome");
const pokemonNum = document.querySelector(".pokemon_num");
const pokemonImg = document.querySelector(".pokemon_imagem");

const form = document.querySelector(".form");
const input = document.querySelector(".input_busca")
const botaoVolt = document.querySelector(".botao-volt")
const botaoAvan = document.querySelector(".botao-avan")

let buscarPokemon = 1;

/* RECUPERAR DADOS DO POKÉMON */
const fetchPokemon = async (pokemon) => { // Recebe parametro "pokemon" e faz a busca
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Resposta da API | await == esperar

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonNome.innerHTML = "Carregando...";
    pokemonNum.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = "block"
        pokemonNome.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        input.value = '';
        buscarPokemon = data.id;
    } else {
        pokemonImg.style.display = "none";
        pokemonNome.innerHTML = "Não encontrado :c";
        pokemonNum.innerHTML = "";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
}) // Quando o formulário for enviado, executará uma função

botaoVolt.addEventListener("click", () => {
    if (buscarPokemon > 1) {
        buscarPokemon -= 1;
        renderPokemon(buscarPokemon)
    }
});

botaoAvan.addEventListener("click", () => {
    buscarPokemon += 1;
    renderPokemon(buscarPokemon)
});

renderPokemon(buscarPokemon)