export default class ResultCalc{
    static combination;
    static spinnigSprites;

    static symbols = ['A', 'K','10','Q', 'statue','scarab','pharaoh','book','symbol'];
    static weights = [25, , 20, 20, 20,10, 10, 10, 15, 5];

    static AK_leverages = [0.5,4,15];
    static Q10_leverages = [0.5,2.5,10];
    static statueScarab_leverages = [0.5,3,10,75];
    static pharaoh_leverages = [0.5,4,40,200];
    static book_leverages = [2,20,200];
    
    constructor(scene, symbols, reels) {
        this.scene = scene;
        this.symbols = symbols;
        this.reels = reels;

        this.combination  = [[0,0,0],[1,1,1],[2,2,2]];
    }

    static calc_combination(){
        this.combination  = [[1,1,1],
                    [1,1,1],    
                    [1,1,1]];
        console.log(this.combination);
    }
    static getRandomSymbol(exclude = []) {
        let availableSymbols = this.symbols.filter(sym => !exclude.includes(sym));
        let availableWeights = this.weights.filter((_, index) => !exclude.includes(this.symbols[index]));
    
        let totalWeight = availableWeights.reduce((total, weight) => total + weight, 0);
        let randomNum = Math.random() * totalWeight;
    
        for (let i = 0; i < availableSymbols.length; i++) {
          if (randomNum < availableWeights[i]) {
            return availableSymbols[i];
          }
          randomNum -= availableWeights[i];
        }
      }
    static generateSymbols(symbolsCount){
        let result = [];
        let excludeDuplicate = [];
        while (result.length < symbolsCount) {
            if(result.includes('book')) excludeDuplicate.push('book');
            if(result.includes('pharaoh')) excludeDuplicate.push('pharaoh');
            if(result.includes('symbol')) excludeDuplicate.push('symbol');

            let newSymbol = this.getRandomSymbol(excludeDuplicate); // Exclude already selected symbols
            result.push(newSymbol);
        }
        return result;
    }  

}