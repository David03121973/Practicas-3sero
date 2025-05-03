<template>
  <div>
    <Navbar />
    <div class="container mx-auto flex justify-center items-center pt-40">
      <div class="imagen-degradada">
        <img src="/wallpaper-home.png" alt="Imagen" class="w-9/10 h-screen/3 object-cover object-center">
      </div>
    </div>

    <div class="pt-20">
      <div class="flex flex-col md:flex-row justify-between mb-6 px-4">
        <!-- Buscador -->
        <div class="flex justify-center items-center w-full md:w-2/3 mb-4 md:mb-0">
          <input type="text" v-model="busqueda" placeholder="Buscar producto..."
            class="w-full p-3 border-2 border-[#d8b16e] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#5b3810]">
        </div>

        <!-- Opciones de Ordenar -->
        <div class="flex flex-col md:flex-row space-x-0 md:space-x-6 w-full md:w-1/3 justify-end">
          <button @click="ordenarProductos('precio')"
            class="bg-primary text-white px-6 py-3 rounded-lg mb-4 md:mb-0 hover:bg-secondary transition-colors duration-300">Mejor
            precio</button>
          <button @click="ordenarProductos('reseñas')"
            class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors duration-300">Número
            de reseñas</button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="(producto, index) in productosFiltrados" :key="index"
          class="bg-white rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary">
          <img :src="producto.imagen" alt="Imagen"
            class="w-full h-48 object-contain object-center rounded-md transition-all duration-300">
          <h2 class="text-lg font-bold mt-2 text-dark">{{ producto.nombre }}</h2>
          <p class="text-sm font-medium text-dark">Número de reseñas: {{ producto.numero_resenna }}</p>
          <p class="text-sm font-medium text-dark">Precio: {{ producto.precio }} {{ producto.precio_oferta ?
            '-Oferta: ' + producto.precio_oferta : '' }}</p>
          <button @click="agregarAlCarrito(producto)"
            class="mt-4 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary">
            Agregar uno al carrito
          </button>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button @click="cambiarPagina(-1)"
          class="bg-secondary hover:bg-neutral text-white font-bold py-2 px-4 rounded">Anterior</button>
        <span class="mx-4 text-lg font-medium text-dark">Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button @click="cambiarPagina(1)"
          class="bg-secondary hover:bg-neutral text-white font-bold py-2 px-4 rounded">Siguiente</button>
      </div>
    </div>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from "@/components/Navbar.vue";
import FooterComponent from '@/components/footerComponent.vue';

// Convertimos "productos" en un array reactivo para poder modificarlo directamente.
const productos = ref([
  { id: 1, nombre: 'Producto 1', numero_resenna: 4, imagen: '/_0002_45290_0953_KIT_TECLADO_Y_MOUSE3.jpg', precio: 100, precio_oferta: 80 },
  { id: 2, nombre: 'Producto 2', numero_resenna: 3, imagen: '/_0002_Caracolillo-1000.jpg', precio: 200 },
  { id: 3, nombre: 'Producto 3', numero_resenna: 5, imagen: '/_0005_Derjabon-Gelp-para-manos.jpg', precio: 300, precio_oferta: 250 },
  { id: 4, nombre: 'Producto 4', numero_resenna: 2, imagen: '/CatSup.jpeg', precio: 400 },
  { id: 5, nombre: 'Producto 5', numero_resenna: 4, imagen: '/chocofine-200.jpg', precio: 500, precio_oferta: 450 },
  { id: 6, nombre: 'Producto 6', numero_resenna: 3, imagen: '/combos-01-2025.jpg', precio: 600 },
  { id: 7, nombre: 'Producto 7', numero_resenna: 5, imagen: '/Galletas_de_Sal_1kg.jpg', precio: 700, precio_oferta: 650 },
  { id: 8, nombre: 'Producto 8', numero_resenna: 2, imagen: '/Nestle-Choco-4_5.jpg', precio: 800 },
  { id: 9, nombre: 'Producto 9', numero_resenna: 4, imagen: '/producto1.jpg', precio: 900, precio_oferta: 850 },
  { id: 10, nombre: 'Producto 10', numero_resenna: 3, imagen: '/papas__2_.jpg', precio: 1000 },
  { id: 11, nombre: 'Producto 11', numero_resenna: 5, imagen: '/Papel_higi__nico.jpg', precio: 1100, precio_oferta: 1050 },
  { id: 12, nombre: 'Producto 12', numero_resenna: 2, imagen: '/santiago-cuba-12.jpg', precio: 1200 },
  { id: 13, nombre: 'Producto 13', numero_resenna: 4, imagen: '/Tomate-Frito-Taoro_3100g_.jpg', precio: 1300, precio_oferta: 1250 },
  { id: 14, nombre: 'Producto 14', numero_resenna: 3, imagen: '/producto2.jpg', precio: 1400 },
  { id: 15, nombre: 'Producto 15', numero_resenna: 5, imagen: '/producto2.jpg', precio: 1500, precio_oferta: 1450 },
]);

const paginaActual = ref(1);
const busqueda = ref('');
const productosPorPagina = 20;
const totalPaginas = computed(() => Math.ceil(productos.value.length / productosPorPagina));

const productosFiltrados = computed(() => {
  const filtrados = productos.value.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  );
  const inicio = (paginaActual.value - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  return filtrados.slice(inicio, fin);
});

// Ordenar productos directamente en el array "productos"
const ordenarProductos = (criterio) => {
  if (criterio === 'precio') {
    productos.value.sort((a, b) => a.precio - b.precio);
  } else if (criterio === 'reseñas') {
    productos.value.sort((a, b) => b.numero_resenna - a.numero_resenna);
  }
};

function cambiarPagina(direccion) {
  if (direccion === -1 && paginaActual.value > 1) {
    paginaActual.value--;
  } else if (direccion === 1 && paginaActual.value < totalPaginas.value) {
    paginaActual.value++;
  }
}

function agregarAlCarrito(producto) {
  console.log(`Producto ${producto.nombre} agregado al carrito`);
}
</script>
