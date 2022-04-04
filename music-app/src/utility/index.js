
export const renderTime = (second, format) => {
    const hours = Math.floor(second / (60 * 60));
    const minutes = Math.floor(second / 60);
    let seconds = Math.floor(second);
    seconds = seconds >= 60 ? seconds % 60 : seconds;

    let render = '';
    const renderHours = `${hours > 9 ? hours : `0${hours}`}`;
    const renderMinutes = `${minutes > 9 ? minutes : `0${minutes}`}`;
    const renderSeconds = `${seconds > 9 ? seconds : `0${seconds}`}`;

    if (typeof format === 'number') {
        switch (format) {
            case 1: {
                render = `${renderHours}:${renderMinutes}:${renderSeconds}`;
                break;
            }
            case 2: {
                render = `${renderMinutes}:${renderSeconds}`;
                break;
            }
            default: render = `${renderMinutes}:${renderSeconds}`;
        }
    } else {
        render = `${renderMinutes}:${renderSeconds}`;
    }
    return render;
}