<template>
  <div class="bg-gradient-to-tr from-green-700 via-yellow-500 to-red-700 app-container">
    <header>
      <h1 class="text-4xl font-bold text-center my-8">Rick and Morty Episodes</h1>
    </header>
    <main class="container mx-auto px-4">
      <div class="season-buttons flex justify-center mb-8">
        <button @click="displaySeason(1)" :class="{ 'font-bold': currentSeason === 1 }" class="ml-16 bg-gray-200 bold font-serif text-2xl rounded-3xl p-1">Season 1</button>
        <button @click="displaySeason(2)" :class="{ 'font-bold': currentSeason === 2 }" class="ml-16 bg-gray-200 bold font-serif text-2xl rounded-3xl p-1">Season 2</button>
        <button @click="displaySeason(3)" :class="{ 'font-bold': currentSeason === 3 }" class="ml-16 bg-gray-200 bold font-serif text-2xl rounded-3xl p-1">Season 3</button>
        <button @click="displaySeason(4)" :class="{ 'font-bold': currentSeason === 4 }" class="ml-16 bg-gray-200 bold font-serif text-2xl rounded-3xl p-1">Season 4</button>
        <button @click="displaySeason(5)" :class="{ 'font-bold': currentSeason === 5 }" class="ml-16 bg-gray-200 bold font-serif text-2xl rounded-3xl p-1">Season 5</button>
      </div>

      <section class="episodes-list-section">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
        <div v-if="filteredData.length > 0">
          <div v-for="season in filteredData" :key="season.season" class="grid grid-cols-4 gap-4">
            <router-link v-for="episode in season.episodes" :key="episode.id" :to="{ name: 'EpisodeDetail', params: { id: episode.id }}">
              <div class="hover:opacity-75 episode-card cursor-pointer items-center relative">
                <img :src="getEpisodeImage(episode.id)" :alt="episode.name" class="w-72 h-96" />
                <div class="episode-info text-center mb-4 bg-orange-100 w-72 h-16">
                  <p class="font-serif text-2xl text-blue-600">S{{ season.season }} E{{ episode.episode.split('E')[1] }}: <span class="text-black">{{ episode.name }}</span></p>
                </div>
                <div class="video-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5v10l7-5-7-5z" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import episode1Image from '../images/s1e1.png';
import episode2Image from '../images/s1e2.png';
import episode3Image from '../images/s1e3.png';
import episode4Image from '../images/s1e4.png';
import episode5Image from '../images/s1e5.png';
import episode6Image from '../images/s1e6.png';
import episode7Image from '../images/s1e7.png';
import episode8Image from '../images/s1e8.png';
import episode9Image from '../images/s1e9.png';
import episode10Image from '../images/s1e10.png';
import episode11Image from '../images/s1e11.png';

import defaultImage from '../images/s1e11.png';

const episodes = ref([]);
const loading = ref(true);
const error = ref(null);
const currentSeason = ref(1);

const fetchAllEpisodes = async () => {
  const query = `
    query {
      episodesByIds(ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]) {
        id
        name
        episode
      }
    }
  `;
  try {
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    episodes.value = data.data.episodesByIds;
    loading.value = false;
  } catch (err) {
    error.value = err;
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllEpisodes();
});

const groupedEpisodes = computed(() => {
  const seasons = {};
  episodes.value.forEach(episode => {
    const seasonNumber = parseInt(episode.episode.split('E')[0].replace('S', ''), 10);
    if (!seasons[seasonNumber]) {
      seasons[seasonNumber] = { season: seasonNumber, episodes: [] };
    }
    seasons[seasonNumber].episodes.push(episode);
  });
  return Object.values(seasons).sort((a, b) => a.season - b.season);
});

const filteredData = computed(() => {
  return groupedEpisodes.value.filter(season => season.season === currentSeason.value);
});

const getEpisodeImage = episodeId => {
  const episodeImages = {
    '1': episode1Image,
    '2': episode2Image,
    '3': episode3Image,
    '4': episode4Image,
    '5': episode5Image,
    '6': episode6Image,
    '7': episode7Image,
    '8': episode8Image,
    '9': episode9Image,
    '10': episode10Image,
    '11': episode11Image,
    // Add more episode IDs and images as needed
  };
  return episodeImages[episodeId] || defaultImage;
};

const displaySeason = season => {
  currentSeason.value = season;
};
</script>

<style scoped>
.app-container {
  font-family: 'Arial, sans-serif';
}

.season-buttons button {
  transition: background-color 0.3s, color 0.3s;
}

.season-buttons button:hover {
  background-color: #e2e8f0;
}

.episode-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.episode-info {
  padding: 0.5rem;
}



</style>
