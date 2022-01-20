<script lang="ts">
  import type { Cut } from '../model/types'
  export let cut

  const {id, length, quantity}: Cut = cut
</script>

<div class="card-container">
  <small>Cut #{id + 1}</small>
  <div class="row">
    <p>Cut Length</p>
    <input value={length} />
  </div>
  <div class="row">
    <p>Quantity</p>
    <input value={quantity} />
  </div>
</div>

<style>
  .card-container {
    padding: 1.2rem 2.5rem;
    padding-top: 0.4rem;
    border-bottom: 1px solid #444;
    text-align: right;

    background: rgb(245, 245, 245);
  }

  .card-container:hover {
    background: rgb(238, 238, 238);
  }

  small {
    color: #888;
    font-style: italic;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    height: 1.5em;
  }
</style>