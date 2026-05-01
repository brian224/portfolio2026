<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { onBeforeMount, onMounted, ref, computed } from 'vue'
import { globalStore } from '@stores/global.js'

const global = globalStore()

const datas = [
  {
    type: '專案作品',
    case: [
      {
        CaseName: '好房網',
        CaseID: '33',
        CaseType: 'web',
        CoverImg: 'web_33.png',
        PhotoCount: '4',
        webLink: 'http://www.housefun.com.tw/',
        webDesc: '好房網',
      },
      {
        CaseName: '好房網 M 版',
        CaseID: '38',
        CaseType: 'web',
        CoverImg: 'web_38.png',
        PhotoCount: '1',
        webLink: 'http://buy.housefun.com.tw/mobile',
        webDesc: '好房網 M 版',
      },
      {
        CaseName: '遠傳電信',
        CaseID: '37',
        CaseType: 'web',
        CoverImg: 'web_37.png',
        PhotoCount: '4',
        webLink: 'http://www.fetnet.net/Home/index.html',
        webDesc: '遠傳電信',
      },
      {
        CaseName: '華南財富管理',
        CaseID: '39',
        CaseType: 'web',
        CoverImg: 'web_39.png',
        PhotoCount: '4',
        webLink: 'http://wealth.hncb.com.tw/',
        webDesc: '華南財富管理',
      },
      {
        CaseName: '中租租車',
        CaseID: '26',
        CaseType: 'web',
        CoverImg: 'web_26.png',
        PhotoCount: '3',
        webLink: 'http://www.rentalcar.com.tw',
        webDesc: '中租租車官方網站',
      },
      {
        CaseName: '中國信託<br>保險經紀人',
        CaseID: '23',
        CaseType: 'web',
        CoverImg: 'web_23.png',
        PhotoCount: '3',
        webLink: 'http://www.ctbcinsbrokers.com/Main',
        webDesc: '中國信託 保險經紀人',
      },
      {
        CaseName: '好房網<br>新屋博覽會',
        CaseID: '32',
        CaseType: 'web',
        CoverImg: 'web_32.png',
        PhotoCount: '2',
        webLink: 'http://newhouse.housefun.com.tw/expo',
        webDesc: '好房網新屋博覽會',
      },
      {
        CaseName: '澳盛銀行',
        CaseID: '40',
        CaseType: 'web',
        CoverImg: 'web_40.png',
        PhotoCount: '3',
        webLink: 'http://anz.tw/zh/personal/digital/digitalbank.jsp',
        webDesc: '澳盛銀行 - 遙控理財',
      },
      {
        CaseName: '中國信託<br>商業銀行',
        CaseID: '36',
        CaseType: 'web',
        CoverImg: 'web_36.png',
        PhotoCount: '4',
        webLink: 'https://www.ctbcbank.com/',
        webDesc: '中國信託商業銀行',
      },
      {
        CaseName: '正宇生技',
        CaseID: '34',
        CaseType: 'web',
        CoverImg: 'web_34.png',
        PhotoCount: '3',
        webLink: 'http://zybio.com.tw/',
        webDesc: '正宇生技',
      },
      {
        CaseName: '好房網雙訊',
        CaseID: '10',
        CaseType: 'other',
        CoverImg: 'other_10.png',
        PhotoCount: '2',
        webLink:
          'https://itunes.apple.com/tw/app/hao-fang-wang-shuang-xun/id838108164?mt=8,https://play.google.com/store/apps/details?id=com.housefun.doubleSMS&hl=zh_TW',
        webDesc: 'iTunes - 好房網雙訊,Google play - 好房網雙訊',
      },
      {
        CaseName: 'LUXGEN',
        CaseID: '41',
        CaseType: 'web',
        CoverImg: 'web_41.png',
        PhotoCount: '5',
        webLink: '',
        webDesc: 'LUXGEN 納智捷汽車',
      },
      {
        CaseName: '中國信託 CI',
        CaseID: '25',
        CaseType: 'web',
        CoverImg: 'web_25.png',
        PhotoCount: '3',
        webLink: 'http://brianlin224.theweb.tw/webLink/CTCB_CI/global.html',
        webDesc: '前往網頁',
      },
    ],
  },
  {
    type: '活動作品',
    case: [
      {
        CaseName: '好房網市場週報',
        CaseID: '29',
        CaseType: 'web',
        CoverImg: 'web_29.png',
        PhotoCount: '4',
        webLink: 'http://news.housefun.com.tw/RealEstate',
        webDesc: '好房網市場週報',
      },
      {
        CaseName: '全家鮮食平台',
        CaseID: '27',
        CaseType: 'web',
        CoverImg: 'web_27.png',
        PhotoCount: '4',
        webLink:
          'http://www.family.com.tw/Marketing/superbread/index.html,http://www.family.com.tw/Marketing/curry/,http://www.family.com.tw/marketing/oden/',
        webDesc: '全家鮮食平台,全家咖哩祭,全家關東煮,全家超麵包',
      },
      {
        CaseName: '永慶房屋<br>房仲科技 3.0',
        CaseID: '31',
        CaseType: 'web',
        CoverImg: 'web_31.png',
        PhotoCount: '3',
        webLink: 'http://brianlin224.theweb.tw/webLink/yc_brand/index.html',
        webDesc: '永慶房屋「房仲科技 3.0」',
      },
      {
        CaseName: '中國信託<br>活動網頁',
        CaseID: '24',
        CaseType: 'web',
        CoverImg: 'web_24.png',
        PhotoCount: '2',
        webLink: 'http://www.ctbcbank.com/html/fileUpload/internet/phaseII/homepage.html',
        webDesc: '中國信託網路銀行 2013 全新風貌邀您立即體驗',
      },
      {
        CaseName: '家在雙和<br>活力 UP UP!',
        CaseID: '42',
        CaseType: 'web',
        CoverImg: 'web_42.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '好房網<br>新屋博覽會',
        CaseID: '32',
        CaseType: 'web',
        CoverImg: 'web_32.png',
        PhotoCount: '2',
        webLink: 'http://newhouse.housefun.com.tw/expo',
        webDesc: '好房網新屋博覽會',
      },
      {
        CaseName: '好房網新聞活動',
        CaseID: '30',
        CaseType: 'web',
        CoverImg: 'web_30.png',
        PhotoCount: '3',
        webLink:
          'http://event.housefun.com.tw/329mag_press_conference/,http://event.news.housefun.com.tw/taoyuan/,http://event.housefun.com.tw/salesjvv/',
        webDesc:
          '好房網不動產市場週報 創刊發表暨記者會,輕總價 藝術生活 桃園藝文特區,馬來西亞皇萱灣',
      },
    ],
  },
  {
    type: '其他作品',
    case: [
      {
        CaseName: 'Wine95 Blog',
        CaseID: '16',
        CaseType: 'web',
        CoverImg: 'web_16.png',
        PhotoCount: '2',
        webLink:
          'http://brianlin224.theweb.tw/webLink/wine95/wine_blog.html,webLink/wine95/post.html',
        webDesc: '前往Blog首頁,前往文章內容頁',
      },
      {
        CaseName: 'airiti Nature',
        CaseID: '15',
        CaseType: 'web',
        CoverImg: 'web_15.png',
        PhotoCount: '4',
        webLink: 'http://www.airitinature.com',
        webDesc: '華藝自然世界',
      },
      {
        CaseName: 'design ptc',
        CaseID: '13',
        CaseType: 'web',
        CoverImg: 'web_13.png',
        PhotoCount: '3',
        webLink: 'http://www.designptc.com/',
        webDesc: 'Patterns Textiles & Concepts',
      },
      {
        CaseName: 'Wine95',
        CaseID: '14',
        CaseType: 'web',
        CoverImg: 'web_14.png',
        PhotoCount: '3',
        webLink:
          'http://brianlin224.theweb.tw/webLink/wine95/index.html,webLink/wine95/cart.html,webLink/wine95/wine_detail.html',
        webDesc: '前往wine95首頁,前往購物車,前往詳目頁',
      },
      {
        CaseName: '喬杰設技工程',
        CaseID: '12',
        CaseType: 'web',
        CoverImg: 'web_12.png',
        PhotoCount: '4',
        webLink: 'http://www.spid.com.tw',
        webDesc: '喬杰設技工程',
      },
      {
        CaseName: '立象科技',
        CaseID: '09',
        CaseType: 'web',
        CoverImg: 'web_09.png',
        PhotoCount: '2',
        webLink: 'http://www.argox.com/',
        webDesc: '立象科技',
      },
      {
        CaseName: '桃園假日飯店',
        CaseID: '04',
        CaseType: 'web',
        CoverImg: 'web_04.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '賽先生<br>科學玩具購物網',
        CaseID: '10',
        CaseType: 'web',
        CoverImg: 'web_10.png',
        PhotoCount: '3',
        webLink: 'https://www.mr-sai.com/',
        webDesc: '賽先生科學玩具購物網',
      },
      {
        CaseName: '設計師交流之夜',
        CaseID: '20',
        CaseType: 'web',
        CoverImg: 'web_20.png',
        PhotoCount: '3',
        webLink: 'https://www.xuexue.tw/pkn/',
        webDesc: 'PKN 設計師交流之夜',
      },
      {
        CaseName: '布瓦布榭<br>設計工作坊',
        CaseID: '28',
        CaseType: 'web',
        CoverImg: 'web_28.png',
        PhotoCount: '3',
        webLink: 'http://www.xuexuefoundation.org.tw/boisbuchet/',
        webDesc: '布瓦布榭暑期設計工作坊',
      },
      {
        CaseName: '長新科技',
        CaseID: '11',
        CaseType: 'web',
        CoverImg: 'web_11.png',
        PhotoCount: '6',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '一口一口學<br>食驗室',
        CaseID: '22',
        CaseType: 'web',
        CoverImg: 'web_22.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'iRead<br>網路書店',
        CaseID: '17',
        CaseType: 'web',
        CoverImg: 'web_17.png',
        PhotoCount: '2',
        webLink: 'https://www.iread.com.tw/',
        webDesc: 'iRead灰熊愛讀書',
      },
      {
        CaseName: '1+1 來玩',
        CaseID: '21',
        CaseType: 'web',
        CoverImg: 'web_21.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '陽光瓦舍',
        CaseID: '01',
        CaseType: 'web',
        CoverImg: 'web_01.png',
        PhotoCount: '5',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'GALAXY',
        CaseID: '03',
        CaseType: 'web',
        CoverImg: 'web_03.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '商鐵咖啡',
        CaseID: '05',
        CaseType: 'web',
        CoverImg: 'web_05.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '昱廚',
        CaseID: '08',
        CaseType: 'web',
        CoverImg: 'web_08.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '星禾玫瑰園',
        CaseID: '06',
        CaseType: 'web',
        CoverImg: 'web_06.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '星禾出版社',
        CaseID: '07',
        CaseType: 'web',
        CoverImg: 'web_07.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'airiti Library',
        CaseID: '18',
        CaseType: 'web',
        CoverImg: 'web_18.png',
        PhotoCount: '3',
        webLink:
          'http://brianlin224.theweb.tw/webLink/AL/demo01.html,webLink/AL/demo02.html,webLink/AL/demo03.html',
        webDesc: '前往airitiLibrary首頁,前往詳目頁,前往列表頁',
      },
      {
        CaseName: 'airiti Books<br>活動網頁',
        CaseID: '19',
        CaseType: 'web',
        CoverImg: 'web_19.png',
        PhotoCount: '5',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '企業形象年報',
        CaseID: '02',
        CaseType: 'ad',
        CoverImg: 'ad_02.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '企業贈品',
        CaseID: '12',
        CaseType: 'ad',
        CoverImg: 'ad_12.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '各式 DM',
        CaseID: '13',
        CaseType: 'ad',
        CoverImg: 'ad_13.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '賀卡',
        CaseID: '11',
        CaseType: 'ad',
        CoverImg: 'ad_11.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '各式名片',
        CaseID: '05',
        CaseType: 'ad',
        CoverImg: 'ad_05.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '活動海報',
        CaseID: '14',
        CaseType: 'ad',
        CoverImg: 'ad_14.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '各式活動 EDM',
        CaseID: '01',
        CaseType: 'ad',
        CoverImg: 'ad_01.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'CI 規劃',
        CaseID: '03',
        CaseType: 'ad',
        CoverImg: 'ad_03.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '餐廳 MENU',
        CaseID: '10',
        CaseType: 'ad',
        CoverImg: 'ad_10.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'app實作 -<br>好房網雙訊',
        CaseID: '10',
        CaseType: 'other',
        CoverImg: 'other_10.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'app實作 -<br>iRead ebook',
        CaseID: '03',
        CaseType: 'other',
        CoverImg: 'other_03.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'app 提案 -<br>國寶菁華',
        CaseID: '04',
        CaseType: 'other',
        CoverImg: 'other_04.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'app 提案 -<br>世界美術',
        CaseID: '05',
        CaseType: 'other',
        CoverImg: 'other_05.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '空間設計 -<br>當地球停止轉動',
        CaseID: '09',
        CaseType: 'other',
        CoverImg: 'other_09.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '空間提案 -<br>墨水心',
        CaseID: '07',
        CaseType: 'other',
        CoverImg: 'other_07.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '空間提案 -<br>閃靈俠',
        CaseID: '08',
        CaseType: 'other',
        CoverImg: 'other_08.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '空間提案 -<br>赤壁二',
        CaseID: '06',
        CaseType: 'other',
        CoverImg: 'other_06.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '3D 建模 -<br>樓梯間',
        CaseID: '01',
        CaseType: 'other',
        CoverImg: 'other_01.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '3D 建模 - 臥房',
        CaseID: '02',
        CaseType: 'other',
        CoverImg: 'other_02.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
    ],
  },
]
const currentType = ref(0) // 目前在哪個分類 f2e / about / skill / detail
const amount = 14 // 一頁幾筆作品
const sliderRef = ref(null)
const currentPage = ref(0) // 作品有多頁時 目前是哪一頁
const currentIndex = ref(0) // 當前選取作品 index
const currentDetailIndex = ref(1) // 當前選取作品圖片 index

const chunkArrayWithFill = (array, size) => {
  const groups = Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )

  // 補滿每一組
  return groups.map((group) => {
    if (group.length < size) {
      return [...group, ...Array(size - group.length).fill(null)]
    }
    return group
  })
}

