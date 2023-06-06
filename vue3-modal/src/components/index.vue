<template>
  <div>
    <a-button @click="showConfirm">Confirm</a-button>
    <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
    <a-button type="dashed" @click="showPropsConfirm">With extra props</a-button>
  </div>
</template>
<script lang="ts">
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode, defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
export default defineComponent({
  setup() {
    console.log('rrrrrrrrrrrrrrrrrr',Modal)
    const showConfirm = () => {
      const modal =  Modal.confirm({
          title: () => 'Do you Want to delete these items?',
          icon: () => createVNode(ExclamationCircleOutlined),
          content: () => createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      setTimeout(() => {
        modal.update({
          content: `安东撒娇都爱睡觉的`,
        });
      }, 5000);
      console.log('啊打算大苏打',modal)
    };
    const showDeleteConfirm = () => {
      Modal.confirm({
        title: () => 'Are you sure delete this task?',
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => 'Some descriptions',
        okText: () => 'Yes',
        okType: 'danger',
        cancelText: () => 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    const showPropsConfirm = () => {
      Modal.confirm({
        title: () => 'Are you sure delete this task?',
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => 'Some descriptions',
        okText: () => 'Yes',
        okType: 'danger',
        okButtonProps: {
          disabled: true,
        },
        cancelText: () => 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    return {
      showConfirm,
      showDeleteConfirm,
      showPropsConfirm,
    };
  },
});
</script>

