<template>
    <div>
        <h3>Mais Informações dos Times</h3>
        <div id="content">
        <table>
        <thead>
            <th>Nome</th>
            <th>Estado</th>
            <th>Técnico</th>
            <th>Torcida</th>
            <th>Ano</th>
            <th>Info</th>
        </thead>
        <tbody>
            <tr v-for="(time, index) in times">
            <td>{{ time.nome }}</td>
            <td>{{ time.estado }}</td>
            <td>{{ time.tecnico }}</td>
            <td>{{ time.torcida }}</td>
            <td>{{ time.fundacao_ano }}</td>
            <td>{{ time.info }}</td>
            <td>
                <router-link to="/jogadores"><button class="border-none"><span class="material-icons">face</span></button></router-link>
                <button class="border-none" @click="editar(time)" ><span class="material-icons">edit</span></button>
                <span v-if="carregando">carregando...</span>
                <button class="border-none" v-else @click="apagar(time, index)" ><span class="material-icons">delete</span></button>
            </td>
            </tr>
        </tbody>
        </table>
        </div>
        
        <div id="editarcontent">
            <router-link to="/cadastrotimes"><button>Cadastrar Novo Time</button></router-link>
        </div>

        <div class="editarcontent" id="editarcontent">
            <h4 style="align-self: normal;">- Editando -</h4>
            <Campo nome="Nome" v-model="time.nome"></Campo>
            <CampoDropDown nome="Estado" v-model="time.estado" :itens="estados"></CampoDropDown>
            <Campo nome="Técnico" v-model="time.tecnico"></Campo>
            <Campo nome="Torcida" tipo="number" v-model="time.torcida"></Campo>
            <Campo nome="Fundação" tipo="number" v-model="time.fundacao_ano"></Campo>
            <CampoText nome="Informações" tipo="texto" v-model="time.info"></CampoText>
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

let timeNovo = () => {
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
      time: timeNovo(),
      times: [],
      carregando: true,
      editando: false,
      estados: [
        "AC", "AL",  "AP", "AM",
        "BA", "CE", "DF", "ES", "GO",
        "MA",  "MT", "MS", "MG",
        "PA", "PB",  "PR", "PE", "PI",
        "RJ", "RN", "RS", "RO", "RR",
        "SC", "SE",  "SP",
        "TO",
      ],
    };
  },
  methods: {
    salvar() {
      axios
        .post("https://sheetdb.io/api/v1/7j443ehnc0qn8", { data: [this.time] })
        .then(() => {
          this.times.push(this.time);
          this.time = timeNovo();
          this.carregando = false;
        });
    },
    editar(time) {
      this.editando = true;
      this.time = time;
    },
    apagar(time, index) {
      this.carregando = true;
      axios
        .delete(`https://sheetdb.io/api/v1/7j443ehnc0qn8/id/${time.id}`)
        .then(() => {
          this.times.splice(index, 1);
          this.carregando = false;
        });
    },
  },
  mounted() {
    axios.get("https://sheetdb.io/api/v1/7j443ehnc0qn8").then(({ data }) => {
      this.times = data;
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