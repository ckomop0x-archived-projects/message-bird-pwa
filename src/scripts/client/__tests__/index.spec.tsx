import * as React from 'react';
import {shallow} from 'enzyme';
import App from '../components/App/index';

it('renders the heading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
});
