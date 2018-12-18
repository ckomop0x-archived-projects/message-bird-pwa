export interface ResetUIOptions {
    token: JQuery<HTMLElement>;
    bt_register: JQuery<HTMLElement>;
    bt_delete: JQuery<HTMLElement>;
    form: JQuery<HTMLElement>;
    massage_row: JQuery<HTMLElement>;
    info: JQuery<HTMLElement>;
}

export default function resetUI(resetUIOptions: ResetUIOptions) {
    const {token, bt_register, bt_delete, form, massage_row, info} = resetUIOptions;

    token.text('');
    bt_register.show();
    bt_delete.hide();
    form.hide();
    massage_row.hide();
    info.hide();
}
