import { browser } from "webextension-polyfill-ts";

export const getManifestVer = () => {
  const manifestVersion = browser.runtime.getManifest().version;
  return manifestVersion;
}