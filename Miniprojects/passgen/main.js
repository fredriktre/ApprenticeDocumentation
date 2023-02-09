const passwordCont = document.getElementById('passcont');
const lengthnum = document.getElementById('lengthnum');
const amountnum = document.getElementById('amountnum');

function generatePassword() {
    while (passwordCont.firstChild){
        passwordCont.removeChild(passwordCont.firstChild);
    }

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '#', '&'];

    for (let i = 0; i < amountnum.value; i++) {    
        let password = "";
        let numTime = 0;    
        for (let j = 0; j < lengthnum.value; j++) {
            const random = Math.floor(Math.random() * 38);
            if (numTime < 3) {
                if (random > 9) {
                    password += `${alphabet[random - 9]}`
                } else {
                    password += `${random}`
                }
            } else {
                password += `${random}`
                numTime = 0;
            }
            numTime++;
        }
        let li = document.createElement('li');
        let p = document.createElement('p')
        p.innerText = password;
        li.appendChild(p);
        passwordCont.appendChild(li);
    }

}