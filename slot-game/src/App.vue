<script setup>
import Phaser, { Scene } from 'phaser';
import { ref, toRaw } from 'vue';
import SlotGame from './game/SlotGame.vue';


const phaserRef = ref();

const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);
    if (scene)
    {
        scene.changeScene();
    }
}

</script>

<template>
<div>
  <SlotGame ref="phaserRef" @current-active-scene="currentScene" />
  <div> 
    <p>1234</p>
    <button class="button" @click="changeScene">Change Scene</button>
  </div>
</div>
</template>

<style scoped>

</style>
