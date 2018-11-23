import * as React from "react";
import { shallow } from 'enzyme';
import App from "../../../src/scripts/client/components/App";

it("renders the heading", () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toMatchSnapshot()
});