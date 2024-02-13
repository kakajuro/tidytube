import { browser } from "webextension-polyfill-ts";

export const getManifestVerison = () => {
  const manifestVersion = browser.runtime.getManifest().version;

  return manifestVersion;
}