// AUTORES

const autorAndrzejSapkowski = [
    { titulo: "Ultimo Deseo.", autor: "Andrzej Sapkowski", precio: 20, stock: 10 },
    { titulo: "La Espada del Destino.", autor: "Andrzej Sapkowski", precio: 15, stock: 5 },
    { titulo: "La Sangre de los Elfos.", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
    { titulo: "Tiempo de Odio.", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
    { titulo: "Bautismo de Fuego.", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
    { titulo: "La Torre de la Golondrina", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
    { titulo: "La Dama del Lago.", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
    { titulo: "Estacion de las Tormentas.", autor: "Andrzej Sapkowski", precio: 25, stock: 3 },
];

const autorGeorgeRRMartin = [
    { titulo: "Juego de Tronos.", autor: "George R.R Martin", precio: 20, stock: 10 },
    { titulo: "Choque de Reyes.", autor: "George R.R Martin", precio: 15, stock: 5 },
    { titulo: "Tormenta de Espadas.", autor: "George R.R Martin", precio: 25, stock: 3 },
    { titulo: "Festin de Cuervos.", autor: "George R.R Martin", precio: 25, stock: 3 },
    { titulo: "Danza de dragones.", autor: "George R.R Martin", precio: 25, stock: 3 },
];

const autorMercedesRon = [
    { titulo: "Culpa Mia.", autor: "Mercedes Ron", precio: 20, stock: 10 },
    { titulo: "Culpa Tuya", autor: "Mercedes Ron", precio: 15, stock: 5 },
    { titulo: "Culpa Nuestra", autor: "Mercedes Ron", precio: 25, stock: 3 },
];

// Función para filtrar libros por autor
function filtrarPorAutor(autor) {
    return libros.filter((libro) => libro.autor === autor);
  }