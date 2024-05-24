import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createRouter, createWebHistory } from 'vue-router';
import VueCarousel from 'vue-carousel'; // Import Vue Carousel
import App from './App.vue';
import Home from './Home-page.vue';
import EpisodeDetail from './components/EpisodeDetail.vue';
import CharacterDetail from './components/CharacterDetail.vue';
import LocationDetail from './components/LocationDetail.vue';
import characterlist from './components/characterlist.vue';
import './style.css';
// Import other components if needed

// Define your routes
const routes = [
  { path: '/', component: Home },
  {path:'/characterlist',component:characterlist},
  {
    path: '/EpisodeDetail/:id',
    name: 'EpisodeDetail',
    component: EpisodeDetail,
    props: true,
  },
  {
    path: '/CharacterDetail/:id',
    name: 'CharacterDetail',
    component: CharacterDetail,
    props: true,
  }
  , {
    path: '/LocationDetail/:id',
    name: 'LocationDetail',
    component: LocationDetail,
    props: true,
  }
  // Add more routes here as needed
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create Apollo Client
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  uri: 'https://rickandmortyapi.com/graphql',
});

// Create the Vue app instance
const app = createApp({
  setup() {
    // Provide Apollo Client to the entire app
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

// Use Vue Router
app.use(router);

// Use Vue Carousel
app.use(VueCarousel); // Use VueCarousel here

// Mount the app
app.mount('#app');
