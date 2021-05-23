import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/col.css'
import 'element-ui/lib/theme-chalk/row.css'
import Vue from 'vue';
import Box from './Box.vue'
import Container from './Container.vue'
import { Row, Col } from 'element-ui'

const components = [Box, Container, Row, Col];

components.forEach(com => {
  const name = com.name.replace(/^El/g, 'c-').toLowerCase();
  Vue.component(name, com);
});
