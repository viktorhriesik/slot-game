export default class SlotReel {

    constructor(scene, x, y, symbols,reelIndex,ReelItemCount) {
        this.ReelItemCount = ReelItemCount;
        this.reelIndex = reelIndex;
        this.scene = scene;
        this.symbols = symbols;
        this.startSymbols = [];
        this.currentIndexes = [];
        this.isSpinning = false;
        this.x = x;
        for (let i = 0; i < 3; i++) {
            let symbol = this.symbols[0];
            let sprite = this.scene.physics.add.sprite(x, this.scene.scale.height-80*(i+1)-(i*90), symbol).setDisplaySize(80, 80);  
            this.startSymbols.push(sprite);
            
        }
    }
    
    spin(duration,speed) {
        duration = duration+(this.reelIndex+1)*500;
        let startTime = Date.now();
        let lastSprite
        let symbol;
        let combCount = 0;

        this.startSymbols.forEach(s => {
            s.setVelocityY(speed); 
            lastSprite=s;
        });

        let interval = setInterval(() => {
            
            if (Date.now() - startTime >= duration-1000) {
               
               symbol = this.symbols[0];
               if(lastSprite.y>150){
                lastSprite = this.scene.physics.add.sprite(this.x, this.scene.scale.height-80*(3+1)-(2*90), symbol).setDisplaySize(150, 150);  
                //lastSprite.setVelocityY(speed);
                this.moveToPosition(lastSprite, this.x, this.scene.scale.height-80*(combCount+1)-(combCount*90), speed)
                this.startSymbols[combCount] = lastSprite; 
                combCount++;
                }
               
               if(combCount===3){
                clearInterval(interval);
               }
            }else{
                symbol = this.symbols[Phaser.Math.Between(0, this.symbols.length - 1)];
                if(lastSprite.y>150){
                    lastSprite = this.scene.physics.add.sprite(this.x, this.scene.scale.height-80*(3+1)-(2*90), symbol).setDisplaySize(150, 150);  
                    lastSprite.setVelocityY(speed); 
                    this.destroySpriteWithDelay(lastSprite);
                }
            }
        }, 10);
        this.scene.isSpinning=false;
        console.log("Sprites:"+this.scene.children.list.filter(child => child instanceof Phaser.GameObjects.Sprite).length);
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
        this.scene.time.delayedCall(200, () => {
            sprite.destroy();
        });
    }
    getResult() {  
    }   
}
