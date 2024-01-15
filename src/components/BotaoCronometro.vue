<template>
  <button class="button" :disabled="disabled">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BotaoCronometro",
  props: {
    icone: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
});
</script>
