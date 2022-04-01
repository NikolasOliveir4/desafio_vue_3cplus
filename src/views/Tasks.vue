<template>
  <div class="container">
    <div class="body">
      <div class="navigation">
        <h2 class="h2">Tarefas</h2>
        <p class="p"><a class="a" href="#">Home</a> > Usuários</p>
      </div>
      <form>
        <div class="form-row">
          <div class="col-10 search">
            <input type="text" class="form-control" placeholder="Buscar" />
          </div>
          <div class="col filter">
            <input type="text" class="form-control" placeholder="Filter" />
          </div>
        </div>
      </form>
      <div class="kanban">
        <div class="border_task">
          <span class="grey">Title</span>
          <form class="kanban_form">
            <input
              type="text"
              placeholder="Titulo da tarefa"
              class="form_space"
              v-model="title"
            />

            <select v-model="usuario" class="form_space">
              <option v-for="user in users" :key="user.id" :value="[user.name, user.id]">
                {{ user.name }}
              </option>
            </select>

            <textarea
              class="form_space"
              rows="3"
              placeholder="Descrição da tarefa"
              v-model="description"
            ></textarea>
            <div class="form_footer">
              <input type="date" v-model="date" />
              <button type="button" class="btn btn-primary btn-sm" @click="addTask()">
                Salvar
              </button>
            </div>
          </form>
        </div>
        <div class="border">
          <span class="blue">Executando</span>
          <template v-for="(item, index) in objeto" :key="index">
            <section
              class="card_task"
              draggable="true"
              @dragstart="drag($event)"
              :id="index"
            >
              <h4>{{ item.title }}</h4>
              <p>{{ item.usuario }}</p>
              <p>{{ item.description }}</p>
            </section>
          </template>
        </div>
        <div class="border" id="div1" @drop.prevent="drop($event)" @dragover.prevent>
          <span class="green">Tarefas Prontas</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      title: "",
      usuario: "",
      description: "",
      date: "",
      id_user: "",
      objeto: [],
    };
  },
  methods: {
    addTask: function () {
      const objeto = {
        title: this.title,
        usuario: this.usuario[0],
        description: this.description,
        date: this.date,
        id_users: this.usuario[1],
      };
      this.objeto = [...this.objeto, objeto];

      (this.title = ""), (this.usuario = ""), (this.description = ""), (this.date = "");
    },

    getUsers: async function () {
      axios
        .get("https://gorest.co.in/public/v2/users")
        .then((resp) => {
          const data = resp.data;
          this.users = data;
        })
        .catch((err) => console.log(err));
      return this.users;
    },

    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },

    drop: (ev) => {
      if (ev.target.classList.contains("border")) {
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      } else {
        const border_task = document.querySelector("#div1");
        var data = ev.dataTransfer.getData("text");
        border_task.appendChild(document.getElementById(data));
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
.search {
  padding-right: 0;
}

.filter {
  padding-left: 2px;
}

.kanban {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

.kanban div {
  width: 30%;
  background-color: white;
}

.border_task {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  width: 400px;
  height: 50%;
  border: 1px solid black !important;
}
.border {
  position: relative;
  overflow-y: scroll;
  width: 400px;
  height: 70vh;
  border: 1px solid black !important;
}

.card_task {
  margin: 10px 5px;
  border: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
}

.kanban span {
  display: block;
  color: white;
  height: 40px;
  padding: 8px 10px;
}

.kanban form {
  margin: 5px;
}

.form_space {
  width: 100%;
  margin-bottom: 10px;
  padding-left: 5px;
}

.kanban_form input[type="text"] {
  border: 2px solid black;
  height: 30px;
}

.kanban_form input[type="date"] {
  border: 2px solid black;
}

.kanban_form select {
  background-color: unset;
  border: 2px solid black;
  height: 30px;
  width: 100%;
}

.kanban_form textarea {
  border: 2px solid black;
  resize: vertical;
}

.kanban_form button {
  float: right;
  width: 5.5rem;
}

.kanban_form svg {
  margin-inline: auto;
}

.form_footer {
  display: flex;
  width: 100% !important;
  align-items: center;
  justify-content: space-evenly;
}

.grey {
  background-color: #999999;
}
.blue {
  background-color: #227ade;
}
.green {
  background-color: #6ca759;
}
</style>
