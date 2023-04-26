const array = [];
const renderArray = [];

const arraylengthinput = document.getElementById("arraylengthinput");
const vs = document.getElementById("vs-root");
document.getElementById("bubbleBtn").addEventListener('pointerdown', () => bubbleSortStarter())
// document.getElementById("insertionBtn").addEventListener('pointerdown', () => insertionSortStarter())
// document.getElementById("mergeBtn").addEventListener('pointerdown', () => mergeSortStarter())
// document.getElementById("quickBtn").addEventListener('pointerdown', () => quickSortStarter())

function fillArray() {
    if (arraylengthinput.value > 2 && arraylengthinput.value < 100) {
        arraylengthinput.style = 'background-color: #fff;'
        for(let i = 0; i < arraylengthinput.value; i++) {
            const value = Math.floor(Math.random() * 100);
            array.push(value);
        }
    } else {
        arraylengthinput.style = 'background-color: #f99;'
    }

}

function generateColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    const rgb = `rgb(${r}, ${g}, ${b})`
    return rgb;
}

function bubbleSortStarter() {
    while(array.length > 0) {
        array.pop()
    }
    while(renderArray.length > 0) {
        renderArray.pop()
    }
    console.log(array)
    console.log(renderArray)
    console.log("bubble")
    if (array.length === 0) {
        fillArray()
        generateVisuals()
        bubbleSort()
        renderVisuals(0);
    }
}

function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j + 1] < array[j]) {
                [array[j + 1],array[j]] = [array[j],array[j + 1]]
                renderArray.push(JSON.stringify(array))
            }
        }
    }
}

function insertionSortStarter() {
    console.log("insertion")
    fillArray()
    generateVisuals()

}

function mergeSortStarter() {
    console.log("merge")
    fillArray()
    generateVisuals()

}

function quickSortStarter() {
    console.log("quick")
    fillArray()
    generateVisuals()
}

function generateVisuals() {
    array.forEach((piece) => {
        const li = document.createElement("li");
        li.id = `${piece}`
        li.style = `--height: ${piece}%; --bg: ${generateColor()};`
        vs.append(li)
    })
}

function renderVisuals(i) {
    if (i < renderArray.length) {
        updateVisuals(JSON.parse(renderArray[i]))
    
        setTimeout(() => {
            renderVisuals(i + 1)
        }, 50)
    } else {
        return
    }
}

function updateVisuals(arr) {
    const elements = []
    arr.forEach(piece => {
        const currli = document.getElementById(`${piece}`)
        elements.push(currli);
    })
    elements.forEach(piece => {
        vs.append(piece)
    })
}