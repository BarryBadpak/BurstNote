import Vue from 'vue';
import { webFrame } from 'electron';
import App from './App.vue';

Vue.config.productionTip = false;

// Disable hotkey zoom and pinch zoom
webFrame.setZoomFactor(1);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

new Vue(App).$mount('#app');
