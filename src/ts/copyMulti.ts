import { multiInfo } from './showMulti';

export const copyMultiId = (
    multiInfoElement: multiInfo,
    count: string
): void => {
    navigator.clipboard
        .writeText(multiInfoElement.multiIdElement.innerHTML)
        .then(
            () => {
                console.log('copied');

                multiInfoElement.multiBoxElement.classList.add('-copied');
                const copiedMessageElement = document.querySelector(
                    `#copiedMessage${count}`
                );
                copiedMessageElement.classList.add('-on');

                setTimeout(
                    () => copiedMessageElement.classList.remove('-on'),
                    3000
                );
            },
            () => {
                console.log('failed to copy');
            }
        );
};
