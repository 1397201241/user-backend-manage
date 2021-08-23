<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <!--      自定义渲染-->
      <a slot="name" slot-scope="text">{{ text }}</a>
      <!--      自定义表头-->
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <!--      自定义渲染tags-->
      <span slot="tags" slot-scope="tags">
        <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <!--     自定义渲染action -->
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical"/>
        <a>Delete</a>
        <a-divider type="vertical"/>
        <a class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default {
  name:'index',
  components:{
  },
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
