<template>
  <div style="color: red;">我是一只猫咪，我叫做{{name}}</div>
</template>

<script>
export default {
    name: 'cat',
    props: {
        name: {required: true}
    }
}
</script>