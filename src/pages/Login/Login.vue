<template>
  <div class="login-page">
    <q-card class="login-card" @keyup.enter="logInWithEmail">
      <div class="info-icon">
        <q-icon name="error_outline" />
        <div class="extra-info">Now we have members:
          <ul>
            <li>Email: 123@test.com, Password: 123</li>
            <li>Email: 456@test.com, Password: 456</li>
          </ul>
        </div>
      </div>
      <div class="login-title">
        <div class="login-text">Login Into Your Account</div>
      </div>
      <div class="login-part login-text">
        <div class="email-login">
          <!-- Login with email -->
          <q-input
            v-model="email"
            type="text"
            label="Email"
            class="input-field"
            :error="$v.email.$error"
            @blur="$v.email.$touch()"
            color="faded" />
          <div
            v-if="$v.email.$error && !$v.email.required"
            class="error-message"
          >
            Please fill the email
          </div>
          <div
            v-if="$v.email.$error && !$v.email.email"
            class="error-message"
          >
            Please input correct e-mail
          </div>
          <q-input
            v-model="password"
            type="password"
            label="Password"
            class="input-field"
            :error="$v.password.$error"
            @blur="$v.password.$touch()"
            color="faded" />
          <div
            v-if="$v.password.$error"
            class="error-message"
          >
            Please fill the password
          </div>
          <div class="remember-check">
            <q-checkbox
             label="Remember Me"
             v-model="rememberEmail" />
          </div>
          <q-btn
            color="primary"
            class="login-button"
            @click="logInWithEmail"
          >
            Sign in
          </q-btn>
        </div>
        <div class="or">
          <div class="up line"></div>
          <span class="or-text"> or </span>
          <div class="down line"></div>
        </div>
        <div class="third-party-login">
          <!-- Login with third part-->
          <q-btn
            color="blue-10"
            class="third-party-button"
            icon="fab fa-facebook-f"
            label="Sign in with Facebook"
            @click="logInWithThirdParty('/loginWithFacebook')"
          />
          <q-btn
            color="cyan-13"
            class="third-party-button"
            icon="fab fa-twitter"
            label="Sign in with Twitter"
            @click="logInWithThirdParty('/loginWithTwitter')"
          />
          <q-btn
            color="deep-orange-9"
            class="third-party-button"
            icon="fab fa-google"
            label="Sign in with Google"
            @click="logInWithThirdParty('/loginWithGoogle')"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import '@quasar/extras/fontawesome-v5'
import axios from 'axios'
import { email, required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      rememberEmail: false
    }
  },
  methods: {
    checkEmail () {
      const prevEmail = localStorage.getItem('email')
      if (prevEmail) this.email = localStorage.getItem('email')
      this.rememberEmail = localStorage.getItem('RememberMe') === 'true'
    },
    saveRememberMe () {
      this.rememberEmail ? this.saveEmail() : this.removeEmail()
      localStorage.setItem('RememberMe', this.rememberEmail)
    },
    saveEmail () {
      localStorage.setItem('email', this.email)
    },
    removeEmail () {
      localStorage.removeItem('email')
    },
    successNotification (res) {
      this.$q.notify({
        message: res.data.message,
        type: 'positive',
        icon: 'check',
        timeout: 1000
      })
    },
    errorNotification (errorMessage) {
      this.$q.notify({
        message: errorMessage,
        type: 'negative',
        icon: 'warning',
        timeout: 1000
      })
    },
    goTo (loginPath) {
      this.$router.push({
        name: 'Home',
        params: {
          loginPath: loginPath
        }
      })
    },
    logInWithEmail () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveRememberMe()
        axios.post('/loginWithEmail', {
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.successNotification(res)
            this.goTo('/loginWithEmail')
          })
          .catch(err => {
            this.errorNotification(err.response.data.message)
          })
      }
    },
    logInWithThirdParty (path) {
      axios.post(path)
        .then(res => {
          this.successNotification(res)
          this.goTo(path)
        })
        .catch(err => this.errorNotification(err.response.data.message))
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required
    }
  },
  mounted () {
    this.checkEmail()
  }
}
</script>

<style lang="stylus">
@import './login.styl';

</style>
