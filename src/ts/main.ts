import { showMultiBox, createMultiList } from './showMulti';

window.onload = (): void => {
    const loc = window.location;
    const uri = 'ws://' + loc.host + '/stream';

    let ws: WebSocket;

    const startGetMultiListButtons = document.querySelectorAll(
        '[data-trigger="startGetMultiListButton"]'
    );
    startGetMultiListButtons.forEach((startGetMultiListButton) => {
        startGetMultiListButton.addEventListener('click', (): void => {
            createMultiList();

            ws = new WebSocket(uri);

            ws.onopen = (): void => {
                console.log('Connection start!!');
                ws.send(startGetMultiListButton.getAttribute('value'));
            };

            ws.onmessage = (event): void => {
                showMultiBox(ws, event);
            };

            ws.onclose = (): void => {
                console.log('Connection stop!!');
            };
        });
    });

    const stopGetMultiListButton = document.querySelector(
        '[data-trigger="stopGetMultiListButton"]'
    );
    stopGetMultiListButton.addEventListener('click', (): void => {
        ws.close();
    });
};
