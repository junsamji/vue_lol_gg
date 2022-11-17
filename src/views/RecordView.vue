<template>
  <div class="record" v-if="working">
    <h1>전적 검색</h1>
    <img :src="require('@/assets/coding_ing.png')" class="back_img" />
    <p>From. 쭌sss</p>
  </div>

  <div class="record" v-else>
    <div v-if="summoner_information.puuid !== undefined">
      <div class="row justify-center">
        <div class="col text-center">
          <q-badge
            outline
            color="primary"
            :label="'latest. ' + summoner_information.revisionDate"
          />
        </div>
        <div class="col" />
        <div class="col" />
      </div>
      <div class="row flex-center" style="margin-top: 5px">
        <div class="col text-right">
          <q-avatar>
            <img
              :src="
                profile_img_url + summoner_information.profileIconId + '.png'
              "
              class="profile_img"
            />
          </q-avatar>
        </div>
        <div class="col text-center">
          {{ summoner_information.name }}
        </div>
        <div class="col text-left">
          Lv {{ summoner_information.summonerLevel }}
        </div>
      </div>
    </div>
    <!-- <div v-else style="padding-top: 30px">
      <div class="row flex-center">
        <div class="col-2" />
        <div class="col text-left">{{ messages.message1 }}</div>
        <div class="col-2" />
      </div>
      <div class="row flex-center">
        <div class="col-2" />
        <div class="col text-left">{{ messages.message2 }}</div>
        <div class="col-2" />
      </div>
    </div> -->
    <div v-else class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          name="vue_lol_gg"
          :avatar="require('@/assets/jew.png')"
          :text="[messages.message1]"
          stamp="2 seconds ago"
          sent
          bg-color="grey-4"
        />
        <q-chat-message
          name="vue_lol_gg"
          :avatar="require('@/assets/jew.png')"
          :text="[messages.message2]"
          stamp="1 seconds ago"
          sent
          bg-color="grey-4"
        />
        <q-chat-message v-if="!apiError" name="You" bg-color="amber">
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </div>
    </div>
    <hr />
    <div>
      <table class="center_table">
        <thead>
          <tr>
            <th>
              <span>소환사명..</span>
            </th>
            <th>
              <input
                type="text"
                v-model="summoner_name"
                @keyup.enter="searchSpan"
              />
            </th>
            <th>
              <!-- <span class="spanButton" @click="searchSpan">조회</span> -->
              <q-btn
                round
                color="secondary"
                icon="search"
                @click="searchSpan"
              />
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import { QSpinnerFacebook } from 'quasar'

export default {
  name: 'RecordView',
  data() {
    return {
      working: false,
      apiError: false,
      profile_img_url: process.env.VUE_APP_PROFILE_ICON,
      summoner_name: '',
      summoner_information: {},
      messages: {
        message1: '안녕하세요!',
        message2: '소환사명을 입력해보세요. :)'
      }
    }
  },
  watch: {
    summoner_name: function (val) {
      if (val === '') {
        this.messages.message1 = '본인이나 친구의 소환사명을'
        this.messages.message2 = '조회 해보세요 :)'
        this.summoner_information.puuid = undefined
      }
    }
  },
  methods: {
    searchSpan() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'deep-purple-7',
        spinnerSize: 140,
        backgroundColor: 'grey-9',
        message: '잠시만 기다려주세요..',
        messageColor: 'yellow'
      })
      // this.show({ message: 'test...' })

      // alert('[' + this.summoner_name + ']님 현재 작업 중 입니다 ^^;')
      setTimeout(() => {
        this.getSummonersAPI()
      }, 500)
    },
    getSummonersAPI() {
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
          this.apiError = false
          this.summoner_information = res.data
          // console.log(this.summoner_information.puuid)
          this.timeStampConversion()
        })
        .catch((error) => {
          this.apiError = true
          this.messages.message1 = '개발자API가 만료된 것 같습니다.'
          this.messages.message2 = 'API KEY 갱신이 필요합니다.'
          console.log(error)
        })

      this.$q.loading.hide()
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
  padding-top: 40px;
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
