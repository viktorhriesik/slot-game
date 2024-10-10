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
        this.load.image('startGame', 'startGame.png'); 
        this.load.image('border', 'border.png'); 
        this.load.image('menu_screen', 'menu_screen.png'); 

        this.load.image('book', 'book.png'); 
        this.load.image('pharaoh', 'pharaoh.png');
        this.load.image('scarab', 'scarab.png'); 
        this.load.image('statue', 'statue.png'); 
        this.load.image('symbol', 'symbol.png'); 
        this.load.image('A', 'A.png'); 
        this.load.image('K', 'K.png'); 
        this.load.image('Q', 'Q.png'); 
        this.load.image('10', '10.png');

    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}