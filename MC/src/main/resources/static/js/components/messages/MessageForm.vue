<template>
        <v-layout row>
            <v-text-field filled label="New message" placeholder="Write something" v-model="text" />
            <v-btn class="ml-3"  @click="save">
                Save
            </v-btn>
        </v-layout>
</template>

<script>
    import { sendMessage } from 'util/ws'

 export default {
        props: ['messages', 'messageAttr'],
        data() {
            return {
                text: '',
                id: ''
            }
        },
        watch: {
            messageAttr(newVal, oldVal) {
                this.text = newVal.text
                this.id = newVal.id
            }
        },
        methods: {
            save() {
                sendMessage({id : this.id, text: this.text})
                this.text = ''
                this.id = ''
            }
        }
    }
</script>

<style>

</style>