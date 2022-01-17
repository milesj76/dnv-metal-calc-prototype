<script>
  import CutsCard from "./CutsCard.svelte"

  // Cuts array of objects
  let cut1 = {
    id: 1,
    length: 72.772,
    quantity: 4
  }
  let cut2 = {
    id: 2,
    length: 37.750,
    quantity: 4
  }
  let cut3 = {
    id: 3,
    length: 51.371,
    quantity: 4
  }
  let cut4 = {
    id: 4,
    length: 17.726,
    quantity: 4
  }

  let cuts = [cut1, cut2, cut3, cut4]

  let barLength = 240
  let barTotal
  let kere = 0.187
</script>

<section>
  <form>
    <div class="row-container">
      <div class="row">
        <p>Bar length</p><input type="text" bind:value={barLength}>
      </div>
      <div class="row">
        <p>Kere</p><input type="text" bind:value={kere}>
      </div>
    </div>
    <div class="cuts-container">
      <h2>Cuts</h2>
      <div class="add-cuts">
        {#each cuts as cut}
          <CutsCard cut={cut} />
        {/each}
        <div class="btn"><button>+ Add Cut</button></div>
      </div>
    </div>
  </form>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .row-container {
    display: flex;
  }

  .row-container > .row {
    margin: 0 0.25rem;
  }

  .row {
    text-align: left;
    margin-bottom: 0.5rem;
  }

  input {
    height: 2rem;
  }

  .cuts-container {
    text-align: left;
  }

  .add-cuts {
    border: 1px solid #444;
    border-top: none;
    overflow-y: auto;
    min-height: 0px;
  }

  .btn {
    border-top: solid 1px #444;
    padding: 1rem;
  }

  button {
    font-size: 1.2em;
  }
</style>