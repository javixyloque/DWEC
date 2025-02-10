


const res = await fetch("http://localhost:3000/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": 'admin', "password": 'adminpassword' }),

})

const {token} = await res.json();


const resObj = await fetch("http://localhost:3000/objects", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    
})

const objects = await resObj.json();

console.log(token);
console.log(objects);