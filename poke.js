const pokemonListElement = document.getElementById('pokemon-list');
    const searchInput = document.getElementById('searchInput');

    async function fetchPokemonList() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    }

    async function fetchPokemonData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    }

    async function displayFirst50() {
      const pokemonDataList = await fetchPokemonList();

      // Clear existing list items
      pokemonListElement.innerHTML = '';

      for (const pokemon of pokemonDataList) {
        const pokemonData = await fetchPokemonData(pokemon.url);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${pokemon.name}</strong> - ${pokemonData.id}<br>
        `;
        pokemonListElement.appendChild(listItem);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      searchInput.focus();
    }

    async function displayPokemon() {
      const pokemonName = searchInput.value.trim().toLowerCase();

      if (pokemonName !== '') {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const pokemonData = await response.json();

          // Clear existing list items
          pokemonListElement.innerHTML = '';

          const listItem = document.createElement('div');
          listItem.classList.add("poke-container")
          listItem.innerHTML = `            
                <div class="poke-info">
                    <h2>${pokemonData.name}</h2>
                    <img src="https://static.thenounproject.com/png/3674277-200.png" alt="" srcset="">
                    <div class="poke-stats">
                        <div>
                            <p>attack</p>
                            <h2>${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</h2>
                        </div>
                        <div>
                            <p>defense</p>
                            <h2>${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</h2>
                        </div>
                        <div>
                            <p>speed</p>
                            <h2>${pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat}</h2>
                        </div>
                    </div>
                </div>
          `;
          pokemonListElement.appendChild(listItem);
        } catch (error) {
          console.error(`Error fetching Pokemon ${pokemonName}:`, error);
        }
      }
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      // Loop through list items and show/hide based on the search term
      Array.from(pokemonListElement.children).forEach(item => {
        const pokemonInfo = item.textContent.toLowerCase();
        if (pokemonInfo.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });

 