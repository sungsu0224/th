export default [
  { heading: '운영자' },
  {
    title: '수업 관리',
    icon: { icon: 'mdi-shield-account-outline' },
    to: 'classes-roles',
  },
  {
    title: '월/수 15시',
    to: {
      name: 'pages-class-profile-tab',
      params: { tab: 'profile' },
    },
  },
]
