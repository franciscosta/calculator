

export function generateFrontEnd() {

    let buttons = document.querySelector('.buttons');

    for (let i = 0; i < 19; i++) {
        let operatorButton = document.createElement('div');
        operatorButton.classList.add('button');
        // operatorButton.innerText = "+";
        operatorButton.setAttribute('data-number', `${String(i)}`);
        if (i === 16) {
            operatorButton.classList.add('larger')
        }
        buttons.appendChild(operatorButton);
    }

    let data = {
        0: {data: 'c', class: 'mid-gray', asset: 'c'},
        1: {data: '+-', class: 'mid-gray', asset: 'plusminus'}, 
        2: {data: '%', class: 'mid-gray', asset: 'modulo'},
        3: {data: '/', class: 'green', asset: 'divide'},
        4: {data: '7', class: 'digit'},
        5: {data: '8', class: 'digit'},
        6: {data: '9', class: 'digit'},
        7: {data: '*', class: 'green', asset: 'multiply'},
        8: {data: '4', class: 'digit'},
        9: {data: '5', class: 'digit'},
        10: {data: '6', class: 'digit'},
        11: {data: '-', class: 'green', asset: 'subtract'},
        12: {data: '3', class: 'digit'},
        13: {data: '2', class: 'digit'},
        14: {data: '1', class: 'digit'},
        15: {data: '+', class: 'green', asset: 'add'},
        16: {data: '0', class: 'digit'},
        17: {data: '.', class: 'digit', asset: 'dot'},
        18: {data: '=', class: 'green', asset: 'ecqual'}
    }

    for (let i = 0; i < 19; i++) {
        let currentButton = document.querySelector(`[data-number="${String(i)}"]`);
        currentButton.classList.add(`${data[i].class}`);
        currentButton.setAttribute('data-key', `${data[i].data}`);

        if (data[i].asset) {
            let svg = document.createElement('img');
            svg.setAttribute('src', `assets/${data[i].asset}.svg`);
            svg.setAttribute('data-key', `${data[i].data}`);
            currentButton.appendChild(svg);
        } else {
            currentButton.innerText = data[i].data;
        }

    }

}