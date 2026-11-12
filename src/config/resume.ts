import codex from '@/assets/logos/codex.svg';
import figma from '@/assets/logos/figma.svg';
import paper from '@/assets/logos/paper.svg';
import trae from '@/assets/logos/trae.svg';

export const resume = {
  snapshot: [
    { label: "期望城市", value: "杭州、上海" },
    { label: "工作经验", value: "9年" },
    { label: "出生日期", value: "1993.03" },
    { label: "擅长方向", value: "AI 平台体验、生产力工具、商家工作流、数据可视化" },
  ],
  experience: [
    {
      role: "UX 设计师",
      company: "飞书体验设计",
      period: "2025.12 – 至今",
      text: "负责飞书妙搭（AI 应用开发平台）专家模式、Aily（Agent 平台）市场模块，以及妙搭与 Aily 租户管理后台的 UX 设计；主导市场模块从消费用户到管理员用户的企业用户串联",
    },
    {
      role: "UX 设计师",
      company: "抖音生活服务",
      period: "2023.01 – 2025.11",
      text: "负责抖音来客（商家经营平台）数据、商品管理与首页主框架的 UX 设计；主导首页从行业化到角色化的改造，完成店员版与管理版的设计和上线",
    },
    {
      role: "UX 设计师",
      company: "火山引擎",
      period: "2019.08 – 2022.12",
      text: "BI数据平台核心设计师，负责可视化查询重构、仪表盘图表与 demo 优化等重点模块；把控小组设计输出质量，协助新同学落地与成长",
    },
    {
      role: "交互设计师",
      company: "滴滴出行",
      period: "2018.04 – 2019.08",
      text: "负责小桔自营通 CRM 与维保端的交互设计；主导 “30 分钟快保” 在用户端、技师端的多端联动方案",
    },
  ],
  education: [
    { title: "上海交通大学", place: "设计学硕士", period: "2015.9-2019.3" },
    { title: "天津大学", place: "工业设计学士", period: "2011.9-2015.3" },
  ],
  tools: [
    { name: 'Figma', logo: figma },
    { name: 'Paper', logo: paper },
    { name: 'Codex', logo: codex },
    { name: 'Trae', logo: trae, tone: 'dark' },
  ],
};
