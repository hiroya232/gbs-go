window.onload = () => {
    const getMultiListButton = document.querySelector(
        '[data-trigger="getMultiListButton"]'
    );
    const stopGetMultiListButton = document.querySelector(
        '[data-trigger="stopGetMultiListButton"]'
    );

    getMultiListButton.addEventListener('click', () => {
        const loc = window.location;
        const uri = 'ws://' + loc.host + '/stream';

        const ws = new WebSocket(uri);
        ws.onmessage = function (evt) {
            const out = document.getElementById('multiList');
            out.innerHTML += evt.data + '<br>';
        };
        stopGetMultiListButton.addEventListener('click', () => {
            ws.close();
        });
    });
};
