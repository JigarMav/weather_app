console.log("Hello");

const weatherForm = document.querySelector('.search-field')
const searchData = document.querySelector('input')
const msg1 = document.querySelector('.msg1')
const msg2 = document.querySelector('.msg2')


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const addr = searchData.value;

    msg1.textContent = "Loading ....";
    msg2.textContent = '....';
    if(addr){
        fetch("http://localhost:3000/weather?address="+addr)
.then((response)=>{
    response.json().then(result=>{  
        if(result.error)
        {       
            msg1.textContent = result.error;
        }
        else
        {
            msg1.textContent = result.forecast;
            msg2.textContent = result.location;
            console.log(result.location);
            console.log(result.forecast);
        }
        
    }).catch(err=>console.log(err));
    
})
.catch(err=>console.log(err));
    }
})