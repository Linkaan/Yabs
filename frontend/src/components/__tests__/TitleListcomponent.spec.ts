import TitleListComponent from '@/components/TitleListComponent.vue';
import vue from 'vue';

import { VueClass, Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';

jest.mock('@/store/modules/TitlesModule');

describe('TitleListComponent.vue', () => {
  it('can search for books', () => {
    const wrapper= factory(TitleListComponent as VueClass<Vue>);

    expect(wrapper.text()).toMatch('Clean Code');
    expect(wrapper.text()).toMatch('Alice in Wonderland');

    wrapper.find('[data-jest="search"]').setValue('Alice in Wonderland');

    wrapper.vm.$nextTick( () => {
      expect(wrapper.text()).not.toMatch('Clean Code');
    });
  });

  it('checks whether ListComponent exists', async () => {
    const wrapper= factory(TitleListComponent as VueClass<Vue>);
    expect(wrapper.findComponent({name: 'ListComponent'}).exists()).toBe(true);
  });
});
