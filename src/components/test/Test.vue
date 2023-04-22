<template>
{{ testStore.testValue }}
</template>

<script setup>
import {useTestStore} from "../../stores/test.js";
const testStore = useTestStore()
console.log(testStore.testValue)
</script>