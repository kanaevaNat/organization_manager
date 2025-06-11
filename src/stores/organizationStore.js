import { defineStore } from 'pinia';
import apiClient from '../api/axiosConfig';
export const useOrganizationStore = defineStore('organization', {
    state: () => ({
        organizations: [],
        pagination: {
            page: 1,
            pageSize: 5,
            totalItems: 0,
            totalPages: 0,
        },
        filters: {
            ordering: '',
        },
        loading: false,
        error: null,
        itemsPerPageOptions: [1, 5, 10, 15]
    }),
    actions: {
        resetPagination() {
            this.page = 1
            this.pageSize = 10
        },
        async fetchOrganizations() {
            this.loading = true;
            try {
                const response = await apiClient.get('organizations/', {
                    params: {
                        page: this.pagination.page,
                        page_size: this.pagination.pageSize,
                        ordering: this.filters.ordering,
                    },
                });
                this.organizations = response.data.results;
                this.pagination.totalItems = response.data.count;
                this.pagination.totalPages = Math.ceil(response.data.count / this.pagination.pageSize);
                this.error = null;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        setOrdering(field) {
            const current = this.filters.ordering;
            const prefix = current === field ? '-' : '';
            this.filters.ordering = prefix + field;
            this.fetchOrganizations();
        },
        async deleteOrganization(id) {
            try {
                await apiClient.delete(`organizations/${id}/`);
                this.organizations = this.organizations.filter(org => org.id !== id);
            } catch (err) {
                console.error('Error deleting organization:', err);
            }
        },
        async addOrganization(data) {
            try {
                const response = await apiClient.post('organizations/', data);
                return response.data;
            } catch (err) {
                throw err.response?.data || { message: 'Ошибка при добавлении' };
            }
        },
        async uploadOrganizationImage(file) {
            if (!file) return null;
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await apiClient.post('images/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data.id; // image_id
            } catch (err) {
                throw { image: ['Ошибка при загрузке изображения'] };
            }
        },
    },
});