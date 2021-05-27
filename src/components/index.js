// import 'element-ui/lib/theme-chalk/base.css'
// import 'element-ui/lib/theme-chalk/col.css'
// import 'element-ui/lib/theme-chalk/row.css'
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
import Vue from 'vue';
import Box from '@/components/layout/Box.vue'
import Container from '@/components/layout/Container.vue'
import ImgIcon from '@/components/ImgIcon.vue'

import { Row, Col } from 'element-ui'

const components = [Box, Container, Row, Col, ImgIcon];
Vue.prototype.$message = Message;
components.forEach(com => {
  const name = com.name.replace(/^El/g, 'c-').toLowerCase();
  Vue.component(name, com);
});
