<template>
  <div class="editor">
    <div class="head">
      <button
        class="copy-button"
        ref="copyButton"
        data-clipboard-action="copy"
        data-clipboard-target="#output"
      >
        <img src="../assets/copy.svg" />
      </button>
      <a class="copy-button"> <img src="../assets/github.svg" /> </a>
    </div>
    <div class="content">
      <div class="editor-cell editor-input">
        <textarea v-model="content" />
      </div>

      <div class="editor-cell editor-output">
        <VueShowdown
          :markdown="content"
          flavor="github"
          :options="showdown.options"
          :extensions="showdown.extensions"
          v-highlight
          class="showdown"
          id="output"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { VueShowdown } from 'vue-showdown';
import Clipboard from 'clipboard';
import showdownKatex from 'showdown-katex';
import footnote from './extensions/showdown-footnote';

require('../css/index.less');

export default {
  components: {
    VueShowdown,
  },
  data() {
    return {
      content: '',
      showdown: {
        options: {
          emoji: true,
          tables: true,
          tasklists: true,
          openLinksInNewWindow: true,
        },
        extensions: [
          footnote,
          showdownKatex({
            // maybe you want katex to throwOnError
            throwOnError: true,
            // disable displayMode
            displayMode: false,
            // change errorColor to blue
            errorColor: '#1500ff',
            delimiters: [{ left: '$$', right: '$$', asciimath: true }],
          }),
        ],
      },
    };
  },
  mounted() {
    this.getDemo();
    this.changeHeight();
    window.onresize = () => {
      this.changeHeight();
    };
    this.initClipboard();
  },
  methods: {
    changeHeight() {
      const dom = document.querySelector('.editor-input');
      const domRight = document.querySelector('.showdown');
      const { clientHeight } = document.documentElement;
      dom.style.height = `${clientHeight}px`;
      domRight.style.height = `${clientHeight - 30}px`;
    },
    // 初始化复制插件
    initClipboard() {
      const clipboard = new Clipboard(this.$refs.copyButton);
      // eslint-disable-next-line no-unused-vars
      clipboard.on('success', (e) => {
        // eslint-disable-next-line no-alert
        alert('复制成功，请在微信粘贴');
      });
      // eslint-disable-next-line no-unused-vars
      clipboard.on('error', (e) => {
        // eslint-disable-next-line no-alert
        alert('复制失败，请再次尝试');
        // console.log('复制失败，请再次尝试');
      });
    },

    getDemo() {
      //  更新数据devInfo.txt文件接口
      const xhr = new XMLHttpRequest();
      // eslint-disable-next-line no-unused-vars
      const okStatus = document.location.protocol === 'file:' ? 0 : 200;
      xhr.open('GET', '/demo.md', false); // 文件路径
      xhr.overrideMimeType('text/html;charset=utf-8'); // 默认为utf-8
      xhr.send(null);
      this.content = xhr.status === okStatus ? xhr.responseText : null;
    },
  },
};
</script>

<style lang="less">
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .head {
    padding: 4px 12px;
    border-bottom: 1px solid #e1e4e8;
    background-color: #fafbfc;
    text-align: right;

    .copy-button {
      border: none;
      background-color: transparent;
      margin-right: 14px;
    }

    img {
      border: none !important;
    }
  }

  .content {
    flex: 1 1;
    display: flex;
  }

  .editor-cell {
    flex-basis: 50%;
  }

  .editor-output {
    background: #eee;
    padding: 0;
    max-width: 100%;
    overflow: hidden;
    bottom: 0;
  }
  .editor-output .showdown {
    overflow-y: auto;
    margin: 0 auto;
    background: #fff;
    padding: 1rem;
    width: 800px;
    padding-bottom: 100px;
    max-width: 100%;
  }

  textarea {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #333;
    color: #fff;
    margin: 0;
    padding: 1em;
    resize: none;
    border: none;
  }
}
</style>
