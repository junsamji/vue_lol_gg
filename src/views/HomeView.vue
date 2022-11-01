<template>
  <div class="black-bg" v-if="modal">
    <div class="white-bg">
      <h4>{{ modal_data.name }}</h4>
      <p>{{ modal_data.blurb }}</p>
      <span @click="modal = false" class="spanButton">닫기</span>
    </div>
  </div>

  <div class="home" v-if="rota_champ.length > 0">
    <h1 class="title">금주 Lotation Champions</h1>
    <!-- <div v-for="(item, i) in champions" :key="i">
      {{ item.name }}
    </div> -->
    <div v-for="champion in rota_champ" :key="champion.key" class="contents">
      <img :src="DefaultImgURL + champion.id + '.png'" class="champ_img" />
      <p>{{ champion.title }}</p>
      <h3>{{ champion.name }}</h3>
      <span @click="clickSpan(champion)" class="spanButton">blurb</span>
    </div>
  </div>

  <div class="home" v-else>
    <h1 class="title">Developer API가 만료되었습니다.</h1>
    <p>API Key 갱신이 필요합니다.</p>
  </div>
</template>

<script>
import championsJson from '../assets/champion'

export default {
  name: 'HomeView',
  data() {
    return {
      DefaultImgURL: process.env.VUE_APP_RIOT_IMG,
      champions: championsJson.data,
      rotations: {},
      rota_champ: [],
      modal: false,
      modal_data: {}
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unLoadEvent)

    const toDay = new Date()
    const lsRotations = localStorage.getItem('lsRotations')

    if (lsRotations === null) {
      setTimeout(() => {
        this.getRotatitionAPI()
      }, 1500)
    }

    if (localStorage.getItem('day') === null) {
      localStorage.setItem('day', toDay.getDay())
    }

    if (localStorage.getItem('day') === String(toDay.getDay())) {
      this.getRotatitionLocal()
    } else {
      setTimeout(() => {
        this.getRotatitionAPI()
      }, 1500)
    }
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.unLoadEvent)
  },
  methods: {
    getRotatitionAPI() {
      const baseURI =
        'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations'

      const apiKey = process.env.VUE_APP_RIOT_KEY

      this.$axios.get(`${baseURI}?api_key=${apiKey}`, '', '').then((res) => {
        // this.rotations = res.data.freeChampionIds
        this.rotations = res.data
        localStorage.setItem('lsRotations', JSON.stringify(res.data))
        this.setRota_champ()
      })
    },

    getRotatitionLocal() {
      this.rotations = JSON.parse(localStorage.getItem('lsRotations'))
      // console.log('local:' + this.rotations.freeChampionIds)
      // this.setRota_champ()
    },

    setRota_champ() {
      this.rotations.freeChampionIds.forEach((item) => {
        for (const key in this.champions) {
          if (String(item) === this.champions[key].key) {
            this.rota_champ.push(this.champions[key])
          }

          if (
            this.rotations.freeChampionIds.length === this.rota_champ.length
          ) {
            break
          }
        }
      })
    },

    unLoadEvent: function (event) {
      if (this.isLeaveSite) return

      event.preventDefault()
      event.returnValue = ''
      // localStorage.removeItem('lsRotations')
    },

    clickSpan(selectItem) {
      this.modal_data = selectItem
      this.modal = true
    }
  },
  components: {}
}
</script>

<style>
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 8px;
  margin-top: 50px;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.home {
  width: 80%;
  height: 100%;
  margin: 70px auto;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.contents {
  display: inline-block;
  width: 340px;
  height: 100%;
  vertical-align: top;
  background: rgba(239, 240, 214, 0.7);
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  margin: 2px;
  padding-bottom: 5px;
}

.champ_img {
  width: 40%;
  padding-top: 10px;
}

.spanButton {
  cursor: pointer;
  background: peachpuff;
  border: 0px;
  padding: 1px 3px;
}
</style>
