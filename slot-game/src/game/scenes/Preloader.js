import { Scene } from 'phaser';

export default class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }


    preload ()
    {
        this.load.setPath('../assets');
        this.load.image('lemon', 'lemon.png');
        this.load.image('cherry', 'cherry.png');
        this.load.image('bell', 'bell.png'); 
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}