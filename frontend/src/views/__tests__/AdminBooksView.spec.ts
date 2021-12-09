import AdminBooksView from '../AdminBooksView.vue';
import vue from 'vue';

import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';

jest.mock('@/store/modules/TitlesModule');
jest.mock('@/store/modules/BooksModule');


describe('AdminTitlesEditView.vue', () => {
  it('Displays the correct data in the form', async () => {
    const wrapper: Wrapper<vue> = shallowFactory(AdminBooksView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
