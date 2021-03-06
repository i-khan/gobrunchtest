const optionButton= document.getElementById('option-div');
const quantity_input = document.getElementById('quantity');
const pageNumber = document.getElementById('page-number');
const forwardButton=document.getElementById('forward-button');
const backwardButton = document.getElementById('backward-button');
const greeting=document.getElementById('greeting');
const midDiv=document.getElementById('middle-container');
const newList= document.getElementById("option-list");

let allowedDivs=3;
let firstPage=1;
let currentSelection = "A";
let currentPage = firstPage;
let lastPage = firstPage;


quantity_input.addEventListener('change', ()=>{
    currentPage=1;
    lastPage=Math.ceil(quantity_input.value/3);
    renderCurrentPage(currentPage);
})


forwardButton.addEventListener('click', ()=>{
    if(currentPage<lastPage){
        currentPage++;
        renderCurrentPage(currentPage);
    }
})


backwardButton.addEventListener('click', ()=>{
    if(currentPage>1){
        currentPage--;
        renderCurrentPage(currentPage);
    }
})


optionButton.addEventListener('click', ()=>{
    midDiv.classList.remove('mid-div');
    midDiv.classList.add('mid-div-clicked');
    
    newList.addEventListener('change', ()=>{
        greeting.innerText=event.target.value;
        currentSelection = event.target.value;
        renderCurrentPage(currentPage);
        midDiv.style.animationName="slide-left";
       
        midDiv.addEventListener('animationend', ()=>{
            midDiv.classList.add('mid-div');
            midDiv.classList.remove('mid-div-clicked');
            midDiv.style.animationName="";
        }, {
            once:true
        })
    })
})


renderCurrentPage=(currentPage) => {
    deletePreviousDivs();
    
    pageNumber.innerText="Current Page: "+currentPage;
    let rightContainer = document.querySelector('.dynamic-div-container');
    let block_number=(currentPage-firstPage)*allowedDivs+firstPage;
    
    for(let i=1;i<=allowedDivs && block_number<=quantity_input.value;i++){
        newDiv = createDiv(block_number, currentSelection, i);
        rightContainer.appendChild(newDiv);
        block_number++;
    }
}


deletePreviousDivs=() => {
    const all_div_generated = document.querySelectorAll('.div-generated');

    for(let i=0;i<all_div_generated.length;i++){
        all_div_generated[i].parentNode.removeChild(all_div_generated[i]);
    }
}


createDiv = (divNumberGlobal, divPageID, divNumberLocal) => {
    let newDiv=document.createElement('div');
    let newNumberDiv=document.createElement('div');
    let divHeading=document.createElement('h3');
    let diskHeading=document.createElement('h4');
    let diskHeadingContent=document.createTextNode(divNumberGlobal);
    let headingContent=document.createTextNode("ITEM " + divPageID+ divNumberLocal);

    divHeading.appendChild(headingContent);
    diskHeading.appendChild(diskHeadingContent);
    newNumberDiv.appendChild(diskHeading);
    newDiv.appendChild(newNumberDiv);
    newDiv.appendChild(divHeading);

    newDiv.classList.add('div-generated');
    newNumberDiv.classList.add('disk-number');
    divHeading.classList.add('text-div'); 
    
    return newDiv;
}


createOptionList=(optionArray) => {
    const newList=document.createElement('select');
    for(let i=0;i<optionArray.length;i++){
        let option = document.createElement("option");
        option.setAttribute("value", optionArray[i]);
        let text=document.createTextNode(optionArray[i]);
        option.appendChild(text);
        newList.appendChild(option);
    }

    return newList;
}