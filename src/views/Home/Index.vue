<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { onBeforeMount, onMounted, ref, computed } from 'vue'
import { globalStore } from '@stores/global.js'

const global = globalStore()

const datas = [
  {
    type: '前端作品',
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
        CaseName: '好房網市場週報',
        CaseID: '29',
        CaseType: 'web',
        CoverImg: 'web_29.png',
        PhotoCount: '4',
        webLink: 'http://news.housefun.com.tw/RealEstate',
        webDesc: '好房網市場週報',
      },
      {
        CaseName: '好房網M版',
        CaseID: '38',
        CaseType: 'web',
        CoverImg: 'web_38.png',
        PhotoCount: '1',
        webLink: 'http://buy.housefun.com.tw/mobile',
        webDesc: '好房網M版',
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
        CaseName: '永慶房屋<br>房仲科技 3.0',
        CaseID: '31',
        CaseType: 'web',
        CoverImg: 'web_31.png',
        PhotoCount: '3',
        webLink: 'http://brianlin224.theweb.tw/webLink/yc_brand/index.html',
        webDesc: '永慶房屋「房仲科技 3.0」',
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
        CaseName: '好房網<br>物件即時通',
        CaseID: '35',
        CaseType: 'web',
        CoverImg: 'web_35.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '※ 此專案尚未上線，不便公開',
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
    type: '網頁設計',
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
        webLink: 'http://www.expresstaoyuan.com',
        webDesc: '桃園假日飯店',
      },
      {
        CaseName: '賽先生<br>科學玩具購物網',
        CaseID: '10',
        CaseType: 'web',
        CoverImg: 'web_10.png',
        PhotoCount: '3',
        webLink: 'http://www.mr-sai.com/mrsai.html',
        webDesc: '賽先生科學玩具購物網',
      },
      {
        CaseName: '設計師交流之夜',
        CaseID: '20',
        CaseType: 'web',
        CoverImg: 'web_20.png',
        PhotoCount: '3',
        webLink: 'http://www.xuexue.tw/pkn',
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
        webLink: 'http://ecohecohxue.xuexue.tw',
        webDesc: '一口一口學食驗室',
      },
      {
        CaseName: 'iRead<br>網路書店',
        CaseID: '17',
        CaseType: 'web',
        CoverImg: 'web_17.png',
        PhotoCount: '2',
        webLink: 'http://www.iread.com.tw',
        webDesc: 'iRead灰熊愛讀書',
      },
      {
        CaseName: '1+1來玩',
        CaseID: '21',
        CaseType: 'web',
        CoverImg: 'web_21.png',
        PhotoCount: '1',
        webLink: 'http://www.xuexue.tw/kids',
        webDesc: '1+1來玩',
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
        webLink: 'http://www.sunte.com.tw',
        webDesc: '商鐵咖啡',
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
        webLink: 'http://shing-he-stars.com',
        webDesc: '星禾出版社',
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
    ],
  },
  {
    type: '平面廣告',
    case: [
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
        CaseName: '各式DM',
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
        CaseName: '各式活動EDM',
        CaseID: '01',
        CaseType: 'ad',
        CoverImg: 'ad_01.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'CI規劃',
        CaseID: '03',
        CaseType: 'ad',
        CoverImg: 'ad_03.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '餐廳MENU',
        CaseID: '10',
        CaseType: 'ad',
        CoverImg: 'ad_10.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
    ],
  },
  {
    type: '其他作品',
    case: [
      {
        CaseName: 'app實作 -<br>好房網雙訊',
        CaseID: '10',
        CaseType: 'other',
        CoverImg: 'other_10.png',
        PhotoCount: '2',
        webLink:
          'https://itunes.apple.com/tw/app/hao-fang-wang-shuang-xun/id838108164?mt=8,https://play.google.com/store/apps/details?id=com.housefun.doubleSMS&hl=zh_TW',
        webDesc: 'iTunes - 好房網雙訊,Google play - 好房網雙訊',
      },
      {
        CaseName: 'app實作 -<br>iRead ebook',
        CaseID: '03',
        CaseType: 'other',
        CoverImg: 'other_03.png',
        PhotoCount: '3',
        webLink: 'play.google.com/store/apps/details?id=com.airiti.reader',
        webDesc: 'Google play - iRead ebook',
      },
      {
        CaseName: 'app提案 -<br>國寶菁華',
        CaseID: '04',
        CaseType: 'other',
        CoverImg: 'other_04.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'app提案 -<br>世界美術',
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
        CaseName: '3D建模 -<br>樓梯間',
        CaseID: '01',
        CaseType: 'other',
        CoverImg: 'other_01.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '3D建模 - 臥房',
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

  if (currentPage.value !== 0) {
    nextPage()
  }
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
}

onBeforeMount(() => {
  // console.log(datas)
})

onMounted(() => {})
</script>

<template>
  <div class="l-cnt relative h-full w-full">
    <Transition name="fade">
      <div
        class="absolute inset-0 flex flex-col items-center pt-[75px]"
        v-show="global.theme === 'f2e'"
      >
        <h2
          class="mb-[10px] flex w-[546px] items-end justify-center border-b-[2px] border-solid border-[#acd1ee] pb-[9px] text-center text-[18px] tracking-[2px] text-[#fff]"
        >
          <span>01.</span>
          <em class="mx-[8px] mb-[-5px] text-[30px] tracking-[-1px]"
            >Works & <span class="text-[#accaee]">Design</span></em
          >
          <span>過往作品</span>
        </h2>
        <ul class="flex items-center justify-center text-center">
          <li
            v-for="(item, index) in datas"
            :key="item.type"
            class="px-[14px] leading-[1em]"
            :class="index === 0 ? '' : 'border-l-[1px] border-solid border-[#fff]'"
          >
            <button
              class="transition-all duration-300 ease-in-out hover:text-[#accaee]"
              :class="currentType === index ? 'pointer-events-none text-[#ff0]' : 'text-[#fff]'"
              @click="switchType(index)"
            >
              {{ item.type }}
            </button>
          </li>
        </ul>
        <div class="mt-[48px]">
          <div class="relative w-[1162px] px-[45px]">
            <div
              ref="sliderRef"
              class="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              <div class="flex">
                <ul
                  v-for="(caseGroup, groupIndex) in caseGroups"
                  :key="groupIndex"
                  class="flex w-full shrink-0 snap-start flex-wrap items-start justify-center"
                >
                  <li
                    v-for="(item, index) in caseGroup"
                    :key="`${groupIndex}-${index}`"
                    class="flex w-[152px] flex-col items-center justify-center px-[8px]"
                  >
                    <button
                      class="text-[#fff] transition-all duration-300 ease-in-out hover:text-[#accaee]"
                      @click="toDetail(index)"
                    >
                      <ImgSrc
                        :src="`home/${item.CaseType}/${item.CoverImg}`"
                        :setClass="{
                          main: 'shadow-md flex-shrink-0 flex items-center justify-center w-[126px] h-[126px] border-[4px] border-[#98cbe1] border-solid m-[5px] px-[1px] bg-[#4e5ca5]',
                          img: 'w-full',
                        }"
                        v-if="item"
                      />
                      <div
                        class="m-[5px] flex h-[126px] w-[126px] flex-shrink-0 items-center justify-center border-[4px] border-solid border-[#98cbe1] bg-[#addee3] px-[1px] shadow-md"
                        v-else
                      >
                        <i
                          class="cross relative h-[116px] w-[116px] overflow-hidden border-[1px] border-solid border-[#6ba6e0]"
                        ></i>
                      </div>
                      <em
                        class="mb-[8px] whitespace-nowrap text-center text-[18px] leading-[1.5em] tracking-[2px]"
                        v-html="item?.CaseName || ''"
                      ></em>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              class="ico-arrow left absolute left-0 top-1/2 -translate-y-1/2"
              @click="prevPage"
              v-if="hasPrev"
            >
              <span class="sr-only">上一頁</span>
            </button>
            <button
              class="ico-arrow right absolute right-0 top-1/2 -translate-y-1/2"
              @click="nextPage"
              v-if="hasNext"
            >
              <span class="sr-only">下一頁</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="absolute inset-0 flex flex-col items-center pt-[75px]"
        v-show="global.theme === 'about'"
      >
        <h2
          class="mb-[10px] flex w-[546px] items-end justify-center border-b-[2px] border-solid border-[#acd1ee] pb-[9px] text-center text-[18px] tracking-[2px] text-[#fff]"
        >
          <span>02.</span>
          <em class="mx-[8px] mb-[-5px] text-[30px] tracking-[-1px]"
            >About <span class="text-[#accaee]">Me</span></em
          >
          <span>關於我</span>
        </h2>
        <div class="mt-[48px] flex items-center justify-center t:w-full t:px-[30px] p:w-[810px]">
          <div class="mr-[39px] whitespace-nowrap">
            <ul class="">
              <li class="">
                <img
                  class="w-[200px]"
                  src="../../assets/img/about/photo.gif"
                  alt="Brian Lin`s photo"
                />
              </li>
              <li
                class="my-[9px] border-b-[1px] border-dashed border-[#fff] pb-[9px] text-[16px] leading-[1.5em] tracking-[1px] text-[#fff]"
              >
                Brian Lin (1984.02.24)
              </li>
              <li class="text-[16px] leading-[1.5em] tracking-[1px] text-[#fff]">
                淡江大學企管系畢業
              </li>
              <li class="text-[16px] leading-[1.5em] tracking-[1px] text-[#fff]">
                資策會網頁互動設計菁英養成班
              </li>
            </ul>
            <ul class="mt-[20px] flex items-center justify-between">
              <li class="">
                <a
                  class="text-[#333] hover:text-[#000]"
                  href="https://github.com/brian224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-github"
                    class="h-[48px] w-[48px] transition-all duration-300 ease-in-out"
                  />
                </a>
              </li>
              <li class="">
                <a
                  class="text-[#00649d] hover:text-[#00456e]"
                  href="http://tw.linkedin.com/in/brianlin224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-linkin"
                    class="h-[48px] w-[48px] transition-all duration-300 ease-in-out"
                  />
                </a>
              </li>
              <li class="">
                <a
                  class="text-[#ed4856] hover:text-[#a6333c]"
                  href="https://instagram.com/brianlin224/"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-ig"
                    class="h-[48px] w-[48px] transition-all duration-300 ease-in-out"
                  />
                </a>
              </li>
              <li class="">
                <a
                  class="text-[#375596] hover:text-[#273e70]"
                  href="https://www.facebook.com/brian224"
                  target="_blank"
                >
                  <SvgIcon
                    icon="ico-fb"
                    class="h-[48px] w-[48px] transition-all duration-300 ease-in-out"
                  />
                </a>
              </li>
            </ul>
          </div>
          <ul class="">
            <li class="">
              <h3 class="mb-[6px] text-[24px] text-[#accaee]">Experience</h3>
              <ul class="text-[16px] leading-[1.5em] tracking-[1px] text-[#fff]">
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2015.12~NOW</span>方形糖創意數位
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2013.04~2015.11</span>永慶房產集團
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2012.08~2013.03</span>安捷達顧問
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2012.03~2012.07</span>學學文創志業
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2009.12~2012.03</span>華藝數位
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2009.03~2009.07</span>玉馬門創意設計
                </li>
                <li class="flex items-stretch">
                  <span class="min-w-[10em]">2008.05~2009.01</span>詩米亞媒體
                </li>
              </ul>
            </li>
            <li class="mt-[20px]">
              <h3 class="mb-[6px] text-[24px] text-[#accaee]">Autobiography</h3>
              <article class="text-[16px] leading-[1.5em] tracking-[1px] text-[#fff]">
                <p class="">
                  從空間設計、平面設計到網頁設計，然後再鑽研介面設計與前端技術；從業務、專案負責人、設計再到開發者。
                </p>
                <p class="">
                  七年的職涯裡，我嘗試在各領域提升自己、尋找喜好與定位，並一步步調整工作的方向與發展目標。
                </p>
                <p class="">
                  2012
                  年，透過進修、接案與求職，得到不少同行朋友的分享與前輩的指導下，不僅在網頁程式的專業能力有大幅成長，也在職涯方向獲得許多建議，因而確認出我的職涯新目標--前端工程師。
                </p>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="absolute inset-0 flex flex-col items-center pt-[75px]"
        v-show="global.theme === 'skill'"
      >
        <h2
          class="mb-[10px] flex w-[546px] items-end justify-center border-b-[2px] border-solid border-[#acd1ee] pb-[9px] text-center text-[18px] tracking-[2px] text-[#fff]"
        >
          <span>03.</span>
          <em class="mx-[8px] mb-[-5px] text-[30px] tracking-[-1px]"
            >Specialty & <span class="text-[#accaee]">Skill</span></em
          >
          <span>專長技能</span>
        </h2>
        <div
          class="skill-wrap mt-[48px] flex w-[990px] items-start justify-center bg-center bg-no-repeat"
        >
          <ul class="mr-[30px] w-1/2">
            <li class="mb-[15px] flex items-center justify-center">
              <h3 class="text-[20px] tracking-[3px] text-[#ff0]">技術專長</h3>
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">程式撰寫</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >Html、CSS / SCSS / Tailwind CSS、JavaScript、Vue.js、jQuery、JSON /
                JSON-LD、SVG</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">網頁技術應用</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >Git / GitLab / GitHub / SVN、Compass、Facebook API、Line Liff API、Google Map
                API、User Experience、User Interface、Google Analytics、CSS sprites、Web Fonts</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">慣用開發軟體</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >Visual Studio Code、TortoiseSVN、Chrome Developer
                Tools、Photoshop、Illustrator、Figma、Sketch、Slack</span
              >
            </li>
          </ul>
          <ul class="w-1/2">
            <li class="mb-[15px] flex items-center justify-center">
              <h3 class="text-[20px] tracking-[3px] text-[#ff0]">實際應用經驗</h3>
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">前端 / 網頁設計</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >網頁製作 ( 單頁式網頁 / 無障礙網頁 / 手機網頁 / 自適應網頁 )、網站優化 ( 檔案合併 /
                文檔最小化 / CDN )、搜尋引擎最佳化 SEO、跨瀏覽器製作</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">介面設計</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >行動裝置 Apps 開發、Mobile Web 製作</span
              >
            </li>
            <li class="flex flex-col items-start">
              <h4 class="bg-[#fff] px-[5px] font-bold text-[#5894DD]">平面設計</h4>
              <span class="desc pb-[15px] pt-[8px] text-[18px] leading-[1.5em] text-[#fff]"
                >海報 / DM / EDM / 易拉展 / 名片 / 賀卡 / CI 設計</span
              >
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="absolute inset-0 flex flex-col items-center pt-[75px]"
        v-show="global.theme === 'detail'"
      >
        <div class="relative mt-[24px] h-[552px] w-[843px]">
          <div
            class="wrap-shadow relative z-[1] h-full overflow-hidden border-[4px] border-solid border-[#98cbe1] bg-[#4e5ca5]"
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
                    main: 'flex-shrink-0 flex items-center justify-center h-[544px] w-[835px]',
                    img: 'max-w-full max-h-full object-contain',
                  }"
                  v-if="caseGroups[currentPage][currentIndex]"
                />
                <a
                  :href="caseGroups[currentPage][currentIndex].webLink"
                  target="_blank"
                  class="web-url absolute bottom-[4px] left-[12px] text-[16px] text-[#fff] underline hover:text-[#addee3]"
                  v-if="caseGroups[currentPage][currentIndex].webLink"
                >
                  {{ caseGroups[currentPage][currentIndex].webDesc }}
                </a>
              </li>
            </ul>
          </div>
          <ul
            class="ani-bookmark absolute left-full top-[6px] z-[0] flex w-[75px] flex-col transition-all duration-300 ease-in-out"
          >
            <li
              class="ml-[-23px] w-[75px] border-[1px] border-solid border-[#4c82d5] bg-[#fff] transition-all duration-300 ease-in-out hover:ml-[-1px]"
            >
              <button
                class="flex h-[33px] w-full items-center justify-end pr-[9px] text-right text-[13px] text-[#00adee]"
                @click="switchPage('f2e')"
              >
                BACK
              </button>
            </li>
            <li
              v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
              :key="`${index}`"
              class="ani-bookmark-2 ml-[-42px] mt-[8px] h-[33px] w-[75px] -translate-x-full border-[1px] border-solid border-[#4c82d5] transition-all duration-300 ease-in-out hover:ml-[-23px]"
              :class="
                currentDetailIndex === index
                  ? 'pointer-events-none ml-[-1px] bg-[#d5de21]'
                  : 'ml-[-42px] bg-[#fff]'
              "
            >
              <button
                class="flex h-[33px] w-full items-center justify-end pr-[9px] text-right text-[13px] text-[#00adee]"
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
  @apply h-[20px] w-[11px] px-[15px] py-[30px];

  &::before,
  &::after {
    @apply absolute left-1/2 h-[12px] w-[3px] bg-[#fff] content-default;
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
    @apply absolute h-[1px] w-[164px] bg-[#fff] content-default;
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
  background-size: 696px auto;
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
</style>
