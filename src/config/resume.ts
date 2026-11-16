import codex from '@/assets/logos/gpt.jpeg';
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
      role: "UX/UI设计师",
      company: "字节跳动飞书",
      period: "2025.12 – 至今",
      details: [
        { label: "妙搭", text: "主导专家模式、监控驾驶舱及龙虾记忆等核心能力的体验设计。专家模式以“守住简单路径、建立进阶路径”为主线，按场景引入并行开发、协作、数据隔离与集成能力；围绕运行监控、异常排障与配置反馈优化操作路径，并将 AI 记忆可视化，便于用户查看与管理" },
        { label: "Aily", text: "主导市场技能与技能包模块的体验重构，统一不同能力形态的前端表达与租户管理方式，优化技能信息展示和配置流程，降低普通成员的使用门槛及管理员的理解与管理成本" },
        { label: "租户管理后台", text: "从 0–1 搭建 aily 租户管理后台，设计成员权限、应用管控等企业治理能力，构建资产管理、权限控制、安全访问及品牌管理链路" },
      ],
    },
    {
      role: "UX/UI设计师",
      company: "字节跳动生活服务",
      period: "2023.01 – 2025.11",
      details: [
        { label: "主框架", text: "主导抖音来客工作台首页升级，抽象商家各角色工作动线，差异化重构商户端管理版和店员版的首页视图，沉淀商家端主框架设计规范及准入规则，依次输出品牌商/招商加盟/房产版首页。抖音来客官网下载：", link: "https://life.douyin.com/" },
        { label: "数据", text: "0–1 建立商家数据产品–生意经。围绕“钱/客/流”三大场景和“交易/商品/门店/视频/直播/达人/人群”等七大分析对象输出分析页面，沉淀聚合层–中间层–明细层的数据表达框架和 12 类数据业务组件。生意经官网：", link: "https://www.life-data.cn/" },
        { label: "商品", text: "支持抖音来客商品业务的设计输出。包括餐综购三大业务场景，持续提升商品发布&管理效率，完成优质商品的信息结构化；搭建商品牵引体系，帮助商家进行更有效的运营；利用 AIGC 能力为餐饮商家智能生成/优化商品图" },
      ],
    },
    {
      role: "UX/UI设计师",
      company: "字节跳动火山引擎",
      period: "2019.08 – 2022.12",
      details: [
        { label: "业务", text: "重构数据生产工作流，含数据集、可视化查询、仪表盘模块等核心模块，借助功能引导案例、功能流程重构、AI 数据解读等方式降低用户分析成本。TOB 官网地址：", link: "https://www.volcengine.com/product/datawind" },
        { label: "自驱", text: "发起仪表盘优化专项，输出设计类需求的 PRD 和设计稿，完成 9 个行业主题的仪表盘 demo 设计和搭建" },
        { label: "规范", text: "输出 PC&APP 图表规范，解决图表交互和展示问题，场景库组件&视觉组件沉淀，提升全线产品体验基线质量，英文表达策略沉淀，提升出海产品展示体验" },
      ],
    },
    {
      role: "交互设计师",
      company: "滴滴出行",
      period: "2018.04 – 2019.08",
      details: [
        { label: "C端产品设计", text: "分时租赁项目用研、全流程设计；乘客端自驾租车整租功能迭代，完成周中满减送券、双十二拼团等运营活动设计，持续改善租车业务的使用体验" },
        { label: "B端产品设计", text: "租车移动 CRM 系统交互设计，自营 ERP 系统设计（含风控、财务、订单、线索、商品、渠道等模块）；输出规范，支持 CRM 和 ERP 系统从 0–1 上线" },
        { label: "BC串联设计", text: "汽车维保业务 BC 全链路设计，含维保 C 端商品详情、预约下单流程，B 端服务履约、流程告知，线下物料设计等；提升用户从 C 端消费到 B 端履约的全流程体验，助力提升维保业务 GMV" },
      ],
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
