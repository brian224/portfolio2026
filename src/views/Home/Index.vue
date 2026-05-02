<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { onBeforeMount, onMounted, ref, computed, watch, nextTick } from 'vue'
import { globalStore } from '@stores/global.js'

const global = globalStore()

const datas = [
  {
    type: '活動作品',
    case: [
      {
        CaseName: '一銀 CNY_2025',
        CaseID: '94',
        CaseType: 'web',
        CoverImg: 'web_94.png',
        PhotoCount: '1',
        webLink: '',
        webDesc: '一銀 CNY_2025',
      },
      {
        CaseName: '錢錢溝通室',
        CaseID: '92',
        CaseType: 'web',
        CoverImg: 'web_92.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Mega/2023chatroom/index.html',
        webDesc: '錢錢溝通室 - 兆豐機器人理財 e 把兆',
      },
      {
        CaseName: '樂遊東京<br>有夠 High',
        CaseID: '91',
        CaseType: 'web',
        CoverImg: 'web_91.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Mega/2020Q1/index.html',
        webDesc: '兆豐銀行線上結匯 - 樂遊東京有夠 High 極速換匯超利 High',
      },
      {
        CaseName: '測出你的<br>共感類型',
        CaseID: '90',
        CaseType: 'web',
        CoverImg: 'web_90.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/MSF/campaign/index.html',
        webDesc: '測出你的共感類型 | 無國界醫生（台灣）',
      },
      {
        CaseName: '無國界醫生<br>痛，我願同行',
        CaseID: '89',
        CaseType: 'web',
        CoverImg: 'web_89.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/MSF/normal/index.html',
        webDesc: '痛，我願同行 人道醫療展 x 故事音樂節| 無國界醫生（台灣）',
      },
      {
        CaseName: 'NB 灰境計劃',
        CaseID: '88',
        CaseType: 'web',
        CoverImg: 'web_88.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/NB/grey/index.html',
        webDesc: 'THE GREY MISSIONS 灰境計劃',
      },
      {
        CaseName: '穿上 NB <br>從新出發',
        CaseID: '87',
        CaseType: 'web',
        CoverImg: 'web_87.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/NB/CNY2023/index.html',
        webDesc: '穿上 NB 從新出發',
      },
      {
        CaseName: 'New Balance<br>1906 復刻潮！',
        CaseID: '86',
        CaseType: 'web',
        CoverImg: 'web_86.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/NB/1906/index.html',
        webDesc: 'NB 1906 復刻潮！',
      },
      {
        CaseName: 'OLAY',
        CaseID: '85',
        CaseType: 'web',
        CoverImg: 'web_85.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Olay/website/index.html',
        webDesc: 'OLAY 高效透白光塑淡斑精華',
      },
      {
        CaseName: 'ScalpX',
        CaseID: '84',
        CaseType: 'web',
        CoverImg: 'web_84.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/PG/index.html',
        webDesc: 'ScalpX 頭皮科研養髮三部曲',
      },
      {
        CaseName: '新光人壽<br>男女眉角大不同',
        CaseID: '83',
        CaseType: 'web',
        CoverImg: 'web_83.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/skl/hisandher/html/Views/Home/index.html',
        webDesc: '新光人壽 男女眉角大不同',
      },
      {
        CaseName: '消一波！<br>奴曆七月業障重',
        CaseID: '82',
        CaseType: 'web',
        CoverImg: 'web_82.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Sugarfun/Event/karma/Views/Home/index.html',
        webDesc: '消一波！奴曆七月業障重',
      },
      {
        CaseName: '社畜自救指南',
        CaseID: '81',
        CaseType: 'web',
        CoverImg: 'web_81.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Sugarfun/Event/wageslave/Views/Home/index.html',
        webDesc: '當個活活潑潑的好學生，做個堂堂正正的社畜人',
      },
      {
        CaseName: '活存 V.S 定存<br>大解密',
        CaseID: '80',
        CaseType: 'web',
        CoverImg: 'web_80.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/rate/Views/Home/index.html',
        webDesc: '活存 V.S 定存大解密',
      },
      {
        CaseName: '練金人生大富翁',
        CaseID: '79',
        CaseType: 'web',
        CoverImg: 'web_79.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/rich/Views/Home/index.html',
        webDesc: '練金人生大富翁',
      },
      {
        CaseName: 'Richart<br>好友出任務',
        CaseID: '78',
        CaseType: 'web',
        CoverImg: 'web_78.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/MGM/event2/Views/Home/index.html',
        webDesc: 'Richart 好友出任務',
      },
      {
        CaseName: 'Richart 限時<br>闖關拿 10 萬',
        CaseID: '77',
        CaseType: 'web',
        CoverImg: 'web_77.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/MGM/event1/Views/Home/index.html',
        webDesc: 'Richart 限時闖關拿 10 萬',
      },
      {
        CaseName: '練財神回應',
        CaseID: '76',
        CaseType: 'web',
        CoverImg: 'web_76.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/invest/Views/Home/index.html',
        webDesc: 'Richart 2017 練財神回應',
      },
      {
        CaseName: '團援！一起幫助<br>野孩子回家',
        CaseID: '75',
        CaseType: 'web',
        CoverImg: 'web_75.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/friend/event6/index.html',
        webDesc: '【Richart 台新Ｘ野灣 】 團援！一起幫助野孩子回家',
      },
      {
        CaseName: '微笑連署書',
        CaseID: '74',
        CaseType: 'web',
        CoverImg: 'web_74.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/friend/event3/Views/Home/index.html',
        webDesc: '微笑連署書　一起；不流浪-Richart x 浪浪別哭-',
      },
      {
        CaseName: '毛孩告急！<br>救援浪浪',
        CaseID: '73',
        CaseType: 'web',
        CoverImg: 'web_73.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/friend/event2/Views/Home/index.html',
        webDesc: '毛孩告急！救援浪浪 不再忽視',
      },
      {
        CaseName: 'Richart 和<br>你一起助養浪浪',
        CaseID: '72',
        CaseType: 'web',
        CoverImg: 'web_72.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/friend/event1/Views/Home/index.html',
        webDesc: 'Richart 和你一起助養浪浪',
      },
      {
        CaseName: 'Richart x<br>friDay',
        CaseID: '71',
        CaseType: 'web',
        CoverImg: 'web_71.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/friday/Views/Home/index.html',
        webDesc: 'Richart x friDay 影音',
      },
      {
        CaseName: 'Richart<br>1 歲慶生會',
        CaseID: '70',
        CaseType: 'web',
        CoverImg: 'web_70.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/birthday/Views/Home/index.html',
        webDesc: 'Richart 1 歲慶生會',
      },
      {
        CaseName: '與你相遇<br>我很幸運',
        CaseID: '67',
        CaseType: 'web',
        CoverImg: 'web_67.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/2020/index.html',
        webDesc: '與你相遇，我很幸運',
      },
      {
        CaseName: 'RICHART<br>和你 17 賺翻天',
        CaseID: '69',
        CaseType: 'web',
        CoverImg: 'web_69.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Richart/17life/Views/Home/index.html',
        webDesc: 'RICHART 和你 17 賺翻天',
      },
      {
        CaseName: '台新銀行',
        CaseID: '66',
        CaseType: 'web',
        CoverImg: 'web_66.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Asset/website/Views/Home/index.html',
        webDesc: '台新銀行 翡翠會員計劃',
      },
      {
        CaseName: '瑞銀私人<br>財富俱樂部',
        CaseID: '65',
        CaseType: 'web',
        CoverImg: 'web_65.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/UBS/website/Views/Home/index.html',
        webDesc: '瑞銀私人財富俱樂部',
      },
      {
        CaseName: '全球人壽<br>好奇星大冒險',
        CaseID: '64',
        CaseType: 'web',
        CoverImg: 'web_64.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Transglobe/opening2020/index.html',
        webDesc: '全球人壽 好奇星大冒險',
      },
      {
        CaseName: '我的美麗日記<br>美麗超能力',
        CaseID: '63',
        CaseType: 'web',
        CoverImg: 'web_63.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Beauty/actQ4/Index.html',
        webDesc: '我的美麗日記｜美麗超能力',
      },
      {
        CaseName: '我的美麗日記<br>春の戀愛淨白肌',
        CaseID: '62',
        CaseType: 'web',
        CoverImg: 'web_62.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Beauty/2019/Views/Home/Index.html',
        webDesc: '我的美麗日記｜春の戀愛淨白肌',
      },
      {
        CaseName: '跟著我的美麗<br>日記去旅行',
        CaseID: '61',
        CaseType: 'web',
        CoverImg: 'web_61.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Beauty/travel/Views/Home/Index.html',
        webDesc: '跟著我的美麗日記去旅行',
      },
      {
        CaseName: 'Cartier<br>愛的關鍵字',
        CaseID: '60',
        CaseType: 'web',
        CoverImg: 'web_60.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cartier/VDay/',
        webDesc: 'Cartier 愛的關鍵字',
      },
      {
        CaseName: 'Cartier<br>2024 新春活動',
        CaseID: '59',
        CaseType: 'web',
        CoverImg: 'web_59.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cartier/CNY2024/?',
        webDesc: '選擇新年祝賀，點亮珍貴心意 | Cartier',
      },
      {
        CaseName: 'Cartier<br>2023 新春活動',
        CaseID: '58',
        CaseType: 'web',
        CoverImg: 'web_58.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cartier/CNY2023/index.html',
        webDesc: '來自卡地亞的新春祝福',
      },
      {
        CaseName: 'Cartier<br>新春活動',
        CaseID: '57',
        CaseType: 'web',
        CoverImg: 'web_57.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cartier/CNY/index.html',
        webDesc: '來自卡地亞的新春祝福',
      },
      {
        CaseName: 'KOKO 都市傳說',
        CaseID: '55',
        CaseType: 'web',
        CoverImg: 'web_55.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cathay/KoKo/Combo/webiste/index.html',
        webDesc: 'KOKO COMBO 卡－5% 都市傳說',
      },
      {
        CaseName: 'KOKO<br>斷糧求生懶人包',
        CaseID: '54',
        CaseType: 'web',
        CoverImg: 'web_54.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cathay/KoKo/5050/website/views/Home/index.html',
        webDesc: 'KOKO 斷糧求生懶人包',
      },
      {
        CaseName: '國泰一日生活圈',
        CaseID: '53',
        CaseType: 'web',
        CoverImg: 'web_53.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Cathay/expo/index.html',
        webDesc: '國泰線上展【國泰一日生活圈】',
      },
      {
        CaseName: 'Chloé<br>新春專屬桌布',
        CaseID: '52',
        CaseType: 'web',
        CoverImg: 'web_52.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Chloe/index.html',
        webDesc: 'Chloé 新春專屬桌布',
      },
      {
        CaseName: '永豐 DAWHO<br>大戶登大郎！',
        CaseID: '50',
        CaseType: 'web',
        CoverImg: 'web_50.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Dawho/dawho18/index.html',
        webDesc: '大戶登大郎！3% 優利、好禮等你拿｜永豐 DAWHO',
      },
      {
        CaseName: '地表最夯手機<br>由你決定！',
        CaseID: '51',
        CaseType: 'web',
        CoverImg: 'web_51.png',
        PhotoCount: '3',
        webLink: 'https://f2e.sugarfun.com.tw/FETnet/stars/views/Home/Index.html',
        webDesc: '遠傳送地表最夯手機',
      },
      {
        CaseName: 'Glenfiddich<br>格蘭菲迪',
        CaseID: '44',
        CaseType: 'web',
        CoverImg: 'web_44.png',
        PhotoCount: '2',
        webLink: 'https://f2e.sugarfun.com.tw/GlenFiddich/Views/Index.html',
        webDesc: 'Glenfiddich 格蘭菲迪',
      },
      {
        CaseName: '3M - 給我一個<br>賴床理由',
        CaseID: '43',
        CaseType: 'web',
        CoverImg: 'web_43.png',
        PhotoCount: '3',
        webLink: 'https://f2e.sugarfun.com.tw/3m/website/Views/Home/',
        webDesc: '3M 給我一個賴床理由',
      },
      {
        CaseName: '遠傳<br>資費得來速',
        CaseID: '49',
        CaseType: 'web',
        CoverImg: 'web_49.png',
        PhotoCount: '4',
        webLink: 'https://f2e.sugarfun.com.tw/FETnet/tariff/Index.html',
        webDesc: '遠傳 資費得來速',
      },
      {
        CaseName: '貓奴狗奴看過來',
        CaseID: '48',
        CaseType: 'web',
        CoverImg: 'web_48.png',
        PhotoCount: '3',
        webLink:
          'https://f2e.sugarfun.com.tw/FETnet/pets/views/Home/Index.html,https://f2e.sugarfun.com.tw/FETnet/pets/views/Home/dialog.html,https://f2e.sugarfun.com.tw/FETnet/pets/views/Home/Product-Housekeeper.html',
        webDesc: '首頁,互動頁,產品頁',
      },
      {
        CaseName: 'LINE MOBILE',
        CaseID: '47',
        CaseType: 'web',
        CoverImg: 'web_47.png',
        PhotoCount: '3',
        webLink:
          'https://f2e.sugarfun.com.tw/FETnet/dna/website/Index-full.html,https://f2e.sugarfun.com.tw/FETnet/line-mobile/2020/Views/index.html,https://f2e.sugarfun.com.tw/FETnet/line-mobile/2019/Views/index.html',
        webDesc: 'LINE MOBILE 重磅好康 立即搶購,LINE MOBILE 驚喜島,LINE MOBILE 驚喜大飯店',
      },
      {
        CaseName: 'Gucci<br>Garden',
        CaseID: '46',
        CaseType: 'web',
        CoverImg: 'web_46.png',
        PhotoCount: '5',
        webLink:
          'https://f2e.sugarfun.com.tw/Gucci/website/index.html,https://f2e.sugarfun.com.tw/Gucci/website/ticket.html,https://f2e.sugarfun.com.tw/Gucci/website/shop.html,https://f2e.sugarfun.com.tw/Gucci/gallery/gallery.html,https://f2e.sugarfun.com.tw/Gucci/gallery/gallery-details.html?id=5',
        webDesc: '首頁,票券頁,專門店資訊,展覽資訊,活動介紹',
      },
      {
        CaseName: '全家鮮食平台',
        CaseID: '27',
        CaseType: 'web',
        CoverImg: 'web_27.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '永慶房屋<br>房仲科技 3.0',
        CaseID: '31',
        CaseType: 'web',
        CoverImg: 'web_31.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '中國信託<br>活動網頁',
        CaseID: '24',
        CaseType: 'web',
        CoverImg: 'web_24.png',
        PhotoCount: '2',
        webLink: '',
        webDesc: '',
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
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '好房網新聞活動',
        CaseID: '30',
        CaseType: 'web',
        CoverImg: 'web_30.png',
        PhotoCount: '3',
        webLink: 'http://event.housefun.com.tw/329mag_press_conference/,,',
        webDesc: '好房網不動產市場週報 創刊發表暨記者會,,',
      },
    ],
  },
  {
    type: '專案作品',
    case: [
      {
        CaseName: '台新新光金控',
        CaseID: '56',
        CaseType: 'web',
        CoverImg: 'web_56.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/Holdings/2025/new/index.html',
        webDesc: '台新新光金控',
      },
      {
        CaseName: '漢來美食',
        CaseID: '45',
        CaseType: 'web',
        CoverImg: 'web_45.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Hanlai/Food/2016/website/index.html',
        webDesc: '漢來美食',
      },
      {
        CaseName: '遠東百貨',
        CaseID: '93',
        CaseType: 'web',
        CoverImg: 'web_93.png',
        PhotoCount: '1',
        webLink: 'https://www.feds.com.tw/',
        webDesc: '遠東百貨',
      },
      {
        CaseName: '台新投信',
        CaseID: '68',
        CaseType: 'web',
        CoverImg: 'web_68.png',
        PhotoCount: '1',
        webLink: 'https://f2e.sugarfun.com.tw/Taishin/SIT/Views/home/index.html',
        webDesc: '台新投信',
      },
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
        CaseName: '好房網市場週報',
        CaseID: '29',
        CaseType: 'web',
        CoverImg: 'web_29.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '遠傳電信',
        CaseID: '37',
        CaseType: 'web',
        CoverImg: 'web_37.png',
        PhotoCount: '4',
        webLink: 'https://www.fetnet.net/content/cbu/tw/index.html',
        webDesc: '遠傳電信',
      },
      {
        CaseName: '華南財富管理',
        CaseID: '39',
        CaseType: 'web',
        CoverImg: 'web_39.png',
        PhotoCount: '4',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '中租租車',
        CaseID: '26',
        CaseType: 'web',
        CoverImg: 'web_26.png',
        PhotoCount: '3',
        webLink: 'https://www.rentalcar.com.tw/',
        webDesc: '中租租車官方網站',
      },
      {
        CaseName: '中國信託<br>保險經紀人',
        CaseID: '23',
        CaseType: 'web',
        CoverImg: 'web_23.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: '澳盛銀行',
        CaseID: '40',
        CaseType: 'web',
        CoverImg: 'web_40.png',
        PhotoCount: '3',
        webLink: 'https://www.anz.com/institutional/global/taiwan/zh-hant/',
        webDesc: '澳盛銀行 - 遙控理財',
      },
      {
        CaseName: '中國信託<br>商業銀行',
        CaseID: '36',
        CaseType: 'web',
        CoverImg: 'web_36.png',
        PhotoCount: '4',
        webLink: 'https://www.ctbcbank.com/twrbo/zh_tw/index.html',
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
        webLink: '',
        webDesc: '',
      },
      {
        CaseName: 'LUXGEN',
        CaseID: '41',
        CaseType: 'web',
        CoverImg: 'web_41.png',
        PhotoCount: '5',
        webLink: 'https://www.luxgen-motor.com.tw/',
        webDesc: 'LUXGEN 納智捷汽車',
      },
      {
        CaseName: '中國信託 CI',
        CaseID: '25',
        CaseType: 'web',
        CoverImg: 'web_25.png',
        PhotoCount: '3',
        webLink: '',
        webDesc: '',
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
        webLink: '',
        webDesc: '',
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
        webLink: '',
        webDesc: '',
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
        webLink: '',
        webDesc: '',
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

watch(caseGroups, async () => {
  currentPage.value = 0

  await nextTick()

  sliderRef.value.scrollLeft = 0
})

// 切換分頁 作品 / 關於 / 專長
const switchPage = (i) => {
  global.theme = i
}

// 切換分類 f2e / about / skill / detail
const switchType = (i) => {
  currentType.value = i
  // currentPage.value = 0
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
  currentDetailIndex.value = 1

  if (idx >= amount) {
    currentIndex.value = Math.floor(idx % amount)
    currentPage.value = Math.floor(idx / amount)
  } else {
    currentIndex.value = idx
  }
}

onBeforeMount(() => {
  // console.log(datas)
})

onMounted(() => {})
</script>

<template>
  <div class="l-cnt relative h-full w-full m:min-h-[100dvh] m:pb-[164px]">
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
              <div class="flex">
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
                JSON-LD、SVG、AMP、PWA</span
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
        class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
        v-show="global.theme === 'detail'"
      >
        <div
          class="relative m:w-[335px] t:mt-[16px] t:h-[340px] t:w-[562px] p:mt-[24px] p:h-[552px] p:w-[843px]"
        >
          <div
            class="wrap-shadow relative z-[1] h-full overflow-hidden t:border-[3px] pt:border-solid pt:border-[#98cbe1] pt:bg-[#4e5ca5] p:border-[4px]"
          >
            <ul class="">
              <li
                v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
                :key="`${index}`"
                class="relative flex h-full w-full flex-col justify-center m:mb-[10px] pt:items-center"
              >
                <ImgSrc
                  :src="`home/${caseGroups[currentPage][currentIndex].CaseType}/detail/${caseGroups[currentPage][currentIndex].CaseType}${caseGroups[currentPage][currentIndex].CaseID}_0${currentDetailIndex}.png`"
                  :setClass="{
                    main: 'flex-shrink-0 flex items-center justify-center p:h-[544px] p:w-[835px] t:h-[334px] t:w-[556px] m:hidden',
                    img: 'max-w-full max-h-full object-contain',
                  }"
                  v-if="caseGroups[currentPage][currentIndex]"
                />
                <ImgSrc
                  :src="`home/${caseGroups[currentPage][currentIndex].CaseType}/detail/${caseGroups[currentPage][currentIndex].CaseType}${caseGroups[currentPage][currentIndex].CaseID}_0${index}.png`"
                  :setClass="{
                    main: 'm:wrap-shadow m:mb-[3px] flex-shrink-0 flex items-center justify-center m:w-full pt:hidden border-solid border-[#98cbe1] bg-[#4e5ca5] m:border-[3px]',
                    img: 'max-w-full max-h-full object-contain',
                  }"
                  v-if="caseGroups[currentPage][currentIndex]"
                />
                <a
                  :href="caseGroups[currentPage][currentIndex].webLink"
                  target="_blank"
                  class="web-url left-[12px] z-[1] text-[#fff] underline transition-all duration-300 ease-in-out hover:text-[#addee3] m:relative t:bottom-[5px] tm:text-[12px] pt:absolute p:bottom-[4px] p:text-[16px]"
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
                  class="web-url left-[12px] z-[1] text-[#fff] underline transition-all duration-300 ease-in-out hover:text-[#addee3] m:relative t:bottom-[5px] tm:text-[12px] pt:absolute p:bottom-[4px] p:text-[16px]"
                  v-else-if="
                    caseGroups[currentPage][currentIndex].webLink &&
                    caseGroups[currentPage][currentIndex].webLink.split(',').length !== 1 &&
                    caseGroups[currentPage][currentIndex].webDesc.split(',')[
                      currentDetailIndex - 1
                    ] !== ''
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
            class="ani-bookmark absolute z-[0] flex transition-all duration-300 ease-in-out m:left-[4px] m:top-full m:mt-[-1px] m:hidden t:top-[4px] t:w-[50px] pt:left-full pt:flex-col p:top-[6px] p:w-[75px]"
          >
            <li
              class="border-[1px] border-solid border-[#4c82d5] bg-[#fff] transition-all duration-300 ease-in-out m:mt-[-16px] m:flex m:h-[50px] m:w-[40px] m:items-end t:ml-[-12px] t:w-[50px] p:ml-[-23px] p:w-[75px] p:hover:ml-[-1px]"
            >
              <button
                class="flex h-full w-full text-[#00adee] m:items-end m:justify-center m:pb-[4px] m:text-center t:h-[22px] t:pr-[6px] t:text-[10px] pt:items-center pt:justify-end pt:text-right p:h-[33px] p:pr-[9px] p:text-[13px]"
                @click="switchPage('f2e')"
              >
                <span class="m:hidden">BACK</span>
                <span class="relative rotate-180 pt:hidden">➜</span>
              </button>
            </li>
            <li
              v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
              :key="`${index}`"
              class="ani-bookmark-2 -translate-x-full border-[1px] border-solid border-[#4c82d5] transition-all duration-300 ease-in-out m:ml-[5px] m:flex m:h-[50px] m:w-[40px] m:items-end t:mt-[5px] t:h-[22px] t:w-[50px] p:mt-[8px] p:h-[33px] p:w-[75px] p:hover:ml-[-23px]"
              :class="
                currentDetailIndex === index
                  ? 'pointer-events-none bg-[#d5de21] m:mt-[-1px] pt:ml-[-1px]'
                  : 'bg-[#fff] m:mt-[-16px] t:ml-[-28px] p:ml-[-42px]'
              "
            >
              <button
                class="flex h-full w-full text-right text-[#00adee] m:items-end m:justify-center m:pb-[4px] t:h-[22px] t:pr-[6px] t:text-[10px] pt:items-center pt:justify-end p:h-[33px] p:pr-[9px] p:text-[13px]"
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

@screen p {
  .skill-wrap {
    background-size: 696px auto;
  }
}

@screen pt {
  .wrap-shadow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
}

@screen m {
  .m:wrap-shadow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .ani-bookmark {
    transform: translateX(100dvw);
  }

  @keyframes showBookmark {
    0% {
      transform: translateX(100dvw);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes showBookmark-2 {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
}
</style>
