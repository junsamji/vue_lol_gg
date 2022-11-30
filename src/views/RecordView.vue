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
    <div ref="contentDiv" :class="css_out">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <q-chat-message
            ref="chat1"
            :class="[
              { animate__animated: isBind },
              { animate__fadeIn: isBind },
              { 'animate__delay-1s': isBind },
              { 'animate__duration-5s': isBind }
            ]"
            name="vue_lol_gg"
            :avatar="require('@/assets/jew.png')"
            :text="[messages.message1]"
            stamp="2 seconds ago"
            sent
            bg-color="grey-4"
          />
          <q-chat-message
            ref="chat2"
            :class="[
              { animate__animated: isBind },
              { animate__fadeIn: isBind },
              { 'animate__delay-2s': isBind },
              { 'animate__duration-4s': isBind }
            ]"
            name="vue_lol_gg"
            :avatar="require('@/assets/jew.png')"
            :text="[messages.message2]"
            stamp="1 seconds ago"
            sent
            bg-color="grey-4"
          />
          <q-chat-message v-if="chating" bg-color="amber">
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </div>
      </div>
    </div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-input
          ref="txtSummoner"
          bottom-slots
          v-model="summoner_name"
          label="Summoner Name"
          counter
          maxlength="50"
          @keyup.enter="keyEnter"
          @focus="chating = true"
          @blur="chating = false"
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
              ref="btnSearch"
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
      <div class="row flex-center" style="margin-top: 5px; margin-bottom: 5px">
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
      <div class="row">
        <q-card
          v-for="(item, i) in matcheLog"
          :key="i"
          class="col-12 col-md-12"
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1500"
        >
          <div v-for="(participant, j) in item.info.participants" :key="j">
            <div v-if="participant.puuid === summoner_information.puuid">
              <div
                v-if="participant.win"
                class="text-center bg-primary text-white"
              >
                승리
              </div>
              <div v-else class="text-center bg-negative text-white">패배</div>
              <q-card-section>
                <div class="col text-right">
                  <span>{{ item.info.gameEndTimestamp }}</span>
                  <span v-if="item.info.gameMode === 'ARAM'">칼바람</span>
                  <span v-else-if="item.info.gameMode === 'URF'">우르프</span>
                  <span v-else>그 외</span>
                </div>
                <div class="text-center">
                  <q-avatar>
                    <img
                      :src="championImgURL + participant.championName + '.png'"
                      class="champison_avatar_img"
                    />
                  </q-avatar>
                </div>
                <div class="text-center">
                  <q-badge
                    v-if="participant.pentaKills > 0"
                    outline
                    color="negative"
                    label="Penta Kill"
                  />
                  <q-badge
                    v-else-if="participant.quadraKills > 0"
                    outline
                    color="accent"
                    label="Quadra Kill"
                  />
                  <q-badge
                    v-else-if="participant.tripleKills > 0"
                    outline
                    color="orange"
                    label="Triple Kill"
                  />
                  <q-badge
                    v-else-if="participant.doubleKills > 0"
                    outline
                    color="positive"
                    label="Double Kill"
                  />
                </div>
                <div class="text-center">
                  <span>{{ participant.kills }}</span>
                  <span> / </span>
                  <span>{{ participant.deaths }}</span>
                  <span> / </span>
                  <span>{{ participant.assists }}</span>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card>
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
      apiKey: process.env.VUE_APP_RIOT_KEY,
      championImgURL: process.env.VUE_APP_RIOT_IMG,
      profile_img_url: process.env.VUE_APP_PROFILE_ICON,
      isBind: true,
      chating: false,
      summoner_name: '',
      summoner_information: {},
      matchesId: [],
      matcheLog: [],
      messages: {
        message1: '안녕하세요!',
        message2: '소환사명을 입력해보세요. :)'
      },
      css_out: 'content'
    }
  },
  watch: {
    summoner_name: function (val) {
      if (val === '') {
        this.messages.message1 = '본인이나 친구의 소환사명을'
        this.messages.message2 = '조회 해보세요 :)'
        this.summoner_information.puuid = undefined
        this.$refs.contentDiv.style.display = 'block'
        this.css_out = 'content'

        this.isBind = false
        setTimeout(() => {
          this.isBind = true
        }, 0)
      }
    }
  },
  methods: {
    keyEnter() {
      // this.$refs.txt
      this.$refs.btnSearch.click()
    },
    searchSpan() {
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

      // this.$refs.txtSummoner.blur()
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'deep-purple-7',
        spinnerSize: 140,
        backgroundColor: 'grey-9',
        message: '잠시만 기다려주세요..',
        messageColor: 'yellow'
      })

      setTimeout(() => {
        this.getSummonersAPI()
      }, 500)
    },
    async getSummonersAPI() {
      const baseURI =
        'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name'
      const summoner = this.summoner_name

      await this.$axios
        .get(`${baseURI}/${summoner}?api_key=${this.apiKey}`, '', '')
        .then((res) => {
          this.summoner_information = res.data
          this.summoner_information.revisionDate = this.timeStampConversion(
            this.summoner_information.revisionDate
          )
          setTimeout(() => {
            this.getUserMatchs(this.summoner_information.puuid)
          }, 1000)

          this.css_out = 'content animate__animated animate__fadeOutUp'

          setTimeout(() => {
            this.$refs.contentDiv.style.display = 'none'
          }, 100)
        })
        .catch((error) => {
          this.$refs.contentDiv.style.display = 'block'
          this.css_out = 'content'

          this.messages.message1 = '보여드릴 데이터가 없습니다.'
          this.messages.message2 = '존재하는 소환사명을 입력해주세요.'
          this.isBind = false
          setTimeout(() => {
            this.isBind = true
          }, 0)
          console.log(JSON.stringify(error))
        })

      // this.getUserMatchs(this.summoner_information.puuid)
    },
    async getUserMatchs(puuid) {
      const baseURI =
        'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid'
      const option = 'ids?start=0&count=10'

      await this.$axios
        .get(`${baseURI}/${puuid}/${option}&api_key=${this.apiKey}`, '', '')
        .then((res) => {
          // console.log(res.data)
          this.matchesId = res.data
          setTimeout(() => {
            this.getMatchLog()
          }, 500)
        })
        .catch((error) => {
          this.$refs.contentDiv.style.display = 'block'
          this.css_out = 'copntent'

          this.messages.message1 = '최근경기 조회시 오류가 발생하였습니다.'
          this.messages.message2 = '개발자에게 문의해주세요.'
          this.isBind = false
          setTimeout(() => {
            this.isBind = true
          }, 0)
          console.log(JSON.stringify(error))
        })
    },
    async getMatchLog() {
      this.matcheLog.splice(0)
      // console.log(JSON.stringify(this.matches))
      const baseURI = 'https://asia.api.riotgames.com/lol/match/v5/matches'

      for (const key in this.matchesId) {
        // console.log('request:' + this.matchesId[key])
        await this.$axios
          .get(
            `${baseURI}/${this.matchesId[key]}?api_key=${this.apiKey}`,
            '',
            ''
          )
          .then((res) => {
            // console.log(res.data.metadata.matchId)
            this.matcheLog.push(res.data)
            // console.log(this.matcheLog[key].info.gameEndTimestamp)
            this.matcheLog[key].info.gameEndTimestamp =
              this.timeStampConversion(
                this.matcheLog[key].info.gameEndTimestamp
              )
          })
          .catch((error) => {
            this.matcheLog.splice(0)
            this.$refs.contentDiv.style.display = 'block'
            this.css_out = 'copntent'

            this.messages.message1 = '경기 결과 로드 오류가 발생하였습니다.'
            this.messages.message2 = '개발자에게 문의해주세요.'
            this.isBind = false
            setTimeout(() => {
              this.isBind = true
            }, 0)
            console.log(JSON.stringify(error))
          })
      }

      // console.log(this.matcheLog)
      this.$q.loading.hide()
    },
    timeStampConversion(datetime) {
      const dateTime = new Date(datetime)
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
      // this.summoner_information.revisionDate =
      return year + '/' + month + '/' + day + ' ' + time
    }
  }
}
</script>
<style>
@import '@/style/common.css';
</style>
<style scoped>
span {
  padding-left: 0.5rem;
}

hr {
  width: 91%;
  height: 2px;
  background-color: rgba(72, 61, 139, 1);
}

.record {
  width: 100%;
  top: 40px;
  transform: translateY(40px);
}

.content {
  height: 80%;
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

.champison_avatar_img {
  max-width: 100px;
  width: 50%;
  padding-bottom: 5px;
}
</style>
