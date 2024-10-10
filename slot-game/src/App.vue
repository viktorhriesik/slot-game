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
  <div id="game-nav-bar"> 
    <div id="money_bar">
      <h3 id="balance_txt">Credit: 1000$</h3>
      <h3  id="bet_txt">Bet: 10$</h3>
    </div>
    <h2 id="game_status">Good Luck!</h2>

    <div id="buttons">
      <button id="minus_btn"></button>
      <button id="spin_btn"></button>
      <button id="plus_btn"></button>
    </div>
    
  </div>
</div>
</template>

<style scoped>

</style>
