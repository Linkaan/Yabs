import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { VueClass, Wrapper } from '@vue/test-utils';
import AdminTitlesView from '../AdminTitlesView.vue';
import Vue from 'vue';

describe('AdminTitlesView.vue', () => {
  
  it('Is not empty', () => {
    const wrapper= shallowFactory(AdminTitlesView as VueClass<Vue>);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('Components exist in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper= shallowFactory(AdminTitlesView as VueClass<Vue>, injectRouterStubs);
    const componentNames = ['TitleFormComponent', 'TitleListComponent'];
    componentNames.forEach(componentName => {
      expect(wrapper.findComponent({name: componentName}).exists()).toBe(true);
    });
  });
});
