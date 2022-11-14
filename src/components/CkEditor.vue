<template>
  <textarea id="editor1" name="editor1"></textarea>
</template>
<script>
import { onMounted, ref, watch } from 'vue'
export default {
  name: 'CkEditor',
  props: ['content'],
  setup(props, { emit }) {
    const content = ref(props.content)
    let ckEditor
    onMounted(() => {
      // initalize ckeditor
      ckEditor = window.CKEDITOR.replace('editor1')
      // setting Data
      ckEditor.setData(content.value)
      // on change event
      ckEditor.on('change', () => {
        // emit('sendContent', ckEditor.getData())
        emit('sendContent', ckEditor.document.getBody().getHtml())
      })
    })
    watch(content, () => {
      if (content.value !== ckEditor.getData()) {
        ckEditor.setData(content.value)
      }
    })
  }
}
</script>
<style></style>
