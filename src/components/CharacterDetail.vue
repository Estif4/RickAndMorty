<template>
  <div class="w-full fixed z-10 flex flex-row gap-96 bg-yellow-200">
    <div class="flex">
      <img class="w-12" src="../images/characterimg1.png" />
      <span class="text-4xl mt-1 font-serif">Character</span>
    </div>
    <div class="flex">
      <img class="w-12" src="../images/characterimg2.png" />
      <span class="whitespace-nowrap text-black text-3xl mt-2 font-serif">
        Rick and Morty
      </span>
    </div>
    <div class="text-3xl ml-64 mt-2 font-mono">
      <router-link to="/">Home</router-link>
    </div>
  </div>

  <div v-if="loading" class="bg-yellow-300 h-80 text-white text-6xl relative top-10">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-if="data">
    <div class="flex relative top-16 bg-yellow-100">
      <div>
        <img class="img" :src="data.character.image" :alt="data.character.name" />
      </div>
      <div class="ml-64 mt-36">
        <h2 class="text-5xl mb-12 font-serif text-blue-800">{{ data.character.name }}</h2>
        <p class="text-3xl mb-4">
          <span class="inline-block w-5 h-5 rounded-full mr-2 "
            :class="data.character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'"></span>
          <strong>{{ data.character.status }}</strong>
        </p>
        <p class="text-3xl mb-4"><strong>{{ data.character.species }}</strong></p>
        <p class="text-3xl mb-4"><strong>{{ data.character.gender }}</strong></p>
        <p class="text-3xl mb-4">
          <span class=" triangle "></span>
          <p class="text-3xl text-black bg-white">Last known location</p>
         
          <strong>{{ data.character.location.name }}</strong>
        </p>
      </div>
    </div>
    <div class="mt-32 back">
      <h3 class="ml-96 pl-32 mb-16 text-5xl text-green-500">Episodes participated in</h3>
      <ul class="ml-64 grid grid-cols-2 gap-12 overflow-y-auto overflow">
        <li v-for="episode in data.character.episode" :key="episode.id">
          <p class="text-pink-700 text-4xl">{{ episode.name }}</p>
          <p class="text-2xl text-white"><strong>Air Date:</strong> {{ episode.air_date }}</p>
          <p class="text-2xl text-white"><strong>Episode:</strong> {{ episode.episode }}</p>
          <p class="text-2xl text-white"><strong>Created:</strong> {{ episode.created }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="bg-white h-64 relative flex ml-12">
    <a href="https://www.figma.com/proto/9B0hPNtvgaEwbbOZcyGjpP/Untitled?node-id=1-2&t=kOaV8GcBCR1ELoWb-0&scaling=min-zoom&page-id=0%3A1">
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

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// Define GraphQL query
const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        air_date
        episode
        created
      }
      location {
        name
      }
    }
  }
`;

const { result: data, loading, error, refetch } = useQuery(GET_CHARACTER_DETAILS, {
  id: props.id,
});

// Watch for changes in the id prop and refetch the query
watch(
  () => props.id,
  (newId) => {
    refetch({ id: newId });
  }
);

const showButton = ref(false);
const scrollPosition = ref(0);

const handleScroll = () => {
  scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop;
  showButton.value = scrollPosition.value > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back {
  background-image: url('../images/characterback.png');
}
.triangle {
  color: red;
  border-style: solid;
  border-width: 0px 25px 30px 30px; /* Adjust the border-width for different triangle sizes */
  border-color: transparent #dd2f2f transparent transparent; /* Adjust the color as needed */
  position: absolute;
  margin-left: -55px;
  margin-top: 10px;
}

.img {
  width: 600px;
  height: 600px;
}
.overflow{
  max-height: 800px;
}
</style>