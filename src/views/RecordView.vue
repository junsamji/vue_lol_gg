<template>
  <div class="record" v-if="working">
    <h1>전적 검색</h1>
    <img :src="require('@/assets/coding_ing.png')" class="back_img" />
    <p>From. 쭌sss</p>
  </div>

  <div class="record" v-else>
    <div>
      <table class="center_table">
        <thead>
          <tr>
            <th>
              <span>소환사명..</span>
            </th>
            <th>
              <input type="text" v-model="summoner_name" />
            </th>
            <th>
              <span class="spanButton" @click="searchSpan">조회</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordView',
  data() {
    return {
      working: false,
      summoner_name: ''
    }
  },
  methods: {
    searchSpan() {
      alert('[' + this.summoner_name + ']님 현재 작업 중 입니다 ^^;')
    }
  }
}
</script>
<style>
@import '@/style/common.css';
</style>
<style scoped>
.record {
  width: 100%;
  margin-top: 100px;
}

.back_img {
  width: 20%;
}

.center_table {
  margin-left: auto;
  margin-right: auto;
}
</style>
