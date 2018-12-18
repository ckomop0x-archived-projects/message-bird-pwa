import * as React from 'react';
import {BalanceResponse} from '../../App/index';
import Header from '../../Header/index';

export interface ProfileProps {
    balance: BalanceResponse | undefined;
}

const Profile = (props: ProfileProps) => {
    return (
        <>
            <Header title="Profile" balance={props.balance} />
            Profile settings
        </>
    );
};

export default Profile;
