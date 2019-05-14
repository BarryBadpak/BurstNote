<template>
    <div>
        <h1>{{componentTitle}}</h1>
        <p>{{componentDescription}}</p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class App extends Vue {
        componentTitle = 'BurstNote';
        componentDescription = 'Super nice description.';
    }
</script>
