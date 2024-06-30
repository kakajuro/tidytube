export interface settingsType {
  "preventShorts": boolean,
  "removeShortsFromSearch": boolean,
  "removeShortsFromSite": boolean,
  "removeShortsPlayback": boolean,
  "removeShortsRemixingThisVideo": boolean,
  "removeShortsWhileWatching": boolean,

  "shortsOptionsDisabled": boolean,
  "shortsOnSiteDisabled": boolean,

  "removeAdsFromReccomendations": boolean,
  "removeNewChannelsFromSearch": boolean,
  "removeLatestPostsFromSearch": boolean,
  "removeLastestVideosFromSearch": boolean,
  "removePreviouslyWatchedFromSearch": boolean,
  "removeForYouFromSearch": boolean,
  "removePeopleAlsoWatchedFromSearch": boolean,
  "removeFromRelatedSearches": boolean,
  "removePeopleAlsoSearchFor": boolean,
  "removeFeaturedBanners": boolean
}

export interface tabData {
  tab: number,
  sectionsRemovedPage: number
}
