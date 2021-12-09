import NavbarComponent from '@/components/NavbarComponent.vue';

import { VueClass, Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';

describe('NavbarComponent.vue', () => {

  const injectRouterStubs = {stubs: ['router-link', 'router-view']};

  it('renders title when passed', () => {
    const wrapper= shallowFactory(NavbarComponent as VueClass<Vue>, injectRouterStubs);

    expect(wrapper.html()).toMatch('Yabs');
  });

  xit('renders correctly', () => {
    const wrapper= shallowFactory(NavbarComponent as VueClass<Vue>, injectRouterStubs);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
