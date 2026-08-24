import { emptyFormat } from "./empty"
import { htmlFormat } from "./html"
import { mieruFormat } from "./mieru"
import { nodeLinesFormat } from "./node-lines"
import { singBoxFormat } from "./sing-box"
import { ssdFormat } from "./ssd"
import { structuredFormat } from "./structured"
import type { SourceFormat } from "./types"
import { v2rayFormat } from "./v2ray"
import { xrayFormat } from "./xray"

/**
 * Every way a subscription can be read, in the order they are tried. The order is the detection
 * rule: cheap unambiguous answers first, structured documents before lines so a YAML proxy list is
 * not read a line at a time, and the line reader last because it accepts anything and reports
 * whatever it could not read.
 *
 * `singBoxFormat`, `v2rayFormat`, `xrayFormat` and `mieruFormat` run before `structuredFormat`, or
 * the generic `proxies`/`outbounds` reader takes them and reports the wrong format name — and a
 * Mieru `profiles` document the generic reader cannot claim would fall to the line reader, one
 * unreadable-line warning per line. V2Ray before Xray: both `detect` functions match an outbound
 * list, V2Ray's is the narrower one, and whichever matches first decides the reported name.
 */
export const FORMATS: SourceFormat[] = [
  emptyFormat,
  htmlFormat,
  ssdFormat,
  singBoxFormat,
  v2rayFormat,
  xrayFormat,
  mieruFormat,
  structuredFormat,
  nodeLinesFormat,
]
