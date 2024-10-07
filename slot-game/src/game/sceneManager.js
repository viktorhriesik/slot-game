import Game  from './scenes/Game';
import MainMenu  from './scenes/MainMenu';
import Preloader  from './scenes/Preloader';
import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 750,
    height: 400,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }, 
    scene: [
        Preloader,
        MainMenu,
        Game
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });
}

export default StartGame;