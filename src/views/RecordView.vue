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
    <hr />
    <div v-if="summoner_information.puuid !== undefined">
      <table class="center_table">
        <thead>
          <tr>
            <th>
              <span>소환사정보 갱신</span>
            </th>
            <th colspan="3">
              <span>{{ summoner_information.revisionDate }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                :src="
                  profile_img_url + summoner_information.profileIconId + '.png'
                "
                class="profile_img"
              />
            </td>
            <td colspan="2">
              <span>{{ summoner_information.name }}</span>
            </td>
            <td>
              <span>Lv</span
              ><span>{{ summoner_information.summonerLevel }}</span>
            </td>
          </tr>
        </tbody>
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
      profile_img_url: process.env.VUE_APP_PROFILE_ICON,
      summoner_name: '',
      summoner_information: {}
    }
  },
  methods: {
    searchSpan() {
      // alert('[' + this.summoner_name + ']님 현재 작업 중 입니다 ^^;')
      this.getSummoners()
    },
    getSummoners() {
      const baseURI =
        'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name'
      const apiKey = process.env.VUE_APP_RIOT_KEY
      const summoner = this.summoner_name

      this.$axios
        .get(`${baseURI}/${summoner}?api_key=${apiKey}`, '', '')
        .then((res) => {
          // this.rotations = res.data
          // localStorage.setItem('lsRotations', JSON.stringify(res.data))
          // if (res.data.freeChampionIds.length > 0) {
          //   localStorage.setItem('date', this.date)
          // }
          // this.setRota_champ()
          this.summoner_information = res.data
          // console.log(this.summoner_information.puuid)
          this.timeStampConversion()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    timeStampConversion() {
      const dateTime = new Date(this.summoner_information.revisionDate)
      const year = dateTime.getFullYear()
      const month = ('00' + (dateTime.getMonth() + 1)).slice(-2)
      const day = ('00' + dateTime.getDate()).slice(-2)
      const time =
        ('00' + dateTime.getHours()).slice(-2) +
        ':' +
        ('00' + dateTime.getMinutes()).slice(-2) +
        ':' +
        ('00' + dateTime.getSeconds()).slice(-2)

      // console.log(dateTime)
      this.summoner_information.revisionDate =
        year + '/' + month + '/' + day + ' ' + time
    }
  }
}
</script>
<style>
@import '@/style/common.css';
</style>
<style scoped>
hr {
  width: 91%;
  height: 2px;
  background-color: rgba(72, 61, 139, 1);
}

.record {
  width: 100%;
  margin-top: 100px;
}

.back_img {
  width: 20%;
}

.center_table {
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.profile_img {
  max-width: 100px;
  width: 30%;
  padding-top: 5px;
}
</style>
