const nameinput = document.getElementById('name'); 
const ageinput=document.getElementById('age')
const sendbtn = document.getElementById('send'); 
const result=document.getElementById('result');

sendbtn.addEventListener('click', async () => { 
    console.log('javaScript is Running'); 
    
    const name = nameinput.value; 
    const age=ageinput.value
    console.log(name); 
    console.log(age);
    const response = await fetch('http://localhost:3000/name', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({

             name: name,
             age:(age)
             }) 
    }); 

    // Text response chahiye ho to isse use karein:
    // const data = await response.text(); 
    // console.log(data); 

    // JSON response ke liye:
    const resbackend = await response.json(); 
    console.log(resbackend); 

    // Backend ke Data ko Actual Screen par Show karne ka tareeka.
     
    result.innerHTML = `
    <h2>Hello ${resbackend.name}</h2>
    <p>Current Age: ${resbackend.age}</p>
    <p>Next Age: ${resbackend.nextage}</p>
    <p>Double Age: ${resbackend.doubleage}</p>
`;
    
});
