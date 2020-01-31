import React from 'react';
import ProcessSearch from './LawsuitSearch';
import { Input } from 'antd';
import { mount } from 'enzyme';

const { Search } = Input;

test('renders process search input', () => {

    let historyMock = {
        push: jest.fn(),
        location: {
            search: ''
        }
    };

    const wrapper = mount(<ProcessSearch history={historyMock} />);

    let searchInput = wrapper.find(Search);
    expect(searchInput.exists()).toBeTruthy();
});