export const caseStudyCopy = {
  aily: {
    title: '豆包工作伙伴能力接入与管理体验设计',
    description: '让普通用户在不理解复杂技术配置的情况下获得并使用能力，同时让管理员清晰、可控地完成企业能力配置与治理',
  },
  miaoda: {
    title: '妙搭支持专家模式',
    description:
      '将 aPaaS 4.0 的专业能力融入妙搭，保留“说需求 → 看效果 → 修改 → 发布”的简单开发路径，按需展开协作、数据隔离与集成等能力，让简单需求轻松起步，专业需求也有路可走',
  },
  laike: {
    title: '抖音来客首页视图升级',
    description:
      '商家首页过去按行业拆成外卖版、到店版和综合版，功能越堆越多，却仍接不住不同岗位的工作。这次改版从职责出发，重构成店员、运营、店长三条角色动线',
  },
  dashboard: {
    title: '仪表盘优化专项',
    description:
      '客户说“看不清”，售前却需要“讲得清”。从模糊的反馈出发，建立评估标准、优化图表，再把散乱的仪表盘重组为有层次、有行业辨识度的产品演示',
  },
  qibao: {
    title: '汽车维保服务体验设计',
    description:
      '联动 C 端、B 端、S 端与线下 SOP，把“时间不确定、材料不放心”的服务，重构成用户敢下单、门店能交付、正品可感知的标准化产品',
  },
  viz: {
    title: '可视化查询设计重构',
    description:
      '同一套编辑器，要让简单取数更容易，也要承接持续深入的分析。这次重构从产品定位和用户任务出发，重新组织框架、配置、学习与视觉体验',
  },
};

export const featuredCases = [
  {
    ...caseStudyCopy.aily,
    slug: 'aily',
    href: '/work/aily/',
    tags: ['Agent skill/mcp/plugin', '信息架构重构', '复杂体验配置'],
    color: '#FFE7D8',
    image: '/work-covers/aily.png',
  },
  {
    ...caseStudyCopy.miaoda,
    slug: 'miaoda',
    href: '/work/miaoda/',
    tags: ['AI 应用开发平台', '产品整合与渐进式体验'],
    color: '#DCD3FB',
    image: '/work-covers/miaoda.png',
  },
  {
    ...caseStudyCopy.laike,
    slug: 'laike',
    href: '/work/laike/',
    tags: ['APP 设计', '复杂产品视图拆分'],
    color: '#D2EBFF',
    image: '/work-covers/laike.png',
  },
  {
    ...caseStudyCopy.dashboard,
    slug: 'dashboard',
    href: '/work/dashboard/',
    tags: ['数据报表设计', '设计驱动业务增长'],
    color: '#FCE0E0',
    image: '/work-covers/dashboard.png',
  },
  {
    ...caseStudyCopy.qibao,
    slug: 'qibao',
    href: '/work/qibao/',
    tags: ['多端服务设计', '流程重构与信任体系'],
    color: '#C0E9F7',
    image: '/work-covers/qibao.png',
  },
  {
    ...caseStudyCopy.viz,
    slug: 'viz',
    href: '/work/viz/',
    tags: ['WEB 设计', '生产力工具产品重构'],
    color: '#CCF1E3',
    image: '/work-covers/viz.png',
  },
];
