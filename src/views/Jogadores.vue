<template>
    <div>
        <h3>Jogadores</h3>
        <div id="content">
        <table>
        <thead>
            <th>Nome</th>
            <th>Camisa</th>
            <th>Salário</th>
            <th>Posição</th>
        </thead>
        <tbody>
            <tr v-for="(jogador, index) in jogadores">
            <td>{{ jogador.nome }}</td>
            <td>{{ jogador.camisa }}</td>
            <td>{{ jogador.salario }}</td>
            <td>{{ jogador.posicao }}</td>
            <td>
                <button class="border-none" @click="editar(jogador)" ><span class="material-icons">edit</span></button>
                <span v-if="carregando">carregando...</span>
                <button class="border-none" v-else @click="apagar(jogador, index)" ><span class="material-icons">delete</span></button>
            </td>
            </tr>
        </tbody>
        </table>
        </div>
        
        <div id="editarcontent">
            <router-link to="/cadastrojogadores"><button>Cadastrar Novo Jogador</button></router-link>
        </div>
        
        <div class="editarcontent" id="editarcontent">
            <h4 style="align-self: normal;">- Editar -</h4>
            <Campo nome="Nome" v-model="jogador.nome"></Campo>
            <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
            <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
            <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
        </div>
        <div id="editarcontent">
            <span v-if="carregando">carregando...</span>
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
      posicao: [
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
          this.jogadores.push(this.time);
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
#content {
    display: grid;
}
#editarcontent{
    margin-top: 30px;
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
input {
    border: none;
    border-bottom: 1px solid gray;
}
button {
  background-color: white;
  border-radius: 1%;
  border: 1px solid #0060b6;
  color: #0060b6;
}
a{
  text-decoration: none;
  color: #0060b6;
}
a:hover {
  color: #00a0c6;
  cursor: pointer;
}
.material-icons{
    color: #0060b6;
}
.border-none{
    border: none;
}
.editarcontent{
    border-top: 1px solid;
}
</style>