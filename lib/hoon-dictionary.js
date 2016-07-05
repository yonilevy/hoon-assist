'use babel';

export default class HoonDictionary {

  constructor() {
    this.dict = this.buildDict(require('./hoon-dictionary.json'))
  }

  destroy() {

  }

  htmlForWord(word) {
    return this.dict[word];
  }

  buildDict(entries) {
    const res = {};
    for (entry of entries) {
      for (key of entry['keys']) {
        res[key] = entry['doc'];
      }
    }
    return res;
  }

}
