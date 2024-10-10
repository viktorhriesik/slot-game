import Game  from './scenes/Game';
import MainMenu  from './scenes/MainMenu';
import Preloader  from './scenes/Preloader';
import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 850,
    height: 542,
    parent: 'game-container',
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }, 
    scale: {
        
        
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