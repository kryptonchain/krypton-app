<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>
          NFC UID Reader
        </ion-title>
        <ion-item slot="end"> <MdSettingsIcon w="40px" h="40px" /> </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Welcome - You will need to turn on NFC on your phone and hover over
            the NFC chips. It is this simple. :)
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button color="dark" @click="linkTo" full
                  >Scan NFC tag</ion-button
                >
              </ion-col>

              <ion-col>
                <ion-button color="medium" @click="showDialogAlert" full
                  >Check NFC status</ion-button
                >
                <ion-button color="danger" @click="openModal" full
                  >Show modal</ion-button
                >
              </ion-col>
            </ion-row>

            <ion-row v-if="getNfcTags.length > 0">
              <ion-col> UID:</ion-col>
              <ion-col>Raw data:</ion-col>
            </ion-row>
            <ion-row v-for="(nfcData, index) in getNfcTags">
              <ion-col> {{ nfcData.uid }} </ion-col>
              <ion-col>{{ nfcData.data }}</ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-tab-bar color="dark">
      <ion-tab-button tab="download">
        <MdDownloadIcon w="40px" h="40px" />
        <ion-label>Download</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="share">
        <MdShareIcon w="40px" h="40px" />
        <ion-label>Share</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-app>
</template>

<script>
import MdSettingsIcon from "vue-ionicons/dist/md-settings.vue";
import MdDownloadIcon from "vue-ionicons/dist/md-download.vue";
import MdShareIcon from "vue-ionicons/dist/md-share.vue";

// Using plain css
require("vue-ionicons/ionicons.css");

import { Plugins } from "@capacitor/core";
import Modal from "./Modal.vue";
import { store, mutations } from "./../store";
const { NFC } = Plugins;

export default {
  name: "Home",
  components: {
    MdSettingsIcon,
    MdDownloadIcon,
    MdShareIcon
  },
  computed: {
    getNfcTags() {
      return store.nfcTags;
    }
  },
  methods: {
    linkTo() {
      this.$router.push("wallet");
    },
    async checkNfcTagStatus() {
      nfc.addTagDiscoveredListener(
        function(nfcEvent) {
          const nfcTag = nfcEvent;
          alert(JSON.stringify(nfcTag));
          const tagId = nfc.bytesToHexString(nfcEvent.tag.id);
          alert(tagId);
          mutations.addNfcTag(nfcTag, tagId);
        },
        function() {
          // success callback
          alert("Waiting for NFC touch");
        },
        function(error) {
          // error callback
          alert("Error adding NFC touch listener " + JSON.stringify(error));
        }
      );
    },
    async openModal() {
      await this.$ionic.modalController
        .create({
          component: Modal,
          componentProps: {
            data: {
              content: "New 2 Content"
            },
            propsData: {
              title: "New 2 title"
            }
          }
        })
        .then(m => m.present());
    },
    async showDialogAlert() {
      await this.checkNfcTagStatus();
      // Used for testing
      // mutations.addNfcTag("tet", 25);
      await Plugins.Modals.alert({
        title: "NFC alert",
        message: "abc"
      });
    }
  }
};
</script>
