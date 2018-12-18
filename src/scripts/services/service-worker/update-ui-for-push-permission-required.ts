import resetUI from './reset-ui';

export interface UpdateUIForPushPermissionRequiredOptions {
    token: any;
    bt_register: any;
    bt_delete: any;
    form: any;
    massage_row: any;
    info: any;
}

export default function updateUIForPushPermissionRequired(
    updateUIForPushPermissionRequiredOptions: UpdateUIForPushPermissionRequiredOptions
) {
    const {token, bt_register, bt_delete, form, massage_row, info} = updateUIForPushPermissionRequiredOptions;
    bt_register.attr('disabled', 'disabled');
    resetUI({
        token,
        bt_register,
        bt_delete,
        form,
        massage_row,
        info
    });
}
