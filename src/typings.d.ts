declare module 'gatsby-node-helpers' {
  import { NodeInput } from 'gatsby';

  export interface NodeInputNoIndex {
    id: string;
    parent?: string;
    children?: string[];
    internal: {
      type: string;
      mediaType?: string;
      content?: string;
      contentDigest: string;
      description?: string;
    };
  }

  function generateNodeId(type: string, id: string): string;

  function createNodeFactory<
    TNode = any,
    TInput = TNode & NodeInputNoIndex,
    TOutput = any
  >(
    type: string,
    process?: (node: TInput) => NodeInput
  ): (obj: TNode, overrides?: any) => NodeInput;

  function generateTypeName(type: string): string;

  type CreateNodeHelpersOptions = {
    typePrefix: string;
    sourceId?: string;
    conflictFieldPrefix?: string;
  };

  export default function createNodeHelpers(
    options: CreateNodeHelpersOptions
  ): {
    generateNodeId: typeof generateNodeId;
    createNodeFactory: typeof createNodeFactory;
    generateTypeName: typeof createNodeFactory;
  };
}

declare module 'rehype-parse' {
  import { Plugin } from 'unified';
  export type RehypeParseSettings = {
    fragment?: boolean;
    space?: 'svg' | 'html';
    emitParseErrors?: boolean;
    verbose?: boolean;
  };
  const RehypeParse: Plugin<any[], RehypeParseSettings>;
  export default RehypeParse;
}

declare module 'rehype-remark' {
  import { Plugin } from 'unified';
  const RehypeRemark: Plugin;
  export default RehypeRemark;
}
