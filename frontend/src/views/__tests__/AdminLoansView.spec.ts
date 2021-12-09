import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { VueClass, Wrapper } from '@vue/test-utils';
import AdminLoansView from '../AdminLoansView.vue';
import Vue from 'vue';

describe('AdminLoansView.vue', () => {
  
  it('CardFormComponent exists in view', () => {
    const wrapper= shallowFactory(AdminLoansView as VueClass<Vue>);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('Components exist in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper= shallowFactory(AdminLoansView as VueClass<Vue>, injectRouterStubs);
    const componentNames = ['LoanFormComponent', 'LoanListComponent', 'ReturnLoanComponent'];
    componentNames.forEach(componentName => {
      expect(wrapper.findComponent({name: componentName}).exists()).toBe(true);
    });
  });
});
