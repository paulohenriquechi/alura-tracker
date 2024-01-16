<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaVazia"> Você não está muito produtivo hoje. </Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @ao-tarefa-clicada="selecionarTarefa"
    />
  </div>
  <div
    :class="['modal', { 'is-active': tarefaSelecionada }]"
    v-if="tarefaSelecionada"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descrição </label>
          <input
            class="input"
            type="text"
            id="descricaoDaTarefa"
            v-model="tarefaSelecionada.descricao"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "Tarefas",
  components: { Formulario, Tarefa, Box },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
    };
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length <= 0;
    },
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      if (!tarefa.projeto) {
        return notificacaoMixin.methods.notificar(
          TipoNotificacao.FALHA,
          "Não foi possivel salvar o projeto",
          "É necessário associar a tarefa a um projeto"
        );
      }
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => (this.tarefaSelecionada = null));
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },
});
</script>
