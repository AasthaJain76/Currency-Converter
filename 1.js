const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".To select");
let amount=document.querySelector(".input");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="From" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="To" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amountVal=amount.value;
    if(amountVal=="" || amountVal<1){
        amount.value=1;
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //ab url se data fetch karna hai
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
})