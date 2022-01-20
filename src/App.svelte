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

  :global(body) {
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
    max-height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    height: 100vh;
    max-height: 100vh;

    margin: 0 auto;

    text-align: center;
    overflow: hidden;
  }

  header {
    text-align: left;
    margin: 0 2em;
  }

  section {
    display: flex;
    margin: 0 2em;
    /* flex-basis: 80%; */
    flex: 1;
    /* height: 80%; */
    max-height: 100%;
  }

  footer {
    height: 2.5rem;
    border: 1px solid #444;
    justify-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
