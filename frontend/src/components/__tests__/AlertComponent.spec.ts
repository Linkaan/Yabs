import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';

import AlertComponent from '@/components/AlertComponent.vue';

describe('AlertComponent.vue', () => {
  
  xit('Renders corretly', async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(AlertComponent);
    expect(wrapper.html()).toMatchSnapshot();
  });
  
});
