import Vue from "vue";

export const store = Vue.observable({
  primaryAddress: "not set",
  syncStatus: "not synced"
});

export const mutations = {
  setPrimaryAddress(primaryAddress) {
    store.primaryAddress = primaryAddress;
  },
  setSyncStatus(syncStatus) {
    store.syncStatus = syncStatus;
  }
};
