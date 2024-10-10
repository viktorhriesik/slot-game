import { Scene } from 'phaser';
import { EventBus } from '../EventBus';



export default class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00); 
        const background = this.add.image(this.cameras.main.width/5, 0, 'menu_screen').setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.height, this.cameras.main.height);


        const button = this.add.sprite(this.cameras.main.width-this.cameras.main.width/4  , this.cameras.main.height/7, 'startGame').setOrigin(0.1).setInteractive();
        button.setDisplaySize(200, 200);
        button.id = 'start-game';

        button.on('pointerdown', () => {
            console.log('Button Clicked!');
            this.changeScene();
            });
        button.on('pointerover', () => {
            //button.setTint(0x44ff44); // Change color on hover (green)
            this.input.setDefaultCursor('pointer'); // Set the cursor to pointer
            });    

        EventBus.emit('current-scene-ready', this);
        //resizeGame(this);
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
    
}
function resizeGame(game) {
    const width = window.innerWidth < 600 ? window.innerWidth * 0.9 : window.innerWidth *0.7; // 90% width for mobile, 60% for desktop
    const height = window.innerHeight * 0.8; // Keep height to 80% of the window

    game.scale.resize(width, height);
}