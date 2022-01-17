<script>
  export let cut

  const {id, length, quantity} = cut
</script>

<div class="card-container">
  <small>Cut #{id}</small>
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
    border-top: 1px solid #444;
    text-align: right;
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