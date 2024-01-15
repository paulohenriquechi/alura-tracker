<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" />
    <Box v-if="listaVazia"> Você não está muito produtivo hoje. </Box>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
  name: "Tarefas",
  components: { Formulario, Tarefa, Box },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length <= 0;
    },
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
      this.tarefas.push(tarefa);
    },
  },
});
</script>
