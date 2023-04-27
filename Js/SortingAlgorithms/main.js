const array = [];
const currentElements = [];
const renderArray = [];

const arraylengthinput = document.getElementById("arraylengthinput");
const arrayspeedinput = document.getElementById("arrayspeedinput");
const vs = document.getElementById("vs-root");
document.getElementById("bubbleBtn").addEventListener('pointerdown', () => bubbleSortStarter())
document.getElementById("insertionBtn").addEventListener('pointerdown', () => insertionSortStarter())
document.getElementById("mergeBtn").addEventListener('pointerdown', () => mergeSortStarter())
// document.getElementById("quickBtn").addEventListener('pointerdown', () => quickSortStarter())

function fillArray() {
    if (arraylengthinput.value > 2 && arraylengthinput.value <= 100) {
        arraylengthinput.style = 'background-color: #fff;'
        for(let i = 0; i < arraylengthinput.value; i++) {
            let value = Math.floor(Math.random() * 100);
            let willPush = true;
            array.forEach(piece => {
                if (piece === value) {
                    i--;
                    willPush = false;
                }
            })
            if (willPush != false) {
                array.push(value);
            }
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
    console.log("bubble")

    let i = 0;
    let child = vs.lastElementChild;
    while(child) {
        vs.removeChild(child);
        child = vs.lastElementChild
    }
    while(array.length > 0) {
        array.pop()
    }
    while(renderArray.length > 0) {
        renderArray.pop()
    }
    while(currentElements.length > 0) {
        currentElements.pop()
    }
    if (array.length === 0) {
        fillArray()
        generateVisuals()
        bubbleSort()
        updateVisuals(0, arrayspeedinput.value);
        console.log(renderArray);
    }
}

function insertionSortStarter() {
    console.log("insertion")

    let i = 0;
    let child = vs.lastElementChild;
    while(child) {
        vs.removeChild(child);
        child = vs.lastElementChild
    }
    while(array.length > 0) {
        array.pop()
    }
    while(renderArray.length > 0) {
        renderArray.pop()
    }
    while(currentElements.length > 0) {
        currentElements.pop()
    }
    if (array.length === 0) {
        fillArray()
        generateVisuals()
        insertionSort()
        updateVisuals(0, arrayspeedinput.value);
    }
}


function mergeSortStarter() {
    console.log("merge")

    let i = 0;
    let child = vs.lastElementChild;
    while(child) {
        vs.removeChild(child);
        child = vs.lastElementChild
    }
    while(array.length > 0) {
        array.pop()
    }
    while(renderArray.length > 0) {
        renderArray.pop()
    }
    while(currentElements.length > 0) {
        currentElements.pop()
    }
    if (array.length === 0) {
        fillArray()
        generateVisuals()
        console.log(vs)
        mergeSort(array);
        updateVisuals(0, arrayspeedinput.value);
    }

}

function quickSortStarter() {
    console.log("quick")

    let i = 0;
    let child = vs.lastElementChild;
    while(child) {
        vs.removeChild(child);
        child = vs.lastElementChild
    }
    while(array.length > 0) {
        array.pop()
    }
    while(renderArray.length > 0) {
        renderArray.pop()
    }
    while(currentElements.length > 0) {
        currentElements.pop()
    }
    if (array.length === 0) {
        fillArray()
        generateVisuals()
        bubbleSort()
        updateVisuals(0, arrayspeedinput.value);
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

function insertionSort() {
    const sortedArray = [];
    for (let i = 0; i < array.length; i++) {        
        if(array[i] > sortedArray[i - 1]) {
            sortedArray.push(array[i]);
        } else {
            let temp = []
            for (let j = sortedArray.length; j >= 0; j--) {
                if (sortedArray[j] > array[i]) {
                    temp.unshift(sortedArray.pop());
                }
            }
            sortedArray.push(array[i], ...temp)
        }
        const mixedArray = [...sortedArray]
        for (let k = sortedArray.length; k < array.length; k++) {
            mixedArray.push(array[k]);
        }
        renderArray.push(JSON.stringify(mixedArray))
    }
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);

    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    
    let merged = merge(left, right)

    const tempArray = []
    tempArray.push(...merged)
    for (let i = tempArray.length; i < array.length; i++) {
        tempArray.push(array[i])
    }
    renderArray.push(JSON.stringify(tempArray))
    console.log(renderArray)

    return merged;
}

function merge(left, right) {
    let sortedArr = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift());
        }
    }

    return [...sortedArr, ...left, ...right]
}

function generateVisuals() {
    array.forEach((piece, index) => {
        const color = generateColor();
        const li = document.createElement("li");
        li.id = `${piece}`
        li.setAttribute('index', index)
        li.style = `--height: ${piece}%; --bg: ${color};`
        currentElements.push({
            id: piece,
            height: piece,
            bg: color,
            index: index
        })
        vs.append(li)
    })
}

function updateVisuals(iteration, speed) {
    console.log(renderArray);
    if (iteration <= renderArray.length - 1) {
        const currentRender = JSON.parse(renderArray[iteration])
        const elements = []

        currentRender.forEach(piece => {
            const current = document.getElementById(`${piece}`);
            elements.push(currentElements[current.getAttribute("index")]);
        })

        let i = 0;
        let child = vs.lastElementChild;
        while(child) {
            vs.removeChild(child);
            child = vs.lastElementChild
        }

        elements.forEach(piece => {
            const li = document.createElement("li");
            li.id = `${piece.id}`
            li.setAttribute('index', piece.index)
            li.style = `--height: ${piece.height}%; --bg: ${piece.bg};`
            vs.append(li)
        })

        setTimeout(() => {
            updateVisuals(iteration + 1, speed)
        }, speed)
    } else {
        return;
    }

    
}