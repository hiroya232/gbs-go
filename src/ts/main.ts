window.onload = () => {
    const getMultiListButton = document.querySelector(
        '[data-trigger="getMultiListButton"]'
    );
    const stopGetMultiListButton = document.querySelector(
        '[data-trigger="stopGetMultiListButton"]'
    );

    getMultiListButton.addEventListener('click', () => {
        let loc = window.location;
        let uri = 'ws://' + loc.host + '/stream';

        const ws = new WebSocket(uri);
        ws.onmessage = function (evt) {
            let out = document.getElementById('multiList');
            out.innerHTML += evt.data + '<br>';
        };
        stopGetMultiListButton.addEventListener('click', () => {
            ws.close();
        });
    });
};
