<template>
    <!-- creating the home page if showLessons is True-->
    <div>
        <section class="home" id="home">
            <h1>After School Activities</h1>
            <p>MDX presents the newest launch of "after school activities"....</p>
        </section>


        <!-- Section for displaying a list of courses -->
        <section class="course" id="courses">

            <!-- Heading for the course section -->
            <h1>Club Activities that students can Choose from</h1> <br><br>

            <!--  - `v-model`: Enables two-way data binding on form elements used in the checkout section.-->

            <!-- - `v-bind`: dynamically bind the `src` attribute of images and other properties of HTML elements.-->

            <!-- - - Vue.js enables dynamic content rendering through its ability to conditionally show or hide elements based on data values..-->

            <!-- Drop-down for sorting courses -->
            <select v-model="sorters.type" class="dropdown">
                <option disabled value="Sort">Sort</option>
                <option v-for="(sort, key) in sorts" v-bind:value="sort" :key="sort">{{ key }}</option>
            </select>

            <!-- Ascending/Descending radio buttons for sorting -->
            <span class="radios">
                <input v-if="sorters.type == 'Sort'" disabled="disabled" type="radio" id="asc" value="ascending"
                    v-model="sorters.order">
                <input v-else type="radio" id="asc" value="ascending" v-model="sorters.order">
                <label for="asc" class="radioButton">Ascending</label>
            </span>

            <span class="radios">
                <input v-if="sorters.type == 'Sort'" disabled="disabled" type="radio" id="dec" value="descending"
                    v-model="sorters.order">
                <input v-else type="radio" id="dec" value="descending" v-model="sorters.order">
                <label for="dec" class="radioButton">Descending</label>
            </span>

            <!-- Search box for filtering courses -->
            <span class="searchBox">
                <i class="fas fa-search" style="height: 100px; width: 20px;"></i>
                <input type="text" v-model="sorters.search" placeholder="search something...">
            </span>

            <!--  In the product display section, `v-if` directive is used to conditionally display elements based on the value of `showLessons`-->

            <!-- `v-on:click` directive is used in the product display section to trigger the `showCheckout` method when the "Checkout" button is clicked.-->


            <!-- Displaying courses if no sorting or searching is applied -->
            <div class="main" v-if="sorters.type == 'Sort' && sorters.search == ''">

                <!-- Card for each course in the lessons array -->
                <div class="lesson_cards" id="lesson.id" v-for="lesson in lessons" :key="lesson.id">

                    <!-- Course details including image, title, description, location, spaces, price, and ratings -->
                    <div class="image">
                        <img v-bind:src="lesson.image" alt="Lesson Image">
                    </div>
                    <div class="title">
                        <p>{{ lesson.subject }}</p>
                    </div>
                    <div class="description">
                        <p>{{ lesson.description }}</p>
                    </div>
                    <div class="location">Location: {{ lesson.location }}</div>
                    <div class="spaces">Spaces Left: {{ lesson.spaces }}</div>
                    <div class="price">{{ lesson.price }} AED </div>

                    <div class="rating">
                        <span v-for="n in lesson.rating" :key="n"><i class="fas fa-star"></i></span>
                        <span v-for="n in 5 - lesson.rating" :key="n"><i class="far fa-star"></i></span>
                    </div>

                    <!-- "Add to Cart" button with dynamic behavior -->
                    <button class="addToCart" v-on:click="add(lesson)" v-if="canAddToCart(lesson)">Add
                        to Cart</button>
                    <button class="addToCart" disabled="disabled" v-else>Add to Cart</button>

                    <!-- Displaying information about remaining spaces -->
                    <span class="button_information" v-if="lesson.spaces == 0">All Out!</span>
                    <span class="button_information" v-if="lesson.spaces < 5 && lesson.spaces > 0">Only
                        {{ lesson.spaces }} left!</span>

                </div>
                <!-- End of Lesson card -->

            </div>
            <!-- If a sort selection is made, sorted lessons are displayed -->
            <div class="main" v-else-if="sorters.type != 'Sort' && sorters.search == ''">

                <!-- Making the lesson card -->
                <div class="lesson_cards" id="lesson.id" v-for="lesson in sortLessons(lessons)" :key="lesson.id">

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
                    <div class="spaces">Spaces Left: {{ lesson.spaces }}</div>
                    <div class="price">{{ lesson.price }} AED </div>
                    <div class="rating">
                        <span v-for="n in lesson.rating" :key="n"><i class="fas fa-star"></i></span>
                        <span v-for="n in 5 - lesson.rating" :key="n"><i class="far fa-star"></i></span>
                    </div>

                    <!-- Adding the "Add to Cart" Button -->
                    <button class="addToCart" v-on:click="add(lesson)" v-if="canAddToCart(lesson)">Add
                        to Cart</button>
                    <button class="addToCart" disabled="disabled" v-else>Add to Cart</button>
                    <span class="button_information" v-if="lesson.spaces == 0">All Out!</span>
                    <span class="button_information" v-else-if="lesson.spaces > 0 && lesson.spaces < 5">Only
                        {{ lesson.spaces }} left!</span>
                </div>
                <!-- End of lesson card -->
            </div>

            <!-- If there is a searched item, the lessons with the searched word is displayed -->
            <div class="main" v-else>

                <!-- Displaying the searched lessons -->
                <div class="lesson_cards" id="lesson.id" v-for="lesson in searchedLessons(lessons)" :key="lesson.id">

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
                    <div class="spaces">Spaces Left: {{ lesson.spaces }}</div>
                    <div class="price">{{ lesson.price }} AED </div>
                    <div class="rating">
                        <span v-for="n in lesson.rating" :key="n"><i class="fas fa-star"></i></span>
                        <span v-for="n in 5 - lesson.rating" :key="n"><i class="far fa-star"></i></span>
                    </div>

                    <!-- Adding the "Add to Cart" Button -->
                    <button class="addToCart" v-on:click="add(lesson)" v-if="canAddToCart(lesson)">Add
                        to Cart</button>
                    <button class="addToCart" disabled="disabled" v-else>Add to Cart</button>
                    <span class="button_information" v-if="lesson.spaces == 0">All Out!</span>
                    <span class="button_information" v-else-if="lesson.spaces > 0 && lesson.spaces < 5">Only
                        {{ lesson.spaces }} left!</span>
                </div>
            </div>
        </section>
        <!-- End of displaying lessons -->
    </div>
