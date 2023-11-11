<template>
  <div class="login-container">
    <img src="https://cdn.discordapp.com/attachments/1091506792900595863/1153760874822107216/victoria..png" alt="Logo" class="login-logo">

    <form @submit.prevent="login">
      <input
        type="email"
        v-model="credentials.email"
        :class="{ 'input-error': loginError }"
        placeholder="Email"
        required
      />
      <input
        type="password"
        v-model="credentials.password"
        :class="{ 'input-error': loginError }"
        placeholder="Senha"
        required
      />
      <button type="submit">Entrar</button>
      <p v-if="loginError" class="error-message">Dados incorretos</p>

    </form>
  </div>
</template>

<script>
import api from "@/plugins/api";

export default {
    data() {
        return {
            credentials: {
                email: "",
                password: "",
            },
            loginError: false, // Adiciona esta linha
        };
    },
    methods: {
        async login() {
            try {
                const response = await api.post("/api/login/", this.credentials);
                localStorage.setItem("authToken", response.data.token);
                this.$router.push("/");
                this.loginError = false; // Reseta o erro em caso de sucesso
            } catch (error) {
                console.error(error);
                this.loginError = true; // Ativa o erro em caso de falha
            }
        },
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.login-logo {
  align-self: center;
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 28px;
  background-color: #fff;
}

.login-container input {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 12px;
  padding-left: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  background-color: white;
}

.login-container button {
  background-color: #FB5F21;
  padding: 15px;
  border-radius: 12px;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  border: none;

}

.forgot-password {
  color: #FB5F21;
  text-align: center;
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
}

.login-container input,
.login-container button {
  font-family: 'Poppins', sans-serif;
}

.input-error {
  animation: shake 0.5s;
  border-color: red;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%, 75% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
}

.error-message {
  color: red;
  opacity: 0.7;
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
}
</style>
