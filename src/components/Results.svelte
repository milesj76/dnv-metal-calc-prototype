<script>
  // This is the container for the results components
</script>

<section>
  <div class="top-row">
    <h2>Results</h2>
    <div class="selector">
      <div class="btn-selector" id="detail">Detail</div>
      <div class="btn-selector" id="table">Table</div>
    </div>
  </div>
</section>

<style>
  section {
    width: 50%;
    display: flex;
    justify-content: center;
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