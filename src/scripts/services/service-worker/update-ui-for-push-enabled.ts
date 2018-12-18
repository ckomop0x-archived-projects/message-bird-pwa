export interface UpdateUIForPushEnabledOptions {
    token: any;
    bt_register: any;
    bt_delete: any;
    form: any;
}

export default function updateUIForPushEnabled(
    currentToken: string | null,
    updateUIForPushEnabledOptions: UpdateUIForPushEnabledOptions
) {
    const {token, bt_register, bt_delete, form} = updateUIForPushEnabledOptions;

    console.log(currentToken);
    token.text(currentToken);
    bt_register.hide();
    bt_delete.show();
    form.show();
}
