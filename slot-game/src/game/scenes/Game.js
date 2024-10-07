import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import SlotReel from '../classes/SlotReel.js';

export default class Game extends Scene
{
    constructor() {
        super({ key: 'Game' });
        this.reels = [];
        this.symbols = ['cherry', 'cherry', 'bell']; // Available symbols
        this.isSpinning = false;
        this.results = [];
        this.reelsCount = 0;
        this.upSpeed = 10;
        this.isMovingUp = true; 
        this.moveStartTime = 0; 
        this.ReelItemCount=3;
    }
    preload() {
    }
    create() {  
        for (let i = 0; i < 3; i++) {
            let reel = new SlotReel(this, 200 + i * 300, 500, this.symbols,i, this.ReelItemCount);
            this.reels.push(reel);
        }
 /*
       let spinBtn =  document.querySelector('@button');
                   
        spinBtn.addEventListener('click', () => {
            if(!this.isSpinning){
                this.spinReels();
            }
        });*/
     
        this.resultText = this.add.text(10, 10, '', { fontSize: '20px', fill: '#FFF' });
    
    }

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
