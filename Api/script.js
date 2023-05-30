"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let url = "https://pokeapi.co/api/v2/pokemon/";
  let mainSection = document.getElementById("main-section");

  async function loadDataFromApi(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon endpoints");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getPokemonData() {
    for (let i = 1; i <= 12; i++) {
      let randomPokemonUrl = url + randomIntFromInterval(1, 493);
      loadDataFromApi(randomPokemonUrl)
        .then((data) => {
          addPokemonInfo(data);
        })
        .catch((err) => console.log(err));
    }
  }

  function addPokemonInfo(pokemon) {
    let innerDiv = document.createElement("div");
    let div = document.createElement("div");
    // agrego nombre de pokemon
    let title = document.createElement("h3");
    let name = pokemon.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    title.textContent = "#" + pokemon.id + ": " + name;
    // agrego imagen de pokemon
    let image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    // agrego info de pokemon...
    let info = document.createElement("div");
    let type = document.createElement("h5");
    //tipos
    let typesText = "";
    pokemon.types.forEach((type) => {
      let auxType =
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
      typesText += auxType + ", ";
    });
    typesText = typesText.slice(0, -1);
    type.textContent = typesText.slice(0, -1);
    info.appendChild(type);
    info.classList.add("pokemon-info");
    //y movimientos
    let moves = pokemon.moves.slice(0, 4);
    let movimientos = document.createElement("ul");
    moves.forEach((move) => {
      let movimiento = document.createElement("li");
      movimiento.textContent = move.move.name;
      movimientos.appendChild(movimiento);
    });
    info.appendChild(movimientos);
    // Div que contiene imagen e info
    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("wrapper-pokemon");
    wrapperDiv.append(image, info);
    // agrego todo al div del pokemon
    innerDiv.append(title, wrapperDiv);
    innerDiv.classList.add("inner-pokemon", pokemon.types[0].type.name + "-2");
    div.appendChild(innerDiv);
    div.classList.add("pokemon");
    mainSection.appendChild(div);
  }

  getPokemonData();
});
