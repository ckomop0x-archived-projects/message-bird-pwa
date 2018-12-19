import * as React from 'react';
import {BalanceResponse} from '../../App/index';
import Header from '../../Header/index';

export interface ProfileProps {
    [key: string]: any;
    balance: BalanceResponse | undefined;
    onRegistration?: () => void;
    onDelete?: () => void;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// const bt_register: JQuery<HTMLElement> = $('#register');
// const bt_delete: JQuery<HTMLElement> = $('#delete');
// const token: JQuery<HTMLElement> = $('#token');
// const form: JQuery<HTMLElement> = $('#notification');
// const massage_id: JQuery<HTMLElement> = $('#massage_id');
// const massage_row: JQuery<HTMLElement> = $('#massage_row');
// const info: JQuery<HTMLElement> = $('#info');
// const info_message: JQuery<HTMLElement> = $('#info-message');
// const alert: JQuery<HTMLElement> = $('#alert');
// const alert_message: JQuery<HTMLElement> = $('#alert-message');

const Profile = (props: ProfileProps) => {
    return (
        <>
            <Header title="Profile" balance={props.balance} />
            Profile settings
            <main className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <div className="card-panel deep-orange darken-1 white-text z-depth-2" id="alert">
                        <i className="material-icons left deep-orange-text text-darken-4">warning</i>
                        <strong>Error</strong>
                        <em id="alert-message" />
                    </div>
                    <div className="card-panel green darken-1 white-text z-depth-2" id="info">
                        <i className="material-icons left green-text text-darken-4">info</i>
                        <span id="info-message" />
                    </div>
                    <div className="row center">
                        <h4 className="header col s12 light" onClick={props.resetUI}>
                            Instance ID Token
                        </h4>
                        <p id="token" />
                    </div>
                    <div className="row center">
                        <button
                            type="button"
                            className="btn-large waves-effect waves-light orange"
                            id="register"
                            onClick={props.onRegistration}>
                            <i className="material-icons left">vpn_key</i>
                            Register
                        </button>
                        <button
                            type="button"
                            className="btn-large waves-effect waves-light orange"
                            id="delete"
                            onClick={props.onDelete}>
                            <i className="material-icons left">delete</i>
                            Delete Token
                        </button>
                    </div>
                    <div className="row">
                        <form className="col s12" id="notification" onSubmit={props.onSubmit}>
                            <div className="row">
                                <div className="input-field col s12" id="massage_row">
                                    <p>
                                        <strong>Massage id:</strong>
                                        <span id="massage_id" />
                                    </p>
                                </div>
                            </div>
                            <button type="submit" className="btn-large waves-effect waves-light orange" id="send">
                                <i className="material-icons left">email</i> Send
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
