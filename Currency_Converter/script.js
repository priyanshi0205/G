const URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
const Drops=document.querySelectorAll (".dropDown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");

for(let select of Drops){
    for(currencyCode in countryList){
     const newOpt=document.createElement("option");
     newOpt.innerText=currencyCode;                            // Displaying the selected Options from the countryList
     newOpt.value=currencyCode;
     if(select.name==="from" && currencyCode==="USD"){
        newOpt.selected=selected;
     }
     else if(select.name==="to" && currencyCode==="INR"){
        newOpt.selected=selected;
     }
     select.append(newOpt);            //Adding all the countries in the Selectbox
    }
    select.addEventListener("change",(evt)=>{
    upadateFlag(evt.target);                 
    });
}
const upadateFlag=(elem)=>{                //Updating the Flag According to the Country Code
    const currCode=elem.value;
    const countryCode=countryList[currCode];
    let newImg=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = elem.parentElement.querySelector("img");
     img.src = newImg;
}
btn.addEventListener("click",async (evt)=>{
evt.preventDefault();                          // Prevents the default behaviour like refreshing the page when not even needed
let amount=document.querySelector(".amount input");
let amountVal=amount.value;
 
if(amountVal=="" || amountVal<1){
    amountVal=1;
    amount.value="1";
}


const getURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response=await fetch(getURL);
let data=await response.json();
let rate=data[toCurr.value.toLowerCase()];
let finalAmount=rate*amountVal;
msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;   //Displays the converted Currency
})