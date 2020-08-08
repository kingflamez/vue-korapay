<template>
  <button
    type="button"
    :disabled="disabled"
    :class="korapayClass"
    @click="makePayment"
  >
    <slot />
  </button>
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
            type: String,
            default: Date.now()
        },
        customerName: {
            type: String,
            required: true
        },
        customerEmail: {
            type: String,
            required: true
        },
        notificationUrl: {
            type: String,
            required: false,
            default: null
        },
        naration: {
            type: String,
            required: false,
            default: null
        },
        channels: {
            type: String,
            required: false,
            default: null
        },
        container: {
            type: String,
            required: false,
            default: null
        }
    },
    methods: {
        makePayment() {
            // Assign this to variable self so as to use it in the korapay method
            const self = this
            const {amount, currency, reference, notificationUrl, naration, channels, container} = self
            this.$payWithKorapay({
                amount,
                currency,
                reference,
                notificationUrl,
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
