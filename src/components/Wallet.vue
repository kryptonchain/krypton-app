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
    <div> Your wallet address: {{ getPrimaryAddress }} </div>
    <div> Sync status {{ getSyncStatus }} </div>
</ion-content>
</ion-app>
</template>

<script>

import { WalletBackend, Daemon } from 'turtlecoin-wallet-backend';
import { store, mutations } from "./../store";
    
const daemon = new Daemon('localhost', 12888, false, false);
export default {
  name: 'Wallet',
  data() {
      return {
      }
  },
  computed: {
    getPrimaryAddress() {
      return store.primaryAddress;
    },
    getSyncStatus() {
        return store.syncStatus;
    }
  },
  methods: {
    linkTo () {
      this.$router.push('/')
    },
    createWallet() {
        this.wallet = WalletBackend.createWallet(daemon);
        this.setPrimaryAddress();
        this.syncWallet();

        // Attach heightchange listener
        this.wallet.on('heightchange', (walletBlockCount, localDaemonBlockCount, networkBlockCount) => {
            mutations.setSyncStatus(`New sync status: ${walletBlockCount} / ${localDaemonBlockCount}`);
            console.log(`New sync status: ${walletBlockCount} / ${localDaemonBlockCount}`);
        });
        console.log(daemon);
    },
    setPrimaryAddress() {
        if (this.wallet) {
            console.log(this.wallet.getPrimaryAddress());
            mutations.setPrimaryAddress(this.wallet.getPrimaryAddress());
            return this.wallet.getPrimaryAddress();
        }
    },
    async syncWallet() {
         /* Start wallet sync process */
        this.wallet.setLogLevel(1);
        await this.wallet.start();
    }
  }
}
</script>