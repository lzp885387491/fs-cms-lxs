 const deptNoList = reactive([
  {
    deptId: 1,
    name: '总经理办公室',
    roles: [
      {
        roleId: 101,
        roleName: '总经理',
        permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1801, 19, 20, 21, 2101, 2102, 22]
      }, {
        roleId: 102,
        roleName: '副经理',
        permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1801, 19, 20, 21, 2101, 2102, 22]
      }, {
        roleId: 103,
        roleName: '办公室助理',
        permissions: [21, 2101, 2102, 22]
      },
    ]
  },
  {
    deptId: 2,
    name: '行政部门',
    roles: [
      {
        roleId: 201,
        roleName: '科长',
        permissions: [5, 21, 2101, 2102, 22]
      }, {
        roleId: 202,
        roleName: '副科长',
        permissions: [5, 21, 2101, 2102, 22]
      }, {
        roleId: 203,
        roleName: '科员',
        permissions: [21, 2102, 22, 4, 5]
      },
    ]
  },
  {
    deptId: 3,
    name: '人力资源部',
    roles: [
      {
        roleId: 301,
        roleName: '科长',
        permissions: [5, 21, 2101, 2102, 22]
      }, {
        roleId: 302,
        roleName: '副科长',
        permissions: [5, 21, 2101, 2102, 22]
      }, {
        roleId: 303,
        roleName: '科员',
        permissions: [5, 21, 2102, 22]
      },
    ]
  },
  {
    deptId: 4,
    name: '财务部',
    roles: [
      {
        roleId: 401,
        roleName: '科长',
        permissions: [5, 20, 21, 2101, 2102, 22]
      }, {
        roleId: 402,
        roleName: '副科长',
        permissions: [5, 20, 21, 2101, 2102, 22]
      }, {
        roleId: 403,
        roleName: '科员',
        permissions: [5, 20, 21, 2102, 22]
      },
    ]
  },
  {
    deptId: 5,
    name: '生产技术部',
    roles: [
      {
        roleId: 501,
        roleName: '科长',
        permissions: [5, 7, 21, 2101, 2102, 22]
      }, {
        roleId: 502,
        roleName: '副科长',
        permissions: [5, 7, 21, 2101, 2102, 22]
      }, {
        roleId: 503,
        roleName: '科员',
        permissions: [7, 21, 2102, 22]
      },
    ]
  },
  {
    deptId: 6,
    name: '安全监察部',
    roles: [
      {
        roleId: 601,
        roleName: '科长',
        permissions: [1, 2, 3, 4, 5, 7, 9, 21, 2101, 2102, 22]
      }, {
        roleId: 602,
        roleName: '副科长',
        permissions: [1, 2, 3, 4, 5, 7, 9, 21, 2101, 2102, 22]
      }, {
        roleId: 603,
        roleName: '科员',
        permissions: [1, 2, 3, 4, 7, 9, 21, 2102]
      },
    ]
  },
  {
    deptId: 7,
    name: '保卫部',
    roles: [
      {
        roleId: 701,
        roleName: '科长',
        permissions: [5, 6, 8, 18, 1801, 21, 2101, 2102, 22]
      }, {
        roleId: 702,
        roleName: '副科长',
        permissions: [5, 6, 8, 18, 1801, 21, 2101, 2102, 22]
      }, {
        roleId: 703,
        roleName: '科员',
        permissions: [6, 8, 18, 1801, 21, 2102]
      },
    ]
  },
  {
    deptId: 8,
    name: '环保部门',
    roles: [
      {
        roleId: 801,
        roleName: '科长',
        permissions: [10, 11, 12, 13, 14, 21, 2101, 2102, 22]
      }, {
        roleId: 802,
        roleName: '副科长',
        permissions: [10, 11, 12, 13, 14, 21, 2101, 2102, 22]
      }, {
        roleId: 803,
        roleName: '科员',
        permissions: [10, 11, 12, 13, 14, 21, 2102]
      },
    ]
  },
  // {
  //     roleId: 1,
  //     roleName: '管理员',
  //     permissions: [5]
  // }
]);
  export default{
    deptNoList
  }