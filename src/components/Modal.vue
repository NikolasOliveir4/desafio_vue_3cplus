<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="open"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Novo usuário</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="form_order" @submit="register">
            <div class="row_container">
              <label for="name">Nome do usuário:</label>
              <input type="text" v-model="name" id="name" required />
            </div>

            <div class="row_container">
              <label for="email">Email:</label>
              <input type="email" v-model="email" id="email" required />
            </div>

            <div class="row_container">
              <label for="gender">Gênero:</label>
              <select id="gender" v-model="gender">
                <option disabled value="" selected>Escolha:</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="undefined">Não especificado</option>
              </select>
            </div>

            <div class="row_container">
              <label for="status">Status:</label>
              <div class="" id="status">
                <input type="radio" id="active" value="active" v-model="picked" checked />
                <label for="active">Ativo</label>
                &nbsp
                <input type="radio" id="inactive" value="inactive" v-model="picked" />
                <label for="inactive">Inativo</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Fechar
          </button>
          <button type="button" class="btn btn-primary" @click="submit">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

label {
  margin: unset;
}
</style>

<script>
export default {
  name: "Modal",
  data() {
    return { picked: "active" };
  },
  methods: {
    submit: function () {
      /*
      var obj = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        status: this.picked
      }

      axios
        .post("https://gorest.co.in/public/v2/users", {
          name: this.name,
          email: this.email,
          gender: this.gender,
          status: this.picked,
        })
        .then(function (response) {
          console.log(response);

          this.name = "";
          this.email = "";
          this.gender = "";
          this.picked = "active";
        })
        .catch(function (error) {
          console.log(error);
        });*/
    },
  },
};
</script>
