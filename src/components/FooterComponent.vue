<template>
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <div class="footer">
      <div class="upside">
        <div class="upside-left">
          <img src="@/assets/logo-white.png" class="logo" />
          <h3>| Headphone Store</h3>
        </div>
        <div class="upside-right">
          <nav class="links">
            <li>Home</li>
            <li>Shop</li>
            <li>Product</li>
            <li>Contact Us</li>
          </nav>
        </div>
      </div>
      <hr class="thin-line">
      <div class="underside">
        <div class="underside-left">
          <h5>Copyright © 2023 3legant. All rights reserved</h5>
          <h5>Privacy Policy</h5>
          <h5>Terms of Use</h5>
        </div>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .footer {
    color: var(--neutral-color-04);
    width: 100%;
    height: 200px;
    background-color: var(--primary-color);
    padding: 20px 40px;
  }
  
  .logo {
    width: 100px;
    height: auto;
  }
  
  .upside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .upside-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .links {
    list-style: none;
    display: flex;
    gap: 30px;
  }
  
  .thin-line {
    border: none;
    height: 1px;
    background-color: var(--neutral-color-04);
    margin-bottom: 15px;
  }
  
  .underside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .underside-left {
    display: flex;
    gap: 20px;
  }
  
  .social-icons {
    display: flex;
    gap: 15px;
  }
  
  .social-icons a {
    color: var(--neutral-color-04);
    font-size: 20px;
    transition: color 0.3s ease;
  }
  
  .social-icons a:hover {
    color: var(--secondary-color-orange);
  }
  @media (max-width: 768px) {
  .footer {
    height: auto;
    padding: 20px;
  }

  .upside {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .upside-right {
    width: 100%;
  }

  .links {
    flex-direction: column;
    gap: 10px;
    padding-left: 0;
  }

  .underside {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .underside-left {
    flex-direction: column;
    gap: 10px;
  }

  .social-icons {
    align-self: flex-start;
  }
}
  </style>
