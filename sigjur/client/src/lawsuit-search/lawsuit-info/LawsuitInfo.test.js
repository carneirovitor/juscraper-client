import React from 'react';
import LawsuitInfo from './LawsuitInfo';
import ActivityInfo from '../activity-info/ActivityInfo'
import RelatedPartsInfo from '../related-parts-info/RelatedPartsInfo'
import { mount } from 'enzyme';
import { Skeleton } from 'antd';
import { lawsuitMock } from './lawsuit.mock';

test('renders lawsuit loading', () => {
    const wrapper = mount(<LawsuitInfo loading={true} lawsuit={{}} />);
    expect(wrapper.find(Skeleton).exists()).toBeTruthy();
    expect(wrapper.find(ActivityInfo).exists()).toBe(false);
});


test('renders lawsuit layout', () => {
    const wrapper = mount(<LawsuitInfo loading={false} lawsuit={lawsuitMock} />);
    expect(wrapper.find(Skeleton).exists()).toBe(false);
    expect(wrapper.find('h1').text()).toMatch(new RegExp(lawsuitMock.lawsuit_number));
    expect(wrapper.find(ActivityInfo).exists()).toBe(true);
    expect(wrapper.find(RelatedPartsInfo).exists()).toBe(true);
});