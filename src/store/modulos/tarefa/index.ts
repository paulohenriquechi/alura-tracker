import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes";
import {
  DEFINIR_TAREFAS,
  ADICIONAR_TAREFA,
  EDITAR_TAREFA,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDaTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [EDITAR_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tare) => tare.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";
      if (filtro) url += "?descricao=" + filtro;
      http.get(url).then((res) => {
        commit(DEFINIR_TAREFAS, res.data);
      });
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post("tarefas", tarefa).then((res) => {
        commit(ADICIONAR_TAREFA, res.data);
      });
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`tarefas/${tarefa.id}`, tarefa).then(() => {
        commit(EDITAR_TAREFA, tarefa);
      });
    },
  },
};
