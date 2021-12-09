import { VueClass, Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';

import AlertComponent from '@/components/AlertComponent.vue';

describe('AlertComponent.vue', () => {
  
  xit('Renders corretly', async () => {
    const wrapper= shallowFactory(AlertComponent as VueClass<Vue>);
    expect(wrapper.html()).toMatchSnapshot();
  });
  
});
