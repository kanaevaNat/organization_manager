<template>
  <v-container>
    <h1 class="text-h4 mb-4">Добавление новой организации</h1>
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field
          v-model="form.name"
          label="Название"
          :error-messages="errors.name"
          required
      ></v-text-field>

      <v-text-field
          v-model="form.short_name"
          label="Краткое название"
          :error-messages="errors.short_name"
          required
      ></v-text-field>

      <v-textarea
          v-model="form.description"
          label="Описание"
          :error-messages="errors.description"
      ></v-textarea>

      <v-checkbox
          v-model="form.is_active"
          label="Активно"
      />

      <v-file-input
          v-model="form.image"
          accept="image/*"
          label="Логотип"
          prepend-icon="mdi-camera"
          :error-messages="errors.image"
      ></v-file-input>

      <div class="d-flex justify-space-between mt-4">
        <v-btn
            type="submit"
            color="success"
            :loading="loading"
            :disabled="!isFormValid"
        >Сохранить</v-btn>
        <v-btn @click="router.back()" color="secondary">Назад</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrganizationStore } from '../stores/organizationStore';

const form = ref({
  name: '',
  short_name: '',
  description: '',
  is_active: true,
  image: null,
});

const errors = computed(() => {
  const validationErrors = {};

  if (!form.value.name?.trim()) {
    validationErrors.name = ['Название обязательно'];
  } else if (form.value.name.length > 200) {
    validationErrors.name = ['Название не должно превышать 200 символов'];
  }

  if (!form.value.short_name?.trim()) {
    validationErrors.short_name = ['Краткое название обязательно'];
  } else if (form.value.short_name.length > 50) {
    validationErrors.short_name = ['Краткое название не должно превышать 50 символов'];
  }

  if (form.value.description && form.value.description.length > 1000) {
    validationErrors.description = ['Описание не должно превышать 1000 символов'];
  }

  if (form.value.image?.size > 2 * 1024 * 1024) {
    validationErrors.image = ['Размер файла не должен превышать 2 МБ'];
  }
  return validationErrors;
});

const isFormValid = computed(() => {
  const hasImageError = form.value.image?.size > 2 * 1024 * 1024;
  return (
      form.value.name?.trim() &&
      form.value.name.length <= 200 &&
      form.value.short_name?.trim() &&
      form.value.short_name.length <= 50 &&
      (!form.value.description || form.value.description.length <= 1000) &&
      !hasImageError
  );
});

const router = useRouter();
const store = useOrganizationStore();
const loading = ref(false);

async function submitForm() {
  if (!isFormValid.value) return;

  let imageId = null;

  if (form.value.image) {
    try {
      imageId = await store.uploadOrganizationImage(form.value.image);
    } catch (err) {
      errors.value = err;
      return;
    }
  }

  form.value.image = imageId;

  try {
    await store.addOrganization(form.value);
    await router.push('/');
  } catch (err) {
    errors.value = err.response?.data || { message: 'Ошибка при сохранении' };
  }
}
</script>