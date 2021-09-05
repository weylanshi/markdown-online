import { createApp } from 'vue';
import hljs from 'highlight.js';
import App from './App.vue';

import 'highlight.js/styles/github.css';

const app = createApp(App);

app.directive('highlight', {
  mounted(el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
  updated(el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
});

app.mount('#app');
