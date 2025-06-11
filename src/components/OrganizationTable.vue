<template>
  <v-card>
    <v-data-table-server
        :headers="headers"
        :items="organizationsStore.organizations"
        :items-length="organizationsStore.pagination.totalItems"
        item-key="id"
        :loading="organizationsStore.loading"
        v-model:page="organizationsStore.pagination.page"
        v-model:items-per-page="organizationsStore.pagination.pageSize"
        v-model:sort-by="sortBy"
        v-model:items-per-page-options="organizationsStore.itemsPerPageOptions"
    >
      <template #item.is_active="{ item }">
        <v-icon :color="item.is_active ? 'success' : 'error'">
          {{ item.is_active ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
      <template #item.actions="{ item }">
        <v-btn color="error" small @click="deleteOrg(item.id)">Удалить</v-btn>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useOrganizationStore } from '../stores/organizationStore.js'

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Название', key: 'name', sortable: true },
  { title: 'Короткое название', key: 'short_name', sortable: true },
  { title: 'Описание', key: 'description', sortable: true },
  { title: 'Активна', key: 'is_active', sortable: true },
  { title: 'Действия', key: 'actions', sortable: false }
]

const organizationsStore = useOrganizationStore()

const sortBy = ref([])

watch(
    () => organizationsStore.filters.ordering,
    (ord) => {
      if (!ord) sortBy.value = []
      else sortBy.value = [{ key: ord.replace('-', ''), order: ord.startsWith('-') ? 'desc' : 'asc' }]
    },
    { immediate: true }
)

watch(sortBy, (val) => {
  if (val?.length) {
    const { key, order } = val[0]
    const ordering = order === 'desc' ? `-${key}` : key
    if (organizationsStore.filters.ordering !== ordering) {
      organizationsStore.setOrdering(ordering)
    }
  } else if (organizationsStore.filters.ordering) {
    organizationsStore.setOrdering('')
  }
})

watch(
    () => [organizationsStore.pagination.page, organizationsStore.pagination.pageSize],
    () => {
      organizationsStore.fetchOrganizations()
    }
)

onMounted(() => {
  organizationsStore.resetPagination()
  organizationsStore.fetchOrganizations()
})

const deleteOrg = async id => {
  await organizationsStore.deleteOrganization(id)
}
</script>
