import AdminTitlesEditView from '../AdminTitlesEditView.vue';
import vue from 'vue';

import { VueClass, Wrapper } from '@vue/test-utils';
import { factory, shallowFactory } from '@/helpers/testFactoryHelpers';
import TitlesModule from '@/store/modules/TitlesModule';

jest.mock('@/store/modules/TitlesModule');

const options = {
  mocks: {
    $route: {
      params: {
        id: '0763645680'
      }
    }
  },
};

describe('AdminTitlesEditView.vue', () => {
  it('Displays the correct data in the form', async () => {
    const wrapper= shallowFactory(AdminTitlesEditView as VueClass<Vue>, options);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).not.toMatch('Clean Code');
  });

  it('Calls titles module with correct data', async () => {
    const wrapper= factory(AdminTitlesEditView as VueClass<Vue>, options);
    wrapper.find('[data-jest=deleteTitle]').trigger('click');
    await expect(TitlesModule.fetchSingleByISBN).toHaveBeenCalledWith('0763645680');
    expect(TitlesModule.getLoans).toHaveBeenCalledWith(1);
  });
});
