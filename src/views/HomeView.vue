<template>
  <div class="black-bg" v-if="modal">
    <div class="white-bg">
      <h4>{{ modal_data.name }}</h4>
      <p>{{ modal_data.blurb }}</p>
      <span @click="modal = false" class="spanButton">닫기</span>
    </div>
  </div>
  <div class="home" v-if="rota_champ.length > 0">
    <h6 class="title animate__animated animate__zoomIn">
      금주 Rotation Champions
    </h6>
    <!-- <div v-for="(item, i) in champions" :key="i" data-aos="fade-up">
      {{ item.name }}
    </div> -->
    <div
      v-for="champion in rota_champ"
      :key="champion.key"
      class="contents"
      data-aos="fade-up"
      data-aos-easing="ease-out-cubic"
      data-aos-offset="100"
      data-aos-delay="50"
      data-aos-duration="1500"
    >
      <!-- <img :src="DefaultImgURL + champion.id + '.png'" class="champ_img" /> -->
      <img :src="DefaultImgURL + champion.id + '_0.jpg'" class="champ_img" />
      <p>{{ champion.title }}</p>
      <h5>{{ champion.name }}</h5>
      <span @click="clickSpan(champion)" class="spanButton">Click</span>
    </div>
  </div>

  <!-- <div class="home" v-else>
    <h1 class="title">Developer API가 만료되었습니다.</h1>
    <p>API Key 갱신이 필요합니다.</p>
    <p>개발자에게 알려주세요 :)</p>
  </div> -->
</template>

<script>
import championsJson from '../assets/champion'
import { QSpinnerFacebook } from 'quasar'

export default {
  name: 'HomeView',
  data() {
    return {
      // 박스이미지 + champion.id + .png
      // DefaultImgURL: process.env.VUE_APP_RIOT_IMG,
      // 로딩이미지 + champion.id + _0.png (number to skins)
      DefaultImgURL: process.env.VUE_APP_RIOT_LOADING_IMG,
      champions: championsJson.data,
      rotations: {},
      rota_champ: [],
      modal: false,
      modal_data: {},
      date: ''
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unLoadEvent)

    const now = new Date()
    const toMonth = now.getMonth() + 1
    const toDate = now.getDate()
    const lsRotations = localStorage.getItem('lsRotations')
    this.date = String(toMonth) + String(toDate)

    if (lsRotations === null || localStorage.getItem('date') === null) {
      setTimeout(() => {
        this.getRotatitionAPI()
      }, 1100)
    }

    if (localStorage.getItem('date') === this.date) {
      this.getRotatitionLocal()
    } else {
      setTimeout(() => {
        this.getRotatitionAPI()
      }, 1100)
    }
  },

  beforeUnmount() {
    window.removeEventListener('beforeunload', this.unLoadEvent)
  },
  methods: {
    beforeEnter(el) {
      el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
    },
    afterEnter(el) {
      el.style.transitionDelay = ''
    },
    getRotatitionAPI() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'deep-purple-7',
        spinnerSize: 140,
        backgroundColor: 'grey-9',
        message: '잠시만 기다려주세요..',
        messageColor: 'yellow'
      })
      const baseURI =
        'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations'

      const apiKey = process.env.VUE_APP_RIOT_KEY
      localStorage.removeItem(this.lsRotations)

      this.$axios.get(`${baseURI}?api_key=${apiKey}`, '', '').then((res) => {
        this.rotations = res.data
        localStorage.setItem('lsRotations', JSON.stringify(res.data))
        if (res.data.freeChampionIds.length > 0) {
          localStorage.setItem('date', this.date)
        }
        this.setRota_champ()
      })
    },

    getRotatitionLocal() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'deep-purple-7',
        spinnerSize: 140,
        backgroundColor: 'grey-9',
        message: '잠시만 기다려주세요..',
        messageColor: 'yellow'
      })
      this.rotations = JSON.parse(localStorage.getItem('lsRotations'))
      // console.log('local:' + this.rotations.freeChampionIds)
      this.setRota_champ()
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

      this.$q.loading.hide()
      // this.$q.notify({
      //   message: '조회완료',
      //   color: 'secondary',
      //   position: 'bottom-right'
      // })
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
@import '@/style/common.css';
</style>
<style scope>
@media screen and (min-width: 769px) {
  .contents {
    display: inline-block;
    height: 100%;
    background: rgba(239, 240, 214, 0.7);
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    margin: 2px;
    padding-bottom: 5px;
  }
}
@media only screen and (max-width: 769px) {
  .contents {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: rgba(239, 240, 214, 0.7);
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    margin: 2px;
    padding-bottom: 5px;
  }
}

div {
  box-sizing: border-box;
}
.home {
  width: 80%;
  height: 100%;
  margin: 2rem auto;
  padding-top: 0.1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 0.5rem;
}

.champ_img {
  max-width: 200px;
  width: 40%;
  padding-top: 5px;
}

.animate__animated.animate__zoomIn {
  --animate-duration: 2s;
}
</style>
