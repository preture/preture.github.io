export const categories = [
  {
    id: 'accumulation',
    name: '厚积薄发',
    emoji: '🔧',
    color: '#e67e22',
    description: '积累基础技能与工具，厚积而薄发',
    topics: [
      {
        id: 'programming-foundation',
        name: '编程筑基',
        description: 'Python / Vue / Flutter 编程基础入门',
        subTopics: [
          { id: 'python', name: 'Python' },
          { id: 'vue', name: 'Vue' },
          { id: 'flutter', name: 'Flutter' },
        ],
      },
      { id: 'great-tools', name: '利器清单', description: '优秀工具推荐与使用心得' },
      { id: 'ai-tools', name: 'AI 工具箱', description: 'AI 工具的安装和使用' },
      { id: 'build-ai-assistant', name: '自建 AI 助手', description: '打造专属 AI 助手' },
    ],
  },
  {
    id: 'empowerment',
    name: '如虎添翼',
    emoji: '🤖',
    color: '#2ecc71',
    description: 'AI 赋能，如虎添翼',
    topics: [
      { id: 'ai-practice', name: 'AI 实战', description: 'AI 使用和实践经验' },
      { id: 'ai-dev', name: 'AI 辅助编程', description: 'AI + 程序开发' },
      { id: 'ai-content', name: 'AI 创作工坊', description: 'AI + 内容创作' },
    ],
  },
  {
    id: 'practice',
    name: '身体力行',
    emoji: '🚀',
    color: '#9b59b6',
    description: '亲自实践，行胜于言',
    topics: [
      { id: 'home-server', name: '家庭数据中心', description: '家庭工作站搭建与管理' },
      { id: 'second-brain', name: '第二大脑', description: '个人知识库构建' },
      { id: 'media-library', name: '媒体资源库', description: '媒体资源管理' },
      { id: 'mobile-tools', name: '移动工具箱', description: '手机常用工具集合' },
    ],
  },
  {
    id: 'aspiration',
    name: '心之所向',
    emoji: '🌟',
    color: '#e74c3c',
    description: '心之所向，素履以往',
    topics: [
      { id: 'digital-world', name: '数字世界构建', description: '个人世界构建探索' },
      { id: 'history-creation', name: '历史穿越创作', description: '历史穿越题材小说和游戏' },
      { id: 'ancient-texts', name: '古籍数字化', description: '古籍资料收集和校准' },
      { id: 'oracle-exploration', name: '甲骨文探秘', description: '甲骨文文字识别' },
    ],
  },
  {
    id: 'protected',
    name: '保护空间',
    emoji: '🔒',
    color: '#636e72',
    description: '登录后可见',
    level: 'protected',
    topics: [
      { id: 'python-learn', name: 'python学习课件', description: '记得学习课件内容及课程安排' },
    ],
  },
  {
    id: 'privated',
    name: '私人空间',
    emoji: '🔒',
    color: '#636e72',
    description: '管理员登录后可见',
    level: 'privated',
    topics: [
      { id: 'private-notes', name: '私人笔记', description: '个人私密笔记' },
    ],
  },
]

export function findCategory(slug) {
  return categories.find((c) => c.id === slug)
}

export function findTopic(categorySlug, topicSlug) {
  const cat = findCategory(categorySlug)
  if (!cat) return null
  return cat.topics.find((t) => t.id === topicSlug) || null
}

export function findSubTopic(categorySlug, topicSlug, subSlug) {
  const topic = findTopic(categorySlug, topicSlug)
  if (!topic || !topic.subTopics) return null
  return topic.subTopics.find((s) => s.id === subSlug) || null
}

export function getCategoryLevel(categorySlug) {
  const cat = findCategory(categorySlug)
  return cat?.level || 'open'
}

export const giscus = {
  repo: 'preture/preture.github.io',
  repoId: 'R_kgDOSrbzjQ',
  category: 'Announcements',
  categoryId: 'DIC_kwDOSrbzjc4C-H4e',
  mapping: 'specific',
  lang: 'zh-CN',
}

export const busuanzi = true
