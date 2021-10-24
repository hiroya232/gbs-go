import { copyMultiId } from './copyMulti';

export interface multiInfo {
    multiBoxElement: HTMLDivElement;
    multiIdElement: HTMLDivElement;
    multiEnemyElement: HTMLDivElement;
}

type multiInfoJson = {
    multi_id: string;
    enemy: string;
};

const createMultiBox = (recvMultiInfo: multiInfoJson): multiInfo => {
    const multiInfoElement: multiInfo = {
        multiBoxElement: document.createElement('div'),
        multiIdElement: document.createElement('div'),
        multiEnemyElement: document.createElement('div'),
    };

    multiInfoElement.multiIdElement.innerHTML = recvMultiInfo.multi_id;
    multiInfoElement.multiEnemyElement.innerHTML = recvMultiInfo.enemy;

    multiInfoElement.multiBoxElement.append(multiInfoElement.multiIdElement);
    multiInfoElement.multiBoxElement.append(multiInfoElement.multiEnemyElement);

    multiInfoElement.multiBoxElement.className = 'multiBox';

    return multiInfoElement;
};

export const showMultiBox = (ws: WebSocket, event: MessageEvent): void => {
    const recvMultiInfo = JSON.parse(event.data) as multiInfoJson;

    const multiInfoElement = createMultiBox(recvMultiInfo);

    const multiList = document.getElementById('multiList');
    if (multiList.childElementCount >= 20) {
        multiList.lastChild.remove();
    }

    multiList.prepend(multiInfoElement.multiBoxElement);

    multiInfoElement.multiBoxElement.addEventListener('click', () => {
        copyMultiId(multiInfoElement);
    });
};
