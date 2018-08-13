<template>
    <div id="list-demo" class="demo">
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <button @click="shuffle">shuffle</button>
        <transition-group name="list" tag="p">
            <span v-for="item in items" v-bind:key="item" class="list-item"> {{ item }} </span>
        </transition-group>
    </div>
</template>

<script>
    export default {
        data() { 
            return {
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9], 
                nextNum: 10
            } 
        }, 
        methods: {
            randomIndex () { 
                return Math.floor(Math.random() * this.items.length) 
            }, 
            add () { 
                this.items.splice(this.randomIndex(), 0, this.nextNum++) 
            }, 
            remove () { 
                this.items.splice(this.randomIndex(), 1) 
            },
            shuffle () {
                this.items = this._shuffle(this.items) 
            },
            _shuffle(args) {
                let arr = [...args]
                let arr2 = []
                while(arr.length){
                    arr2 = arr2.concat(arr.splice(Math.floor(Math.random()*arr.length),1))
                }
                return arr2
            }
        }
    }
</script>

<style lang="less">
	.list-item{
        display: inline-block
    }
    .list-enter-active,.list-leave-active{
        transition: all 1s;
    }
    .list-enter, .list-leave-active{
        opacity: 0;
        transform: translateY(30px);
    }
    .list-move{
        transition: all 1s;
    }
</style>




 
