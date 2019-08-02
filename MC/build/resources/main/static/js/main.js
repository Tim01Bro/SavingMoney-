function getIndex(list,id) {
    for (var i = 0; i < list.length ; i++) {
        if(list[i].id === id){
            return i;
        }
    }

    return -1;
}

var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props:['messages','messageAttr'],
    data: function () {
        return{
            text:''
        }
    },
    watch:{
        messageAttr: function(newVal, oldVal){
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
    '<div>' +
        '<input type="text" placeholder="Write smth" v-model = "text"/>' +
        '<input type="button" value="Save" @click="save"/>' +
    '</div>',
    methods: {
        save: function () {
            var message = {text: this.text};

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                    result.json().then(data => {
                            var index = getIndex(data, id);
                            this.message.splice(index, 1, data)
                        }
                    ));
            } else {
                messageApi.save({}, message).then(result =>
                    result.json().then(data => {
                        this.messages.push(data);
                        this.text = '';
                    })
                )
            }
        }
    }

});


Vue.component('message-row',{
    props:['message','editMethod'],
    template:
        '<div>' +
        '<i>({{message.id}})</i>{{ message.text }}' +
        '<span>' +
            '<input type="button" value="Edit" @click="edit"/> ' +
        '</span>'+
        '</div>',
    methods: {
        edit:function () {
            this.editMethod(this.message);
        }
    }
        
});

Vue.component('message-list', {
    props:['messages'],
    data:function(){
        return{
            message:null
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
        '<message-form :messages="messages" :messageAttr="message" />' +
        '<message-row v-for="message in messages" :key="message.id" :message="message" ' +
        ':editMethod="editMethod" :messages="messages" />' +
        '</div>',
    created:function () {
        messageApi.get().then(result=>
            result.json().then(data=>
            data.forEach(message=>this.messages.push(message))
            )
        )
     },
    methods:{
        editMethod:function (message) {
            this.message = message ;
        }
    }
});

var app = new Vue({
    el: '#app',
    template:'<message-list :messages="messages" />',
    data: {
        messages:[

        ]
    }
});