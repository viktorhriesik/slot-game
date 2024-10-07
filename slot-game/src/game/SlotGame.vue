<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import  {EventBus} from './EventBus';
import StartGame from './sceneManager';

const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene']);

onMounted(() => {

    game.value = StartGame('game-container');

    EventBus.on('current-scene-ready', (currentScene) => {
        emit('current-active-scene', currentScene);
        scene.value = currentScene;
    });

     console.log(game.value);
});




defineExpose({ scene, game });
</script>

<template>
    <div id="game-container"></div>
</template>