const caseGroups = computed(() => chunkArrayWithFill(datas[currentType.value].case, amount))

// 切換分頁 作品 / 關於 / 專長
const switchPage = (i) => {
  global.theme = i
}

// 切換分類 f2e / about / skill / detail
const switchType = (i) => {
  currentType.value = i
  currentPage.value = 0
}

// 目前所在詳細頁第幾張圖
const switchImg = (i) => {
  currentDetailIndex.value = i
}

const goPage = (page) => {
  currentPage.value = Math.max(0, Math.min(page, caseGroups.value.length - 1))

  sliderRef.value?.scrollTo({
    left: sliderRef.value.clientWidth * currentPage.value,
    behavior: 'smooth',
  })
}

const prevPage = () => {
  goPage(currentPage.value - 1)
}

const nextPage = () => {
  goPage(currentPage.value + 1)
}

const totalPages = computed(() => caseGroups.value.length)

const hasPrev = computed(() => currentPage.value > 0)

const hasNext = computed(() => currentPage.value < totalPages.value - 1)

const toDetail = (idx) => {
  global.theme = 'detail'
  currentIndex.value = idx
  currentDetailIndex.value = 1
}

onBeforeMount(() => {
  // console.log(datas)
})

onMounted(() => {})
</script>

<template>
  <div class="l-cnt relative h-full w-full m:pb-[136px]">
    <Transition name="fade">
      <div
        class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
        v-show="global.theme === 'f2e'"
      >
        <h2
          class="flex items-end justify-center border-b-[2px] border-solid border-[#acd1ee] text-center tracking-[2px] text-[#fff] m:w-[300px] t:w-[364px] tm:mb-[6px] tm:pb-[6px] tm:text-[12px] p:mb-[10px] p:w-[546px] p:pb-[9px] p:text-[18px]"
        >
          <span>01.</span>
          <em
            class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[20px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
            >Works & <span class="text-[#accaee]">Design</span></em
          >
          <span>過往作品</span>
        </h2>
        <ul class="flex items-center justify-center text-center m:mt-[5px]">
          <li
            v-for="(item, index) in datas"
            :key="item.type"
            class="leading-[1em] tm:px-[12px] tm:text-[12px] p:px-[14px] p:text-[16px]"
            :class="index === 0 ? '' : 'border-l-[1px] border-solid border-[#fff]'"
          >
            <button
              class="leading-[1em] transition-all duration-300 ease-in-out hover:text-[#accaee] t:text-[12px] p:text-[16px]"
              :class="currentType === index ? 'pointer-events-none text-[#ff0]' : 'text-[#fff]'"
              @click="switchType(index)"
            >
              {{ item.type }}
            </button>
          </li>
        </ul>
        <div class="tm:mt-[32px] p:mt-[48px]">
          <div class="relative m:w-[306px] t:w-[780px] t:px-[26px] p:w-[1162px] p:px-[45px]">
            <div
              ref="sliderRef"
              class="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth m:hidden"
            >
              <div class="flex m:flex-col">
                <ul
                  v-for="(caseGroup, groupIndex) in caseGroups"
                  :key="groupIndex"
                  class="flex w-full shrink-0 snap-start flex-wrap items-start justify-center"
                >
                  <li
                    v-for="(item, index) in caseGroup"
                    :key="`${groupIndex}-${index}`"
                    class="flex flex-col items-center justify-center tm:w-[102px] tm:px-[5px] p:w-[152px] p:px-[8px]"
                  >
                    <button
                      class="flex flex-col items-center justify-center text-[#fff] transition-all duration-300 ease-in-out hover:text-[#accaee]"
                      @click="toDetail(index)"
                      :class="item ? '' : 'pointer-events-none'"
                    >
                      <ImgSrc
                        :src="`home/${item.CaseType}/${item.CoverImg}`"
                        :setClass="{
                          main: 'shadow-md flex-shrink-0 flex items-center justify-center p:w-[126px] tm:w-[84px] p:h-[126px] tm:h-[84px] p:border-[4px] tm:border-[3px] border-[#98cbe1] border-solid p:m-[5px] tm:m-[3px] px-[1px] bg-[#4e5ca5]',
                          img: 'w-full',
                        }"
                        v-if="item"
                      />
                      <div
                        class="flex flex-shrink-0 items-center justify-center border-solid border-[#98cbe1] bg-[#addee3] px-[1px] shadow-md tm:m-[3px] tm:h-[84px] tm:w-[84px] tm:border-[3px] p:m-[5px] p:h-[126px] p:w-[126px] p:border-[4px]"
                        v-else
                      >
                        <i
                          class="cross relative overflow-hidden border-[1px] border-solid border-[#6ba6e0] tm:h-[77px] tm:w-[77px] p:h-[116px] p:w-[116px]"
                        ></i>
                      </div>
                      <em
                        class="min-h-[3em] whitespace-nowrap text-center leading-[1.5em] tracking-[2px] tm:mb-[5px] tm:text-[12px] p:mb-[8px] p:text-[18px]"
                        v-html="item?.CaseName || ''"
                      ></em>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              class="ico-arrow left absolute top-1/2 -translate-y-1/2 m:hidden t:left-[8px] p:left-0"
              @click="prevPage"
              v-if="hasPrev"
            >
              <span class="sr-only">上一頁</span>
            </button>
            <button
              class="ico-arrow right absolute top-1/2 -translate-y-1/2 m:hidden t:right-[8px] p:right-0"
              @click="nextPage"
              v-if="hasNext"
            >
              <span class="sr-only">下一頁</span>
            </button>
            <ul class="flex w-full shrink-0 flex-wrap items-start pt:hidden pt:justify-center">
              <li
                v-for="(item, index) in datas[currentType].case"
                :key="index"
                class="flex flex-col items-center justify-center tm:w-[102px] tm:px-[5px] p:w-[152px] p:px-[8px]"
              >
                <button
                  class="flex flex-col items-center justify-center text-[#fff] transition-all duration-300 ease-in-out hover:text-[#accaee]"
                  @click="toDetail(index)"
                  :class="item ? '' : 'pointer-events-none'"
                >
                  <ImgSrc
                    :src="`home/${item.CaseType}/${item.CoverImg}`"
                    :setClass="{
                      main: 'shadow-md flex-shrink-0 flex items-center justify-center p:w-[126px] tm:w-[84px] p:h-[126px] tm:h-[84px] p:border-[4px] tm:border-[3px] border-[#98cbe1] border-solid p:m-[5px] tm:m-[3px] px-[1px] bg-[#4e5ca5]',
                      img: 'w-full',
                    }"
                    v-if="item"
                  />
                  <div
                    class="flex flex-shrink-0 items-center justify-center border-solid border-[#98cbe1] bg-[#addee3] px-[1px] shadow-md tm:m-[3px] tm:h-[84px] tm:w-[84px] tm:border-[3px] p:m-[5px] p:h-[126px] p:w-[126px] p:border-[4px]"
                    v-else
                  >
                    <i
                      class="cross relative overflow-hidden border-[1px] border-solid border-[#6ba6e0] tm:h-[77px] tm:w-[77px] p:h-[116px] p:w-[116px]"
                    ></i>
                  </div>
                  <em
                    class="min-h-[3em] whitespace-nowrap text-center leading-[1.5em] tracking-[2px] tm:mb-[5px] tm:text-[12px] p:mb-[8px] p:text-[18px]"
                    v-html="item?.CaseName || ''"
                  ></em>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
        v-show="global.theme === 'about'"
      >
        <h2
          class="flex items-end justify-center border-b-[2px] border-solid border-[#acd1ee] text-center tracking-[2px] text-[#fff] m:w-[300px] t:w-[364px] tm:mb-[6px] tm:pb-[6px] tm:text-[12px] p:mb-[10px] p:w-[546px] p:pb-[9px] p:text-[18px]"
        >
          <span>02.</span>
          <em
            class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[20px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
            >About <span class="text-[#accaee]">Me</span></em
          >
          <span>關於我</span>
        </h2>
        <div
          class="flex items-center justify-center m:w-full m:flex-col m:px-[20px] t:mt-[32px] t:w-[810px] t:px-[30px] p:mt-[48px] p:w-[990px]"
        >
          <div class="whitespace-nowrap m:w-full t:mr-[26px] p:mr-[39px]">
            <ul class="m:relative m:pl-[143px] m:pt-[32px] tm:mt-[5px]">
              <li class="m:absolute m:left-0 m:top-0 m:flex m:justify-center">
                <img
                  class="tm:w-[133px] p:w-[200px]"
                  src="../../assets/img/about/photo.gif"
                  alt="Brian Lin`s photo"
                />
              </li>
              <li
                class="border-b-[1px] border-dashed border-[#fff] leading-[1.5em] tracking-[1px] text-[#fff] tm:my-[6px] tm:pb-[6px] tm:text-[12px] p:my-[9px] p:pb-[9px] p:text-[16px]"
              >
                Brian Lin (1984.02.24)
              </li>
              <li class="leading-[1.5em] tracking-[1px] text-[#fff] tm:text-[12px] p:text-[16px]">
                淡江大學企管系畢業
              </li>
              <li class="leading-[1.5em] tracking-[1px] text-[#fff] tm:text-[12px] p:text-[16px]">
                資策會網頁互動設計菁英養成班
              </li>
            </ul>
            <ul class="flex items-center m:pl-[143px] tm:mt-[12px] p:mt-[20px] p:justify-between">
              <li class="">
                <a
                  class="text-[#333] hover:text-[#000]"
                  href="https://github.com/brian224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-github"
                    class="transition-all duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                  />
                </a>
              </li>
              <li class="tm:ml-[10px]">
                <a
                  class="text-[#00649d] hover:text-[#00456e]"
                  href="http://tw.linkedin.com/in/brianlin224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-linkin"
                    class="transition-all duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                  />
                </a>
              </li>
              <li class="tm:ml-[10px]">
                <a
                  class="text-[#ed4856] hover:text-[#a6333c]"
                  href="https://instagram.com/brianlin224/"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-ig"
                    class="transition-all duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                  />
                </a>
              </li>
              <li class="tm:ml-[10px]">
                <a
                  class="text-[#375596] hover:text-[#273e70]"
                  href="https://www.facebook.com/brian224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-fb"
                    class="transition-all duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                  />
                </a>
              </li>
            </ul>
          </div>
          <ul class="">
            <li class="m:mt-[12px]">
              <h3 class="mb-[6px] text-[#accaee] tm:text-[18px] p:text-[24px]">Experience</h3>
              <ul
                class="flex flex-col flex-wrap leading-[1.5em] tracking-[1px] text-[#fff] tm:text-[12px] pt:h-[6em] p:text-[16px]"
              >
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2015.12~NOW</span>方形糖創意數位
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2013.04~2015.11</span>永慶房產集團
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2012.08~2013.03</span>安捷達顧問
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2012.03~2012.07</span>學學文創志業
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2009.12~2012.03</span>華藝數位
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2009.03~2009.07</span>玉馬門創意設計
                </li>
                <li class="flex items-stretch pt:w-1/2">
                  <span class="min-w-[10em]">2008.05~2009.01</span>詩米亞媒體
                </li>
              </ul>
            </li>
            <li class="tm:mt-[12px] p:mt-[20px]">
              <h3 class="mb-[6px] text-[#accaee] tm:text-[18px] p:text-[24px]">Autobiography</h3>
              <article
                class="leading-[1.5em] tracking-[1px] text-[#fff] tm:text-[12px] p:text-[16px]"
              >
                <p class="">
                  我是具有十年以上經驗的前端工程師，目前專注於 Vue.js
                  與互動型網站開發，擅長打造具吸引力的活動頁面與使用者互動體驗。實務上熟悉 Canvas
                  操作、動畫效果實作與前端互動設計，能將創意轉化為流暢且具視覺張力的網頁呈現。
                </p>
                <p class="m:mt-[1.5em] p:mt-[1.5em]">
                  過往專案多以短期活動網站為主，涵蓋遊戲互動、手勢操作與動畫效果等情境，能在有限時程內快速開發並完成高品質呈現，協助專案提升使用者參與度與互動體驗。同時也具備良好的程式結構設計能力，確保專案在高度客製化下仍維持可維護性。
                </p>
                <p class="m:mt-[1.5em] p:mt-[1.5em]">
                  在團隊合作中，能與設計師、後端密切配合，將視覺設計與互動概念具體實現，並主動優化使用者體驗細節。持續關注前端技術與互動趨勢，期望在具創意與挑戰性的環境中，打造更具特色的數位體驗。
                </p>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
        v-show="global.theme === 'skill'"
      >
        <h2
          class="flex items-end justify-center border-b-[2px] border-solid border-[#acd1ee] text-center tracking-[2px] text-[#fff] m:w-[300px] t:w-[364px] tm:mb-[6px] tm:pb-[6px] tm:text-[12px] p:mb-[10px] p:w-[546px] p:pb-[9px] p:text-[18px]"
        >
          <span>03.</span>
          <em
            class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[20px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
            >Specialty & <span class="text-[#accaee]">Skill</span></em
          >
          <span>專長技能</span>
        </h2>
        <div
          class="skill-wrap flex items-start justify-center bg-center bg-no-repeat m:flex-col m:px-[20px] t:mt-[32px] t:w-[660px] t:px-[26px] p:mt-[48px] p:w-[990px]"
        >
          <ul class="m:mt-[20px] t:mr-[20px] pt:w-1/2 p:mr-[30px]">
            <li class="flex items-center justify-center tm:mb-[10px] p:mb-[15px]">
              <h3 class="tracking-[3px] text-[#ff0] tm:text-[14px] p:text-[20px]">技術專長</h3>
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                程式撰寫
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >Html、CSS / SCSS / Tailwind CSS、JavaScript、Vue.js、jQuery、JSON /
                JSON-LD、SVG</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                網頁技術應用
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >Git / GitLab / GitHub / SVN、Compass、Facebook API、Line Liff API、Google Map
                API、User Experience、User Interface、Google Analytics、CSS sprites、Web Fonts</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                慣用開發軟體
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >Visual Studio Code、TortoiseSVN、Chrome Developer
                Tools、Photoshop、Illustrator、Figma、Sketch、Slack</span
              >
            </li>
          </ul>
          <ul class="m:mt-[20px] pt:w-1/2">
            <li class="flex items-center justify-center tm:mb-[10px] p:mb-[15px]">
              <h3 class="tracking-[3px] text-[#ff0] tm:text-[14px] p:text-[20px]">實際應用經驗</h3>
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                前端 / 網頁設計
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >網頁製作 ( 單頁式網頁 / 無障礙網頁 / 手機網頁 / 自適應網頁 )、網站優化 ( 檔案合併 /
                文檔最小化 / CDN )、搜尋引擎最佳化 SEO、跨瀏覽器製作</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                介面設計
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >行動裝置 Apps 開發、Mobile Web 製作</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD] tm:text-[12px] p:text-[16px]">
                平面設計
              </h4>
              <span
                class="desc leading-[1.5em] text-[#fff] tm:pb-[10px] tm:pt-[5px] tm:text-[12px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
                >海報 / DM / EDM / 易拉展 / 名片 / 賀卡 / CI 設計</span
              >
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="inset-0 flex flex-col items-center m:pt-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
        v-show="global.theme === 'detail'"
      >
        <div
          class="relative t:mt-[16px] t:h-[340px] t:w-[562px] p:mt-[24px] p:h-[552px] p:w-[843px]"
        >
          <div
            class="wrap-shadow relative z-[1] h-full overflow-hidden border-solid border-[#98cbe1] bg-[#4e5ca5] t:border-[3px] p:border-[4px]"
          >
            <ul class="">
              <li
                v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
                :key="`${index}`"
                class="relative flex h-full w-full flex-col items-center justify-center"
              >
                <ImgSrc
                  :src="`home/${caseGroups[currentPage][currentIndex].CaseType}/detail/${caseGroups[currentPage][currentIndex].CaseType}${caseGroups[currentPage][currentIndex].CaseID}_0${currentDetailIndex}.png`"
                  :setClass="{
                    main: 'flex-shrink-0 flex items-center justify-center p:h-[544px] p:w-[835px] t:h-[334px] t:w-[556px]',
                    img: 'max-w-full max-h-full object-contain',
                  }"
                  v-if="caseGroups[currentPage][currentIndex]"
                />
                <a
                  :href="caseGroups[currentPage][currentIndex].webLink"
                  target="_blank"
                  class="web-url absolute left-[12px] text-[#fff] underline transition-all duration-300 ease-in-out hover:text-[#addee3] t:bottom-[3px] t:text-[12px] p:bottom-[4px] p:text-[16px]"
                  v-if="
                    caseGroups[currentPage][currentIndex].webLink &&
                    caseGroups[currentPage][currentIndex].webLink.split(',').length === 1
                  "
                >
                  {{ caseGroups[currentPage][currentIndex].webDesc }}
                </a>
                <a
                  :href="
                    caseGroups[currentPage][currentIndex].webLink.split(',')[currentDetailIndex - 1]
                  "
                  target="_blank"
                  class="web-url absolute left-[12px] text-[#fff] underline transition-all duration-300 ease-in-out hover:text-[#addee3] t:bottom-[5px] t:text-[12px] p:bottom-[4px] p:text-[16px]"
                  v-else-if="
                    caseGroups[currentPage][currentIndex].webLink &&
                    caseGroups[currentPage][currentIndex].webLink.split(',').length !== 1
                  "
                >
                  {{
                    caseGroups[currentPage][currentIndex].webDesc.split(',')[currentDetailIndex - 1]
                  }}
                </a>
              </li>
            </ul>
          </div>
          <ul
            class="ani-bookmark absolute left-full z-[0] flex flex-col transition-all duration-300 ease-in-out t:top-[4px] t:w-[50px] p:top-[6px] p:w-[75px]"
          >
            <li
              class="border-[1px] border-solid border-[#4c82d5] bg-[#fff] transition-all duration-300 ease-in-out hover:ml-[-1px] t:ml-[-12px] t:w-[50px] p:ml-[-23px] p:w-[75px]"
            >
              <button
                class="flex w-full items-center justify-end text-right text-[#00adee] t:h-[22px] t:pr-[6px] t:text-[10px] p:h-[33px] p:pr-[9px] p:text-[13px]"
                @click="switchPage('f2e')"
              >
                BACK
              </button>
            </li>
            <li
              v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
              :key="`${index}`"
              class="ani-bookmark-2 -translate-x-full border-[1px] border-solid border-[#4c82d5] transition-all duration-300 ease-in-out hover:ml-[-23px] t:mt-[5px] t:h-[22px] t:w-[50px] p:mt-[8px] p:h-[33px] p:w-[75px]"
              :class="
                currentDetailIndex === index
                  ? 'pointer-events-none ml-[-1px] bg-[#d5de21]'
                  : 'bg-[#fff] t:ml-[-28px] p:ml-[-42px]'
              "
            >
              <button
                class="flex w-full items-center justify-end text-right text-[#00adee] t:h-[22px] t:pr-[6px] t:text-[10px] p:h-[33px] p:pr-[9px] p:text-[13px]"
                @click="switchImg(index)"
              >
                {{ index }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="postcss">
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.ico-arrow {
  @apply t:h-[12px] t:w-[7px] t:px-[10px] t:py-[20px] p:h-[20px] p:w-[11px] p:px-[15px] p:py-[30px];

  &::before,
  &::after {
    @apply absolute left-1/2 bg-[#fff] content-default t:h-[8px] t:w-[2px] p:h-[12px] p:w-[3px];
  }

  &::before {
    @apply bottom-1/2 mb-[-1px];
  }

  &::after {
    @apply top-1/2 mt-[-1px];
  }

  &.left {
    &::before {
      @apply rotate-[30deg];
    }

    &::after {
      @apply rotate-[-30deg];
    }
  }

  &.right {
    &::before {
      @apply rotate-[-30deg];
    }

    &::after {
      @apply rotate-[30deg];
    }
  }
}

.cross {
  &::before,
  &::after {
    @apply absolute h-[1px] bg-[#fff] content-default tm:w-[110px] p:w-[164px];
  }

  &::before {
    @apply left-0 top-0 origin-top-left rotate-[45deg];
  }

  &::after {
    @apply right-0 top-0 origin-top-right rotate-[-45deg];
  }
}

.wrap-shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.web-url {
  @apply pl-[10px];

  &::before,
  &::after {
    @apply absolute left-0 top-1/2 -translate-y-1/2 border-[4px] border-solid border-transparent border-l-[#fff] content-default;
  }

  &::after {
    @apply left-[-3px];
  }
}

.skill-wrap {
  background-image: url('@imgs/skill/skill_bg.png');
}

.desc {
  text-shadow:
    1px 1px 3px #5894dd,
    1px -1px 3px #5894dd,
    -1px 1px 3px #5894dd,
    -1px -1px 3px #5894dd;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.ani-bookmark {
  animation: showBookmark 0.3s 0s forwards ease-in-out;
}

.ani-bookmark-2 {
  animation: showBookmark-2 0.2s 0.2s forwards ease-in-out;
}

@keyframes showBookmark {
  0% {
    transform: translateY(480px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes showBookmark-2 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@screen p {
  .skill-wrap {
    background-size: 696px auto;
  }
}
</style>
