<template>
  <Carousel :itemsToShow="3">
    <Slide v-for="slide in imageList" :key="slide">
      <!-- <div class="carousel__item">{{ slide }}</div> -->
      <img :src="`src/images/${slide}`" alt="" class="carousel__item" />
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
  'first1.jpg',
  'middle.jpg',
  'third.jpg',
  'fourth.jpg',
  'five.jpg',
  'six.jpg',
  'seven.jpg',
  'eight.jpg'
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
