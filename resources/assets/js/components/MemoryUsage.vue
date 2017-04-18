<template>
  <div class="row justify-content-md-center mt-3">
    <div class="col-md-6">
      <div class="card card-default">
        <div class="card-block">
          <h4 class="card-title">Memory Usage</h4>
          <p class="card-text" v-text="formatted"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      formatted() {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const size = parseInt(this.value, 10);
        const unit = Math.floor(Math.max(0, Math.log(size)) / Math.log(1024));
        return Math.round(size / Math.pow(1024, unit), 2)+' '+units[unit];
      }
    },
    props: ['value']
  }
</script>
