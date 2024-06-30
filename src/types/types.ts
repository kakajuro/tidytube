export interface settingsType {
  "preventShorts": boolean,
  "removeShortsFromSearch": boolean,
  "removeShortsFromSite": boolean,
  "removeShortsPlayback": boolean,
  "removeShortsRemixingThisVideo": boolean,
  "removeShortsWhileWatching": boolean,

  "shortsOptionsDisabled": boolean,
  "shortsOnSiteDisabled": boolean,
  
  "removeNewChannelsFromSearch": boolean,
  "removeLatestPostsFromSearch": boolean,
  "removeLastestVideosFromSearch": boolean,
  "removePreviouslyWatchedFromSearch": boolean,
  "removeForYouFromSearch": boolean,
  "removePeopleAlsoWatchedFromSearch": boolean,
  "removeFromRelatedSearches": boolean,
  "removePeopleAlsoSearchFor": boolean,

  "removeAdsFromReccomendations": boolean,
  "removeAdCompanionSlots": boolean,
  "removeFeaturedBanners": boolean,
  "removePopups": boolean
}

export interface tabData {
  tab: number,
  sectionsRemovedPage: number
}
