import Mock from 'mockjs'
Mock.mock(/^\/aaa$/g, 'get', () => {
  return Mock.mock(
    {
      data: {
        name: '@cname'
      },
      status: 0,
      msg: 'ok',
    }
  )
})