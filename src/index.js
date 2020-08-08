import Korapay from './components/Korapay.vue'

const KorapayJS = {
    install(Vue, {publicKey}) {
        Vue.component('Korapay', {...Korapay})
        Vue.prototype.$payWithKorapay = data => {
            window.Korapay.initialize({...data, key: publicKey})
        }
        Vue.mixin({
            mounted() {
                const korapayJS = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js'
                const script = document.createElement('script')
                script.src = korapayJS
                // Only add if korapay has not been added to the body
                if (!document.querySelector(`[src="${korapayJS}"]`)) {
                    document.body.appendChild(script)
                }
            }
        })
    }
}

export default KorapayJS
