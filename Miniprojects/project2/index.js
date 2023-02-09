let nav = document.getElementById('nav');
let navPos = nav.offsetTop;
const ap = document.querySelector('.ap-content');
const userAmount = 2;
let portopen = false;

window.addEventListener('scroll', function(){
    if (window.pageYOffset > navPos) {
        nav.classList.add('stickynav');
    } else {
        nav.classList.remove('stickynav');
    }
})

function makeUserCard(user) {
    let cont = document.createElement('div');
    cont.classList.add('card');
    
    let top = document.createElement('div');
    top.classList.add('card-top');
    
    let ctImgWrapper = document.createElement('div');
    ctImgWrapper.classList.add('ct-img-wrapper');
    
    let ctImg = document.createElement('img');
    ctImg.src = user.picture.large;
    
    
    let bottom = document.createElement('div');
    bottom.classList.add('card-bottom');

    let name = document.createElement('p');
    name.classList.add('cb-name');
    name.innerText = `${user.name.first} ${user.name.last}`
    
    let ageNgender = document.createElement('div');
    ageNgender.classList.add('age&gender');

    let gender = document.createElement('p');
    gender.classList.add('cb-gender');
    gender.innerText = `${user.gender}`
    
    let email = document.createElement('p');
    email.classList.add('cb-email');
    email.innerText = `${user.email}`;
    
    let btn = document.createElement('a');
    btn.innerText = "read more";
    
    cont.appendChild(top);
    cont.appendChild(bottom);
    top.appendChild(ctImgWrapper);
    ctImgWrapper.appendChild(ctImg);
    bottom.appendChild(name);
    bottom.appendChild(ageNgender);
    ageNgender.appendChild(gender);
    ageNgender.appendChild(email);
    bottom.appendChild(btn);
    ap.appendChild(cont);
}

window.addEventListener('load', function(){

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://randomuser.me/api/?results=${userAmount}`, true);

    xhr.onload = function() {
        if(this.status === 200) {
            const response = JSON.parse(this.responseText);
            console.log(response.results)
            for (let i = 0; i < response.results.length; i++) {
                makeUserCard(response.results[i]);
            }
        }
    }

    xhr.send();

    // document.getElementById('name').innerText = 
})

function openPortfolioMenu() {
    if (portopen) {
        portopen = false;
        console.log('portfolio closed');
    } else {
        portopen = true;
        console.log('portfolio opened');
    }
}

var a = [1, 2, 3];

a[100] = 4;
console.log(a.length)