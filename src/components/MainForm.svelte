<script>
  import { get } from 'svelte/store'
  import { cuts, addCut } from '../model/store'

  import CutsCard from "./CutsCard.svelte"

  // Cuts array of objects
  let cut1 = {
    id: 0,
    length: 72.772,
    quantity: 4
  }
  let cut2 = {
    id: 1,
    length: 37.750,
    quantity: 4
  }
  let cut3 = {
    id: 2,
    length: 51.371,
    quantity: 4
  }
  let cut4 = {
    id: 3,
    length: 17.726,
    quantity: 4
  }

  // const cuts = writable([])
  // const cuts = writable([cut1, cut2, cut3, cut4])

  let barLength = 240
  let barTotal
  let kere = 0.187

  const testValues = () => {
    console.log('MainForm.cuts', $cuts);
    console.log('MainForm.string', JSON.stringify($cuts, null, 2));
  }
</script>

<section>
  <form on:submit|preventDefault>
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
        {#each $cuts as cut}
          <CutsCard cut={cut} />
        {/each}
      </div>
      <div class="btn"><button on:click={() => addCut()}>+ Add Cut</button></div>
      <div class="btn"><button on:click={testValues}>Check values</button></div>
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
    max-height: 50vh;
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
    overflow-y: auto;
    min-height: 0px;
    max-height: 55vh;
  }

  .btn {
    padding: 1rem;
  }

  button {
    font-size: 1.2em;
  }
</style>