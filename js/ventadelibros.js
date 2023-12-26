// Función para ordenar libros por precio
function ordenarPorPrecio(ascendente) {
  libros.sort((a, b) => (ascendente ? a.precio - b.precio : b.precio - a.precio));
  return libros;
}

// Función para actualizar el stock de un libro
function actualizarStock(titulo, cantidad) {
  const libro = libros.find((libro) => libro.titulo === titulo);
  if (libro) {
    libro.stock += cantidad;
  } else {
    mostrarMensajeError("No tenemos el título ingresado.");
  }
}



