<template>
  <div class="row justify-content-md-center mt-3">
    <div class="col-md-6">
      <div class="card card-default">
        <div class="card-block">
          <h4 class="card-title">Connections</h4>
          <p class="card-text" v-text="label"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      label() {
        if( this.connected === true ) {
          return this.connections.length;
        }
        if( this.connecting === true ) {
          return 'Connecting...';
        }
        return 'Disconnected';
      }
    },
    props: ['connected', 'connecting', 'connections']
  }
</script>
