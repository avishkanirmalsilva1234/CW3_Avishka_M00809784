<template>
  <!-- Making an After School Activities site -->

  <!-- Creating the div element -->
  <div id="app">
    <header>
      <a href="#" class="logo">
        <img src="images/logo.PNG" alt="Logo" style="width: 120px; height: 50px;">
      </a>

      <!-- creating a navigation bar -->
      <nav class="navbar">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
        </ul>
      </nav>

      <!-- creating the checkout button -->
      <button class="checkout" v-on:click="showCheckout" v-if="cartItemCount >= 1">
        <span class="fas fa-cart-plus">Checkout</span>
        <span>{{ cartItemCount }}</span>
      </button>

      <!-- disbaling the checkout button if no items are added -->
      <button class="checkout" disabled="disabled" v-else>
        <span class="fas fa-cart-plus">Checkout</span>
      </button>
    </header>
    <product-list :lessons="lessons" @addProduct="addLessonToCart" v-if="showLessons"></product-list>
    <checkout :cart="cart" @remove-item="remove" v-else></checkout>
  </div>
</template>

<script>
import productList from "./components/ProductList.vue";
import checkout from "./components/Form.vue";
export default {
  components: {
    productList,
    checkout
  },
  name: "App",
  data() {
    return {
      sitename: "After School Activities",
      lessons: [],
      showLessons: true, //ShowLessons, if true, the lessons are displayed. If false, the checkout page is displayed
      cart: [] //array to store the items added to cart
    };
  },
  methods: {
    //function that toggles showLesson from true and false, when user clicks the checkout button
    showCheckout() {
      this.showLessons = this.showLessons ? false : true;
    },
    //Funtion to add lesson to cart
    addLessonToCart(lesson) {
      //reduce the spaces by 1
      console.log("addProduct event received by the root component.");
      lesson.spaces -= 1;
      this.cart.push(lesson);
    },
    //funtion to remove a lesson from checkout page
    remove(lesson) {
      //increase the spaces by one on the main page
      lesson.spaces += 1;
      for (let i = 0; i <= this.cart.length; i++) {
        if (this.cart[i].id === lesson.id) {
          this.cart.splice(i, 1);
          break;
        }
      }
    }
  },
  created: function() {
    // Fetching the lessons from server, change to localhost:3000
    fetch("http://localhost:3000/collection/lessons")
      .then(response => response.json())
      .then(json => {
        this.lessons = json;
      })
      .catch(error => {
        console.error("Error fetching lessons:", error);
      });
  },

  computed: {
    //function to return cart length
    cartItemCount() {
      return this.cart.length || "";
    }
  }
};
</script>