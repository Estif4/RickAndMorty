<template>
  <div>
    <div class="bg-gray-200 nav fixed flex justify-between h-20 items-center px-12">
      <div class="flex items-center">
        <img src="../images/epimg.png" alt="Episode Image" class="h-12 w-auto">
        <span class="font-serif text-3xl ml-8">Episode</span>
      </div>
      <span class="text-4xl font-serif">Rick And Morty</span>
      <router-link to="/" class="text-3xl text-green-700 font-serif">Home</router-link>
    </div>
    
    <div class="h-96 cover flex flex-col items-center justify-center">
      <h2 class="text-white text-5xl">Episode Detail</h2>
      <div class="mt-8 episode-detail-section w-full max-w-4xl p-8 bg-gray-900 bg-opacity-75 rounded-lg">
        <div v-if="loading" class="text-white text-center">Loading...</div>
        <div v-if="error" class="text-red-500 text-center">Error: {{ error.message }}</div>
        <div v-if="data">
         
          <div class="flex flex-col items-start space-y-8">
            <div class="flex items-center">
              <div class="bg-black h-16 text-white text-5xl inline-block p-4">{{ data.episode.name }}</div>
              <div class="bg-black text-white p-8 inline-block ml-8">
                <p class="text-3xl"><strong>Air Date:</strong> {{ data.episode.air_date }}</p>
                <p class="text-2xl"><strong>Episode:</strong> {{ data.episode.episode }}</p>
                <p class="text-2xl"><strong>Created:</strong> {{ data.episode.created }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="characters bg-gradient-to-r from-green-500 to-blue-500 py-12">
      <p class="text-white text-4xl text-center mb-12"><strong>Characters Participated</strong></p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-12">
        <div v-for="character in data.episode.characters" :key="character.id" class="character-card flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img :src="character.image" :alt="character.name" class="rounded shadow-lg w-64 mb-4">
          <div class="character-info text-center w-64 text-xl">
            <p class="text-2xl text-black font-bold">{{ character.name }}</p>
            <p class="text-black">{{ character.status }}</p>
            <p class="text-black">{{ character.species }}</p>
            <p class="text-black">{{ character.gender }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white h-64 flex items-center justify-around">
      <a href="https://www.figma.com/proto/WHI6Xv6E0IizXujOVo6ESd/Untitled?node-id=1-2&t=kOaV8GcBCR1ELoWb-0&scaling=min-zoom&page-id=0%3A1" class="flex items-center">
        <img class="w-12" src="../images/figma.png" alt="Figma">
        <span class="text-blue-600 text-3xl ml-4">Figma Design</span>
      </a>
      <a href="https://github.com/Estif4?tab=repositories" class="flex items-center">
        <img class="h-12 rounded-full" src="../images/git.png" alt="GitHub">
        <span class="text-blue-600 text-3xl ml-4">GitHub</span>
      </a>
    </div>
    
    <button
      v-show="showBackToTopButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
    >
      Back to Top
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      created
      characters {
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

const { result: data, loading, error, refetch } = useQuery(GET_EPISODE, { id: props.id });
const showBackToTopButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

watch(() => props.id, (newId) => {
  refetch({ id: newId });
});

onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  showBackToTopButton.value = window.pageYOffset > 400;
};
</script>

<style scoped>
.cover {
  width: 100%;
  height: 100vh;
  background-image: url('../images/cover1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  width: 100%;
  z-index: 10;
}
</style>
