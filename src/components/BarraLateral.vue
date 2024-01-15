<template>
  <header :style="estilos">
    <h1><img src="../assets/logo.png" alt="" /></h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuro: false,
      estilos: {
        padding: "1rem",
        background: "#0d3b66",
        width: "100%",
        height: "100vh",
        textAlign: "center" as const,
      },
    };
  },
  computed: {
    textoBotao(): string {
      return this.modoEscuro ? "Desativar modo escuro" : "Ativar modo escuro";
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuro = !this.modoEscuro;
      this.$emit("aoTemaAlterado", !this.modoEscuro);
    },
  },
});
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
