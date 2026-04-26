/**
 * 跳轉判斷 - 遊戲狀態
 * @type {AfterEachGuard}
 */
export const guardByGameStatus = (status, to, router) => {
  // 尚未玩過遊戲
  if (!status.IsFinish) {
    console.log('[Redirect] Game is not finished')
    router.replace({
      name: 'HomeIndex',
      query: to.query,
    })
    return true
  }
  return false
}

/**
 * 跳轉判斷 - 留資頁面
 * @type {AfterEachGuard}
 */
export const guardFormIndex = (status, to, router) => {
  // 已填寫過表單
  if (status.IsSubmit) {
    console.log('[Redirect] Form has already been submitted')
    router.replace({
      name: 'ResultIndex',
      query: to.query,
    })
    return true
  }

  return false
}

/**
 * 跳轉判斷 - 結果頁面
 * @type {AfterEachGuard}
 */
export const guardResultIndex = (status, to, router) => {
  // 如果從遊戲頁跳轉
  if (to.params.fromGame) {
    // 不進行跳轉
    return false
  }

  // 尚未留過資料
  if (!status.IsSubmit) {
    console.log('[Redirect] Has not yet been registered')
    router.replace({
      name: 'FormIndex',
      query: to.query,
    })
    return true
  }

  return false
}

/**
 * 路由檢查方法
 * @param {GuardList[]} list 檢查列表
 * @param {ApiStatusGame} statusGame 遊戲狀態
 * @param {RouteLocationNormalized} to 路由資訊
 * @param {Router} router 路由實體
 */
export const guardMethod = (list, statusGame, to, router) => {
  // 取得對應路由
  const target = list.find((item) => item.path === to.name)

  // 找不到對應路由則表示不跳轉
  return target ? guardCheckList(target.guard, statusGame, to, router) : false
}

/**
 * 路由檢查串連判斷
 * @param {AfterEachGuard[]} list 跳轉判斷列表
 * @param {ApiStatusGame} statusGame 遊戲狀態
 * @param {RouteLocationNormalized} to 路由資訊
 * @param {Router} router 路由實體
 */
export const guardCheckList = (list, statusGame, to, router) => {
  return list.reduce((isRedirect, action) => {
    // 如果未跳轉
    if (!isRedirect) {
      // 進行跳轉判斷
      isRedirect = action(statusGame, to, router)
    }
    // 如果已跳轉，下個迴圈則不觸發跳轉判斷
    return isRedirect
  }, false)
}
