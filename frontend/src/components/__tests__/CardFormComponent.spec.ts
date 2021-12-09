import { VueClass, Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';
import CardFormComponent from '@/components/CardFormComponent.vue';

describe('CardFormComponent.vue', () => {
  it('checks if it exists', () => {
    const wrapper= shallowFactory(CardFormComponent as VueClass<Vue>);
    expect(wrapper.find('[data-cy="file-input"]')).toBeTruthy();
        
  });
});
