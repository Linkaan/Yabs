import UserListComponent from '@/components/UserListComponent.vue';
import vue from 'vue';

import { VueClass, Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';

jest.mock('@/store/modules/UsersModule');

describe('BookListComponent.vue', () => {
  it('can search for books', async () => {
    const wrapper= factory(UserListComponent as VueClass<Vue>);
    expect(wrapper.text()).toMatch('example@example.example');
    expect(wrapper.text()).toMatch('test@test.test');

    wrapper.find('[data-jest="search"]').setValue('test@test.test');

    wrapper.vm.$nextTick( () => {
      expect(wrapper.text()).not.toMatch('example@example.example');
    });
  });
});
