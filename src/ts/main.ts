window.onload = () => {
    const getMultiListButton = document.querySelector(
        '[data-trigger="getMultiListButton"]'
    );

    getMultiListButton.addEventListener('click', function () {
        let loc = window.location;
        let uri = 'ws://' + loc.host + '/stream';

        const ws = new WebSocket(uri);
        ws.onmessage = function (evt) {
            let out = document.getElementById('multiList');
            out.innerHTML += evt.data + '<br>';
        };
    });
};
