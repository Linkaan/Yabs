<template>
  <v-container> 
    <ReturnLoanComponent />
    <h2>Lägg till bok att låna</h2>
    <LibraryLoanComponent />
    <h2>Dina lån</h2>
    <LoanListComponent />
    <h2>Sök efter böcker</h2> 
    <TitleListComponent />
  </v-container>
</template>

<script lang='ts'>
import { defineComponent, SetupContext } from '@vue/composition-api';
import LoanListComponent from '@/components/LoanListComponent.vue';
import LibraryLoanComponent from '@/components/LibraryLoanComponent.vue';
import TitleListComponent from '@/components/TitleListComponent.vue';
import ReturnLoanComponent from '@/components/ReturnLoanComponent.vue';
import LoansModule from '../store/modules/LoansModule';
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';
import { VuexModule } from 'vuex-module-decorators';

export default defineComponent({
  name: 'LibraryView',
  components: {
    LoanListComponent,
    LibraryLoanComponent,
    TitleListComponent,
    ReturnLoanComponent,
  },
  setup(_ : object, { root } : SetupContext) : object {
    const loansModule: VuexModule = LoansModule;
    const titlesModule: VuexModule = TitlesModule;
    const booksModule: VuexModule = BooksModule;

    function created() : void {
      LoansModule.fetchAll(); 
      TitlesModule.fetchAll();
      BooksModule.fetchAll();
    }

    created();

    return { loansModule, titlesModule, booksModule, created };
  }
});
</script>

<style scoped lang="scss">

</style>
