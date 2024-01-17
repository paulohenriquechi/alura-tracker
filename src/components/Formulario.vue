<template>
  <div class="box">
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
import { defineComponent, computed, ref } from "vue";
import Temporizador from "@/components/Temporizador.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  setup(props, { emit }) {
    const store = useStore();
    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit("aoSalvarTarefa", {
        descricao: descricao.value,
        duracaoEmSegundos: tempoDecorrido,
        projeto: projetos.value.find(
          (projeto) => projeto.id == idProjeto.value
        ),
      });
      descricao.value = "";
    };

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
  components: { Temporizador },
  emits: ["aoSalvarTarefa"],
});
</script>

<style scoped>
.box {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
