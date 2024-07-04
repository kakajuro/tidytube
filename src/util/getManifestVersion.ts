import { browser } from "webextension-polyfill-ts";

export const getManifestVer = ():String => {
  const manifestVersion = browser.runtime.getManifest().version;
  return manifestVersion;
}