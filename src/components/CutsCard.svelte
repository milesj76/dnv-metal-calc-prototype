<script lang="ts">
  import type { Cut } from "../model/types"
  import { Icon, XCircle } from "svelte-hero-icons"

  import { updateCut, removeCut } from "../model/store2"

  export let cut
  export let index

  const { id, length, quantity } = cut
</script>

<div class="card-container">
  <div class="top-row">
    <small>#{index} id:{id}</small>
    <div class="icon" on:click={() => removeCut(id)}>
      <Icon src={XCircle} solid size="25" />
    </div>
  </div>
  <div class="row">
    <p>Cut Length</p>
    <input
      value={length}
      on:change={(e) => updateCut({ id, length: e.target.value })}
      type="number"
      min="0"
    />
  </div>
  <div class="row">
    <p>Quantity</p>
    <input
      value={quantity}
      on:change={(e) => updateCut({ id, quantity: e.target.value })}
      type="number"
      min="0"
      step="1"
    />
  </div>
</div>

<style>
  .card-container {
    padding: 1rem 1.5rem;
    /* padding-top: 0.7rem; */
    border-bottom: 1px solid #444;
    text-align: right;

    background: rgb(245, 245, 245);

    transition-duration: 80ms;
  }

  .card-container:hover {
    background: rgb(238, 238, 238);
  }

  small {
    color: #888;
    font-style: italic;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding-bottom: 0.5rem;
  }

  .icon {
    /* color: rgb(206, 7, 23); */

    transition-duration: 150ms;
  }

  .icon:hover {
    transform: scale(1.05);
    color: rgb(189, 13, 27);
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Adds different width between top row and other content. */
    padding: 0 1rem;
    height: 2.5rem;
  }

  input {
    height: 1.5em;
  }
</style>
