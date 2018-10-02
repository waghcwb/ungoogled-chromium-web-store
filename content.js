class UngoogledChromium {
  constructor() {
    this.checkForChromeStoreButtons()
  }
  
  checkForChromeStoreButtons() {
    const interval = window.setInterval(() => {
      if (this.$availableInChromeStoreButtons.length) {
        clearInterval(interval)
        this.transformChromeWebStoreButtons()
      }
    }, 100)
  }
  
  transformChromeWebStoreButtons() {
    this.$availableInChromeStoreButtons.forEach(button => {
      const $downloadButton = button.closest('a')
      const extensionId = $downloadButton.getAttribute('href').split('/').pop()
      
      $downloadButton.setAttribute('href',
          this.downloadChromeExtensionUrlPattern(extensionId))
    })
  }
  
  get chromiumVersion() {
    return /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1]
  }
  
  downloadChromeExtensionUrlPattern(extensionId) {
    return `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=${this.chromiumVersion}&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`
  }
  
  get $availableInChromeStoreButtons() {
    return document.querySelectorAll('[aria-label="Available on Chrome"]')
  }
}

window.addEventListener('load', () => new UngoogledChromium)
