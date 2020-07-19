<template>
  <button type="button" @click="makePayment" :disabled="disabled" :class="korapayClass"><slot></slot></button>
</template>

<script>
export default {
  name: 'Korapay',
  props: {
    korapayClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'NGN'
    },
    reference: {
      type: String
    },
    customer_name: {
      type: String,
      required: true
    },
    customer_email: {
      type: String,
      required: true
    },
    notification_url: {
      type: String
    },
    naration: {
      type: String
    },
    channels: {
      type: String
    },
    container: {
      type: String
    }
  },
  methods: {
    makePayment() {
      // Assign this to variable self so as to use it in the korapay method
      const self = this
      const {amount, currency, reference, notification_url, naration, channels, container} = self
      this.$payWithKorapay({
        amount,
        currency,
        reference,
        notification_url,
        naration,
        channels,
        container,
        customer: {
          name: self.customer_name,
          email: self.customer_email
        },
        onClose: function() {
          self.$emit('onClose')
        },
        onSuccess: function(data) {
          self.$emit('onSuccess', data)
        },
        onFailed: function(data) {
          self.$emit('onFailed', data)
        },
        onTokenized: function(data) {
          self.$emit('onTokenized', data)
        }
      })
    }
  }
}
</script>

<style></style>
