<template>
  <div>
    <!-- Todo: add cover to title interface and implement the code below for setting image src -->
    <!-- :src="book.title.cover" -->
    
    <BookConditionComponent 
      v-if="book != null"
      :title="book.title.name" 
      :title_id="book.title.id"
      :status="book.condition" 
      :barcode="book.barcode"
    />
    <h1
      v-else
      class="display-2"
    >
      Något gick fel :ok_woman:
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, Ref } from '@vue/composition-api';
import BooksModule from '../store/modules/BooksModule';
import BookConditionComponent from '../components/BookConditionComponent.vue';
import { Book } from '@/types';

export default defineComponent({
  name: 'EditBookView',
  components: {
    BookConditionComponent
  },
  setup(_: object, { root }: SetupContext){
    let book: Ref<Book | null> = ref(null);

    BooksModule.fetchSingle(root.$route.params.id).then((response: Book) => {
      book.value = response;
    });
    return {
      book
    };
  }
});
</script>

<style scoped lang="scss">

</style>