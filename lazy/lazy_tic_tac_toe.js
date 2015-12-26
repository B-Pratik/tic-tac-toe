"use strict";

const readLine = require('readline').createInterface({
	input : process.stdin,
	output : process.stdout
});
var gamePlay = [], winCheck = [], positionValues = [];
var limit = 3, whichPlayer = 0, playerOne = 0, playerTwo = 0;

 function printGamePlay() {
	 for (let i = 0; i < limit; i++) {
		 process.stdout.write("\t");
		 for(let j=0;j<limit;j++){
			 process.stdout.write(gamePlay[i][j]+" ");
		 }
		 console.log("\n");
	 }
	 console.log("\n");
	 if (whichPlayer >= limit * limit) {
		 readLine.close();
		 console.log("Its a Tie");
		 process.reallyExit();
	 }
 }
 
 function buildWinChecks(){
	 let ite=0,current=0;
	 for(let j=0;j<limit;j++){
		 ite= 0;
		 for(let i=0;i<limit;i++){
			 ite |= positionValues[current++];
		 }
		 winCheck.push(ite);
	 }
	 for(let j=0;j<limit;j++){
		 current = j,ite=0;
		 for(let i=0;i<limit;i++){
			 ite |= positionValues[current];
			 current += limit;
		 }
		 winCheck.push(ite);
	 }
	 current = 0,ite=0;
	 for(let j=0;j<limit;j++){
		 ite |= positionValues[current];
		 current += limit+1;
	 }
	 winCheck.push(ite);
	 ite= 0;
	 current = limit-1;
	 for(let j=0;j<limit;j++){
		 ite |= positionValues[current];
		 current += limit-1;
	 }
	 winCheck.push(ite);
 }

 function Init() {
	 function getLimit(cb){
		 readLine.question('Enter the value of n to play nxn tic-tac-toe?',
				 function(answer) {
			 return cb(answer);
		 });
	 }
	 return getLimit(function(val) {
		 let tmpLimit = Number(val);
		 if(isNaN(tmpLimit)){
			 console.log('Enter valid value for n');
			 return Init();
		 }else if(tmpLimit > 9 || tmpLimit < 3){
			 console.log('valid range for n is 3-9');
			 return Init();
		 }
		 readLine.pause();
		 limit = tmpLimit;
		 for (let i = 0; i < limit; i++) {
			 gamePlay[i] = [];
			 for (let j = 0; j < limit; j++) {
				 gamePlay[i][j] = "_";
			 }
		 }
		 if(true){
			 let tmpVal=1,ite=limit*limit;
			 for(let j=0;j<ite;j++){
				 positionValues.push(tmpVal);
				 tmpVal *= 2;
			 }
		 }
		 buildWinChecks();
		 printGamePlay();
		 return startGame();
	 });
 }

 function PutVal(i, j) {
	 if (gamePlay[i] && gamePlay[i][j]) {
		 if (gamePlay[i][j] !== "_") {
			 console.log("Already clicked");
			 printGamePlay();
		 } else {
			 let char,pointer=(i*limit)+j;
			 if(whichPlayer % 2 == 0 ){
				 char= "o";
				 playerOne |= positionValues[pointer];
			 }else{
				 char = "x";
				 playerTwo |= positionValues[pointer];
			 }
			 gamePlay[i][j] = char;
			 whichPlayer++;
			 printGamePlay();
			 checkWin();
		 }
	 } else {
		 console.log("Invalid Entry");
		 printGamePlay();
	 }
 } 	

 function checkWin() {
	 let currentPlayer = (whichPlayer % 2 == 0 ? playerTwo : playerOne);
	 if(winCheck.indexOf(currentPlayer)!==-1){
		 readLine.close();
		 let winner = (whichPlayer % 2 == 0 ? "Player 2" : "Player 1");
		 console.log("Winner is " + winner);
		 process.reallyExit();
	 }
 }

 function Play(val) {
	 PutVal(Number(val[0]) - 1, Number(val[1]) - 1);
 }

 function startGame(){
	 console.log("Player 1:o , Player 2:x");
	 console.log("Please Enter row column value to mark,ex. 11 for 1st row 1st column");
	 readLine.resume();
	 readLine.on('line', function(cmd) {
		 Play(cmd.replace(/[\D]/g, ""));
	 });
}
 
Init();