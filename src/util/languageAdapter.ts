
interface LanguageAdapter {
  ChannelsNewToYou: string[],
  LatestPostsFrom: string[],
  LatestFrom: string[],
  ForYou: string[],
  FromRelatedSearches: string[],
  PeopleAlsoSearchFor: string[],
  PeopleAlsoWatched: string[],
  PreviouslyWatched: string[],
  ShortsRemixingThisVideo: string[],
  news: string[]
}

export const AdapterFR:LanguageAdapter = {
  ChannelsNewToYou: ["Chaînes que vous avez manquées"],
  LatestPostsFrom: ["Derniers posts de", "Dernières posts de"],
  LatestFrom: ["Dernières vidéos de", "Dierniers vidéos de"],
  ForYou: ["Pour vous"],
  FromRelatedSearches: ["Résultats des recherches associées"],
  PeopleAlsoSearchFor: ["Recherches similaires"],
  PeopleAlsoWatched: ["Les internautes ont aussi regardé"],
  PreviouslyWatched: ["Regardées précédemment"],
  ShortsRemixingThisVideo: ["Shorts utilisant l'audio de cette vidéo"],
  news: ["news", "nouvelles"]
}

export const AdapterNL:LanguageAdapter = {
  ChannelsNewToYou: ["Nieuwe kanalen voor jou"],
  LatestPostsFrom: ["Nieuwste posts van"],
  LatestFrom: ["Het nieuwste van"],
  ForYou: ["Voor jou"],
  FromRelatedSearches: ["Van gerelateerde zoekopdrachten"],
  PeopleAlsoSearchFor: ["Mensen zoeken ook naar"],
  PeopleAlsoWatched: ["Anderen keken ook naar"],
  PreviouslyWatched: ["Eerder bekeken"],
  ShortsRemixingThisVideo: ["Shorts die deze video opnieuw mixen"],
  news: ["nieuws"]
}

export const AdapterPT_BR:LanguageAdapter = {
  ChannelsNewToYou: ["Novos canais para você"],
  LatestPostsFrom: ["Últimas postagens de"],
  LatestFrom: ["Vídeo mais recente do canal"],
  ForYou: ["Para você"],
  FromRelatedSearches: ["De pesquisas relacionadas"],
  PeopleAlsoSearchFor: ["As pessoas também pesquisam"],
  PeopleAlsoWatched: ["Outros usuários também assistiram"],
  PreviouslyWatched: ["Assistidos anteriormente"],
  ShortsRemixingThisVideo: ["Shorts que remixam esse vídeo"],
  news: ["notícias", "notícia"]
}

export const AdapterPT:LanguageAdapter = {
  ChannelsNewToYou: ["Canais novos para si"],
  LatestPostsFrom: ["Publicações mais recentes de"],
  LatestFrom: ["Mais recentes do canal"],
  ForYou: ["Para si"],
  FromRelatedSearches: ["De pesquisas relacionadas"],
  PeopleAlsoSearchFor: ["As pessoas também pesquisam"],
  PeopleAlsoWatched: ["As pessoas também viram"],
  PreviouslyWatched: ["Já vistos"],
  ShortsRemixingThisVideo: ["Vídeos curtos que fazem remixes deste vídeo"],
  news: ["notícias", "notícia"]
}

export const AdapterRU:LanguageAdapter = {
  ChannelsNewToYou: ["Новые каналы для вас"],
  LatestPostsFrom: ["новые записи"],
  LatestFrom: ["Новые видео на канале"],
  ForYou: ["Для вас"],
  FromRelatedSearches: ["Из связанных запросов"],
  PeopleAlsoSearchFor: ["Похожие запросы"],
  PeopleAlsoWatched: ["Другие видео, которые посмотрели зрители"],
  PreviouslyWatched: ["Просмотренные видео"],
  ShortsRemixingThisVideo: ["Shorts с этим видео"],
  news: ["новости"]
}

export const AdapterDE:LanguageAdapter = {
  ChannelsNewToYou: ["Neue Kanäle für dich"],
  LatestPostsFrom: ["Neueste Beiträge von"],
  LatestFrom: ["Neueste Videos von"],
  ForYou: ["Für mich"],
  FromRelatedSearches: ["Aus ähnlichen Suchanfragen"],
  PeopleAlsoSearchFor: ["Ähnliche Suchanfragen"],
  PeopleAlsoWatched: ["Nutzer haben auch gesehen"],
  PreviouslyWatched: ["Schon angesehen"],
  ShortsRemixingThisVideo: ["Shorts-Remixe mit diesem Video"],
  news: ["Nachricht", "Nachrichten", "Neuigkeiten", "die Nachricht", "die Nachrichten", "die Neuigkeiten"]
}