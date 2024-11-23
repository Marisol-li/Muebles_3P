const { createApp } = Vue;

createApp({
    data() {
        return {
            currentCategory: null // Categoría seleccionada
        };
    },
    methods: {
        setCategory(category) {
            this.currentCategory = category;
        }
    }
}).component('category-list', {
    template: `
        <div class="category-list">
            <div class="category-card" @click="selectCategory('office')">
                <h2>Office</h2>
                <button>Ver más</button>
            </div>
            <div class="category-card" @click="selectCategory('living room')">
                <h2>Living Room</h2>
                <button>Ver más</button>
            </div>
            <div class="category-card" @click="selectCategory('kitchen')">
                <h2>Kitchen</h2>
                <button>Ver más</button>
            </div>
        </div>
    `,
    methods: {
        selectCategory(category) {
            this.$emit('select-category', category);
        }
    }
}).component('product-list', {
    props: ['category'],
    data() {
        return {
            products: []
        };
    },
    watch: {
        category: 'loadProducts'
    },
    methods: {
        async loadProducts() {
            try {
                const response = await axios.get('https://www.course-api.com/react-store-products');
                this.products = response.data.filter(product => product.category === this.category).slice(0, 3);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        }
    },
    template: `
        <div class="product-list">
            <div v-for="product in products" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.name">
                <h2>{{ product.name }}</h2>
                <p>Precio: {{ product.price | currency }}</p>
                <p>Categoría: {{ product.category }}</p>
                <p>Cantidad: {{ product.stock }}</p>
            </div>
        </div>
    `,
    filters: {
        currency(value) {
            return `$${value.toFixed(2)}`;
        }
    }
}).mount('#app');
