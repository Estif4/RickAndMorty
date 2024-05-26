<template>
  <div class="app-container">
    <header>
      <h1 class="text-4xl text-blue-600 font-bold text-center my-8">Rick and Morty Characters</h1>
    </header>
    <main class="container ml-12 mt-32 px-4">
      <section class="characters-list-section">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
        <div v-if="characters.length > 0">
          <!-- Grid layout for characters -->
          <div class="ml-32 grid grid-cols-4 gap-8">
            <div v-for="character in characters" :key="character.id" class="hover:opacity-75 transition duration-300 shadow-md character-card cursor-pointer items-center">
              <!-- Character card with router-link -->
              <router-link :to="{ name: 'CharacterDetail', params: { id: character.id } }" class="block">
                <img class="w-64 h-64" :src="character.image" :alt="character.name" />
                <div class="character-info  text-center mb-4 bg-black w-64 h-8">
                  <p class="font-serif text-xl text-white">{{ character.name }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Define GraphQL query
const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

// Fetch data using useQuery
const { result: data, loading, error } = useQuery(GET_ALL_CHARACTERS);

// Extract characters data
const characters = computed(() => {
  if (!data.value) return [];
  return data.value.characters.results;
});
</script>

<style scoped>
/* Add any necessary styles for your components */
</style>
