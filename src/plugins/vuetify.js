import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import config from '@/config'
import 'font-awesome/css/font-awesome.css'
Vue.use(Vuetify);
import vi from './vi'
export default new Vuetify({
    theme: {
        themes: {
            light: config.light
        }
    },
    lang: {
        locales: {vi},
        current: 'vi'
    }
});
