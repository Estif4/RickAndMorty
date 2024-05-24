<template>
  <div>
    <div class="nav flex flex-row bg-black w-full h-24 fixed top-0 z-10">
      <img class="w-16 h-16" src="./images/video.png">
      <img src="./images/ricknavtext.png">
      <div class="ml-80 mt-6 flex gap-12">
        <span @click="scrollToSection('home')" class="text-2xl text-green-500 cursor-pointer">Home</span>
        <span @click="scrollToSection('episodes')" class="ml-2 text-2xl text-green-500 cursor-pointer">Episode</span>
        <span @click="scrollToSection('characters')" class="ml-2 text-2xl text-green-500 cursor-pointer">Character</span>
        <span @click="scrollToSection('locations')" class="mr-2 text-2xl text-green-500 cursor-pointer">Location</span>
      </div>
      <img class="w-16 h-16 ml-28 mt-4" src="./images/videoHd.png">
    </div>

    <div ref="home">
      <img class="firstimg w-full h-96" src="./images/first.jpg">
    </div>
    <div>
      <carousel></carousel>
    </div>
    <div class="flex bg-gray-300 w-full h-24" ref="about">
      <img class="ml-40" src="./images/Rectangle 6.png">
      <span class="ml-8 mt-8 text-black text-5xl">About</span>
    </div>
    <div class="flex about">
      <img class="mt-32 w-60 h-96" src="./images/about2.jpg">
      <div>
        <p class="description font-serif italic ml-16 mt-16 text-white text-2xl">
          <span class="text-orange-500">"Rick and Morty"</span> is an animated science fiction sitcom that
          follows the misadventures of Rick Sanchez, a cynical and eccentric scientist, and
          his good-hearted but easily influenced grandson, Morty Smith. Rick, who is known for
          his reckless behavior, uses his genius intellect and advanced technology to embark on
          dangerous interdimensional adventures, dragging Morty along with him.
          Throughout their travels, they encounter bizarre creatures, alternate realities, and complex
          scientific phenomena. The show delves into themes of family dynamics, the consequences of unchecked
          scientific exploration, and the ethical dilemmas that arise from wielding immense power. Balancing dark humor
          with thought-provoking storylines, "Rick and Morty" has captivated audiences with its unique blend of absurdity and intelligence.
        </p>
      </div>
      <img class="ml-8" src="./images/line 1.png">
      <div class="mt-32 ml-12 text-4xl text-green-600">
        <img class="mb-12" src="./images/genre.png">
        <img class="mb-12" src="./images/imdbrating.png">
        <img class="mb-12" src="./images/starstext.png">
      </div>
    </div>
    <div class="flex bg-gray-300 w-full h-24" ref="episodes">
      <img class="ml-40" src="./images/Rectangle 6.png">
      <span class="ml-8 mt-8 italic font-serif text-black text-5xl">Episodes</span>
    </div>
    <div class="bg-white h-32">
      <p class="text-3xl italic pt-8 font-serif text-center">Episode Guide</p>
    </div>
    <episode></episode>
    <div class="flex bg-gray-300 w-full h-24" ref="characters">
      <img class="ml-40" src="./images/Rectangle 6.png">
      <span class="ml-8 mt-8 italic font-serif text-black text-5xl">Characters</span>
    </div>
    <character></character>
    <div class="flex mt-64 bg-gray-300 w-full h-24" ref="locations">
      <img src="./images/location.png">
      <img class="ml-40" src="./images/Rectangle 6.png">
      <span class="ml-8 mt-8 italic font-serif text-black text-5xl">Locations</span>
    </div>
    <location></location>
  </div>
  <div class="flex h-64 bg-rose-900">
    <div class="gap-4 flex m-32">
      <a href="https://github.com/Estif4?tab=repositories"><img class="hover:h-9 h-8" src="./images/git.png"></a>
      <img class="hover:h-9 h-8" src="./images/facebook.png">
      <img class="hover:h-9 h-8" src="./images/instagram.png">
      <a href="https://t.me/Ek0090"><img class="hover:h-9 h-8" src="./images/telegram.png"></a>
      <a href="https://www.figma.com/proto/zCjFHMwSxIF2VKOG5AmZ8q/Untitled?node-id=2-2&t=4pVmyKU9H26XNXMm-0&scaling=min-zoom&page-id=0%3A1">
        <div class="flex"><div><img class=" w-6 inline" src="./images/figma.png"></div>
        <div><span class="text-blue-600 text-3xl  mb-12 ml-2 hover:text-blue-500 text-white   ">Figma Design</span></div>
      </div></a>
    </div>
    <div class="mt-32 ml-96 text-white text-2xl font-serif">copyright &#169 2024 Estifanos kelemu</div>
  </div>
  <button v-show="showButton" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded" @click="scrollToTop">
    Back to Top
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import carousel from './carousel.vue';
import episode from './components/EpisodeList.vue';
import character from './components/characterlist.vue';
import location from './components/locationList.vue';

const router = useRouter();

// Define refs for the sections
const home = ref(null);
const episodes = ref(null);
const characters = ref(null);
const locations = ref(null);

// Method to scroll to a section
const scrollToSection = (section) => {
  const sectionRefs = { home, episodes, characters, locations };
  const element = sectionRefs[section].value;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

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

<style>
.firstimg {
  width: 100%;
}
.about {
  background-color: #1e1e1e;
}
.nav {
  position: fixed;
  z-index: 10;
}
.description {
  width: 500px;
}
</style>