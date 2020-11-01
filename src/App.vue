<template>
    <div id="app">
        <p>Loaded --> {{ infoText }}</p>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        name: 'App',
        components: {},
        data () {
            return {
                info: 'Data from data()'
            }
        },
        computed: {
            ...mapGetters('gameStore', [
                'infoText',
            ]),
            // ...mapState('gameStore', [
            //     'infoText',
            // ])
        },
        mounted() {
            this.updateText();
        },
        methods: {
            // ...mapActions('gameStore', [
            //     'updateInfoText',
            // ]),
            ...mapMutations('gameStore', [
                'updateInfoText',
            ]),
            updateText() {
                const updatedText = 'This is updated state text';
                this.updateInfoText(updatedText);
            },
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }

    @media all and (min-width: 768px) {


    }

</style>
