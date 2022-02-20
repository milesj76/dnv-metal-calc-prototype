<script>
  // This is the container for the results components

  import { cuts, results } from "../model/store2"
</script>

<section>
  <div class="top-row">
    <h2>Results</h2>
    <div class="selector">
      <div class="btn-selector" id="detail">Detail</div>
      <div class="btn-selector" id="table">Table</div>
    </div>
    {#each $results as result}
      <div>
        {result}
      </div>
    {/each}
    <div class="code">
      {JSON.stringify($cuts, null, 2)}
    </div>
  </div>
</section>

<style>
  section {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .code {
    white-space: pre;
    text-align: left;
  }

  .top-row {
    /* width: 100%; */
  }

  .selector {
    display: flex;
  }

  .btn-selector {
    border: 4px solid #444;
    padding: 0.3rem 1rem;
  }

  #detail {
    border-right: 2px solid #444;
  }

  #table {
    border-left: 2px solid #444;
  }
</style>
