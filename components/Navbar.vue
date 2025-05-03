<template>
    <nav class="fixed top-0 left-0 w-full bg-gradient-to-r from-primary to-secondary shadow-lg z-50">
        <div class="container mx-auto flex justify-between items-center py-4 px-6">
            <!-- Logo / Nombre -->
            <h1 class="text-white text-3xl md:text-5xl font-serif italic">D'Shely</h1>


            <!-- Menú hamburguesa (Móvil) -->
            <button @click="isMenuOpen = !isMenuOpen"
                class="md:hidden text-white focus:outline-none transition duration-300">
                <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Botones de navegación (Escritorio) -->
            <div class="hidden md:flex space-x-4 ml-auto">
                <a v-for="(option, index) in options" :key="index" :href="option.link"
                    class="text-white flex items-center px-4 py-2 rounded-lg border border-white transition group hover:bg-accent hover:text-black">
                    <span class="mr-2 hidden md:block">{{ option.label }}</span>
                    <img :src="option.src" alt=""
                        class="w-6 h-6 ml-2 md:ml-0 md:mr-2 invert group-hover:invert-0 transition-all duration-300">
                </a>
            </div>

            <!-- Menú desplegable de moneda -->
            <div class="relative inline-block text-left ml-4">
                <button @click="isCurrencyMenuOpen = !isCurrencyMenuOpen"
                    class="text-white px-3 py-2 rounded-lg border border-white transition duration-300 hover:bg-accent">
                    {{ selectedCurrency }}
                </button>
                <div v-if="isCurrencyMenuOpen"
                    class="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg transition-all ease-in-out duration-300">
                    <a @click="changeCurrency('CUP')"
                        class="block text-black px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition duration-200"
                        :class="{ 'bg-gray-100': selectedCurrency === 'CUP' }">
                        CUP
                    </a>
                    <a @click="changeCurrency('USD')"
                        class="block text-black px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition duration-200"
                        :class="{ 'bg-gray-100': selectedCurrency === 'USD' }">
                        USD
                    </a>
                </div>
            </div>

            <!-- Botón de carrito de compras -->
            <a href="/carrito"
                class="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-white hover:bg-accent transition ml-4">
                <span class="text-white font-bold hover:text-black">{{ cartItems }}</span>
                <img src="/carritoDeCompras.png" alt="Carrito" class="w-6 h-6 invert hover:invert(0)">
            </a>

            <!-- Botón de usuario -->
            <a @click="toggleUserMenu"
                class="w-12 h-12 rounded-full overflow-hidden border-2 border-white hover:bg-accent hover:border-accent transition ml-6 flex items-center justify-center cursor-pointer">
                <img src="/usuario.png" alt="Usuario"
                    class="w-3/4 h-3/4 object-cover transition duration-300 hover:opacity-75 mix-blend-screen invert hover:invert(0)" />
            </a>
        </div>

        <!-- Overlay para el menú de usuario -->
        <div v-if="isUserMenuOpen" class="fixed inset-0 z-40" @click="isUserMenuOpen = false">
            <!-- Menú desplegable del usuario -->
            <div class="fixed top-0 right-0 w-64 h-screen bg-secondary p-4 space-y-2 transform transition-all duration-300 ease-in-out"
                :style="{ transform: isUserMenuOpen ? 'translateX(0)' : 'translateX(100%)' }" @click.stop>
                <!-- Opción de perfil -->
                <a href="/perfil"
                    class="group flex items-center text-white py-2 rounded-lg hover:bg-accent transition group-hover:text-black">
                    <img src="/perfil.png" alt="Perfil"
                        class="w-6 h-6 mr-2 invert group-hover:invert-0 transition-all duration-300" />
                    Mi Perfil
                </a>
                <hr class="border-white" />
                <!-- Opción de ajustes -->
                <a href="/ajustes"
                    class="group flex items-center text-white py-2 rounded-lg hover:bg-accent transition group-hover:text-black">
                    <img src="/compras.png" alt="Ajustes"
                        class="w-6 h-6 mr-2 invert group-hover:invert-0 transition-all duration-300" />
                    Mis Compras
                </a>
                <hr class="border-white" />
                <!-- Opción de ajustes -->
                <a href="/resennas"
                    class="group flex items-center text-white py-2 rounded-lg hover:bg-accent transition group-hover:text-black">
                    <img src="/resennas.png" alt="Ajustes"
                        class="w-6 h-6 mr-2 invert group-hover:invert-0 transition-all duration-300" />
                    Mis Reseñas
                </a>
                <hr class="border-white" />
                <!-- Opción de cerrar sesión -->
                <a href="/cerrar-sesion"
                    class="group flex items-center text-white py-2 rounded-lg hover:bg-accent transition group-hover:text-black">
                    <img src="/cerrar-sesion.png" alt="Cerrar Sesión"
                        class="w-6 h-6 mr-2 invert group-hover:invert-0 transition-all duration-300" />
                    Cerrar Sesión
                </a>
            </div>
        </div>

        <!-- Menú desplegable (Móvil) -->
        <div v-if="isMenuOpen"
            class="md:hidden fixed top-16 left-0 w-full bg-secondary p-4 space-y-2 transform transition-all duration-300 ease-in-out">
            <a v-for="(option, index) in options" :key="index" :href="option.link"
                class="flex items-center block text-white text-center py-2 rounded-lg transition group hover:bg-accent">
                <img :src="option.src" alt=""
                    class="w-6 h-6 mr-2 invert group-hover:invert-0 transition-all duration-300">
                <span>{{ option.label }}</span>
            </a>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";

// Controla el estado del menú de usuario y del menú móvil
const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false); // Estado del menú de usuario
const isLanguageMenuOpen = ref(false);

// Número de productos en el carrito
const cartItems = ref(0.00);

// Opciones de navegación
const options = [
    { label: "Productos", src: "/Productos.png", link: "/" },
    { label: "Ofertas!", src: "/Ofertas.png", link: "/" },
    { label: "Quienes Somos", src: "/QuienesSomos.png", link: "/Quienes_Somos" },
    { label: "Donde Encontrarnos", src: "/mapa.png", link: "/Donde_Encontrarnos" }
];

// Función para cambiar el idioma
const changeLanguage = (language) => {
    console.log(`Idioma seleccionado: ${language}`);
    isLanguageMenuOpen.value = false; // Cerrar el menú de idiomas
};

// Función para alternar el menú de usuario
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

// Estado del menú de moneda
const isCurrencyMenuOpen = ref(false);
const selectedCurrency = ref('CUP'); // Moneda seleccionada por defecto

// Función para cambiar la moneda
const changeCurrency = (currency) => {
    selectedCurrency.value = currency;
    isCurrencyMenuOpen.value = false; // Cerrar el menú de moneda
};
</script>