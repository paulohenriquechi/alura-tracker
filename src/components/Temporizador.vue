<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />
    <BotaoCronometro @click="iniciar" :disabled="cronometroRodando" icone="fas fa-play" texto="play"/>
    <BotaoCronometro @click="finalizar" :disabled="!cronometroRodando" icone="fas fa-stop" texto="stop"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import BotaoCronometro from "./BotaoCronometro.vue";

export default defineComponent({
  name: "Temporizador",
  components: { Cronometro, BotaoCronometro },
  emits: ["aoTemporizadorFinalizado"],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos)
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
