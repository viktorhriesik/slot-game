import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import SlotReel from '../classes/SlotReel.js';
import ResultCalc from '../classes/ResultCalculator.js';


export default class Game extends Scene
{
    constructor() {
        super({ key: 'Game' });
        this.reels = [];
        this.symbols = ResultCalc.symbols; // Available symbols
        this.isSpinning = false;
        this.results = [];
        this.reelsCount = 0;
        this.upSpeed = 10;
        this.isMovingUp = true; 
        this.moveStartTime = 0; 
        this.ReelItemCount=3;
        this.RowCount = 5;
        this.balance = 1000;
        this.bet = 10;
    }
    preload() {
    }
    create() {  
        const border = this.add.image(0, 0, 'border').setOrigin(0, 0);
        border.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        border.setDepth(1);

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5); 
        graphics.fillRect(20, 0, this.cameras.main.width-40, this.cameras.main.height);

        for (let i = 0; i < this.RowCount; i++) {
            let reel = new SlotReel(this, this.RowCount, this.symbols,i, this.ReelItemCount);
            this.reels.push(reel);
        }

        let gameBar = document.getElementById("game-nav-bar");
        gameBar.style.visibility ='visible';

        let spinBtn =  document.getElementById('spin_btn');
                   
        spinBtn.addEventListener('click', () => {
            if(this.isSpinning===false && this.balance-this.bet>=0){
               this.isSpinning=true;
               this.balance = this.balance-this.bet;
               document.getElementById("balance_txt").innerText="Balance: "+this.balance +"$";
                for (let i = 0; i < this.reels.length; i++) {
                    document.getElementById("game_status").innerText="Spinning!";
                    this.reels[i].spin(800,3000); 
                }
            }
        });
        let plusBtn =  document.getElementById('plus_btn');
        plusBtn.addEventListener('click', () => {
            this.bet = this.bet+10;
            document.getElementById("bet_txt").innerText="Bet: "+this.bet +"$";
        })
        let minusBtn =  document.getElementById('minus_btn');
        minusBtn.addEventListener('click', () => {
            if(this.bet-10>=1){
                this.bet = this.bet-10;
                document.getElementById("bet_txt").innerText="Bet: "+this.bet +"$";
            }
        })
    }

    calculateResults(){
        
        let A_count = this.countSymbolCount('A');
        let K_count = this.countSymbolCount('K');
        let Q_count = this.countSymbolCount('Q');
        let T10_count = this.countSymbolCount('10');
        let scarab_count = this.countSymbolCount('scarab');
        let statue_count = this.countSymbolCount('statue');
        let msg = "";

        //book 
        let book_count = 0;
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].includes("book")){
                book_count++;
            }
        };


        if(A_count===3 || K_count===3){
            this.balance = this.balance + this.bet * ResultCalc.AK_leverages[0];
            msg+="3xAK, You won: "+ this.bet * ResultCalc.AK_leverages[0];
        }else if(A_count===4 || K_count===4){
            this.balance = this.balance + this.bet * ResultCalc.AK_leverages[1];
            msg+="4xAK, You won: "+ this.bet * ResultCalc.AK_leverages[1];
        }else if(A_count===5 || K_count===5){
            this.balance = this.balance + this.bet * ResultCalc.AK_leverages[2];
            msg+="5xAK, You won: "+ this.bet * ResultCalc.AK_leverages[2];
        }

        if(Q_count===3 || T10_count===3){
            this.balance = this.balance + this.bet * ResultCalc.Q10_leverages[0];
            msg+="3xQ10, You won: "+ this.bet * ResultCalc.Q10_leverages[0];
        }else if(Q_count===4 || T10_count===4){
            this.balance = this.balance + this.bet * ResultCalc.Q10_leverages[1];
            msg+="4xQ10, You won: "+ this.bet * ResultCalc.Q10_leverages[1];
        }else if(Q_count===5 || T10_count===5){
            this.balance = this.balance + this.bet * ResultCalc.Q10_leverages[2];
            msg+="5xQ10, You won: "+ this.bet * ResultCalc.Q10_leverages[2];
        }

        if(scarab_count===2 || statue_count===2){
            this.balance = this.balance + this.bet * ResultCalc.statueScarab_leverages[0];
            msg+="PharaohStatue, You won: "+ this.bet * ResultCalc.statueScarab_leverages[0];
        }else if(scarab_count===3 || statue_count===3){
            this.balance = this.balance + this.bet * ResultCalc.statueScarab_leverages[0];
            msg+="PharaohStatue, You won: "+ this.bet * ResultCalc.statueScarab_leverages[0];
        }else if(scarab_count===4 || statue_count===4){
            this.balance = this.balance + this.bet * ResultCalc.statueScarab_leverages[1];
            msg+="PharaohStatue, You won: "+ this.bet * ResultCalc.statueScarab_leverages[1];
        }else if(scarab_count===5 || statue_count===5){
            this.balance = this.balance + this.bet * ResultCalc.statueScarab_leverages[2];
            msg+="PharaohStatue, You won: "+ this.bet * ResultCalc.statueScarab_leverages[2];
        }

        if(book_count===3){
            this.balance = this.balance + this.bet * ResultCalc.book_leverages[0];
            msg+="3xbook, You won: "+ this.bet * ResultCalc.book_leverages[0];
        }else if(book_count===4){
            this.balance = this.balance + this.bet * ResultCalc.book_leverages[1];
            msg+="4xbook, You won: "+ this.bet * ResultCalc.book_leverages[1];
        }else if(book_count===5){
            this.balance = this.balance + this.bet * ResultCalc.book_leverages[2];
            msg+="5xbook, You won: "+ this.bet * ResultCalc.book_leverages[2];
        }

        document.getElementById("game_status").innerText=msg;
        document.getElementById("balance_txt").innerText="Balance: "+this.balance +"$";
        this.results.length = 0;
    }

    countSymbolCount(symbol){
        let count = 0;
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].includes(symbol)){
                count++;
            }
            else{
                break;
            }
        };
        return count;
    }
    changeScene ()
    {
        this.scene.start('MainMenu');
    }

    
}
