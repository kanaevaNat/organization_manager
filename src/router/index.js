import { createRouter, createWebHistory } from 'vue-router';
import OrganizationsList from '../components/OrganizationsList.vue';
import AddOrganization from '../components/AddOrganization.vue';

const routes = [
    { path: '/', component: OrganizationsList },
    { path: '/add', component: AddOrganization },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});