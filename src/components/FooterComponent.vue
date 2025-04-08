<template>
  <footer class="bg-primary text-white py-3">
    <div class="container">
      <div class="row align-items-center mb-3">

        <div class="col-md-6 d-flex align-items-center mb-3 mb-md-0">
          <img src="@/assets/logo-white.png" class="img-fluid me-3" style="width: 80px;">
          <h5 class="mb-0">| Headphone Store</h5>
        </div>
        
    
        <div class="col-md-6">
          <ul class="nav justify-content-md-end justify-content-start">
            <li class="nav-item"><a href="#" class="nav-link text-white">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link text-white">Shop</a></li>
            <li class="nav-item"><a href="#" class="nav-link text-white">Product</a></li>
            <li class="nav-item"><a href="#" class="nav-link text-white">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <hr class="my-2 bg-light">
      
      <div class="row align-items-center">
 
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="d-flex flex-wrap gap-3">
            <small class="mb-0">Copyright © 2023 3legant. All rights reserved</small>
            <small><a href="#" class="text-white text-decoration-none">Privacy Policy</a></small>
            <small><a href="#" class="text-white text-decoration-none">Terms of Use</a></small>
          </div>
        </div>
        
        <div class="col-md-6 text-md-end">
          <a href="#" class="text-white mx-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-white mx-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-white mx-2"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  min-height: 150px; 
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.nav-link {
  padding: 0.25rem 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--secondary-color-orange) !important;
}

.social-icons a:hover {
  color: var(--secondary-color-orange) !important;
}

/* Responsividade */
@media (max-width: 768px) {
  footer {
    padding: 1rem 0;
  }
  
  .nav {
    justify-content: flex-start !important;
    gap: 1rem;
  }
}
</style>