import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { VueClass, Wrapper } from '@vue/test-utils';
import LibraryView from '../LibraryView.vue';
import Vue from 'vue';

describe('LibraryView.vue', () => {
  it('is not empty', () => {
    const wrapper= shallowFactory(LibraryView as VueClass<Vue>);
    expect(wrapper.html()).not.toBe('');
  });
  it('matches the snapshot', async () => {
    const wrapper= shallowFactory(LibraryView as VueClass<Vue>);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
