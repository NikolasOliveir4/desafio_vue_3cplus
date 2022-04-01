<template>
  <div class="container">
    <div class="body">
      <div class="navigation">
        <h2 class="h2">Users</h2>
        <p class="p"><a class="a" href="#">Home</a> > Usuários</p>
      </div>

      <div class="field input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="modal"
            data-target="#open"
          >
            Novo usuário
          </button>
        </div>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.gender }}</td>
            <template v-if="user.status == 'active'">
              <td>
                <span
                  style="
                    color: white;
                    background: green;
                    padding: 5px 10px;
                    border-radius: 3px;
                  "
                  >{{ user.status }}</span
                >
              </td>
            </template>
            <template v-else>
              <td>
                <span
                  style="
                    color: white;
                    background: #999999;
                    padding: 5px 10px;
                    border-radius: 3px;
                  "
                  >{{ user.status }}</span
                >
              </td>
            </template>
            <td>
              <button
                class="btn btn-primary"
                @click="$router.push({ name: 'tasks', params: { id: user.id } })"
              >
                Abrir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-between">
          <div>
            <li class="page-item" id="prev">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
          </div>

          <div class="d-flex row" id="list">
            <li class="page-item item" v-for="(page, index) in this.total_page" :key="index">
              <a class="page-link" :id="index + 1">{{
                index + 1
              }}</a>
            </li>
          </div>

          <div>
            <li class="page-item" id="next">
              <a class="page-link" href="#">Next</a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </div>

  <Modal />
</template>

<style scoped lang="scss">
table {
  margin: 5px auto;
  margin-bottom: 0;
  width: 1000px !important;
}
.field {
  display: flex !important;
  width: 1000px;
  margin-inline: auto;
}

nav {
  background-color: white;
  padding-inline: 5px;
  border-radius: 2px;
}
</style>

<script>
import Modal from "../components/Modal.vue";
export default {
  name: "UsersTable",
  components: {
    Modal,
  },
  data() {
    return {
      users: null,
      total_page: 0
    };
  },
  methods: {
    getUsers: async function () {
      axios
        .get("https://gorest.co.in/public/v2/users")
        .then((resp) => {
          const data = resp.data;
          this.users = data;
          this.total_page = Math.ceil(this.users.length / 5);
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.getUsers();
  },
};
  axios.get("https://gorest.co.in/public/v2/users").then((resp) => {
    let data = resp.data;
      
    let per_page = 5
    const state = {
      page: 1,
      total_page: Math.ceil(data.length/per_page)
    }

    const html = {
      get(element){
        return document.querySelector(element)
      }
    }

    function next(){
      state.page++

      if(state.page > state.total_page){
        state.page--
      }
    }
    
    function prev(){
      state.page--

      if(state.page < 1){
        state.page++
      }
    }

    function goTo(page){
      if(page < 1){
        page = 1
      }

      state.page = page

      if(page > state.total_page){
        state.page = state.total_page
        }
      }

    function createListeners(){
      addEventListener('click', (el) => {
        if(el.target.id != null && Number.parseInt(el.target.id)){
          goTo(el.target.id)
          update()
        }
      })
      html.get('#prev').addEventListener('click', () => {
        prev()
        update()
      })
      html.get('#next').addEventListener('click', () => {
        next()
        update()
      })
    }
    createListeners()
  }).catch((err) => console.log(err));
</script>
