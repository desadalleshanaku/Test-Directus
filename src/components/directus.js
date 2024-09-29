import { createDirectus } from '@directus/sdk';

const directus = createDirectus(VUE_APP_DIRECTUS_URL);

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('directus', directus);
});