const cars = ["SUZUKI", "DACIA", "SUBARU", "ASTON MARTIN", "SMART", "TESLA", "BUGATTI", "SAAB", "ROLLS ROYCE", "CITROEN", "RAM", "PORSCHE", "TOYOTA", "PONTIAC", "FERRARI", "NISSAN", "MITSUBISHI", "HUMMER", "MINI", "MERCEDES BENZ", "VOLKSWAGEN", "MAZDA", "ISUZU", "MASERATI", "LOTUS", "OPEL", "LEXUS", "SEAT", "LAND ROVER", "ACURA", "KIA", "JEEP", "KOENIGSEGG", "JAGUAR", "INFINITI", "HYUNDAI", "LAMBORGHINI", "HONDA", "MCLAREN", "FORD", "PAGANI", "FIAT", "DODGE", "CHRYSLER", "PEUGEOT", "CHEVROLET", "LANCIA", "CADILLAC", "VOLVO", "SKODA", "BMW", "RENAULT", "BENTLEY", "AUDI", "ALFA ROMEO"]
const countries = ["AFGHANISTAN","ALBANIA","ALGERIA","ANDORRA","ANGOLA","ANGUILLA","ARGENTINA","ARMENIA","AUSTRALIA","AUSTRIA","AZERBAIJAN","BAHAMAS","BAHRAIN","BANGLADESH","BARBADOS","BELARUS","BELGIUM","BELIZE","BENIN","BERMUDA","BHUTAN","BOLIVIA","BOSNIA AND HERZEGOVINA","BOTSWANA","BRAZIL","BRITISH VIRGIN ISLANDS","BRUNEI","BULGARIA","BURKINA FASO","BURUNDI","CAMBODIA","CAMEROON","CAPE VERDE","CAYMAN ISLANDS","CHAD","CHILE","CHINA","COLOMBIA","CONGO","COOK ISLANDS","COSTA RICA","CROATIA","CUBA","CYPRUS","CZECH REPUBLIC","DENMARK","DJIBOUTI","DOMINICA","DOMINICAN REPUBLIC","ECUADOR","EGYPT","EL SALVADOR","EQUATORIAL GUINEA","ESTONIA","ETHIOPIA","FALKLAND ISLANDS","FAROE ISLANDS","FIJI","FINLAND","FRANCE","FRENCH POLYNESIA","FRENCH WEST INDIES","GABON","GAMBIA","GEORGIA","GERMANY","GHANA","GIBRALTAR","GREECE","GREENLAND","GRENADA","GUAM","GUATEMALA","GUERNSEY","GUINEA","GUINEA BISSAU","GUYANA","HAITI","HONDURAS","HONG KONG","HUNGARY","ICELAND","INDIA","INDONESIA","IRAN","IRAQ","IRELAND","ISLE OF MAN","ISRAEL","ITALY","JAMAICA","JAPAN","JERSEY","JORDAN","KAZAKHSTAN","KENYA","KUWAIT","KYRGYZ REPUBLIC","LAOS","LATVIA","LEBANON","LESOTHO","LIBERIA","LIBYA","LIECHTENSTEIN","LITHUANIA","LUXEMBOURG","MACAU","MACEDONIA","MADAGASCAR","MALAWI","MALAYSIA","MALDIVES","MALI","MALTA","MAURITANIA","MAURITIUS","MEXICO","MOLDOVA","MONACO","MONGOLIA","MONTENEGRO","MONTSERRAT","MOROCCO","MOZAMBIQUE","NAMIBIA","NEPAL","NETHERLANDS","NETHERLANDS ANTILLES","NEW CALEDONIA","NEW ZEALAND","NICARAGUA","NIGER","NIGERIA","NORWAY","OMAN","PAKISTAN","PALESTINE","PANAMA","PAPUA NEW GUINEA","PARAGUAY","PERU","PHILIPPINES","POLAND","PORTUGAL","PUERTO RICO","QATAR","REUNION","ROMANIA","RUSSIA","RWANDA","SAINT PIERRE &AMP; MIQUELON","SAMOA","SAN MARINO","SAUDI ARABIA","SENEGAL","SERBIA","SEYCHELLES","SIERRA LEONE","SINGAPORE","SLOVAKIA","SLOVENIA","SOUTH AFRICA","SOUTH KOREA","SPAIN","SRI LANKA","ST VINCENT","ST LUCIA","SUDAN","SURINAME","SWAZILAND","SWEDEN","SWITZERLAND","SYRIA","TAIWAN","TAJIKISTAN","TANZANIA","THAILAND","TOGO","TONGA","TRINIDAD","TUNISIA","TURKEY","TURKMENISTAN","UGANDA","UKRAINE","UNITED ARAB EMIRATES","UNITED KINGDOM","URUGUAY","UZBEKISTAN","VENEZUELA","VIETNAM","VIRGIN ISLANDS","YEMEN","ZAMBIA","ZIMBABWE"];
let words = cars;
let lives = 8;
let word;
function pickWord(array) {
   return array[Math.floor(Math.random() * array.length)];
}

const carsVersionElem = document.querySelector('.cars');
const countriesVersionElem = document.querySelector('.countries');

carsVersionElem.addEventListener('click', () => {
   words = cars;
   if(!carsVersionElem.classList.contains("is-toggled")){
      carsVersionElem.classList.add("is-toggled");
      countriesVersionElem.classList.remove("is-toggled");
      newGame();
   }
})

countriesVersionElem.addEventListener('click', () => {
   words = countries;
   if(!countriesVersionElem.classList.contains("is-toggled")){
      countriesVersionElem.classList.add("is-toggled");
      carsVersionElem.classList.remove("is-toggled");
      newGame();
   }
})


function newGame() {
   lives = 8;
   word = pickWord(words);
   loadWord();
   loadAlphabet();
   updateLives();
   guessedLetters = []
   updateAlphabet();
}

document.querySelector('.start-game')
   .addEventListener('click', () => {   
      newGame();
})

function loadWord() {
   let wordToChar = word.split('');
   const charsDiv = document.querySelector('.chars');
   charsDiv.innerHTML = '';
   wordToChar.forEach((char, index) => {
      let charElem = document.createElement("p");
      if (char == " ") {
         charElem.classList.add('dash');
         charElem.textContent = "-";
      } else {
         charElem.classList.add('letter')
         charElem.textContent = char;
      }
      charsDiv.appendChild(charElem);
   })
}

let guessedLetters = [];

function loadAlphabet() {
   const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   const alphabetDiv = document.querySelector('.alphabet');
   alphabetDiv.innerHTML = '';
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
         if (guessedSet.has(alphabetLetter.textContent)) {
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
   if (letterArray.every(letter => letter.classList.contains('show')) && lives != 0) {
      setTimeout(() => {
         alert('You won');
         newGame();
      }, 90)
   }
}

function reduceLives() {
   if (!word.includes(guessedLetters[guessedLetters.length - 1])) {
      lives--;
      updateLives();
      console.log(lives);
   }
   if (lives < 3) {
      let x = document.createElement('span');
      x.innerText = lives;
      x.classList.add('critical');
      document.querySelector('.lives').innerHTML = `Lives: ` + x.outerHTML;
   }

   if (lives == 0) {
      document.querySelectorAll('.letter').forEach(letter => {
         letter.classList.add('show');

      })
      setTimeout(() => { 
         alert('You lost');
         newGame();
      }, 90)
   
   }
}

function updateLives() {
   document.querySelector('.lives').innerHTML = `Lives: ${lives}`
}
