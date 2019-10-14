<template>
<ion-app>
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Vue Capacitor | About
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content padding>
    <ion-button @click="linkTo" full>Home</ion-button>
    <ion-button @click="createWallet" full>Generate Wallet</ion-button>
    <div> Your wallet address: {{ this.public_address }}</div>
</ion-content>
</ion-app>
</template>

<script>

import { WalletBackend, Daemon } from 'turtlecoin-wallet-backend';
    
const daemon = new Daemon('localhost', 12888, false, false);
export default {
  name: 'Wallet',
  data() {
      return {
          public_address: this.getWalletPrimaryAddress()
      }
  },
  methods: {
    linkTo () {
      this.$router.push('/')
    },
    createWallet() {
        this.wallet = WalletBackend.createWallet(daemon);
        console.log(this.wallet.getPrimaryAddress());
        this.public_address = this.wallet.getPrimaryAddress();
        this.syncWallet();
        console.log(daemon);
    },
    getWalletPrimaryAddress() {
        if (this.wallet) {
            return this.wallet.getPrimaryAddress();
        }
        return "not set";
    },
    async syncWallet() {
         /* Start wallet sync process */
        this.wallet.setLogLevel(0);
        await this.wallet.start();
    }
  }
}
</script>