import { addMultiBox, createMultiListContainer } from './showMulti';

window.onload = (): void => {
    const host = window.location.host;
    const url = 'ws://' + host + '/stream';

    let ws: WebSocket;

    const startStreamingButtons = document.querySelectorAll(
        '[data-trigger="startStreamingButtons"]'
    );
    startStreamingButtons.forEach((startStreamingButton) => {
        startStreamingButton.addEventListener('click', (): void => {
            createMultiListContainer();

            ws = new WebSocket(url);

            ws.onopen = (): void => {
                console.log('Connection start!!');
                ws.send(startStreamingButton.getAttribute('value'));
            };

            ws.onmessage = (event): void => {
                addMultiBox(ws, event);
            };

            ws.onclose = (): void => {
                console.log('Connection stop!!');
            };
        });
    });

    document
        .querySelector('[data-trigger="stopStreamingButtons"]')
        .addEventListener('click', (): void => {
            ws.close();
        });
};
