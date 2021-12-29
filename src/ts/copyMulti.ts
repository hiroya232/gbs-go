import { multiBox } from './showMulti';

export const copyMultiId = (multiInfo: multiBox, count: string): void => {
    navigator.clipboard.writeText(multiInfo.id.innerHTML).then(
        () => {
            console.log('copied');

            multiInfo.info.classList.add('-copied');
            const copiedMessage = document.querySelector(
                `#copiedMessage${count}`
            );
            copiedMessage.classList.add('-on');

            setTimeout(() => copiedMessage.classList.remove('-on'), 3000);
        },
        () => {
            console.log('failed to copy');
        }
    );
};
