export interface ShowErrorOptions {
    error?: any;
    alert?: any;
    alert_message?: any;
}

export function showError(title: string, showErrorOptions: ShowErrorOptions) {
    const {error, alert, alert_message} = showErrorOptions;

    if (typeof error !== 'undefined') {
        console.error(title, error);
    } else {
        console.error(title);
    }

    alert.show();
    alert_message.html(title);
}
