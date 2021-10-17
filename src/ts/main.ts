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
        ws.onmessage = function (event) {
            const multiInfo = JSON.parse(event.data);

            const multiBox = document.createElement('div');
            const multiId = document.createElement('div');
            const multiEnemy = document.createElement('div');
            multiId.append(multiInfo.multi_id);
            multiEnemy.append(multiInfo.enemy);
            multiBox.append(multiId);
            multiBox.append(multiEnemy);

            multiBox.className = 'multiBox';

            const multiList = document.getElementById('multiList');
            multiList.append(multiBox);
        };

        stopGetMultiListButton.addEventListener('click', () => {
            ws.close();
        });
    });
};
