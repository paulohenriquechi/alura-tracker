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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";
// import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (projeto) => projeto.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi salvo com sucesso"
      );
      router.push("/projetos");
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
  // mixins: [notificacaoMixin],
});
</script>
