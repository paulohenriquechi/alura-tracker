<template>
  <div class="box" :style="estilos">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulario para criação de nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar:"
          v-model="descricao"
        />
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "@/components/Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      estilos: {
        color: "var(--texto-primario)",
        backgroundColor: "var(--bg-primario)",
      }
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
      });
      this.descricao = "";
    },
  },
});
</script>
