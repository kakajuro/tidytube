
interface LanguageAdapter {
  ChannelsNewToYou: string[],
  LatestPostsFrom: string[],
  LatestFrom: string[],
  ForYou: string[],
  FromRelatedSearches: string[],
  PeopleAlsoSearchFor: string[],
  PeopleAlsoWatched: string[],
  PreviouslyWatched: string[]
  ShortsRemixingThisVideo: string[],
  news: string[]
}

export const AdapterFR:LanguageAdapter = {
  ChannelsNewToYou: ["Chaînes que vous avez manquées"],
  LatestPostsFrom: ["Derniers posts de", "Dernières posts de"],
  LatestFrom: ["Dernières de", "Dierniers de"],
  ForYou: ["Pour vous"],
  FromRelatedSearches: ["Résultats des recherches associées"],
  PeopleAlsoSearchFor: ["Recherches similaires"],
  PeopleAlsoWatched: ["Les internautes ont aussi regardé"],
  PreviouslyWatched: ["Regardées précédemment"],
  ShortsRemixingThisVideo: ["Shorts utilisant l'audio de cette vidéo"],
  news: ["news" || "nouvelles"]
}
