"use strict";(self["webpackChunkvue_lol_gg"]=self["webpackChunkvue_lol_gg"]||[]).push([[443],{6861:function(e,s,o){o.r(s),o.d(s,{default:function(){return W}});var n=o(3396),t=o(7139),a=o(9242);const i=e=>((0,n.dD)("data-v-586c9637"),e=e(),(0,n.Cn)(),e),r={class:"record"},m={key:0},l={class:"row justify-center"},u={class:"col text-center"},c=i((()=>(0,n._)("div",{class:"col"},null,-1))),g=i((()=>(0,n._)("div",{class:"col"},null,-1))),d={class:"row flex-center",style:{"margin-top":"5px"}},p={class:"col text-right"},_=["src"],h={class:"col text-center"},v={class:"col text-left"},f={key:1},w={class:"q-pa-md row justify-center"},y={style:{width:"100%","max-width":"400px"}},k={class:"q-pa-md row justify-center"},x={style:{width:"100%","max-width":"400px"}};function b(e,s,i,b,q,C){const S=(0,n.up)("q-badge"),D=(0,n.up)("q-avatar"),W=(0,n.up)("q-chat-message"),$=(0,n.up)("q-spinner-dots"),j=(0,n.up)("q-icon"),I=(0,n.up)("q-btn"),z=(0,n.up)("q-input");return(0,n.wg)(),(0,n.iD)("div",r,[void 0!==q.summoner_information.puuid?((0,n.wg)(),(0,n.iD)("div",m,[(0,n._)("div",l,[(0,n._)("div",u,[(0,n.Wm)(S,{outline:"",color:"primary",label:"latest. "+q.summoner_information.revisionDate},null,8,["label"])]),c,g]),(0,n._)("div",d,[(0,n._)("div",p,[(0,n.Wm)(D,null,{default:(0,n.w5)((()=>[(0,n._)("img",{src:q.profile_img_url+q.summoner_information.profileIconId+".png",class:"profile_img"},null,8,_)])),_:1})]),(0,n._)("div",h,(0,t.zw)(q.summoner_information.name),1),(0,n._)("div",v," Lv "+(0,t.zw)(q.summoner_information.summonerLevel),1)])])):((0,n.wg)(),(0,n.iD)("div",f,[(0,n._)("div",w,[(0,n._)("div",y,[(0,n.Wm)(W,{name:"vue_lol_gg",avatar:o(5441),text:[q.messages.message1],stamp:"2 seconds ago",sent:"","bg-color":"grey-4"},null,8,["avatar","text"]),(0,n.Wm)(W,{name:"vue_lol_gg",avatar:o(5441),text:[q.messages.message2],stamp:"1 seconds ago",sent:"","bg-color":"grey-4"},null,8,["avatar","text"]),q.apiError?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(W,{key:0,name:"Me","bg-color":"amber"},{default:(0,n.w5)((()=>[(0,n.Wm)($,{size:"2rem"})])),_:1}))])])])),(0,n._)("div",k,[(0,n._)("div",x,[(0,n.Wm)(z,{"bottom-slots":"",modelValue:q.summoner_name,"onUpdate:modelValue":s[1]||(s[1]=e=>q.summoner_name=e),label:"Summoner Name",counter:"",maxlength:"50",onKeyup:(0,a.D2)(C.searchSpan,["enter"])},{append:(0,n.w5)((()=>[""!==q.summoner_name?((0,n.wg)(),(0,n.j4)(j,{key:0,name:"close",onClick:s[0]||(s[0]=e=>q.summoner_name=""),class:"cursor-pointer"})):(0,n.kq)("",!0)])),after:(0,n.w5)((()=>[(0,n.Wm)(I,{round:"",flat:"",color:"secondary",icon:"send",onClick:C.searchSpan},null,8,["onClick"])])),hint:(0,n.w5)((()=>[(0,n.Uk)(" LOL 소환사명을 입력하세요.. ")])),_:1},8,["modelValue","onKeyup"])])])])}var q=o(9341),C={name:"RecordView",data(){return{working:!1,apiError:!1,profile_img_url:"http://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/",summoner_name:"",summoner_information:{},messages:{message1:"안녕하세요!",message2:"소환사명을 입력해보세요. :)"}}},watch:{summoner_name:function(e){""===e&&(this.messages.message1="본인이나 친구의 소환사명을",this.messages.message2="조회 해보세요 :)",this.summoner_information.puuid=void 0)}},methods:{searchSpan(){""!==this.summoner_name?(this.$q.loading.show({spinner:q._Jx,spinnerColor:"deep-purple-7",spinnerSize:140,backgroundColor:"grey-9",message:"잠시만 기다려주세요..",messageColor:"yellow"}),setTimeout((()=>{this.getSummonersAPI()}),500)):this.$q.notify({color:"yellow",position:"center",type:"warning",message:"소환사명을 입력하지 않았습니다.",timeout:200})},getSummonersAPI(){const e="https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name",s="RGAPI-0fdaa7ee-6a48-48b0-ba7d-765496415193",o=this.summoner_name;this.$axios.get(`${e}/${o}?api_key=${s}`,"","").then((e=>{this.apiError=!1,this.summoner_information=e.data,this.timeStampConversion()})).catch((e=>{this.apiError=!0,this.messages.message1="보여드릴 데이터가 없습니다.",this.messages.message2="존재하는 소환사명을 입력해주세요.",console.log(JSON.stringify(e))})),this.$q.loading.hide()},timeStampConversion(){const e=new Date(this.summoner_information.revisionDate),s=e.getFullYear(),o=("00"+(e.getMonth()+1)).slice(-2),n=("00"+e.getDate()).slice(-2),t=("00"+e.getHours()).slice(-2)+":"+("00"+e.getMinutes()).slice(-2)+":"+("00"+e.getSeconds()).slice(-2);this.summoner_information.revisionDate=s+"/"+o+"/"+n+" "+t}}},S=o(89);const D=(0,S.Z)(C,[["render",b],["__scopeId","data-v-586c9637"]]);var W=D},5441:function(e,s,o){e.exports=o.p+"img/jew.d9db0a3c.png"}}]);
//# sourceMappingURL=about.031b45ca.js.map