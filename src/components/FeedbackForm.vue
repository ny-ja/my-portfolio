<script setup>
import { ref } from 'vue';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const form = ref({
    name: '',
    email: '',
    message: ''
});
const formErrors = ref({});
const errorMessage = ref('');

const submitFeedback = async () => {
    formErrors.value = {};

    if (!form.value.name) formErrors.value.name = "Name is required.";
    if (!form.value.email) formErrors.value.email = "Email is required.";
    if (!form.value.message) formErrors.value.message = "Message is required.";

    if (Object.keys(formErrors.value).length === 0) {
        try {
            await addDoc(collection(db, 'feedbacks'), {
                name: form.value.name,
                email: form.value.email,
                message: form.value.message,
                timestamp: new Date()
            });

            form.value.name = '';
            form.value.email = '';
            form.value.message = '';

            toast.success("Thank you for sending feedback!", {
                "type": "success",
                "position": "bottom-right",
                "autoClose": 2000,
                "hideProgressBar": true,
                "transition": "bounce",
                "dangerouslyHTMLString": true,
            })

        } catch (error) {
            toast.error("Error submitting feedback: " + error.message, {
                "type": "success",
                "position": "bottom-right",
                "autoClose": 2000,
                "hideProgressBar": true,
                "transition": "bounce",
                "dangerouslyHTMLString": true,
            });
        }
    } else {
        errorMessage.value = "Please correct the errors above.";
    }
};
</script>

<template>
    <div
        class="p-6 lg:w-1/3 md:w-1/2 bg-transparent border-x-2 shadow-lg shadow-teal-500 border-teal-500 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-lg slide-in-left">
        <h2 class="text-teal-500 text-center text-lg mb-1 font-medium title-font">Feedback</h2>

        <form @submit.prevent="submitFeedback">
            <div v-if="errorMessage" class="text-red-500 text-sm mb-2">
                {{ errorMessage }}
            </div>

            <div class="relative mb-4">
                <label for="name" class="leading-7 text-sm text-gray-400">Name</label>
                <input type="text" v-model="form.name" id="name" name="name"
                    class="w-full bg-transparent rounded border border-teal-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required />
                <div v-if="formErrors.name" class="text-red-500 text-sm mt-1">
                    {{ formErrors.name }}
                </div>
            </div>

            <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-400">Email</label>
                <input type="email" v-model="form.email" id="email" name="email"
                    class="w-full bg-transparent rounded border border-teal-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required />
                <div v-if="formErrors.email" class="text-red-500 text-sm mt-1">
                    {{ formErrors.email }}
                </div>
            </div>

            <div class="relative mb-4">
                <label for="message" class="leading-7 text-sm text-gray-400">Message</label>
                <textarea v-model="form.message" id="message" name="message"
                    class="w-full bg-transparent rounded border border-teal-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 h-32 text-base outline-none text-gray-400 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    required></textarea>
                <div v-if="formErrors.message" class="text-red-500 text-sm mt-1">
                    {{ formErrors.message }}
                </div>
            </div>

            <button type="submit"
                class="text-white w-full mt-4 bg-transparent border-y-2 border-teal-500 shadow-lg shadow-teal-500 py-2 px-6 focus:outline-none hover:bg-teal-700 rounded-lg text-lg">
                Submit
            </button>
        </form>
    </div>
</template>