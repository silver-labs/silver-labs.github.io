function lightningGo() {
  console.log('lightningGo!!');
  if (document.URL.includes('/RWS/') && document.URL.includes('candidateID=')) {
    //Insert Lightning Out Component (assuming Script Injected already by manifest)
      waitForLightning();
  }
}

async function waitForLightning(){
  console.log('Lightning Ready!! start');
  while(!(typeof $Lightning !== "undefined")) {
    console.log('waiting for Lightning.....');
    await new Promise(r => setTimeout(r, 500));
  }
  var node = document.getElementById('ligoScript');

  //get Token
  var sToken = node.getAttribute('data');
  console.log(`Token: ${sToken}`);
  $Lightning.use('C:LinkedInLightningOutApplication',()=>{console.log('Lightning Ready!!');},'https://allegisgroup.lightning.force.com',`${sToken}`);
  console.log('Lightning Ready!! called');

  //remove script
    if (node.parentNode) {
      //node.parentNode.removeChild(node)
    };
}

lightningGo();
