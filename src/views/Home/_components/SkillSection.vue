<spec lang="md">
# SkillSection

03. Specialty & Skill 專長技能：「技術專長」與「專業經歷」兩欄。
純靜態內容，只依 `global.theme === 'skill'` 顯示（v-show）。手機版以 `m:order-*` 重排技術專長的項目順序。
</spec>

<script setup>
import { globalStore } from '@stores/global.js'

const global = globalStore()
</script>

<template>
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
          class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[24px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
          >Specialty & <span class="text-[#accaee]">Skill</span></em
        >
        <span>專長技能</span>
      </h2>
      <div
        class="skill-wrap flex items-start justify-center bg-center bg-no-repeat m:flex-col m:px-[20px] t:mt-[32px] t:w-[810px] t:px-[26px] p:mt-[48px] p:w-[990px]"
      >
        <ul class="m:mt-[20px] m:flex m:w-full m:flex-wrap t:mr-[20px] pt:w-1/2 p:mr-[30px]">
          <li class="flex items-center justify-center m:w-full tm:mb-[10px] p:mb-[15px]">
            <h3 class="tracking-[3px] text-[#ff0] m:text-[16px] t:text-[14px] p:text-[20px]">
              技術專長
            </h3>
          </li>
          <li class="flex flex-col items-start m:order-1 m:w-1/2">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              前端開發技術
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>HTML5</span><span class="m:hidden">、</span
              ><span>CSS3 / SCSS / Tailwind CSS / PostCSS</span><span class="m:hidden">、</span
              ><span>JavaScript (ES6+)</span><span class="m:hidden">、</span><span>Vue.js</span
              ><span class="m:hidden">、</span><span>jQuery</span><span class="m:hidden">、</span
              ><span>SVG</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:order-3 m:w-1/2">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              前端工程化
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Vue / Nuxt</span><span class="m:hidden">、</span><span>Webpack / Vite</span
              ><span class="m:hidden">、</span><span>npm</span><span class="m:hidden">、</span>
              <span>EJS</span><span class="m:hidden">、</span><span>Pug</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:order-3 m:w-1/2">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              API / 第三方整合
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Facebook API</span><span class="m:hidden">、</span><span>LINE LIFF API</span
              ><span class="m:hidden">、</span><span>Google Maps API</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:order-5 m:w-1/2">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              版本控制與協作
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Git / GitLab / GitHub</span><span class="m:hidden">、</span
              ><span>SVN / TortoiseSVN</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:order-2 m:w-1/2">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              設計與開發工具
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Visual Studio Code</span><span class="m:hidden">、</span>
              <!-- <span>TortoiseGit</span><span class="m:hidden">、</span> -->
              <span>Chrome Developer Tools</span><span class="m:hidden">、</span
              ><span>Photoshop</span><span class="m:hidden">、</span><span>Illustrator</span
              ><span class="m:hidden">、</span><span>Figma</span><span class="m:hidden">、</span>
              <!-- <span>Sketch</span><span class="m:hidden">、</span> -->
              <span>Slack</span>
            </p>
          </li>
        </ul>
        <ul class="m:mt-[20px] m:w-full pt:w-1/2">
          <li class="flex items-center justify-center tm:mb-[10px] p:mb-[15px]">
            <h3 class="tracking-[3px] text-[#ff0] m:text-[16px] t:text-[14px] p:text-[20px]">
              專業經歷
            </h3>
          </li>
          <li class="flex flex-col items-start m:w-full">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              網站開發與前端實作
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>單頁式網站（SPA）開發</span><span class="m:hidden">、</span
              ><span>響應式網頁設計（RWD）</span><span class="m:hidden">、</span
              ><span>手機網頁 / 行動裝置優化</span><span class="m:hidden">、</span
              ><span>無障礙網站（Accessibility / WCAG）</span><span class="m:hidden">、</span
              ><span>跨瀏覽器相容性開發</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:w-full">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              網站效能與品質優化
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Chrome Lighthouse</span><span class="m:hidden">、</span
              ><span>檔案合併與最小化（Minification）</span><span class="m:hidden">、</span
              ><span>CDN 導入</span><span class="m:hidden">、</span><span>網站載入速度優化</span
              ><span class="m:hidden">、</span><span>自動化測試導入與維護</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:w-full">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              SEO 與結構優化
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>SEO 技術優化</span><span class="m:hidden">、</span
              ><span>結構化資料（Schema / JSON-LD）</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:w-full">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              資訊安全與流程管理
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>黑箱 / 白箱弱點掃描配合與修正</span><span class="m:hidden">、</span
              ><span>ISO 27001 資安流程配合</span>
            </p>
          </li>
          <li class="flex flex-col items-start m:w-full">
            <h4
              class="bg-[#fff] px-[5px] font-bold text-[#5894DD] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              開發流程與部署管理
            </h4>
            <p
              class="desc leading-[1.5em] text-[#fff] m:flex m:flex-col m:text-[14px] t:text-[12px] tm:pb-[10px] tm:pt-[5px] p:pb-[15px] p:pt-[8px] p:text-[18px]"
            >
              <span>Git Flow 版本管理</span><span class="m:hidden">、</span
              ><span>CI / CD 建置與部署流程</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style lang="postcss">
@screen p {
  .skill-wrap {
    background-size: 696px auto;
  }
}
</style>
