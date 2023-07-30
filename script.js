// Consumir el siguiente endpoint https://rickandmortyapi.com/api/character y realizar lo siguiente: 
// 1.Crear cards con la información de Nombre, Especie e Imagen 
// 2.Debe utilizar el paradigma de orientación a objetos 
// 3.Debe realizar una clase con la información necesaria (nombre, especie e imagen) y protegerlo con getters. 
// 4.Debe realizar un método llamado .show() que debe inyectar en el DOM las cards con la data necesaria. 
// 5.Debe inyectar al menos 20 personajes 
// Opcional: usar bootstrap u otro framework de CSS para darle estilos


// Clase Personaje
class Personaje {
    constructor(name, species, image) {
      this._name = name;
      this._species = species;
      this._image = image;
    }
  
    // Getters de la clase
    get name() {
      return this._name;
    }
  
    get species() {
      return this._species;
    }
  
    get image() {
      return this._image;
    }
  
    // Utilizacion del metodo show() para mostrar la card en el DOM
    show() {
      const contenedorCard = document.getElementById('card-container');
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      const img = document.createElement('img');
      img.src = this._image;
      card.appendChild(img);
  
      const nombre = document.createElement('h3');
      nombre.textContent = this._name;
      card.appendChild(nombre);
  
      const especies = document.createElement('p');
      especies.textContent = `Species: ${this._species}`;
      card.appendChild(especies);
  
      contenedorCard.appendChild(card);
    }
  }
  
  // Función para consumir la API y crear las instancias de los Personajes
  async function fetchPersonajes() {
    let characters = [];
    let url = 'https://rickandmortyapi.com/api/character';
  

    // Para inyectar al menos 20 personajes 
    while (characters.length < 20) {
      const response = await fetch(url);
      const data = await response.json();
  
      const resultados = data.results;
      characters = characters.concat(resultados);
  
      url = data.info.next;
      if (!url) break;
    }

    
    const instanciasPersonajes = characters.map(character => {
      const { name, species, image } = character;
      return new Personaje(name, species, image);
    });
    
    //Se aplica el método a cada uno de los personajes
    instanciasPersonajes.forEach(character => {
      character.show();
    });
  }
  
  // Llamada a la función para cargar los personajes en el DOM
  fetchPersonajes();
  
  