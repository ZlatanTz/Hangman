


const cars = ["SUZUKI", "DACIA", "SUBARU", "ASTONMARTIN", "SMART", "TESLA", "BUGATTI", "SAAB", "ROLLSROYCE", "CITROEN", "RAM", "PORSCHE", "TOYOTA", "PONTIAC", "FERRARI", "NISSAN", "MITSUBISHI", "HUMMER", "MINI", "MERCEDESBENZ", "VOLKSWAGEN", "MAZDA", "ISUZU", "MASERATI", "LOTUS", "OPEL", "LEXUS", "SEAT", "LANDROVER", "ACURA", "KIA", "JEEP", "KOENIGSEGG", "JAGUAR", "INFINITI", "HYUNDAI", "LAMBORGHINI", "HONDA", "MCLAREN", "FORD", "PAGANI", "FIAT", "DODGE", "CHRYSLER", "PEUGEOT", "CHEVROLET", "LANCIA", "CADILLAC", "VOLVO", "SKODA", "BMW", "RENAULT", "BENTLEY", "AUDI", "ALFAROMEO"]
let lives = 8;
let car;
function pickCar(array) {
   return array[Math.floor(Math.random() * cars.length - 1)];
}


function newGame() {
   lives = 8;
   car = pickCar(cars);
   loadWord();
   loadAlphabet();
   updateLives();
   guessedLetters = []
   updateAlphabet()
}





document.querySelector('.start-game')
   .addEventListener('click', () => {   
      newGame()
})



function loadWord() {
   lives = 8;
   let carToChar = car.split('');
   const charsDiv = document.querySelector('.chars');
   charsDiv.innerHTML = '';
   carToChar.forEach((char, index) => {
      let charElem = document.createElement("p");
      charElem.classList.add('letter')
      charElem.textContent = char;
      charsDiv.appendChild(charElem)
   })
}

let guessedLetters = []
function loadAlphabet(){
   const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   const alphabetDiv = document.querySelector('.alphabet')
   alphabetDiv.innerHTML = ''
   alphabet.forEach(letter => {
      let letterElem = document.createElement("button");
      letterElem.classList.add('alphabet-letter')
      letterElem.textContent = letter;
      alphabetDiv.appendChild(letterElem);
      letterElem.addEventListener('click', clickHandler);
   }) 
}

function clickHandler(event) {
   updateLives();
   guessedLetters.push(event.target.textContent);
   updateGuessedLetters();
   reduceLives();
   foundWord();
   updateAlphabet();
   event.target.removeEventListener('click', clickHandler);
}

function updateAlphabet() {
   const guessedSet = new Set(guessedLetters);
   document.querySelectorAll('.alphabet-letter')
      .forEach(alphabetLetter => {
         if(guessedSet.has(alphabetLetter.textContent)){
            alphabetLetter.classList.add('clicked');
         }
      })
}

function updateGuessedLetters() {
   const guessedSet = new Set(guessedLetters);
   document.querySelectorAll('.letter')
      .forEach(letter => {
         if (guessedSet.has(letter.textContent)) {
            letter.classList.add('show');
            
         }
   })

}

function foundWord() {
   const letterArray = Array.from(document.querySelectorAll('.letter'));
   if (letterArray.every(letter => letter.classList.contains('show'))) {
      setTimeout(() => {
         alert('You won');
         newGame();}
         , 90)
   }
}


function reduceLives() {
   if(!car.includes(guessedLetters[guessedLetters.length - 1])){
      lives--;
      updateLives()
      console.log(lives);
   }
   if(lives < 3){
      let x = document.createElement('span')
      x.innerText = lives;
      x.classList.add('critical')
      document.querySelector('.lives').innerHTML = `Lives: ` + x.outerHTML;
   }

   if(lives == 0){
      setTimeout(() => { 
         alert('You lost')
         newGame();}
         ,90)
     
   }
}

function updateLives() {
   document.querySelector('.lives').innerHTML = `Lives: ${lives}`
}

// // testing