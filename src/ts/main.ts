window.onload = () => {
    const startGetMultiListButton = document.querySelector(
        '[data-trigger="startGetMultiListButton"]'
    );
    const stopGetMultiListButton = document.querySelector(
        '[data-trigger="stopGetMultiListButton"]'
    );

    startGetMultiListButton.addEventListener('click', () => {
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
