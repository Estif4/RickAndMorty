<template>
  <div class="w-full mt--16 h-16 fixed z-10 flex flex-row gap-96 bg-gray-200">
    <div class="flex">
      <img class="w-12" src="../images/locationicon.png" />
      <span class="text-4xl mt-1 font-serif">Location</span>
    </div>
    <div class="flex">
      <span class="whitespace-nowrap text-black text-3xl mt-2 font-serif">
        Rick and Morty
      </span>
    </div>
    <div class="text-3xl ml-72 mt-2 font-mono">
      <router-link to="/">Home</router-link>
    </div>
  </div>
  <div class="back relative">
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="data">
      <div class="location-detail h-96 relative top-64 flex flex-col gap-12 text-center">
        <h2 class="text-6xl text-green-500">{{ data.location.name }}</h2>
        <p class="font-serif text-3xl text-white"><strong>Type:</strong> {{ data.location.type }}</p>
        <p class="font-serif text-3xl text-white"><strong>Dimension:</strong> {{ data.location.dimension }}</p>
        <p class="font-serif text-3xl text-white"><strong>Created:</strong> {{ data.location.created }}</p>
      </div>
      <div class="relative top-96">
    <h3 class="text-white text-6xl text-center mb-32">Residents</h3>
    <div class="grid-container">
      <ul class="grid grid-cols-3 gap-8 overflow-y-auto max-h-96">
        <li
          class="bg-blue-100 flex w-68 rounded-2xl mb-12 ml-12 p-4"
          v-for="resident in data.location.residents"
          :key="resident.id"
        >
          <div><img class="h-32 rounded-full" :src="resident.image" :alt="resident.name" /></div>
          <div>
            <p class="text-pink-600 text-4xl"><strong></strong> {{ resident.name }}</p>
            <p class="text-black font-mono text-xl"><strong>Status:</strong> {{ resident.status }}</p>
            <p class="text-black font-mono text-xl"><strong>Species:</strong> {{ resident.species }}</p>
            <p class="text-black font-mono text-xl"><strong>Gender:</strong> {{ resident.gender }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
    </div>
  </div>
  <div class="bg-white h-64 relative flex ml-12">
    <a href="https://www.figma.com/proto/zCjFHMwSxIF2VKOG5AmZ8q/Untitled?node-id=2-2&t=4pVmyKU9H26XNXMm-0&scaling=min-zoom&page-id=0%3A1">
      <div><img class="absolute top-12 w-6 mt-12" src="../images/figma.png"></div>
      <div><span class="text-blue-600 text-3xl ml-10 mt-4 absolute top-20">Figma Design</span></div>
    </a>
    <a href="https://github.com/Estif4?tab=repositories" class="flex"><img class=" h-12 ml-72 mt-24 rounded-full" src="../images/git.png"><span class=" mt-24 ml-2 inline text-3xl text-blue-600">Github</span> </a>
  </div>
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Back to Top
  </button>
</template>

<script>
import { defineComponent, watch, ref, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Define GraphQL query
const GET_LOCATION_DETAILS = gql`
  query GetLocationDetails($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      created
      residents {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

export default defineComponent({
  name: 'CharacterDetail',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // Fetch data using useQuery
    const { result: data, loading, error, refetch } = useQuery(GET_LOCATION_DETAILS, { id: props.id });

    // Watch for changes in the id prop and refetch the query
    watch(() => props.id, (newId) => {
      refetch({ id: newId });
    });

    const showButton = ref(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        showButton.value = true;
      } else {
        showButton.value = false;
      }
    };

    onMounted(() => {
      window.scrollTo(0, 0);
      window.addEventListener('scroll', handleScroll);
    });

    return {
      data,
      loading,
      error,
      showButton,
      scrollToTop,
    };
  },
});
</script>

<style scoped>
.back {
  background-image: url('../images/locationcover.png');
  height: 3200px;
}
.max-h-96 {
  max-height: 124rem/* 384px */;
}
</style>