
export function eventManager(e) {

    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', '=', '+-', 'c', 'enter'];

    let event = null;

    if (e.type === 'keydown') {
        if (e.keyCode == 13) {
            event = 'enter'
        } else if (e.keyCode == 27) {
            event = 'c';
        } else {
            event = e.key;
        }
    } else {
        event = e.srcElement.dataset.key;
    }

    let valid = false;

    validKeys.forEach(key => {
        if (event == key) {
            valid = true;
        }
    });

    return valid ? event : undefined

}