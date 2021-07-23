<template lang="pug">
  .app-container
    router-view(name="header")
    router-view
    .notification-container(:class="{active: notificationShow}")
      notification(:text="notificationMsg" :type="notificationType" @click="hideNotificationAction")
</template>
<script>
import notification from "./components/notification";
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    notification
  },
  methods: {
    ...mapActions({
      hideNotificationAction : "notification/hide"
    })
  },
  computed : {
    ...mapState("notification", {
      notificationShow : state => state.show,
      notificationMsg : state => state.msg,
      notificationType : state => state.type
    })
  }
}
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss">
  
</style>