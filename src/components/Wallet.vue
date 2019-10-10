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
    
const daemon = new Daemon('explorer.kryptonchain.org', 12888);
export default {
  name: 'Wallet',
  data() {
      return {
          public_address: "not set"
      }
  },
  methods: {
    linkTo () {
      this.$router.push('/')
    },
    createWallet() {
        const wallet = WalletBackend.createWallet(daemon);
        console.log(wallet.getPrimaryAddress());
        this.public_address = wallet.getPrimaryAddress();
        console.log(daemon);
    }
  }
}
</script>