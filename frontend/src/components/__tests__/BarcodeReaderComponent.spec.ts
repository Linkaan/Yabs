import { VueClass, Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';

import BarcodeReaderComponent from '@/components/BarcodeReaderComponent.vue';

describe('BarcodeReaderComponent.vue', () => {
  it('Renders correctly', async () => {
    const wrapper= shallowFactory(BarcodeReaderComponent as VueClass<Vue>);
    expect(wrapper.findComponent({name: 'BarcodeReaderComponent'}).exists()).toBe(true);
    expect(wrapper.text()).toMatch('Initializing..');
  });
});
