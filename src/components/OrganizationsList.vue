<template>
  <v-container>
    <h1 class="text-h4 mb-4">Список организаций</h1>
    <v-btn to="/add" color="primary" class="mb-4">Добавить</v-btn>
    <OrganizationTable />
  </v-container>
</template>

<script setup>
import OrganizationTable from '../components/OrganizationTable.vue';
import { onMounted } from 'vue';
import { useOrganizationStore } from '../stores/organizationStore';

const store = useOrganizationStore();

onMounted(() => {
  store.fetchOrganizations({ page: 1, pageSize: 5 });
});
</script>