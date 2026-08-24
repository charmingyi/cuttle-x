import { compileNodeList } from "@/core/nodes"
import type { CanonicalNode, CompileRequest, Diagnostic } from "@/core/nodes"

/**
 * Everything the workbench shows for one run, and nothing else the pipeline computed.
 *
 * `CompileResult` also carries `nodes` — what parsing and the rule chain produced before the client
 * had a say — which nothing here renders. It is dropped rather than carried because this crosses a
 * worker boundary: every field is structured-cloned, and a node list the interface never reads is a
 * copy of the whole source paid for twice.
 */
export interface CompiledOutput {
  content: string
  contentType: string
  detectedFormat: string
  diagnostics: Diagnostic[]
  fileExtension: string
  /** Canonical nodes from the source before the rule chain, used to seed persistent node pools. */
  sourceNodes: CanonicalNode[]
  /** Canonical nodes after the rule chain, used for diagnostics and output accounting. */
  nodes: CanonicalNode[]
  renderedNodes: CanonicalNode[]
}

/**
 * A run either produced a document or explained why it could not. A throw is an answer here rather
 * than a failure to propagate: it is what the workbench reports in place of the output.
 */
export interface CompileOutcome {
  error: string
  output: CompiledOutput | null
}

/**
 * One compile run, wherever it happens to be running. Shared by the worker and by the fallback that
 * runs on the main thread when there is no worker, so both describe a run the same way.
 */
export function compileForWorkbench(request: CompileRequest): CompileOutcome {
  try {
    const compiled = compileNodeList(request)
    return {
      error: "",
      output: {
        content: compiled.content,
        contentType: compiled.contentType,
        detectedFormat: compiled.detectedFormat,
        diagnostics: compiled.diagnostics,
        fileExtension: compiled.fileExtension,
        sourceNodes: compiled.sourceNodes,
        nodes: compiled.nodes,
        renderedNodes: compiled.renderedNodes,
      },
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "解析失败", output: null }
  }
}
