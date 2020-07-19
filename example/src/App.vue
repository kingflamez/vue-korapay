<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <form action="#" @submit.prevent="makePayment">
      <input type="text" v-currency inputmode="numeric" v-model="amount" />
      <div class="btn-wrapper">
        <button class="btn-kpy --full-green" type="submit" :disabled="$parseCurrency(amount) < 100">Make Payment</button>
      </div>
    </form>
    <hr />
    <form action="#">
      <Korapay :amount="3000" korapayClass="btn-kpy --full-green" customer_name="John Doe" customer_email="john@doe.com" @onClose="paymentClosed" @onSuccess="paymentSuccessful" @onFailed="paymentFailed">
        Make Payment
      </Korapay>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      amount: ''
    }
  },
  methods: {
    makePayment() {
      this.$payWithKorapay({
        amount: this.$parseCurrency(this.amount),
        currency: 'NGN',
        customer: {
          name: 'John Doe',
          email: 'john@doe.com'
        },
        onClose: function() {
          // Handle when modal is closed
          console.log('closed modal')
        },
        onSuccess: function(data) {
          // Handle when payment is successful
          console.log(data)
        },
        onFailed: function(data) {
          // Handle when payment fails
          console.log(data)
        }
      })
    },
    paymentClosed() {
      console.log('Payment Closed')
    },
    paymentSuccessful(data) {
      console.log('Payment Succeesful', data)
    },
    paymentFailed(data) {
      console.log('Payment Failed', data)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
form {
  margin: 0 auto;
  max-width: 400px;
}
input {
  display: block;
  border: 2px solid #eff2f7;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: none;
  font-size: 1rem;
  background-color: #fff;
  color: #4a4a4a;
  font-weight: 400;
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
  width: 100%;
  outline: none;
}
.btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.btn-kpy {
  color: #fff;
  background: #2376f3;
  padding: 1.25rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  text-decoration: none;
}
.--full-green {
  width: 100%;
}
.btn-kpy.--full-green:disabled {
  background-color: #1baf8e !important;
  opacity: 0.3;
}
.btn-kpy.--full-green {
  color: #fff;
  background: #48ceb0;
  padding: 1.1rem 1.87rem;
  font-weight: 500;
}
</style>
