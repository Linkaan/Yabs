<!--
  WELCOME TO THE ADMIN VIEW, SEE MORE DOCUMENTATIONS IN THE METHODS FURTHER DOWN
 -->

<template>
  <div class="main-container">
    <div class="left">
      <v-card
        elevation="6"
        width="256"
      >
        <v-navigation-drawer
          floating
          permanent
        >
          <v-list
            dense
            rounded
          >
            <v-list-item-group
              :value="0"
            >
              <router-link
                v-for="item in items"
                :key="item.title"
                :to="item.path"
                class="d-flex router-link"
              >
                <v-list-item
                  link
                  :active="item.active"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title :data-cy="item.title">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <div class="right">
      <v-card
        elevation="6"
        class="pa-10"
      >
        <v-content>
          <router-view />
        </v-content>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent } from '@vue/composition-api';
// This is the admin view and has no child nor parent components and is therefore only
// used for the sole purpose of giving the admin opportunities to go to the requested route
export default defineComponent({
  name: 'AdminView',
  setup(_: object, { root }: SetupContext): object {
    const items = ref([
      { title: 'Översikt', icon: 'dashboard', path: '/admin'},
      { title: 'Lån', icon: 'library_books', path: '/admin/loans' },
      { title: 'Titlar', icon: 'title', path: '/admin/titles' },
      { title: 'Böcker', icon: 'book', path: '/admin/books' },
      { title: 'Passerkort', icon: 'account_box', path: '/admin/cards' },
      { title: 'Användare', icon: 'group', path: '/admin/users' }
    ]);
    
    return { items };
  }
});
</script>

<style scoped>
.main-container{display: flex !important}
.left{margin-right: 50px}
.right{flex: 1}
.router-link{color: black}
.router-link{text-decoration: none !important}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 24px;
}
</style>
