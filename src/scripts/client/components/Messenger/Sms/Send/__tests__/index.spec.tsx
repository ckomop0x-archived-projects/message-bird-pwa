import * as React from 'react';
import {shallow} from 'enzyme';
import Send from '../index';

it('renders the heading', () => {
    const props = {
        apiKey: '',
        messagebird: {}
    };
    const wrapper = shallow(<Send {...props} />);
    expect(wrapper).toMatchSnapshot();
});
