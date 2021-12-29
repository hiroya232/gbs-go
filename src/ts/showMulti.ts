import { copyMultiId } from './copyMulti';

export interface multiBox {
    info: HTMLDivElement;
    id: HTMLDivElement;
    enemy: HTMLDivElement;
}

type multiInfoJson = {
    multi_id: string;
    enemy: string;
};

let count = 0;

export const createMultiListContainer = () => {
    const multiListContainer = document.createElement('div');
    multiListContainer.className = 'multiList';
    multiListContainer.setAttribute('data-multi-list-id', `list${++count}`);

    const copiedMessage = document.createElement('span');
    copiedMessage.className = 'copiedMessage';
    copiedMessage.setAttribute(
        'data-copy-multi-message',
        `copiedMessage${count}`
    );
    copiedMessage.innerHTML = 'Copied!';

    const stopButton = document.createElement('button');
    stopButton.className = 'targetMultiButton';
    stopButton.setAttribute('type', 'button');
    stopButton.setAttribute('data-multi-stop', `stopStreamingButtons${count}`);
    stopButton.innerHTML = 'stop';

    multiListContainer.prepend(stopButton);
    multiListContainer.append(copiedMessage);

    document.querySelector('.container').append(multiListContainer);
};

const createMultiBox = (recvMultiInfo: multiInfoJson): multiBox => {
    const multiBox: multiBox = {
        info: document.createElement('div'),
        id: document.createElement('div'),
        enemy: document.createElement('div'),
    };

    multiBox.id.innerHTML = recvMultiInfo.multi_id;
    multiBox.enemy.innerHTML = recvMultiInfo.enemy;

    multiBox.info.append(multiBox.id);
    multiBox.info.append(multiBox.enemy);

    multiBox.info.className = 'multiBox';

    return multiBox;
};

export const addMultiBox = (ws: WebSocket, event: MessageEvent): void => {
    const recvMultiInfo = JSON.parse(event.data) as multiInfoJson;

    const multiBox = createMultiBox(recvMultiInfo);

    const multiList = document.querySelector(
        `[data-multi-list-id=list${count}]`
    );
    if (multiList.childElementCount >= 20) {
        multiList.lastChild.remove();
    }

    multiList.prepend(multiBox.info);

    multiBox.info.addEventListener('click', () => {
        copyMultiId(
            multiBox,
            multiBox.info.parentElement.dataset.multiListId.replace('list', '')
        );
    });
};
