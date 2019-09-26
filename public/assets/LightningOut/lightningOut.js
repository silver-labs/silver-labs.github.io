class encrypt {
  toAscii(input) {
    return unescape(encodeURIComponent(input));
  }
  toUnicode(input) {
    return decodeURIComponent(escape(input));
  }
  symmetric(input, k) {
    let me = `${input}`;
    const key = Number(String(Number(k))) === k ? Number(k) : 13;

    /* eslint no-bitwise: ["error", { "allow": ["^"] }] */
    me = me.split('').map(c => c.charCodeAt(0)).map(i => i ^ key);
    me = String.fromCharCode.apply(undefined, me);
    return me;
  }
}

var sc = document.createElement("script");
sc.setAttribute('src','https://allegisgroup.my.salesforce.com/lightning/lightning.out.js');
document.getElementsByTagName('head')[0].appendChild(sc);

function getToken(callback) {
  chrome.storage.local.get(['enctok'], (result) => {
    let sToken = '';

    if (result) {
      if (result.enctok) {
        const { enctok: s } = result;
        //let decToken = Buffer.from(s, 'base64').toString();
        let decToken = atob(s);
        const enc = new encrypt();
        decToken = enc.toUnicode(decToken);
        decToken = decodeURI(enc.symmetric(decToken));
        sToken = decToken;
      }
    }

    if (!sToken) {
      sToken = '';
    }

    callback(sToken);
  });
}

getToken((sToken) => {
  var sc2 = document.createElement("script");
  sc2.setAttribute('id','ligoScript');
  sc2.setAttribute('data',sToken);
  console.log(`Token111: ${sToken}`);
  sc2.setAttribute('src','chrome-extension://bbakjbkphbohobollodiigcaadadcpjg/assets/lightningGo.js');
  document.getElementsByTagName('head')[0].appendChild(sc2);
});







