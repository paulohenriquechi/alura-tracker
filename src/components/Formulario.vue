<template>
  <div class="box" :style="estilos">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Temporizador from "@/components/Temporizador.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projeto.),
    };
  },
  components: { Temporizador },
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      idProjeto: "",
      estilos: {
        color: "var(--texto-primario)",
        backgroundColor: "var(--bg-primario)",
      },
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find((projeto) => projeto.id == this.idProjeto),
      });
      this.descricao = "";
    },
  },
});
</script>
