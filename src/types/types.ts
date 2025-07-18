export interface settingsType {
  "preventShorts": boolean,
  "removeShortsFromSearch": boolean,
  "removeShortsFromSite": boolean,
  "removeShortsPlayback": boolean,
  "removeShortsRemixingThisVideo": boolean,
  "removeShortsWhileWatching": boolean,
  "removeShortsExplore": boolean,
  "removeShortsFromChannel": boolean,

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
  "removeRecommendedTopicsFromSearch": boolean,
  "removeExploreMoreFromSearch": boolean,

  "removeAdsFromRecommendations": boolean,
  "removeAdCompanionSlots": boolean,
  "removeFeaturedBanners": boolean,
  "removePopups": boolean,
  "removeNews": boolean,
  "removeForYouFromChannel": boolean,
  "autoDisableAutoplay": boolean,
  "removeAIsummaries": boolean

  "disableTelemetry": boolean
}

export interface pageChange {
  "removeShortsFromSearch": number,
  "removeShortsPlayback": number,
  "removeShortsRemixingThisVideo": number,
  "removeShortsWhileWatching": number,
  "removeShortsExplore": number,
  "removeShortsFromChannel": number,

  "removeNewChannelsFromSearch": number,
  "removeLatestPostsFromSearch": number,
  "removeLatestVideosFromSearch": number,
  "removePreviouslyWatchedFromSearch": number,
  "removeForYouFromSearch": number,
  "removePeopleAlsoWatchedFromSearch": number,
  "removeFromRelatedSearches": number,
  "removePeopleAlsoSearchFor": number,
  "removeRecommendedTopicsFromSearch": number,
  "removeExploreMoreFromSearch": number,

  "removeAdsFromRecommendations": number,
  "removeAdCompanionSlots": number,
  "removeFeaturedBanners": number,
  "removePopups": number,
  "removeNews": number,
  "removeForYouFromChannel": number,
  "removeAIsummaries": number,
  "autoDisableAutoplay": number
}

export interface tabData {
  tab: number,
  sectionsRemovedPage: number
}

export interface tabStore {
  [tab: number]: number
}
