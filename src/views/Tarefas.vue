<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaVazia"> Você não está muito produtivo hoje. </Box>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @ao-tarefa-clicada="selecionarTarefa"
    />
  </div>
  <Modal :mostrar="tarefaSelecionada != null">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editando uma tarefa</p>
      <button class="delete" aria-label="close" @click="fecharModal"></button>
    </template>
    <template v-slot:corpo>
      <div class="field">
        <label for="descricaoDaTarefa" class="label"> Descrição </label>
        <input
          class="input"
          type="text"
          id="descricaoDaTarefa"
          v-model="tarefaSelecionada!.descricao"
        />
      </div>
    </template>
    <template v-slot:rodape>
      <button class="button is-success" @click="alterarTarefa">
        Salvar alterações
      </button>
      <button class="button" @click="fecharModal">Cancel</button>
    </template>
  </Modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
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
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "Tarefas",
  components: { Formulario, Tarefa, Box, Modal },
  setup() {
    const store = useStore();
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (tarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)
    //   )
    // );
    store.dispatch(OBTER_TAREFAS);
    const filtro = ref("");

    watchEffect(() => store.dispatch(OBTER_TAREFAS, filtro.value));

    return {
      store,
      filtro,
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
