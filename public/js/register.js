var 
    nameForm = document.getElementById("Name"),
    pwdForm  = document.getElementById("Password"),
    pwd1Form = document.getElementById("Password1"),
    bttn     = document.getElementById("Check_in");


var input = function() {
    const
        name = nameForm.value,
        pwd  = pwdForm.value,
        pwd1 = pwd1Form.value;
    if (pwd !== pwd1) return alert('passwords do not match');

    fetch(`users/${name}`)
    .then(res => {
        res.json();
    })
    .then(user => {
        if (user) {
            nameForm.value = '';
            alert('username taken');
        } else {
            let newUser = {
                name: name,
                password: pwd
            };
            console.log(newUser);
            return fetch(`users/`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newUser)
            })
        }
    })
    .then(res => res.json())
    .then(user => console.log(user))
}

bttn.addEventListener('click', input)