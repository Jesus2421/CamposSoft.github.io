document.addEventListener('DOMContentLoaded', function() {
  // Función para simular la escritura
  function escribirConPromesa(texto, elemento, velocidad) {
    return new Promise(resolve => {
      let i = 0;
      const intervalo = setInterval(() => {
        elemento.innerHTML += texto.charAt(i);
        i++;
        if (i > texto.length) {
          clearInterval(intervalo);
          resolve(); // Resuelve la Promesa cuando la escritura ha terminado
        }
      }, velocidad);
    });
  }

  // Obtener elementos por su ID
  const titulo = document.getElementById('titulo2');
  const parrafo1 = document.getElementById('titulo');
  const parrafo2 = document.getElementById('inicio');
  const parrafo3 = document.getElementById('parrafo3');
  const parrafo4 = document.getElementById('parrafo4');
  const parrafo5 = document.getElementById('parrafo5');

  // Iniciar la escritura secuencial
  escribirConPromesa("Mis Tutoriales", titulo, 50)
    .then(() => escribirConPromesa("",parrafo1, 50))
    .then(() => escribirConPromesa("", parrafo2, 100))
    .then(() => escribirConPromesa("", parrafo3, 100))
    .then(() => escribirConPromesa("", parrafo4, 100))
    .then(() => escribirConPromesa("", parrafo5, 50));
});