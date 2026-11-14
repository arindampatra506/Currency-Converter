const BASE_URL = "https://api.frankfurter.dev/v2/rate";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const formCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "form" && currCode ==="USD"){
      newOption.selected ="selected";
    } else if(select.name === "to" && currCode ==="INR"){
      newOption.selected ="selected";
    }
    select.append(newOption);
    //console.log(code, countryList[code]);
  }

//to change flag based on currency code
  select.addEventListener("change", (evt) => { 
    updateFlag(evt.target);
  });
}

const updateFlag = (element) =>{
  let currCode = element.value;
  //console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc =`https://flagsapi.com/${countryCode}/flat/64`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async(evt)=> {
  evt.preventDefault(); //by default, form will reload the page on submit, so we prevent that
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  //console.log(amtVal);
  if(amtVal === "" || amtVal <1){
    alert("Please enter a valid amount");
  }

  //fetch exchange rate and show it using API.

  //console.log(formCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${formCurr.value}/${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rate;
  //console.log(rate);

  let finalAmount = (amtVal * rate);
  msg.innerText = `${amtVal} ${formCurr.value} = ${finalAmount} ${toCurr.value}`;

  //msg.style.display = "block"; //to show the msg after click the button
});