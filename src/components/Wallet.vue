<template>
<ion-app>
    <ion-header>
    <ion-toolbar color="dark">
        <ion-title>
        <img alt="logo" height="40" src="../assets/krypton.png" /> Krypton Wallet | Wallet
        </ion-title>
    </ion-toolbar>
    </ion-header>
    <ion-content padding>
        <ion-button color="medium" @click="linkTo" full>Home</ion-button>
        <ion-button color="dark" @click="createWallet" full>Generate Wallet</ion-button>
        <div> Your wallet address: {{ getPrimaryAddress }} </div>
        <div> <ion-icon name="sync"></ion-icon> Sync status {{ getSyncStatus }} </div>
        <div v-for="(incomingTransaction, index) in incomingTransactions">
            T: {{ incomingTransaction.name }}
        </div>
    </ion-content>
    <ion-tab-bar>
        <ion-tab-button tab="schedule" @click="linkTo">
            <AlertIcon w="40px" h="40px" animate="rotate"/>
            <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="speakers">
            <ion-icon name="contacts"></ion-icon>
            <ion-label>Wallet</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about" @click="linkTo">
            <ion-icon name="information-circle"></ion-icon>
            <ion-label>About</ion-label>
        </ion-tab-button>
    </ion-tab-bar>
</ion-app>
</template>

<script>

import { WalletBackend, Daemon } from 'turtlecoin-wallet-backend';
import { store, mutations } from "./../store";

// Importing specific icon sets
import AlertIcon from "vue-ionicons/dist/ios-alert.vue";

// Using plain css
require("vue-ionicons/ionicons.css");
    
const daemon = new Daemon('localhost', 12888, false, false);
export default {
  name: 'Wallet',
  data() {
      return {
          incomingTransactions: []
      }
  },
  components: {
    AlertIcon
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

        // Attach incoming transactions listener
        this.wallet.on('incomingtx', (transaction) => {
            this.addIncomingTransaction(`Incoming transaction of ${transaction.totalAmount()} received!`);
            console.log(`Incoming transaction of ${transaction.totalAmount()} received!`);
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
    },
    addIncomingTransaction: function (incomingtx) {
        this.incomingTransactions.push({ name: incomingtx });
    }
  }
}
</script>