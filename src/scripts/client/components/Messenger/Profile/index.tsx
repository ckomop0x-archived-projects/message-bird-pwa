import * as React from 'react';
import {BalanceResponse} from '../../App/index';
import Header from '../../Header/index';

export interface ProfileProps {
    balance: BalanceResponse | undefined;
    error: string;
    message: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onRequestPermission(): void;
    onDelete(): void;
}

const Profile = (props: ProfileProps) => {
    return (
        <>
            <Header title="Profile" balance={props.balance} />
            Profile settings
            <main className="section no-pad-bot" id="index-banner">
                {props.error && (
                    <div className="card-panel deep-orange darken-1 white-text z-depth-2" id="alert">
                        <i className="material-icons left deep-orange-text text-lighten-4">warning</i>
                        <strong>Error</strong>
                        <em id="alert-message" />
                    </div>
                )}
                {props.message && (
                    <div className="card-panel green darken-1 white-text z-depth-2" id="info">
                        <i className="material-icons left green-text text-lighten-4">info</i>
                        <span id="info-message" />
                    </div>
                )}
                <div className="row">
                    <button
                        type="button"
                        className="btn-large waves-effect waves-light orange"
                        id="register"
                        onClick={props.onRequestPermission}>
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
            </main>
        </>
    );
};

export default Profile;
