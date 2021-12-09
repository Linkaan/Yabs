import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { VueClass, Wrapper } from '@vue/test-utils';
import AdminUsersView from '../AdminUsersView.vue';
import Vue from 'vue';

describe('AdminUsersView.vue', () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowFactory(AdminUsersView as VueClass<Vue>);
  });  
  it('Search field exists', () => {
    const textField = wrapper.find('v-text-field-stub');
    expect(textField.html()).not.toBeFalsy();
    expect(textField.attributes().label).toBe('Search');
  });
});
