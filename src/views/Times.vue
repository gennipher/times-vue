<template>
  <div>
    <h1>Times</h1>
    <div>
      <ul>
        <li v-for="time in times">{{ time.nome }}</li>
      </ul>
    </div>

    <router-link to="/maisinformacoes"><button>Mais Informações</button></router-link>

    <!-- <button><a href="./MaisInformacoes.vue">Mais informações</a></button> -->
  </div>
  <router-view />
</template>

<script>
import Campo from "../components/Campo.vue";
import axios from "axios";
export default {
  components: { Campo },
  data() {
    return {
      time: {
        id: "INCREMENT",
        nome: "",
        estado: "",
        tecnico: "",
        torcida: "",
        fundacao_ano: "",
        info: "",
      },
      times: [],
    };
  },
  mounted() {
    axios.get("https://sheetdb.io/api/v1/7j443ehnc0qn8").then(({ data }) => {
      this.times = data;
    });
  },
};
</script>

<style>
ul {
  list-style-type: none;
  display: contents;
}
button {
  margin-top: 20px;
  background-color: white;
  border-radius: 1%;
  border: 1px solid #0060b6;
  color: #0060b6;
}
button:hover {
  color: #00a0c6;
  cursor: pointer;
}
</style>