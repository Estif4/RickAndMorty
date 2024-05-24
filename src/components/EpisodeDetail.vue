<template>
  <div>
    <div class="bg-gray-200 nav fixed flex gap-96 h-20">
      <div class="flex">
        <img src="../images/epimg.png" alt="Episode Image">
        <span class="font-serif text-3xl mt-6 ml-8">Episode</span>
      </div>
      <span class="text-4xl font-serif mr-32 ml-32 mt-6">Rick And Morty</span>
      <router-link to="/" class="text-3xl mt-8 text-green-700 font-serif">Home</router-link>
    </div>
    <div class="h-96 cover">
      <h2 class="text-white">Episode Detail</h2>
      <div class="mt-32 episode-detail-section">
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-if="data">
          <div class="text-white text-4xl text-center">Episode Detail</div>
          <div class="p-32 ml-32 mb-32 flex flex-col">
            <div class="flex">
              <div class="bg-black h-16 text-white text-5xl inline-block mt-16 w-96">{{ data.episode.name }}</div>
              <div class="bg-black text-white p-16 inline-block ml-8">
                <p class="text-white bg-black text-3xl"><strong>Air Date:</strong> {{ data.episode.air_date }}</p>
                <p class="text-2xl text-white bg-black w-96"><strong>Episode:</strong> {{ data.episode.episode }}</p>
                <p class="bg-black text-2xl text-white-600"><strong>Created:</strong> {{ data.episode.created }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="characters bg-gradient-to-r from-green-500 to-blue-500">
      <p class="text-white text-4xl mt-12 mb-12"><strong>Characters participated</strong></p>
      <div class="grid grid-cols-3 gap-12">
        <div v-for="character in data.episode.characters" :key="character.id" class="character-card flex flex-col items-center">
          <img :src="character.image" :alt="character.name" class="rounded shadow-lg w-64" />
          <div class="character-info text-center bg-white w-64 text-xl">
            <p class="text-2xl text-black">{{ character.name }}</p>
            <p class="text-black">{{ character.status }} </p>
            <p> {{ character.species }}</p>
            <p> {{ character.gender }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white h-64 relative flex ml-12">
      <a href="https://www.figma.com/proto/WHI6Xv6E0IizXujOVo6ESd/Untitled?node-id=1-2&t=kOaV8GcBCR1ELoWb-0&scaling=min-zoom&page-id=0%3A1">
        <div><img class="absolute top-12 w-6 mt-12" src="../images/figma.png"></div>
        <div><span class="text-blue-600 text-3xl ml-10 mt-4 absolute top-20">Figma Design</span></div>
      </a>
      <a href="https://github.com/Estif4?tab=repositories" class="flex"><img class=" h-12 ml-72 mt-24 rounded-full" src="../images/git.png"><span class=" mt-24 ml-2 inline text-3xl text-blue-600">Github</span> </a>
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
import { defineProps, ref, onMounted, watch } from 'vue';
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
  if (window.pageYOffset > 400) {
    showBackToTopButton.value = true;
  } else {
    showBackToTopButton.value = false;
  }
};
</script>

<style scoped>
.cover {
  width: 100%;
  height: 1200px;
  background-image: url('../images/cover1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0.5);
  margin-bottom: -55px;
}

.nav {
  width: 100%;
}
</style>