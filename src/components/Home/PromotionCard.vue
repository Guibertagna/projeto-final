<template>
    <div class="all-content">
      <div class="left-photo">
        <img src="@/assets/headphone.png" />
      </div>
      <div class="ritgh-timer">
        <div class="promotion-content">
            <h3 class="promotion">PROMOTION!</h3>
            <h1>Hurry up! 40% OFF</h1>
            <h6>Thousands of high tech are waiting for you!</h6>
            <div class="timer">
          <div class="days">
            <span> {{ days }}</span>
            <h5>Days</h5>
          </div>
          <div class="hours">
            <span>{{ hours }} </span>
            <h5>Hours</h5>
          </div>
          <div class="minutes">
            <span>{{ minutes }} </span>
            <h5>Minutes</h5>
          </div>
          <div class="seconds">
            <span>{{ seconds }} </span>
            <h5>Seconds</h5>
          </div>
        </div>
        <div class="button">
          <button class="button-shop">Shop now</button>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const totalTime = ref(86400); // 1 dia em segundos
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  let timer;
  
  function updateTime() {
    days.value = Math.floor(totalTime.value / (86400));
    hours.value = Math.floor((totalTime.value % (86400)) / 3600);
    minutes.value = Math.floor((totalTime.value % 3600) / 60);
    seconds.value = totalTime.value % 60;
  }
  
  function startCounter() {
    updateTime();
    timer = setInterval(() => {
      if (totalTime.value > 0) {
        totalTime.value--;
        updateTime();
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
  
  onMounted(() => {
    startCounter();
  });
  
  onUnmounted(() => {
    clearInterval(timer);
  });
  </script>
  
  <style scoped>
  .all-content {
    display: flex;
    height: auto;
  }
  .promotion{
    font-weight: 600;
    color: #377DFF
  }
  .promotion-content h1{
    font-weight: bold;
  }
  .left-photo,.ritgh-timer {
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .ritgh-timer {
    align-content: center;
    width: 100%;
    background-color: var(--secondary-color-orange);
    padding: 20px;
  
  }
  .promotion-content{
    display: flex;
    justify-content:space-between;
    flex-direction: column;
    align-items: center;       
    padding: 40px;
  }
  .left-photo img {
    width: 700px;
  }
  .timer {
    display: flex;
    gap : 30px;
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
  .timer span{
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: white;
  }

  .days, .hours, .minutes, .seconds{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .button-shop{
    color: var( --neutral-color-01);
    padding: 10px;
    border-radius: 10px;
    width: 200px;
    background-color: var(--primary-color);
  }
  .button{
    padding: 20px;
    align-content: start;
  }
  
  @media (max-width: 768px) {
    .all-content {
      flex-direction: column;
      align-items: center;
    }

    .left-photo {
      display: none;
    }

    .ritgh-timer {
      width: 100%;
      padding: 30px 20px;
    }


    .timer span{
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: white;
  }
  }
  </style>
  