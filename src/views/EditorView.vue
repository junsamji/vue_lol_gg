<template>
  <div class="black-bg" v-if="modal">
    <div class="white-bg">
      <h4>전송 Test</h4>
      <!-- <p class="line-red">{{ typing.data }}</p> -->
      <textarea class="line-red" v-model="typing.data" readonly></textarea>
      <!-- <div class="line-red">{{ typing.data }}</div> -->
      <p><span @click="modal = false" class="spanButton">닫기</span></p>
    </div>
  </div>

  <div class="editor" v-if="!modal">
    <h1>Q & A</h1>
    <div>
      <CkEditor @sendContent="getContent" :content="intialData"></CkEditor>
    </div>
    <div>
      <span @click="modal = true" class="spanButton">전송</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CkEditor from '@/components/CkEditor.vue'
export default {
  name: 'EditorView',
  components: { CkEditor },
  data() {
    return {
      editorData: {},
      modal: false,
      getTyping: this.typing
    }
  },
  setup() {
    const intialData = ref('hello world')
    const typing = ref({ data: intialData })
    const getContent = (val) => {
      typing.value.data = val
    }
    return { intialData, typing, getContent }
  },
  methods: {}
}
</script>

<style>
@import '@/style/common.css';
</style>

<style scoped>
div {
  padding-top: 10px;
}

@media screen and (min-width: 769px) {
  .line-red {
    border: 1px solid blue;
    width: 100%;
    height: 50%;
  }
}

@media only screen and (max-width: 769px) {
  .line-red {
    border: 1px solid red;
    width: 100%;
    height: 255px;
  }
}

.editor {
  width: 100%;
  margin-top: 100px;
}
</style>
