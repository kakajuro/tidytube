
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

export const AdapterES:LanguageAdapter = {
  ChannelsNewToYou: ["Canales nuevos para ti"],
  LatestPostsFrom: ["Últimas publicaciones de", "Publicaciones más recientes de"],
  LatestFrom: ["Lo último de", "Lo más reciente de"],
  ForYou: ["Para ti"],
  FromRelatedSearches: ["De búsquedas relacionadas"],
  PeopleAlsoSearchFor: ["Otras personas también buscan"],
  PeopleAlsoWatched: ["Los usuarios también han visto", "Las personas también vieron"],
  PreviouslyWatched: ["Vistos anteriormente"],
  ShortsRemixingThisVideo: ["Shorts con audio de este vídeo", "Shorts que recrean este video"],
  news: ["noticias"]
}

export const AdapterIT:LanguageAdapter = {
  ChannelsNewToYou: ["Nuovi canali per te"],
  LatestPostsFrom: ["Ultimi post di"],
  LatestFrom: ["Le novità di"],
  ForYou: ["Per te"],
  FromRelatedSearches: ["Dalle ricerche correlate"],
  PeopleAlsoSearchFor: ["Ricerche correlate"],
  PeopleAlsoWatched: ["Gli utenti hanno guardato anche"],
  PreviouslyWatched: ["Guardati in precedenza"],
  ShortsRemixingThisVideo: ["Short con remix di questo video"],
  news: ["notizia"]
}

export const AdapterJP:LanguageAdapter = {
  ChannelsNewToYou: ["未視聴のチャンネル"],
  LatestPostsFrom: ["からの最新の投稿"],
  LatestFrom: ["の最新の動画をお見逃しなく"],
  ForYou: ["おすすめ"],
  FromRelatedSearches: ["関連する検索から"],
  PeopleAlsoSearchFor: ["他の人はこちらも検索"],
  PeopleAlsoWatched: ["他の人はこちらも視聴しています"],
  PreviouslyWatched: ["前に再生した動画"],
  ShortsRemixingThisVideo: ["この動画をリミックスしたショート動画"],
  news: ["ニュース", "便り"]
}

export const AdapterKO:LanguageAdapter = {
  ChannelsNewToYou: ["새로운 맞춤 채널"],
  LatestPostsFrom: ["의 최신 게시물"],
  LatestFrom: ["의 최신 동영상"],
  ForYou: ["추천"],
  FromRelatedSearches: ["관련 검색어의 검색결과"],
  PeopleAlsoSearchFor: ["함께 검색한 항목"],
  PeopleAlsoWatched: ["관련 동영상"],
  PreviouslyWatched: ["이전에 시청한 동영상"],
  ShortsRemixingThisVideo: ["이 동영상을 리믹스한 Shorts 동영상"],
  news: ["소식", "새로운 보도", "별다른 일"]
}

export const AdapterKK:LanguageAdapter = {
  ChannelsNewToYou: ["Сізге таңсық арналар"],
  LatestPostsFrom: ["арнасының жаңа постары"],
  LatestFrom: ["арнасының жаңа бейнелері"],
  ForYou: ["Сізге арналған"],
  FromRelatedSearches: ["Ұқсас сұраулардан"],
  PeopleAlsoSearchFor: ["Басқалар іздеген бейнелер"],
  PeopleAlsoWatched: ["Басқалар көрген бейнелер"],
  PreviouslyWatched: ["Қаралған бейнелер"],
  ShortsRemixingThisVideo: ["Осы бейне қолданылған қысқа бейнелер"],
  news: ["жаңалықтар"]
}