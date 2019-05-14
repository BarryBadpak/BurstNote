import Vue from 'vue';
import { webFrame } from 'electron';
import App from './App.vue';
import ElementUI from 'element-ui';
import './../style/main.scss';
import DI from '../common/environment/di';

Vue.config.productionTip = false;

// Disable hotkey zoom and pinch zoom
webFrame.setZoomFactor(1);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

const di = new DI();
di.TYPE_XXXXX;

Vue.use(ElementUI);

new Vue(App).$mount('#app');
