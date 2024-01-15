<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label class="label"> Nome do Projeto </label>
        <input
          class="input"
          type="text"
          id="nomeDoProjeto"
          v-model="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { EDITAR_PROJETO, ADICIONAR_PROJETO } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
// import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
  name: "Formulario",
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
  // mixins: [notificacaoMixin],
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (projeto) => projeto.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(EDITAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi salvo com sucesso"
      );
      this.$router.push("/projetos");
    },
  },
});
</script>
