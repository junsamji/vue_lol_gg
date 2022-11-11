<template>
  <div class="editor">
    <h1>Editor 연습</h1>
    <div id="app">
      <CkEditor @sendContent="getContent" :content="intialData"></CkEditor>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CkEditor from '@/components/CkEditor.vue'
export default {
  name: 'EditorView',
  components: { CkEditor },
  setup() {
    const intialData = ref('hello world')
    const getContent = (val) => {
      console.log(val)
    }
    return { getContent, intialData }
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  margin-top: 100px;
}
</style>
