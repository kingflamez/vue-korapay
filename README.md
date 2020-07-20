# Korapay for Vue 2.x

![Demo](https://github.com/SomtoUgeh/react-korapay/raw/master/media/demo.png)

This helps you accept payment using Korapay’s Collection Modal in your Vue app

[![NPM](https://img.shields.io/npm/v/vue-korapay.svg)](https://www.npmjs.com/package/vue-korapay) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

### Vue

Install the npm package:

```bash
npm install --save @kingflamez/vue-korapay
# OR
yarn add @kingflamez/vue-korapay
```

Add the Vue plugin in your main.js and pass your [public key](https://merchant.korapay.com/dashboard/settings/api-integrations):

```javascript
import Vue from 'vue'
import Korapay from 'vue-korapay'

Vue.use(Korapay, {public_key: 'pk_test_**********************'})
```

### Nuxt

Install the npm package:

```bash
npm install --save vue-korapay
# OR
yarn add vue-korapay
```

Create a `korapay.js` file in your `plugins` folder and add the Vue plugin:

```javascript
// plugins/korapay.js

import Vue from 'vue'
import Korapay from 'vue-korapay'

Vue.use(Korapay, {public_key: 'pk_test_**********************'})
```

Go to your `nuxt.config.js` and add it to your plugin section

```javascript
/*
** Plugins to load before mounting the App
** https://nuxtjs.org/guide/plugins
*/
............
plugins: [{src: '~/plugins/korapay', ssr: false},],
...........

```

## Usage

### 1. Using the method

Korapay can be called using `$payWithKorapay()` method, see example below

```vue
<template>
  <form action="#" @submit.prevent="makePayment">
    <div class="btn-wrapper">
      <input type="number" v-model.number="amount" />
      <button type="submit">Make Payment</button>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    data () {
      return {
        amount: 200
      }
    },

    makePayment () {
      this.$payWithKorapay({
        amount: this.amount,
        customer: {
          name: 'John Doe',
          email: 'john@doe.com'
        },
        onClose: function () {
          // Handle when modal is closed
        },
        onSuccess: function (data) {
          // Handle when payment is successful
          console.log(data)
        },
        onFailed: function (data) {
          // Handle when payment fails
          console.log(data)
        }
      })
    }
  }
}
</script>
```

### 2. Using the component

Korapay can be called using the `Korapay` component eg: `<Korapay>Pay Now</Korapay>`. See example below

```vue
<template>
  <Korapay :amount="3000" korapayClass="btn-kpy --full-green" customer_name="John Doe" customer_email="john@doe.com" @onClose="paymentClosed" @onSuccess="paymentSuccessful" @onFailed="paymentFailed">
    Make Payment
  </Korapay>
</template>

<script>
export default {
  methods: {
    makePayment () {
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
}
</script>
```

## `$payWithKorapay()` Method

### Parameters

| Field            | Data Type     | Description                                                                                                                                                                                                                                                                |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount           | integer       | Required - Amount in naira                                                                                                                                                                                                                                                 |
| customer         |               | Required - JSON object containing customer details                                                                                                                                                                                                                         |
| customer.name    | string        | Required - field in the customer object. Customer name derived from name enquiry.                                                                                                                                                                                          |
| customer.email   | string        | Required - field in the customer object. Customer email address                                                                                                                                                                                                            |
| currency         | string        | Optional - Currency of the charge. Default is NGN (Nigerian Naira)                                                                                                                                                                                                         |
| reference        | string        | Optional - transaction reference. If you do not provide one, a unique transaction reference would be generated for the transaction.                                                                                                                                        |
| reference        | string        | Optional - transaction reference. If you do not provide one, a unique transaction reference would be generated for the transaction.                                                                                                                                        |
| notification_url | string        | Optional - HTTP endpoint to send information to on payment termination, success, or failure. This overrides the webhook URL set on your merchant dashboard for this particular transaction                                                                                 |
| narration        | string        | Optional - Information/narration about the transaction                                                                                                                                                                                                                     |
| channels         | array[string] | Optional - Methods of payment eg. Bank (bank_transfer), card(card). Default is [“bank_transfer”, “card”]                                                                                                                                                                   |
| container        | string        | Optional - Id of HTML element you want the payment gateway to be contained in. Note that this would reset all styling on this element. The payment gateway would be resized to fit the container. If this is not set, the payment gateway fills the available screen size. |

### Events

| Field       | Data Type  | Description                                                                       |
| ----------- | ---------- | --------------------------------------------------------------------------------- |
| onClose     | [Function] | Optional - function to be called when the payment gateway is closed               |
| onSuccess   | [Function] | Optional - function to be called when the payment is completed successfully       |
| onFailed    | [Function] | Optional - function to be called when the payment failed                          |
| onTokenized | [Function] | Optional - function to be called when card tokenization is completed successfully |

## `Korapay` Component

### Parameters

| Field            | Data Type     | Description                                                                                                                                                                                                                                                                |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| korapayClass     | string        | Optional - Pass css classes to style your component                                                                                                                                                                                                                        |
| disabled         | boolean       | Optional - Disable or Enable the payment button                                                                                                                                                                                                                            |
| amount           | integer       | Required - Amount in naira                                                                                                                                                                                                                                                 |
| customer_name    | string        | Required - field in the customer object. Customer name derived from name enquiry.                                                                                                                                                                                          |
| customer_email   | string        | Required - field in the customer object. Customer email address                                                                                                                                                                                                            |
| currency         | string        | Optional - Currency of the charge. Default is NGN (Nigerian Naira)                                                                                                                                                                                                         |
| reference        | string        | Optional - transaction reference. If you do not provide one, a unique transaction reference would be generated for the transaction.                                                                                                                                        |
| reference        | string        | Optional - transaction reference. If you do not provide one, a unique transaction reference would be generated for the transaction.                                                                                                                                        |
| notification_url | string        | Optional - HTTP endpoint to send information to on payment termination, success, or failure. This overrides the webhook URL set on your merchant dashboard for this particular transaction                                                                                 |
| narration        | string        | Optional - Information/narration about the transaction                                                                                                                                                                                                                     |
| channels         | array[string] | Optional - Methods of payment eg. Bank (bank_transfer), card(card). Default is [“bank_transfer”, “card”]                                                                                                                                                                   |
| container        | string        | Optional - Id of HTML element you want the payment gateway to be contained in. Note that this would reset all styling on this element. The payment gateway would be resized to fit the container. If this is not set, the payment gateway fills the available screen size. |

### Events

| Field        | Data Type  | Description                                                                       |
| ------------ | ---------- | --------------------------------------------------------------------------------- |
| @onClose     | [Function] | Optional - function to be called when the payment gateway is closed               |
| @onSuccess   | [Function] | Optional - function to be called when the payment is completed successfully       |
| @onFailed    | [Function] | Optional - function to be called when the payment failed                          |
| @onTokenized | [Function] | Optional - function to be called when card tokenization is completed successfully |

> The Korapay component accepts a slot so you can pass in more data into your button apart from plain text

Please checkout
[Korapay Documentation](https://korahq.atlassian.net/wiki/spaces/AR/pages/1064370549/Collection+Modal) for more explanation

## License

Follow on Twitter [@mrflamez\_](https://twitter.com/mrflamez_)

MIT © [kingflamez](https://github.com/kingflamez)
