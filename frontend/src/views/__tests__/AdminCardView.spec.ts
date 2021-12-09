import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { VueClass, Wrapper } from '@vue/test-utils';
import AdminCardsView from '../AdminCardsView.vue';

describe('AdminCardsView.vue', () => {
  
  it('CardFormComponent exists in view', () => {
    const wrapper= shallowFactory(AdminCardsView as VueClass<Vue>);
    expect(wrapper.findComponent({name: 'CardFormComponent'}).exists()).toBe(true);
  });

});
