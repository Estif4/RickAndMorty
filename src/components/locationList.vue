<template>
  <div class="bg-black">
    <div v-if="loading" class="text-center text-white py-10">Loading...</div>
    <div v-if="error" class="text-center text-white py-10">Error: {{ error.message }}</div>
    <div v-if="data">
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(locations, type) in groupedLocations"
            :key="type"
            class="bg-black border rounded-lg shadow-md p-4"
          >
            <h2 class="text-2xl text-white font-bold mb-4">{{ type }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="location in locations" :key="location.id">
                <router-link :to="{ name: 'LocationDetail', params: { id: location.id } }" class="block">
                  <div class="flex items-center p-4 mb-4 relative">
                    <div class="circle-bullet mr-2"></div> <!-- Circular bullet -->
                    <h3 class="text-xl text-blue-400 font-bold mb-2">{{ location.name }}</h3>
                    <p><strong>Type:</strong> {{ location.type }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Define GraphQL query to get all locations and their details
const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      results {
        id
        name
        type
      }
    }
  }
`;

// Fetch data using useQuery
const { result: data, loading, error } = useQuery(GET_ALL_LOCATIONS);

// Group locations by type
const groupedLocations = computed(() => {
  if (!data.value) return {};
  return data.value.locations.results.reduce((acc, location) => {
    if (!acc[location.type]) {
      acc[location.type] = [];
    }
    acc[location.type].push(location);
    return acc;
  }, {});
});
</script>

<style scoped>
.circle-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  left: -18px; /* Adjust as needed for alignment */
  top: 50%;
  transform: translateY(-50%);
}
</style>
