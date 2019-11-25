import parse from 'rehype-parse';
import rehype2remark from 'rehype-remark';
import stringify from 'remark-stringify';
import unified from 'unified';

const parser = unified()
  .use(parse, { fragment: true })
  .use(rehype2remark)
  .use(stringify);

export const convertHtmlToMarkdown = (html: string): string => {
  const result = parser.processSync(html);

  return result.toString();
};

export const convertHtmlToAst = (html: string): any => {
  const result = parser.parse(html);

  return result;
};
