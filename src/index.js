

document.addEventListener("DOMContentLoaded",function(e){
    

    const filterDiv= document.getElementById("good-dog-filter");
    const dogbar=document.getElementById("dog-bar")
    // use filter set as true 
    let filterOnOff;

    // need to storage for the filter for good dog 
    let storage;
    getDogs();



    document.addEventListener('click',function (e){

        if(e.target.className==="span-dog"){
            return getSingleDog(e)
        }
        else if(e.target.className==="dog-button"){
            return updateDog(e)
        }
        else if (e.target===filterDiv){
            if(filterOnOff){
                filterOnOff=false
                e.target.innerText="Filter good dogs: ON"
                return filterDogs()
            }
            else{
                filterOnOff=true
                e.target.innerText="Filter good dogs: OFF";
                // return getDogs();
                return getDogs()
            }
        }
        
    })



//All Functions start here

function getDogs(){
    fetch('http://localhost:3000/pups')
    .then(resp=>resp.json())
    .then(function (json){
        storage=json
       return displayDogs(json)
    
    })
};



function displayDogs(json){
    //  set it to empty string (reset the html under dogbar) so you won't show the HTML twice in index.html
    dogbar.innerHTML=""
    
    json.forEach(dogs =>{
        dogbar.innerHTML+=`
        <span data-id=${dogs.id} class="span-dog"> ${dogs.name}</span>`
        
    })

}


function getSingleDog(dog){
    fetch(`http://localhost:3000/pups/${dog.target.dataset.id}`)
    .then(resp => resp.json())
    .then(json => displaySingleDog(json))
}


function displaySingleDog(dog){
    const doginfo=document.getElementById("dog-info")

    doginfo.innerHTML=`
    <img src= ${dog.image}>
    <h2>${dog.name}</h2>
    <button id=${dog.id} class="dog-button">${dog.isGoodDog?"Good":"Bad"} Dog!</button>
    `
}


function updateDog(dog){
    let newValue=false;
    dog.target.innerText.charAt(0)==="G"?
    newValue : newValue=true;

    fetch(`http://localhost:3000/pups/${dog.target.id}`,{
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json" 
        },
        body: JSON.stringify({'isGoodDog':newValue})
    })
    .then(resp => resp.json())
    .then(dog=>displaySingleDog(dog))

}


function filterDogs(){
//  set it to empty string (reset the html) you dont want to show the HTML twice on index.html
    dogbar.innerHTML="";

return storage.forEach(dog=>{
    if(dog.isGoodDog== true){
        // console.log(dog.isGoodDog);
        dogbar.innerHTML+=`<span data-id=${dog.id}
        class="span-dog"> ${dog.name}</span>`;
        }
    })
} 




})