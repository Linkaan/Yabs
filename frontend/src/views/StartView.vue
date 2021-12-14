<!--
  This is the Start and root view for all of the application and includes three links, "Profil", "Admin"
  and "Hitta". It fetches all the loans and all the users from their modules in order to
  render them in the bottom of the page
 -->

<template>
  <div class="view">
    <v-container>
      <h1 class="text-center display-3">
        Välkommen till YABS!
      </h1>
      <br>
      <p class="text-center">
        Denna applikation kommer att användas för att underlätta hantering/utlåningen av olika sorters litteratur och utskrivning av passerkort.
      </p>
      <br>
      <v-row>
        <v-col class="card">
          <p class="title">
            På profil-sidan så ser du all relevant information angående din profil som tex antal aktiva lån.
          </p>
          <router-link
            class="link row-btn"
            :to="'/users/'+ usersModule.currentUserID"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
            >
              Profil
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="card">
          <p class="title">
            Admin-sidan används för att skapa nya passerkort, registera nya lån och lägga till nya böcker.
          </p>
          <router-link
            class="link row-btn"
            to="/admin"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
              data-cy="addPage"
            >
              Admin
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="card">
          <p class="title">
            På hitta-sidan kan du söka på allting som YABS hanterar, tex elever, specifika lån eller böcker.
          </p>
          <router-link
            class="link row-btn"
            to="/find"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
            >
              Hitta
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="card">
          <p class="title">
            På bibliotek-sidan hittar du vyn eleven ser på biblioteksdatorn.
          </p>
          <router-link
            class="link row-btn"
            to="/library"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
            >
              Bibliotek
            </v-btn>
          </router-link>
        </v-col>        
      </v-row>
    </v-container>
    <div>
      <h5>Böcker som ska inlämnas snart:</h5>
      <br>
      <LoanListComponent />
    </div>
  </div>
</template>

<!--
  Since this is the starting page, many modules are imported but also one component called
  LoanListComponent in order to render the loans that soon are to expire
-->
<script lang="ts">
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import LoanListComponent from '@/components/LoanListComponent.vue';
import UsersModule from '../store/modules/UsersModule';
import LoansModule from '../store/modules/LoansModule';

export default defineComponent({
  name: 'StartView',
  components: {
    LoanListComponent,
  },
  setup(_: object, { root }: SetupContext): object {
    const size = ref('lg');
    const primary = ref('primary');
    const loading = ref(true);
    const usersModule = ref(UsersModule);

    // The users module is imported and used in order to get information about the current user
    // but also so that the possibility for a user to monitor its soon expiring loans.
    // The Loans Module is imported so that we can fetch all info about the loans and since
    // there is a relation between loans and users the constructor instantiates the class
    // by fetching all the information from the two modules

    function created(): void {
      if (UsersModule.currentUserID) {
        UsersModule.fetchAll();
        LoansModule.fetchAll();
      }
    }

    created();

    return {
      size,
      primary,
      loading,
      usersModule,
    };
  },
});
</script>


<style scoped lang="sass">
.view
  padding: 0 14rem

.row-btn
  margin-bottom: 10px

.card
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 2rem
</style>
