<template>
  <div>
    <h3>Cadastrar Jogador</h3>

    <div id="content">
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
            <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
            <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
            <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
    </div>
    <div>
      <span v-if="carregando">carregando...</span>
      <button v-else @click="salvar"><router-link to="/jogadores">Salvar</router-link></button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import CampoText from "../components/CampoText";
import CampoDropDown from "../components/CampoDropDown.vue";
import TabelaMarota from "../components/TabelaMarota";
import axios from "axios";

let jogadorNovo = () => {
  return {
    id: "INCREMENT",
    nome: "",
    estado: "",
    tecnico: "",
    torcida: "",
    fundacao_ano: "",
    info: "",
  };
};
export default {
  components: { Campo, CampoDropDown, CampoText, TabelaMarota },
  data() {
    return {
      jogador: jogadorNovo(),
      jogadores: [],
      carregando: true,
      editando: false,
      posicao:  [
        "ATACANTE",
        "GOLEIRO", 
        "LATERAL DIREITO",  
        "LATERAL ESQUERDO", 
        "MEIA ARMADOR",  
        "PONTA DIREITA", 
        "PONTA ESQUERDA", 
        "QUARTO ZAGUEIRO", 
        "SEGUNDO VOLANTE",
        "VOLANTE", 
        "ZAGUEIRO CENTRAL"
      ],
    };
  },
  methods: {
    salvar() {
      axios
        .post("https://sheetdb.io/api/v1/jtbp6mq4a2ywa", { data: [this.jogador] })
        .then(() => {
          this.jogadores.push(this.jogador);
          this.jogador = jogadorNovo();
          this.carregando = false;
        });
    },
    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
    apagar(jogador, index) {
      this.carregando = true;
      axios
        .delete(`https://sheetdb.io/api/v1/jtbp6mq4a2ywa/id/${jogador.id}`)
        .then(() => {
          this.jogadores.splice(index, 1);
          this.carregando = false;
        });
    },
  },
  mounted() {
    axios.get("https://sheetdb.io/api/v1/jtbp6mq4a2ywa").then(({ data }) => {
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style>
table {
  margin: 20px 0px;
}
input {
  border: none;
  border-bottom: 1px solid gray;
  margin: 0px 0px 0px 5px;
}
button {
  margin-top: 20px;
  background-color: white;
  border-radius: 1%;
  border: 1px solid #0060b6;
}
a{
  text-decoration: none;
  color: #0060b6;
}
a:hover {
  color: #00a0c6;
  cursor: pointer;
}
#content{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
}
.col-12{
  margin: 10px 5px 0px 0px;
}
label {
  margin: 5px;
}
textarea {
  border-bottom: inset;
}
</style>