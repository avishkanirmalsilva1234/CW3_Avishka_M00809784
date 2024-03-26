<template>
    <!-- Displaying the checkout page, if ShowLessons is false -->
    <div class="checkoutPage">
        <h3>CheckOut!</h3>

        <!-- Displaying the lessons in the cart, if the cart is not empty -->
        <div class="main" v-if="this.cart.length > 0">

            <!-- displaying the lesson card -->
            <div class="lesson_cards" id="lesson.id" v-for="lesson in this.cart" :key="lesson.id">

                <!-- Binding an image -->
                <div class="image">
                    <img v-bind:src="lesson.image" alt="Lesson Image">
                </div>

                <!-- Adding the details -->
                <div class="title">
                    <p>{{ lesson.subject }}</p>
                </div>
                <div class="description">
                    <p>{{ lesson.description }}</p>
                </div>
                <div class="location">Location: {{ lesson.location }}</div>
                <div class="price">{{ lesson.price }} AED</div>

                <!-- Adding a "Remove" button to remove the lesson from cart -->
                <button class="removeButton" v-on:click="removeItem(lesson)">
                    <span class="fas fa-trash-alt"> Remove</span>
                </button>
            </div>
            <!-- End of lesson card -->
        </div>
        <!-- If all products are removed from cart, button is displayed to take back to the products page -->
        <div class="main" v-else>
            <button v-on:click="showLessonPage()" class="goBackBtn">
                <span class="fas fa-arrow-left"> Back To Products</span>
            </button>
        </div>

        <!-- Checkout Form -->
        <div class="checkoutForm">
            <strong id="successfulCheckout"></strong>
            <!-- Name input field -->
            <strong>Name: </strong>
            <span class="checkoutInput">
                <input type="text" v-model="lessonOrder.name" placeholder="Enter Name..."
                    v-on:keypress="isLetter($event)">
            </span>

            <!-- Phone number field -->
            <strong>Phone: </strong>
            <span class="checkoutInput">
                <input type="text" v-model="lessonOrder.phone" placeholder="0123" v-on:keypress="isNumber($event)">
                <p></p>
            </span>

            <!-- Checkout button. Only enabled if values to Name and Phone are added -->
            <button v-if="lessonOrder.name == '' || lessonOrder.phone == ''" disabled="disabled">Checkout</button>
            <button v-else v-on:click="CheckoutLessons()">Checkout</button>
            <p
                style="font-size: 1.5rem; color: rgb(83, 13, 13); margin-top: 0; padding-bottom: 70px; padding-left: 10%;">
                {{ lessonOrder.errorMessage }}</p>

        </div>
        <!-- End of Checkout form -->

    </div>
    <!-- End of checkout page -->
</template>

<script>
export default {
    name: "Form-Component",
    props: ['cart'],
    data() {
        return {
            lessonOrder: {              //Stores user information from checkout page. The error message is displayed if there is an invalid input
                name: "",
                phone: "",
                errorMessage: ""
            },
        };
    },
    methods: {
        removeItem(index) {
            //Emit an event to notify the parent component to remove the item
            this.$emit('remove-item', index);
        },
        submitForm() {
            //  Here you can emit an event or call an API to submit the form
            //  For example:
            //  this.$emit('submit-form', {name: this.name, address: this.address});

            console.log("Form submitted with:", this.name, this.address);
            //Reset form fields after submission
            this.name = "";
            this.address = "";
        },
        //function to check if the user input has only letters in Name (checkout form)
        isLetter(e) {
            //for every character input
            let char = String.fromCharCode(e.keyCode);

            //if the character is an alphabet
            if (/^[A-Za-z]+$/.test(char)) {
                this.lessonOrder.errorMessage = "";
                return true;
            }
            else {
                //displaying error message
                this.lessonOrder.errorMessage = "Please enter only characters";
            }
        },

        //function to check if the user input for phone has only numbers
        isNumber(e) {

            //matching the user input with the character code of 0-9
            if (e.charCode >= 48 && e.charCode <= 57) {
                this.lessonOrder.errorMessage = "";
                return true;
            }
            else {
                //displaying error message
                this.lessonOrder.errorMessage = "Please enter only numbers";
            }
        },
        //function to checkout the lessons
        CheckoutLessons() {
            if (this.lessonOrder.errorMessage == "" && this.cart.length > 0) {
                alert("Successfully placed order!");
                document.getElementById('successfulCheckout').innerHTML = "Thank you for purchasing! <br>"
                this.lessonOrder.name = "";
                this.lessonOrder.phone = "";
            }
            else if (this.cart.length == 0) {
                alert("No products in cart!")
            }
            else {
                alert("Please enter the correct values.");
            }

        }

    },

};
</script>
