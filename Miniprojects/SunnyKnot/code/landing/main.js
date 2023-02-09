const nav = document.getElementById("nav");
const about1Top = document.getElementById("about-1").offsetTop - 150;
const about4Top = document.getElementById("about-4").offsetTop - 10;
const productsTop = document.getElementById("products").offsetTop - 150;
window.addEventListener("scroll", () => {
    
    if (window.scrollY > productsTop) {
        if (nav.classList.contains("nav-background-inactive")){
            nav.classList.add("nav-background-active")
            nav.classList.remove("nav-background-inactive")
        }
    } else if (window.scrollY > about4Top) {
        if (nav.classList.contains("nav-background-active")){
            nav.classList.add("nav-background-inactive")
            nav.classList.remove("nav-background-active")
        }
    } else if (window.scrollY > about1Top) {        
        if (nav.classList.contains("nav-background-inactive")){
            nav.classList.add("nav-background-active")
            nav.classList.remove("nav-background-inactive")
        }
    } else {
        nav.classList.add("nav-background-inactive")
        nav.classList.remove("nav-background-active")
    }
})