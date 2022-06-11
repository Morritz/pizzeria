<script>
  export let message;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>{message}</h1>

<style>
  h1 {
    color: purple;
  }
</style>
