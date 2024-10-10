import ResultCalc from '../classes/ResultCalculator.js';

export default class SlotReel {

    constructor(scene, RowCount, symbols,reelIndex,ReelItemCount) {
        this.RowCount = RowCount;
        this.ReelItemCount = ReelItemCount;
        this.reelIndex = reelIndex;
        this.scene = scene;
        this.symbols = symbols;
        this.startSymbols = [];
        this.currentIndexes = [];
        this.isSpinning = false;
        this.stopCombinationSymbols = [];
        this.spriteSize = this.scene.scale.width/(this.ReelItemCount*2);
        console.log("width:"+this.scene.scale.width);
        this.startingX = this.scene.scale.width/(RowCount+1);
        this.startingY = this.scene.scale.height-this.scene.scale.height/(this.ReelItemCount+2);
        
        for (let i = 0; i < ReelItemCount; i++) {
            console.log(this.startingX);
            let symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            let sprite = this.scene.physics.add.sprite(this.startingX+this.reelIndex*this.spriteSize,this.startingY-i*this.spriteSize-20, symbol).setDisplaySize(this.spriteSize, this.spriteSize);
            this.startSymbols.push(sprite);
        }

        }
    
    spin(duration,speed) {
        duration = duration+(this.reelIndex+1)*500;
        let startTime = Date.now();
        let lastSprite
        let symbol;
        let combCount = 0;
        this.speed = speed;
        this.doneSpinning=false;
        this.stopCombinationSymbols = ResultCalc.generateSymbols(this.ReelItemCount);
        //console.log("comb:"+this.stopCombinationSymbols);
        this.startSymbols.forEach(s => {
            s.setVelocityY(speed); 
            lastSprite=s;
        });

        let interval = setInterval(() => {
            
            if (Date.now() - startTime >= duration-2000) {
               //this.scene.isSpinning=true;
               symbol = this.stopCombinationSymbols[combCount];
               if(lastSprite.y>150){
                lastSprite = this.scene.physics.add.sprite(this.startingX+this.reelIndex*this.spriteSize,-this.spriteSize, symbol).setDisplaySize(150, 150); 
                //console.log("last");
                this.moveToPosition(lastSprite, this.startingX+this.reelIndex*this.spriteSize,this.startingY-combCount*this.spriteSize-20, speed)
                this.startSymbols[combCount] = lastSprite; 
                combCount++;
                }
               
               if(combCount===3){
               this.scene.results.push(this.stopCombinationSymbols);
                if(this.reelIndex+1===this.RowCount){
                    this.scene.isSpinning=false;
                    this.scene.calculateResults();
                }
                
                clearInterval(interval);
               }
            }else{
                symbol = this.symbols[Phaser.Math.Between(0, this.symbols.length - 1)];
                if(lastSprite.y>=0){
                    lastSprite = this.scene.physics.add.sprite(this.startingX+this.reelIndex*this.spriteSize,-this.spriteSize, symbol).setDisplaySize(150, 150);  
                    lastSprite.setVelocityY(speed); 
                    this.destroySpriteWithDelay(lastSprite);
                }
            }
            //return true;
        }, 10);
       
       // this.scene.isSpinning=false;
       // console.log("Sprites:"+this.scene.children.list.filter(child => child instanceof Phaser.GameObjects.Sprite).length);
    }
    moveToPosition(gameObject, targetX, targetY, speed) {
        let distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, targetX, targetY);
        let duration = (distance / speed) * 1000; 
        this.scene.tweens.add({
            targets: gameObject,
            x: targetX,
            y: targetY,
            duration: duration,
            ease: 'Linear'
        });
    }
    destroySpriteWithDelay(sprite) {
        this.scene.time.delayedCall(50000, () => {
            sprite.destroy();
        });
    }
    getResult() {  
    }   
}
