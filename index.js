
const sliderProps = {
	fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
};


const slider = document.querySelector(".range__slider");
console.log(slider);

//length//


const sliderValue = document.querySelector(".length__title");
console.log(sliderValue);


//add eventlistner to fill and change value of text
slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
});
//Selecting the range input and passing it in the applyFill function
applyFill(slider.querySelector("input"));

//This function is responsible to create the setting fill
function applyFill(slider){
    const percentage =(100*(slider.value-slider.min))/(slider.max-slider.min);
    sliderValue.setAttribute("data-length",slider.value)
}
// Object of all the function names that we will use to create random letters of password//
const randomFunc = {
    lower : getRandomLower,
    upper:  getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols,
};

// Random more secure value
function secureMathRandom() {
	return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
}
//Gererator functions

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random *26)+97);

}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+ 65);
} 
 function getRandomNumber(){
    return String.fromCharCode(Math.floor(secureMathRandom()*10)+48);
 }   
 
 function getRandomSymbols(){
    const symbols = '~!@#$%^&*()_+{}":?<>;.,';
    return symbols[Math.floor(Math.random()*symbols.length)];
 }
 //selecting all the DOM element that are necessary
 
 // The viewbox where the result will the shown
 const resultEl =document.getElementById("result");
 console.log(resultEl);

 // The input slider ,will use to change the length of the password
  const lengthEl = document.getElementById("slider");

 // checkboxes representing the options the responsible to create  different type of password based on user
 const uppercaseEl = document.getElementById("uppercase");
 const lowercaseEl = document.getElementById("lowercase");
 const  numberEl = document.getElementById("number");
 const symbolEl = document.getElementById("symbol");
  

 //Button to generate the password
 const generateBtn = document.getElementById("generate");
 // Button to copy the text 
 const copyBtn = document.getElementById("copy-btn");
 //Result viewbox container
 const resultContainer =document.querySelector(".result");
 //Text info showed after gererate button is clicked
 const copyInfo =document.querySelector(".result_info.right")
   //Text appear after copy button is clicked
   const copiedInfo =document.querySelector(".result_info.left") 
 
// if this variable is trye only then the copyBtn will appear, i.e. when the user first click generate the copyBtn will interact.
let generatedPassword = false;

//Update CSS properties of the copy button
//Getting the bounds of the result viewbox container
let resultContainerBound = {
left: resultContainer.getBoundingClientRect().left,
top: resultContainer.getBoundingClientRect().top,

};
//This will update the position of the copy button based on mouse position
 resultContainer.addEventListener("mousemove", e =>{
    let resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
        
        };
        if(generatedPassword){
            copyBtn.style.opacity ='1';
            copyBtn.style.pointerEvents ='all';
            copyBtn.style.setProperty("--x,`${e.x-resultContainerBound.left}px`");
            copyBtn.style.setProperty("--y,`${e.y-resultContainerBound.top}px`");
        }else{
            copyBtn.style.opacity ='0';
            copyBtn.style.pointerEvents ='none';

        }
 });
window.addEventListener("resize",e=>{
    let resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
        
        };
});
//copy Password in clipboard
 copyBtn.addEventListener("click",() =>
{
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;
    if(!password || password == "CLICK GENERATE"){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
     document.execCommand("copy");
     textarea.remove();
       

     copyInfo.style.transForm ="translateY(200%)";
     copyInfo.style.opacity = "0";
     copiedInfo.style.transForm = "translateY(0%)";
     copiedInfo.style.opacity = "0.75";
});
   
// when we clicked Generate button Password is generated.

generateBtn.addEventListener("click", ()=>
{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper= uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    generatedPassword = true;
    resultEl.innerText = generatePassword(length , hasLower,hasUpper, hasNumber ,hasSymbol);
    copyInfo.style.transform = "translateY(0%)";
    copyInfo.style.opacity ="0.75";
    copiedInfo.style.transForm = "translateY(200%)";
    copiedInfo.style.opacity = "0";
});

// Function responsible to generate password and then returning it.
function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	if (typesCount === 0) {
		return "";
	}
	for (let i = 0; i < length; i++) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length)
									.split('').sort(() => Math.random() - 0.5)
									.join('');
}

// function that handles the checkboxes state, so at least one needs to be selected. The last checkbox will be disabled.
function disableOnlyCheckbox(){
	let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked)
	totalChecked.forEach(el => {
		if(totalChecked.length == 1){
			el.disabled = true;
		}else{
			el.disabled = false;
		}
	})
}

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
	el.addEventListener('click', () => {
		disableOnlyCheckbox()
	})
})