</template>

<script>
export default {
    name: "ProductList",
    props: ["lessons"],
    data() {
        return {
            sorters: {                  //stores information about the selection for sorting and search
                type: "Sort",
                order: "ascending",
                search: ""
            },
            sorts: {                    //The lesson can be sorted using price, location and subject
                price: "Price",
                location: "Location",
                subject: "Subject"
            },
        }
    },
    methods: {
        add(product) {
            console.log("added product", product.id);
            this.$emit('addProduct', product);
        },
        //funtion to check if the lesson can be added to cart. if spaces is greater than 0.
        canAddToCart(lesson) {
            return lesson.spaces > 0;
        },
        //funtion to return the list of sorted lessons based on user selection
        sortLessons(lesson) {
            if (this.sorters.type === "Price") {
                const compare = (a, b) => {
                    return this.sorters.order === "descending" ? b.price - a.price : a.price - b.price;
                };
                return lesson.slice().sort(compare);
            } else if (this.sorters.type === "Location") {
                const compare = (a, b) => {
                    return this.sorters.order === "descending" ? b.location.localeCompare(a.location) : a.location.localeCompare(b.location);
                };
                return lesson.slice().sort(compare);
            } else if (this.sorters.type === "Subject") {
                const compare = (a, b) => {
                    return this.sorters.order === "descending" ? b.subject.localeCompare(a.subject) : a.subject.localeCompare(b.subject);
                };
                return lesson.slice().sort(compare);
            }
        },

        //function to return the searched lessons
        searchedLessons(lessonArray) {

            //creating an array to store multiple lessons
            var returnlessons = []

            //if the search value is not empty
            if (this.sorters.search != '') {
                for (let i = 0; i < lessonArray.length; i++) {

                    //storing the location and subject in lower case to a variable
                    var subjectL = lessonArray[i].subject.toLowerCase();
                    var locationL = lessonArray[i].location.toLowerCase();

                    //storing the searched term in lower case
                    var searched = this.sorters.search.toLowerCase();

                    //checking if the searched term exists in the variable
                    if (subjectL.includes(searched) || locationL.includes(searched)) {
                        returnlessons.push(lessonArray[i]);
                    }
                }
                return returnlessons;
            }
        },
    },
}
</script>
