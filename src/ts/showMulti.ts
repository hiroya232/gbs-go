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

let count = 0;

export const createMultiList = () => {
    const multiListElement = document.createElement('div');
    multiListElement.className = 'multiList';
    multiListElement.setAttribute('data-multi-list-id', `list${++count}`);

    const copiedMessageElement = document.createElement('span');
    copiedMessageElement.innerHTML = 'Copied!';
    copiedMessageElement.className = 'copiedMessage';
    copiedMessageElement.setAttribute(
        'data-copy-multi-message',
        `copiedMessage${count}`
    );

    const stopButton = document.createElement('button');
    stopButton.className = 'targetMultiButton';
    stopButton.setAttribute('type', 'button');
    stopButton.setAttribute(
        'data-multi-stop',
        `stopGetMultiListButton${count}`
    );
    stopButton.innerHTML = 'stop';

    multiListElement.prepend(stopButton);
    multiListElement.append(copiedMessageElement);

    document.querySelector('.container').append(multiListElement);
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

    const multiList = document.querySelector(`[data-multi-list-id=list${count}]`);
    if (multiList.childElementCount >= 20) {
        multiList.lastChild.remove();
    }

    multiList.prepend(multiInfoElement.multiBoxElement);

    multiInfoElement.multiBoxElement.addEventListener('click', () => {
        copyMultiId(
            multiInfoElement,
            multiInfoElement.multiBoxElement.parentElement.dataset.multiListId.replace(
                'list',
                ''
            )
        );
    });
};
