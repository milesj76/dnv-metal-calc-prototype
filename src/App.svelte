<script lang="ts">
  import MainForm from "./components/MainForm.svelte";
  import Results from "./components/Results.svelte"
</script>

<main>
  <header>
    <h1>Metal Order Calculator</h1>
  </header>
  <section>
    <MainForm />
    <Results />
  </section>
  <footer>
    <small>Built by Miles Burke</small>
  </footer>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100vh;

    padding: 1em;
    margin: 0 auto;

    text-align: center;
    overflow: hidden;
  }

  header {
    text-align: left;
  }

  section {
    display: flex;
    flex-basis: 80%;
    /* height: 80%; */
  }

  footer {
  }
</style>
