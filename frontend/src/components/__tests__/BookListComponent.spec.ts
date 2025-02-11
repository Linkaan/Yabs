import BookListComponent from '@/components/BookListComponent.vue';
import vue from 'vue';

import { VueClass, Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';

jest.mock('@/store/modules/BooksModule');

describe('BookListComponent.vue', () => {
  it('can search for books', () => {
    const wrapper= factory(BookListComponent as VueClass<Vue>);

    expect(wrapper.text()).toMatch('Game of Thrones');
    expect(wrapper.text()).toMatch('Alice in Wonderland');

    wrapper.find('[data-jest="search"]').setValue('Alice in Wonderland');

    wrapper.vm.$nextTick( () => {
      expect(wrapper.text()).not.toMatch('Game of Thrones');
    });
  });
});
