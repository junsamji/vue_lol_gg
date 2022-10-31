<template>
  <div class="home">
    <h1 class="title">금주 Lotation Champions</h1>
    <!-- <div v-for="(item, i) in champions" :key="i">
      {{ item.name }}
    </div> -->
    <div v-for="champion in rota_champ" :key="champion.key" class="contents">
      <img :src="DefaultImgURL + champion.id + '.png'" class="champ_img" />
      <p>{{ champion.title }}</p>
      <h3>{{ champion.name }}</h3>
    </div>
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
      rota_champ: []
    }
  },
  mounted() {
    // this.getRotatition()
    setTimeout(() => {
      this.getRotatition()
    }, 1500)
  },
  methods: {
    getRotatition() {
      const baseURI =
        'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations'
      const apiKey = process.env.VUE_APP_RIOT_KEY
      this.$axios.get(`${baseURI}?api_key=${apiKey}`, '', '').then((res) => {
        // this.rotations = res.data.freeChampionIds
        this.rotations = res.data
        this.setRota_champ()
      })
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
      // console.log(this.rota_champ)
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
  background: white;
  border-radius: 8px;
  margin-top: 50px;
  padding: 20px;
}

.home {
  width: 700px;
  height: 100%;
  margin: 0 auto;
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
  margin: 5px;
}

.champ_img {
  cursor: pointer;
  width: 40%;
  padding-top: 10px;
}
</style>
