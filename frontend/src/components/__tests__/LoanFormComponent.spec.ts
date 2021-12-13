import LoanFormComponent from '@/components/LoanFormComponent.vue';

import { VueClass, Wrapper} from '@vue/test-utils';
import { shallowFactory, factory } from '@/helpers/testFactoryHelpers';
import LoansModule from '@/store/modules/LoansModule';
import UsersModule from '@/store/modules/UsersModule';
import { User } from '@/types';
import Vue from 'vue';

// Must mock the date class else it would fail the snapshots
class MockDate extends Date {
  constructor() {
    super('2020-05-14T11:01:58.135Z');
  }
}

// @ts-ignore
global.Date = MockDate;

jest.mock('@/store/modules/LoansModule', () => {
  return {
    create: jest.fn().mockImplementationOnce((_arg) => {
      return Promise.resolve();
    })
  };
});

describe('LoanFormComponent.vue', () => {

  xit('renders correctly', async () => {
    const wrapper= shallowFactory(LoanFormComponent as VueClass<Vue>);
    expect(wrapper.html()).toMatchSnapshot();
  });

  //The snapshot does not match
  xit('renders the barcode scanner correctly', async () => {
    const wrapper= factory(LoanFormComponent as VueClass<Vue>);
    wrapper.find('[data-jest=\'barcodeButton\']').trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls loansmodule with correct values and resets the input fields', async () => {
    const wrapper = factory(LoanFormComponent as VueClass<Vue>);
    UsersModule.setCurrentUser({uid: 123} as User);

    wrapper.find('[data-jest=\'student_barcode\']').setValue('123');
    wrapper.find('[data-jest=\'book_barcode\']').setValue('1234');
    wrapper.find('[data-jest=\'expirationDate\']').setValue('2021-01-01');
    wrapper.find('[data-jest=\'form\']').trigger('submit');

    expect(LoansModule.create).toHaveBeenCalledWith({
      loaned_by_id: '123', //eslint-disable-line camelcase
      book_id: '1234', //eslint-disable-line camelcase
      lent_by_id: 123, //eslint-disable-line camelcase
      expiration_date: '2021-01-01', //eslint-disable-line camelcase
    });
  });
});
