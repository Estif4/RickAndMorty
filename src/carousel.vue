<template>
  <Carousel :itemsToShow="3">
    <Slide v-for="slide in imageList" :key="slide">
      <!-- <div class="carousel__item">{{ slide }}</div> -->
      <img :src="`${slide}`" alt="" class="carousel__item" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';
const imageList = ref([
  'https://vid.alarabiya.net/images/2023/01/26/baeddbc6-2543-4526-984d-cab72533c28e/baeddbc6-2543-4526-984d-cab72533c28e.jpg?width=801&format=jpg',
  'https://i.pinimg.com/originals/a7/88/7b/a7887b5c3f3aa1ba0fcd92a822d5bfee.jpg',
  'https://mrwallpaper.com/images/thumbnail/neon-space-rick-and-morty-iphone-r4qxuelh0ndqnpxm.webp',
  'https://i.pinimg.com/474x/58/70/37/5870377f6dc0e6cd89a7b7495b422689.jpg',
  'https://i.pinimg.com/564x/dc/3f/62/dc3f624d05a7380ffc0f780b104d45cc.jpg',
  'https://i.pinimg.com/736x/75/0c/d4/750cd40ec872ff53643936fd49cbdd98.jpg',
  'https://i.pinimg.com/564x/fc/35/f4/fc35f4c81a7576ed6ec21868532746d3.jpg',
  'https://i.pinimg.com/564x/88/a7/c1/88a7c11f9bda6ccb127f6d9e5d7c3a98.jpg',
  'https://i.pinimg.com/736x/11/17/8a/11178aa40cd0f6431550ac3756e62b78.jpg',
  'https://i.pinimg.com/564x/de/ab/57/deab57e478ebf1cd235eae8d81007275.jpg',
  'https://i.pinimg.com/564x/19/09/8d/19098de1b4eb533cd9c3431321139daf.jpg',
  'https://i.pinimg.com/564x/db/61/3a/db613a3179d723164189860d0381d1bd.jpg'
]);

defineComponent({

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});

</script>

<style>
.carousel {
  background-color: rgb(0, 0, 0);
  border-radius: 8px;
  overflow: hidden;
 
  position: relative;
}

.carousel__item {
  height: 770px;
  width: 450px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  position: relative;
}

.carousel__prev {
  color: white;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 43.3px 25px 0; /* Adjust the border-width for different triangle sizes */
  border-color: transparent #ffff transparent transparent; /* Adjust the color as needed */
  position: absolute;
 
}

.carousel__next {
  color: white;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 0 25px 43.3px; /* Adjust the border-width for different triangle sizes */
  border-color: transparent transparent transparent #fff; /* Adjust the color as needed */
  position: absolute;
}

.carousel__prev {
  left: -1%;
}

.carousel__next {
  right: -1%;
}

.carousel__pagination { 
  background-color: rgba(178, 191, 174, 0.975);
  margin: 0;
}

.carousel__pagination-button--active::after {
  background-color: rgb(21, 69, 42);
}

.carousel__pagination-button:hover::after {
  background-color: rgb(7, 83, 40);  
}

.carousel__pagination-button::after {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
