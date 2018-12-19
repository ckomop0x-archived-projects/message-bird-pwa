import * as React from 'react';
import {shallow} from 'enzyme';
import App from '../components/App/index';

declare var window: any;

it('renders the heading', () => {
    window.Notification = () => ({
        onshow: jest.fn(),
        onclick: jest.fn()
    });

    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
});
