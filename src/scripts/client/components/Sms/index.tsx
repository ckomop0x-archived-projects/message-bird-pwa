import * as React from 'react';
import {Route, Switch} from 'react-router';
import {RightContainerProps} from '../RightContainer/index';
import Dashboard from './Dashboard/index';
import Send from './Send/index';

const Sms = (props: RightContainerProps) => {
    return (
        <div>
            <Switch>
                <Route path="/sms/send" exact={true} render={() => <Send {...props} />} />
                <Route
                    path="/sms/:filter?"
                    render={({match}) => {
                        const {params} = match;
                        return <Dashboard filter={params.filter} {...props} />;
                    }}
                />
            </Switch>
        </div>
    );
};

export default Sms;
