<template>
  <div class="record">
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
    <div v-if="summoner_information.puuid === undefined">
      <div class="q-pa-md row justify-center">
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
          <q-chat-message v-if="!apiError" name="Me" bg-color="amber">
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </div>
      </div>
    </div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-input
          bottom-slots
          v-model="summoner_name"
          label="Summoner Name"
          counter
          maxlength="50"
          @keyup.enter="searchSpan"
        >
          <template v-slot:append>
            <q-icon
              v-if="summoner_name !== ''"
              name="close"
              @click="summoner_name = ''"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:after>
            <q-btn
              round
              flat
              color="secondary"
              icon="send"
              @click="searchSpan"
            />
          </template>
          <template v-slot:hint> LOL 소환사명을 입력하세요.. </template>
        </q-input>
      </div>
    </div>
    <div v-if="summoner_information.puuid !== undefined">
      <hr />
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
      // this.show({ message: 'test...' })
      if (this.summoner_name === '') {
        this.$q.notify({
          color: 'yellow',
          position: 'center',
          type: 'warning',
          message: '소환사명을 입력하지 않았습니다.',
          timeout: 200
        })
        return
      }
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'deep-purple-7',
        spinnerSize: 140,
        backgroundColor: 'grey-9',
        message: '잠시만 기다려주세요..',
        messageColor: 'yellow'
      })
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
          this.timeStampConversion()
        })
        .catch((error) => {
          this.apiError = true
          this.messages.message1 = '보여드릴 데이터가 없습니다.'
          this.messages.message2 = '존재하는 소환사명을 입력해주세요.'
          console.log(JSON.stringify(error))
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
  padding-top: 60px;
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
