
export function eventManager(e) {

    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', '=', '+-', 'c'];

    let event = null;

    if (e.type === 'keydown') {
        event = e.key;
    } else {
        event = e.srcElement.dataset.key;
    }

    validKeys.forEach(key => {
        if (event == key) {
            console.log(event);
            // return event;
        }
    });


}