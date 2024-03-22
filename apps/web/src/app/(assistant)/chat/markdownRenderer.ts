import markdownit from 'markdown-it'

const md = markdownit()
export const renderMarkdown = (text: string) => md.render(text)
