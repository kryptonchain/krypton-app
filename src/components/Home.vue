<template>
<ion-app>
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Krypton Wallet
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>

    <ion-card>
        <ion-card-header>
            <ion-card-title>Welcome</ion-card-title>
        </ion-card-header>
        <ion-card-content>

            The world is your oyster.
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-button @click="linkTo" full>Open Existing Wallet</ion-button>    
                    </ion-col>

                    <ion-col>
                        <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>
                        <ion-button @click="openModal" full>Create new wallet</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            
        </ion-card-content>
    </ion-card>

</ion-content>
</ion-app>
</template>

<script>
import { Plugins } from '@capacitor/core';
import Modal from "./Modal.vue";

export default {
  name: 'Home',
  methods: {
    linkTo () {
      this.$router.push('wallet')
    },
    async openModal() {
      await this.$ionic.modalController
        .create({
          component: Modal,
          componentProps: {
            data: {
              content: 'New Content',
            },
            propsData: {
              title: 'New title',
            },
          },
        })
        .then(m => m.present())
    },
    async showDialogAlert() {
      await Plugins.Modals.alert({
          title: 'Alert',
          message: 'This is an example alert box'
      });
    }
  }
}
</script>