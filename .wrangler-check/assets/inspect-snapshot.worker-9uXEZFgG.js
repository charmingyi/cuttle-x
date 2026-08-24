;(function () {
  function e(e) {
    return e && typeof e == `object` && !Array.isArray(e) ? e : null
  }
  function t(e) {
    return Array.isArray(e) ? e : []
  }
  function n(e) {
    return typeof e == `string` && e.length > 0 ? e : void 0
  }
  function r(e) {
    return typeof e == `number` && Number.isInteger(e) && e > 0 && e <= 65535
  }
  function i(e) {
    const t = typeof e == `number` ? e : Number(e)
    return r(t) ? t : void 0
  }
  function a(e) {
    if ((typeof e != `number` && typeof e != `string`) || e === ``) return
    const t = Number(e)
    return Number.isFinite(t) && t >= 0 ? t : void 0
  }
  function o(e) {
    return typeof e == `boolean` ? e : void 0
  }
  function s(e) {
    return Object.fromEntries(Object.entries(e).filter(([, e]) => e != null && e !== ``))
  }
  function c(e, t, r, i) {
    return { type: t, name: n(e.tag) ?? n(e.name) ?? `${t} ${r}:${i}`, server: r, port: i }
  }
  function l(e) {
    return Array.isArray(e) ? e[0] : e
  }
  function u(e) {
    if (e !== void 0)
      return [e]
        .flat()
        .flatMap((e) => String(e).split(`,`))
        .map((e) => e.trim())
        .filter(Boolean)
  }
  function d(e) {
    if (Array.isArray(e)) {
      const t = e.filter((e) => typeof e == `string`)
      return t.length > 0 ? t : void 0
    }
    if (typeof e == `string` && e) return e.split(`,`).map((e) => e.trim())
  }
  function f(e, t = 0) {
    const n = typeof e == `number` ? e : Number.parseInt(e ?? ``, 10)
    return Number.isInteger(n) ? n : t
  }
  function p(e) {
    if (e != null) return ![`0`, `false`, `off`, `no`].includes(e.toLowerCase())
  }
  const m = class extends Error {
    constructor(e, t) {
      ;(super(e, t), (this.name = `ValidationError`))
    }
  }
  let h = `dgimsuvy`,
    g = RegExp(`^[${h}]*$`),
    _ = RegExp(`[^${h}]`, `g`)
  function v(e, t) {
    if (e.length > 256) throw new m(`A regular expression must not exceed 256 characters.`)
    const n = [...new Set(t.replaceAll(_, ``))].join(``)
    return new RegExp(e, n)
  }
  function y(e, t) {
    return ((e.lastIndex = 0), e.test(t))
  }
  function b(e, t) {
    return String(e[t] ?? ``)
  }
  function x(e, t) {
    return t.map((t) => b(e, t)).join(`\0`)
  }
  function S(e, t) {
    return e.localeCompare(t, `zh`, { numeric: !0, sensitivity: `base` })
  }
  function ee(e, t) {
    return e
      .map((e, t) => ({ node: e, originalIndex: t }))
      .toSorted((e, n) => t(e.node, n.node) || e.originalIndex - n.originalIndex)
      .map(({ node: e }) => e)
  }
  function C(e) {
    throw new m(e)
  }
  function te(e, t, n, r = !1) {
    typeof e != `string` && C(`${t} must be a string.`)
    const i = e.trim()
    return (
      !r && !i && C(`${t} must not be empty.`),
      e.length > n && C(`${t} must not exceed ${n} characters.`),
      r ? e : i
    )
  }
  const ne = [`name`, `type`, `server`, `port`]
  function re(e, t, n) {
    const r = te(e, `${n}.pattern`, 256, !0),
      i = t == null ? void 0 : te(t, `${n}.flags`, 8, !0)
    i != null && !g.test(i) && C(`${n}.flags has an invalid flag.`)
    try {
      RegExp(r, i)
    } catch {
      C(`${n}.pattern is not a valid regular expression.`)
    }
    return { pattern: r, flags: i }
  }
  function ie(e, t, n) {
    return e == null && n ? n : (ne.includes(e) || C(`${t} must be one of ${ne.join(`, `)}.`), e)
  }
  function ae(e, t) {
    if (e != null)
      return (
        Array.isArray(e) || C(`${t}.fields must be an array.`),
        e.map((e, n) => ie(e, `${t}.fields[${n}]`))
      )
  }
  function oe(e, t, n, r) {
    if (e != null) return (t.includes(String(e)) || C(`${n} ${r}`), e)
  }
  const se = [`type`, `server`, `port`],
    ce = {
      type: `dedupe`,
      params: [`fields`],
      parse(e, t) {
        return { type: `dedupe`, fields: ae(e.fields, t) }
      },
      apply(e, t) {
        let n = t.fields?.length ? t.fields : se,
          r = new Set()
        return e.filter((e) => {
          let t = x(e, n)
          return !r.has(t) && (r.add(t), !0)
        })
      },
    },
    le = {
      type: `filter`,
      params: [`field`, `pattern`, `keep`, `flags`],
      parse(e, t) {
        let n = re(e.pattern, e.flags, t),
          r = ie(e.field, `${t}.field`, `name`)
        return (
          r === `port` && C(`${t}.field does not support port.`),
          e.keep != null && typeof e.keep != `boolean` && C(`${t}.keep must be a boolean.`),
          { type: `filter`, field: r, pattern: n.pattern, flags: n.flags, keep: e.keep }
        )
      },
      apply(e, t) {
        let n = v(t.pattern, t.flags ?? `i`),
          r = t.field ?? `name`,
          i = t.keep !== !1
        return e.filter((e) => y(n, b(e, r)) === i)
      },
    },
    ue = /(?:网址|網址|流量|时间|時間|应急|應急|过期|過期|bandwidth|expire)/i
  function de(e) {
    if (!r(e.port) || ue.test(e.name)) return !1
    for (const t of [`cipher`, `password`]) {
      const n = e[t]
      if (typeof n == `string` && [...n].some((e) => (e.codePointAt(0) ?? 0) > 127)) return !1
    }
    return !0
  }
  const fe = {
      type: `filter-useless`,
      params: [],
      parse: () => ({ type: `filter-useless` }),
      apply: (e) => e.filter((e) => de(e)),
    },
    pe = /[\p{Regional_Indicator}]{2}/gu,
    me = [
      [/(?:香港|\bHK\b|Hong Kong)/i, `🇭🇰`],
      [/(?:台湾|臺灣|\bTW\b|Taiwan)/i, `🇹🇼`],
      [/(?:日本|\bJP\b|Japan|Tokyo|Osaka)/i, `🇯🇵`],
      [/(?:新加坡|\bSG\b|Singapore)/i, `🇸🇬`],
      [/(?:美国|美國|\bUS\b|United States|Los Angeles|Seattle)/i, `🇺🇸`],
      [/(?:韩国|韓國|\bKR\b|Korea|Seoul)/i, `🇰🇷`],
      [/(?:英国|英國|\bUK\b|Britain|London)/i, `🇬🇧`],
      [/(?:德国|德國|\bDE\b|Germany|Frankfurt)/i, `🇩🇪`],
    ]
  function he(e) {
    return e
      .replace(pe, ``)
      .replaceAll(/\s{2,}/g, ` `)
      .trim()
  }
  const ge = {
      type: `flag`,
      params: [`mode`],
      parse(e, t) {
        return (
          [`add`, `remove`].includes(String(e.mode)) || C(`${t}.mode must be add or remove.`),
          { type: `flag`, mode: e.mode }
        )
      },
      apply(e, t) {
        return e.map((e) => {
          let n = he(e.name)
          if (t.mode === `remove`) return { ...e, name: n }
          let r = me.find(([e]) => e.test(n))?.[1]
          return { ...e, name: r ? `${r} ${n}` : n }
        })
      },
    },
    _e = {
      type: `handle-duplicates`,
      params: [`action`, `fields`, `separator`, `position`],
      parse(e, t) {
        let n = ae(e.fields, t),
          r = oe(e.action, [`rename`, `delete`], `${t}.action`, `must be rename or delete.`),
          i = oe(e.position, [`front`, `back`], `${t}.position`, `must be front or back.`)
        return {
          type: `handle-duplicates`,
          fields: n,
          action: r,
          separator: e.separator == null ? void 0 : te(e.separator, `${t}.separator`, 16, !0),
          position: i,
        }
      },
      apply(e, t) {
        let n = t.fields?.length ? [...t.fields] : [`name`],
          r = t.separator ?? `-`,
          i = new Map()
        for (let t of e) {
          let e = x(t, n)
          i.set(e, (i.get(e) ?? 0) + 1)
        }
        let a = new Map()
        return e.flatMap((e) => {
          let o = x(e, n),
            s = (a.get(o) ?? 0) + 1
          return (
            a.set(o, s),
            t.action === `delete` && s > 1
              ? []
              : t.action !== `delete` && (i.get(o) ?? 0) > 1
                ? [
                    {
                      ...e,
                      name: t.position === `front` ? `${s}${r}${e.name}` : `${e.name}${r}${s}`,
                    },
                  ]
                : [e]
          )
        })
      },
    },
    ve = {
      type: `rename`,
      params: [`pattern`, `replacement`, `flags`],
      parse(e, t) {
        let n = re(e.pattern, e.flags, t)
        return {
          type: `rename`,
          pattern: n.pattern,
          flags: n.flags,
          replacement: te(e.replacement, `${t}.replacement`, 512, !0),
        }
      },
      apply(e, t) {
        let n = v(t.pattern, t.flags ?? `gi`)
        return e.map((e) => ({ ...e, name: e.name.replace(n, t.replacement).trim() || e.name }))
      },
    },
    ye = [`udp`, `tfo`, `skip-cert-verify`]
  new Map(
    [
      le,
      ve,
      {
        type: `sort`,
        params: [`field`, `order`],
        parse(e, t) {
          return {
            type: `sort`,
            field: ie(e.field, `${t}.field`, `name`),
            order: oe(e.order, [`asc`, `desc`], `${t}.order`, `must be asc or desc.`),
          }
        },
        apply(e, t) {
          const n = t.field ?? `name`,
            r = t.order === `desc` ? -1 : 1
          return ee(e, (e, t) => r * S(b(e, n), b(t, n)))
        },
      },
      ce,
      _e,
      fe,
      ge,
      {
        type: `set-options`,
        params: [`values`],
        parse(t, n) {
          const r = e(t.values) ?? C(`${n}.values must be an object.`)
          Object.keys(r).some((e) => !ye.includes(e)) && C(`${n}.values has an unsupported field.`)
          for (const [e, t] of Object.entries(r))
            typeof t != `boolean` && C(`${n}.values.${e} must be a boolean.`)
          return { type: `set-options`, values: r }
        },
        apply: (e, t) => e.map((e) => ({ ...e, ...t.values })),
      },
    ].map((e) => [e.type, e]),
  )
  const be = Symbol.for(`yaml.alias`),
    xe = Symbol.for(`yaml.document`),
    w = Symbol.for(`yaml.map`),
    Se = Symbol.for(`yaml.pair`),
    T = Symbol.for(`yaml.scalar`),
    Ce = Symbol.for(`yaml.seq`),
    E = Symbol.for(`yaml.node.type`),
    we = (e) => !!e && typeof e == `object` && e[E] === be,
    Te = (e) => !!e && typeof e == `object` && e[E] === xe,
    Ee = (e) => !!e && typeof e == `object` && e[E] === w,
    D = (e) => !!e && typeof e == `object` && e[E] === Se,
    O = (e) => !!e && typeof e == `object` && e[E] === T,
    De = (e) => !!e && typeof e == `object` && e[E] === Ce
  function k(e) {
    if (e && typeof e == `object`)
      switch (e[E]) {
        case w:
        case Ce:
          return !0
      }
    return !1
  }
  function A(e) {
    if (e && typeof e == `object`)
      switch (e[E]) {
        case be:
        case w:
        case T:
        case Ce:
          return !0
      }
    return !1
  }
  const Oe = (e) => (O(e) || k(e)) && !!e.anchor,
    ke = Symbol(`break visit`),
    Ae = Symbol(`skip children`),
    je = Symbol(`remove node`)
  function Me(e, t) {
    const n = Pe(t)
    Te(e)
      ? Ne(null, e.contents, n, Object.freeze([e])) === je && (e.contents = null)
      : Ne(null, e, n, Object.freeze([]))
  }
  ;((Me.BREAK = ke), (Me.SKIP = Ae), (Me.REMOVE = je))
  function Ne(e, t, n, r) {
    const i = Fe(e, t, n, r)
    if (A(i) || D(i)) return (Ie(e, r, i), Ne(e, i, n, r))
    if (typeof i != `symbol`) {
      if (k(t)) {
        r = Object.freeze(r.concat(t))
        for (let e = 0; e < t.items.length; ++e) {
          const i = Ne(e, t.items[e], n, r)
          if (typeof i == `number`) e = i - 1
          else if (i === ke) return ke
          else i === je && (t.items.splice(e, 1), --e)
        }
      } else if (D(t)) {
        r = Object.freeze(r.concat(t))
        const e = Ne(`key`, t.key, n, r)
        if (e === ke) return ke
        e === je && (t.key = null)
        const i = Ne(`value`, t.value, n, r)
        if (i === ke) return ke
        i === je && (t.value = null)
      }
    }
    return i
  }
  function Pe(e) {
    return typeof e == `object` && (e.Collection || e.Node || e.Value)
      ? {
          Alias: e.Node,
          Map: e.Node,
          Scalar: e.Node,
          Seq: e.Node,
          ...(e.Value && { Map: e.Value, Scalar: e.Value, Seq: e.Value }),
          ...(e.Collection && { Map: e.Collection, Seq: e.Collection }),
          ...e,
        }
      : e
  }
  function Fe(e, t, n, r) {
    if (typeof n == `function`) return n(e, t, r)
    if (Ee(t)) return n.Map?.(e, t, r)
    if (De(t)) return n.Seq?.(e, t, r)
    if (D(t)) return n.Pair?.(e, t, r)
    if (O(t)) return n.Scalar?.(e, t, r)
    if (we(t)) return n.Alias?.(e, t, r)
  }
  function Ie(e, t, n) {
    const r = t[t.length - 1]
    if (k(r)) r.items[e] = n
    else if (D(r)) e === `key` ? (r.key = n) : (r.value = n)
    else if (Te(r)) r.contents = n
    else {
      const e = we(r) ? `alias` : `scalar`
      throw new Error(`Cannot replace node with ${e} parent`)
    }
  }
  const Le = { "!": `%21`, ",": `%2C`, "[": `%5B`, "]": `%5D`, "{": `%7B`, "}": `%7D` },
    Re = (e) => e.replace(/[!,[\]{}]/g, (e) => Le[e])
  var ze = class e {
    constructor(t, n) {
      ;((this.docStart = null),
        (this.docEnd = !1),
        (this.yaml = { ...e.defaultYaml, ...t }),
        (this.tags = { ...e.defaultTags, ...n }))
    }
    clone() {
      const t = new e(this.yaml, this.tags)
      return ((t.docStart = this.docStart), t)
    }
    atDocument() {
      const t = new e(this.yaml, this.tags)
      switch (this.yaml.version) {
        case `1.1`:
          this.atNextDocument = !0
          break
        case `1.2`:
          ;((this.atNextDocument = !1),
            (this.yaml = { explicit: e.defaultYaml.explicit, version: `1.2` }),
            (this.tags = { ...e.defaultTags }))
      }
      return t
    }
    add(t, n) {
      this.atNextDocument &&=
        ((this.yaml = { explicit: e.defaultYaml.explicit, version: `1.1` }),
        (this.tags = { ...e.defaultTags }),
        !1)
      const r = t.trim().split(/[ \t]+/),
        i = r.shift()
      switch (i) {
        case `%TAG`: {
          if (
            r.length !== 2 &&
            (n(0, `%TAG directive should contain exactly two parts`), r.length < 2)
          )
            return !1
          const [e, t] = r
          return ((this.tags[e] = t), !0)
        }
        case `%YAML`: {
          if (((this.yaml.explicit = !0), r.length !== 1))
            return (n(0, `%YAML directive should contain exactly one part`), !1)
          const [e] = r
          if (e === `1.1` || e === `1.2`) return ((this.yaml.version = e), !0)
          {
            const t = /^\d+\.\d+$/.test(e)
            return (n(6, `Unsupported YAML version ${e}`, t), !1)
          }
        }
        default:
          return (n(0, `Unknown directive ${i}`, !0), !1)
      }
    }
    tagName(e, t) {
      if (e === `!`) return `!`
      if (e[0] !== `!`) return (t(`Not a valid tag: ${e}`), null)
      if (e[1] === `<`) {
        const n = e.slice(2, -1)
        return n === `!` || n === `!!`
          ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null)
          : (e.at(-1) !== `>` && t(`Verbatim tags must end with a >`), n)
      }
      const [, n, r] = e.match(/^(.*!)([^!]*)$/s)
      r || t(`The ${e} tag has no suffix`)
      const i = this.tags[n]
      if (i)
        try {
          return i + decodeURIComponent(r)
        } catch (error) {
          return (t(String(error)), null)
        }
      return n === `!` ? e : (t(`Could not resolve tag: ${e}`), null)
    }
    tagString(e) {
      for (const [t, n] of Object.entries(this.tags))
        if (e.startsWith(n)) return t + Re(e.substring(n.length))
      return e[0] === `!` ? e : `!<${e}>`
    }
    toString(e) {
      let t = this.yaml.explicit ? [`%YAML ${this.yaml.version || `1.2`}`] : [],
        n = Object.entries(this.tags),
        r
      if (e && n.length > 0 && A(e.contents)) {
        const t = {}
        ;(Me(e.contents, (e, n) => {
          A(n) && n.tag && (t[n.tag] = !0)
        }),
          (r = Object.keys(t)))
      } else r = []
      for (const [i, a] of n)
        (i !== `!!` || a !== `tag:yaml.org,2002:`) &&
          (!e || r.some((e) => e.startsWith(a))) &&
          t.push(`%TAG ${i} ${a}`)
      return t.join(`
`)
    }
  }
  ;((ze.defaultYaml = { explicit: !1, version: `1.2` }),
    (ze.defaultTags = { "!!": `tag:yaml.org,2002:` }))
  function Be(e) {
    if (/[\x00-\x19\s,[\]{}]/.test(e)) {
      const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(e)}`
      throw new Error(t)
    }
    return !0
  }
  function Ve(e) {
    const t = new Set()
    return (
      Me(e, {
        Value(e, n) {
          n.anchor && t.add(n.anchor)
        },
      }),
      t
    )
  }
  function He(e, t) {
    for (let n = 1; ; ++n) {
      const r = `${e}${n}`
      if (!t.has(r)) return r
    }
  }
  function Ue(e, t) {
    let n = [],
      r = new Map(),
      i = null
    return {
      onAnchor: (r) => {
        ;(n.push(r), (i ??= Ve(e)))
        const a = He(t, i)
        return (i.add(a), a)
      },
      setAnchors: () => {
        for (const e of n) {
          const t = r.get(e)
          if (typeof t == `object` && t.anchor && (O(t.node) || k(t.node))) t.node.anchor = t.anchor
          else {
            const t = Error(`Failed to resolve repeated object (this should not happen)`)
            throw ((t.source = e), t)
          }
        }
      },
      sourceObjects: r,
    }
  }
  function We(e, t, n, r) {
    if (r && typeof r == `object`) {
      if (Array.isArray(r))
        for (let t = 0, n = r.length; t < n; ++t) {
          const n = r[t],
            i = We(e, r, String(t), n)
          i === void 0 ? delete r[t] : i !== n && (r[t] = i)
        }
      else if (r instanceof Map)
        for (const t of [...r.keys()]) {
          const n = r.get(t),
            i = We(e, r, t, n)
          i === void 0 ? r.delete(t) : i !== n && r.set(t, i)
        }
      else if (r instanceof Set)
        for (const t of [...r]) {
          const n = We(e, r, t, t)
          n === void 0 ? r.delete(t) : n !== t && (r.delete(t), r.add(n))
        }
      else
        for (const [t, n] of Object.entries(r)) {
          const i = We(e, r, t, n)
          i === void 0 ? delete r[t] : i !== n && (r[t] = i)
        }
    }
    return e.call(t, n, r)
  }
  function j(e, t, n) {
    if (Array.isArray(e)) return e.map((e, t) => j(e, String(t), n))
    if (e && typeof e.toJSON == `function`) {
      if (!n || !Oe(e)) return e.toJSON(t, n)
      const r = { aliasCount: 0, count: 1, res: void 0 }
      ;(n.anchors.set(e, r),
        (n.onCreate = (e) => {
          ;((r.res = e), delete n.onCreate)
        }))
      const i = e.toJSON(t, n)
      return (n.onCreate && n.onCreate(i), i)
    }
    return typeof e == `bigint` && !n?.keep ? Number(e) : e
  }
  const Ge = class {
      constructor(e) {
        Object.defineProperty(this, E, { value: e })
      }
      clone() {
        let e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
        return (this.range && (e.range = this.range.slice()), e)
      }
      toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: r, reviver: i } = {}) {
        if (!Te(e)) throw TypeError(`A document argument is required`)
        let a = {
            anchors: new Map(),
            doc: e,
            keep: !0,
            mapAsMap: t === !0,
            mapKeyWarned: !1,
            maxAliasCount: typeof n == `number` ? n : 100,
          },
          o = j(this, ``, a)
        if (typeof r == `function`) for (let { count: e, res: t } of a.anchors.values()) r(t, e)
        return typeof i == `function` ? We(i, { "": o }, ``, o) : o
      }
    },
    Ke = class extends Ge {
      constructor(e) {
        ;(super(be),
          (this.source = e),
          Object.defineProperty(this, "tag", {
            set() {
              throw Error(`Alias nodes cannot have tags`)
            },
          }))
      }
      resolve(e, t) {
        if (t?.maxAliasCount === 0) throw ReferenceError(`Alias resolution is disabled`)
        let n
        t?.aliasResolveCache
          ? (n = t.aliasResolveCache)
          : ((n = []),
            Me(e, {
              Node: (e, t) => {
                ;(we(t) || Oe(t)) && n.push(t)
              },
            }),
            t && (t.aliasResolveCache = n))
        let r
        for (let e of n) {
          if (e === this) break
          e.anchor === this.source && (r = e)
        }
        return r
      }
      toJSON(e, t) {
        if (!t) return { source: this.source }
        let { anchors: n, doc: r, maxAliasCount: i } = t,
          a = this.resolve(r, t)
        if (!a) {
          let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
          throw ReferenceError(e)
        }
        let o = n.get(a)
        if (((o ||= (j(a, null, t), n.get(a))), o?.res === void 0))
          throw ReferenceError(`This should not happen: Alias anchor was not resolved?`)
        if (
          i >= 0 &&
          ((o.count += 1),
          o.aliasCount === 0 && (o.aliasCount = qe(r, a, n)),
          o.count * o.aliasCount > i)
        )
          throw ReferenceError(`Excessive alias count indicates a resource exhaustion attack`)
        return o.res
      }
      toString(e, t, n) {
        let r = `*${this.source}`
        if (e) {
          if ((Be(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source))) {
            let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
            throw Error(e)
          }
          if (e.implicitKey) return `${r} `
        }
        return r
      }
    }
  function qe(e, t, n) {
    if (we(t)) {
      const r = t.resolve(e),
        i = n && r && n.get(r)
      return i ? i.count * i.aliasCount : 0
    }
    if (k(t)) {
      let r = 0
      for (const i of t.items) {
        const t = qe(e, i, n)
        t > r && (r = t)
      }
      return r
    }
    if (D(t)) {
      const r = qe(e, t.key, n),
        i = qe(e, t.value, n)
      return Math.max(r, i)
    }
    return 1
  }
  const Je = (e) => !e || (typeof e != `function` && typeof e != `object`)
  var M = class extends Ge {
    constructor(e) {
      ;(super(T), (this.value = e))
    }
    toJSON(e, t) {
      return t?.keep ? this.value : j(this.value, e, t)
    }
    toString() {
      return String(this.value)
    }
  }
  ;((M.BLOCK_FOLDED = `BLOCK_FOLDED`),
    (M.BLOCK_LITERAL = `BLOCK_LITERAL`),
    (M.PLAIN = `PLAIN`),
    (M.QUOTE_DOUBLE = `QUOTE_DOUBLE`),
    (M.QUOTE_SINGLE = `QUOTE_SINGLE`))
  function Ye(e, t, n) {
    if (t) {
      const e = n.filter((e) => e.tag === t),
        r = e.find((e) => !e.format) ?? e[0]
      if (!r) throw new Error(`Tag ${t} not found`)
      return r
    }
    return n.find((t) => t.identify?.(e) && !t.format)
  }
  function Xe(e, t, n) {
    if ((Te(e) && (e = e.contents), A(e))) return e
    if (D(e)) {
      const t = n.schema[w].createNode?.(n.schema, null, n)
      return (t.items.push(e), t)
    }
    ;(e instanceof String ||
      e instanceof Number ||
      e instanceof Boolean ||
      (typeof BigInt < `u` && e instanceof BigInt)) &&
      (e = e.valueOf())
    let { aliasDuplicateObjects: r, onAnchor: i, onTagObj: a, schema: o, sourceObjects: s } = n,
      c
    if (r && e && typeof e == `object`) {
      if (((c = s.get(e)), c)) return (c.anchor ?? (c.anchor = i(e)), new Ke(c.anchor))
      ;((c = { anchor: null, node: null }), s.set(e, c))
    }
    t?.startsWith(`!!`) && (t = `tag:yaml.org,2002:${t.slice(2)}`)
    let l = Ye(e, t, o.tags)
    if (!l) {
      if ((e && typeof e.toJSON == `function` && (e = e.toJSON()), !e || typeof e != `object`)) {
        const t = new M(e)
        return (c && (c.node = t), t)
      }
      l = e instanceof Map ? o[w] : Symbol.iterator in Object(e) ? o[Ce] : o[w]
    }
    a && (a(l), delete n.onTagObj)
    const u = l?.createNode
      ? l.createNode(n.schema, e, n)
      : typeof l?.nodeClass?.from == `function`
        ? l.nodeClass.from(n.schema, e, n)
        : new M(e)
    return (t ? (u.tag = t) : l.default || (u.tag = l.tag), c && (c.node = u), u)
  }
  function Ze(e, t, n) {
    let r = n
    for (let e = t.length - 1; e >= 0; --e) {
      const n = t[e]
      if (typeof n == `number` && Number.isInteger(n) && n >= 0) {
        const e = []
        ;((e[n] = r), (r = e))
      } else r = new Map([[n, r]])
    }
    return Xe(r, void 0, {
      aliasDuplicateObjects: !1,
      keepUndefined: !1,
      onAnchor: () => {
        throw new Error(`This should not happen, please report a bug.`)
      },
      schema: e,
      sourceObjects: new Map(),
    })
  }
  const Qe = (e) => e == null || (typeof e == `object` && !!e[Symbol.iterator]().next().done)
  var $e = class extends Ge {
    constructor(e, t) {
      ;(super(e),
        Object.defineProperty(this, "schema", {
          value: t,
          configurable: !0,
          enumerable: !1,
          writable: !0,
        }))
    }
    clone(e) {
      const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
      return (
        e && (t.schema = e),
        (t.items = t.items.map((t) => (A(t) || D(t) ? t.clone(e) : t))),
        this.range && (t.range = [...this.range]),
        t
      )
    }
    addIn(e, t) {
      if (Qe(e)) this.add(t)
      else {
        const [n, ...r] = e,
          i = this.get(n, !0)
        if (k(i)) i.addIn(r, t)
        else if (i === void 0 && this.schema) this.set(n, Ze(this.schema, r, t))
        else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${r}`)
      }
    }
    deleteIn(e) {
      const [t, ...n] = e
      if (n.length === 0) return this.delete(t)
      const r = this.get(t, !0)
      if (k(r)) return r.deleteIn(n)
      throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)
    }
    getIn(e, t) {
      const [n, ...r] = e,
        i = this.get(n, !0)
      return r.length === 0 ? (!t && O(i) ? i.value : i) : k(i) ? i.getIn(r, t) : void 0
    }
    hasAllNullValues(e) {
      return this.items.every((t) => {
        if (!D(t)) return !1
        const n = t.value
        return (
          n == null || (e && O(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag)
        )
      })
    }
    hasIn(e) {
      const [t, ...n] = e
      if (n.length === 0) return this.has(t)
      const r = this.get(t, !0)
      return k(r) ? r.hasIn(n) : !1
    }
    setIn(e, t) {
      const [n, ...r] = e
      if (r.length === 0) this.set(n, t)
      else {
        const e = this.get(n, !0)
        if (k(e)) e.setIn(r, t)
        else if (e === void 0 && this.schema) this.set(n, Ze(this.schema, r, t))
        else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${r}`)
      }
    }
  }
  const et = (e) => e.replace(/^(?!$)(?: $)?/gm, `#`)
  function N(e, t) {
    return /^\n+$/.test(e) ? e.slice(1) : t ? e.replaceAll(/^(?! *$)/gm, t) : e
  }
  const tt = (e, t, n) =>
      e.endsWith(`
`)
        ? N(n, t)
        : n.includes(`
`)
          ? `
` + N(n, t)
          : (e.endsWith(` `) ? `` : ` `) + n,
    nt = `flow`
  function rt(
    e,
    t,
    n = `flow`,
    { indentAtStart: r, lineWidth: i = 80, minContentWidth: a = 20, onFold: o, onOverflow: s } = {},
  ) {
    if (!i || i < 0) return e
    i < a && (a = 0)
    const c = Math.max(1 + a, 1 + i - t.length)
    if (e.length <= c) return e
    let l = [],
      u = {},
      d = i - t.length
    typeof r == `number` && (r > i - Math.max(2, a) ? l.push(0) : (d = i - r))
    let f,
      p,
      m = !1,
      h = -1,
      g = -1,
      _ = -1
    n === `block` && ((h = it(e, h, t.length)), h !== -1 && (d = h + c))
    for (let r; (r = e[(h += 1)]);) {
      if (n === `quoted` && r === `\\`) {
        switch (((g = h), e[h + 1])) {
          case `x`:
            h += 3
            break
          case `u`:
            h += 5
            break
          case `U`:
            h += 9
            break
          default:
            h += 1
        }
        _ = h
      }
      if (
        r ===
        `
`
      )
        (n === `block` && (h = it(e, h, t.length)), (d = h + t.length + c), (f = void 0))
      else {
        if (
          r === ` ` &&
          p &&
          p !== ` ` &&
          p !==
            `
` &&
          p !== `	`
        ) {
          const t = e[h + 1]
          t &&
            t !== ` ` &&
            t !==
              `
` &&
            t !== `	` &&
            (f = h)
        }
        if (h >= d) {
          if (f) (l.push(f), (d = f + c), (f = void 0))
          else if (n === `quoted`) {
            for (; p === ` ` || p === `	`;) ((p = r), (r = e[(h += 1)]), (m = !0))
            const t = h > _ + 1 ? h - 2 : g - 1
            if (u[t]) return e
            ;(l.push(t), (u[t] = !0), (d = t + c), (f = void 0))
          } else m = !0
        }
      }
      p = r
    }
    if ((m && s && s(), l.length === 0)) return e
    o && o()
    let v = e.slice(0, l[0])
    for (let r = 0; r < l.length; ++r) {
      const i = l[r],
        a = l[r + 1] || e.length
      i === 0
        ? (v = `\n${t}${e.slice(0, a)}`)
        : (n === `quoted` && u[i] && (v += `${e[i]}\\`), (v += `\n${t}${e.slice(i + 1, a)}`))
    }
    return v
  }
  function it(e, t, n) {
    let r = t,
      i = t + 1,
      a = e[i]
    for (; a === ` ` || a === `	`;)
      if (t < i + n) a = e[++t]
      else {
        do a = e[++t]
        while (
          a &&
          a !==
            `
`
        )
        ;((r = t), (i = t + 1), (a = e[i]))
      }
    return r
  }
  const at = (e, t) => ({
      indentAtStart: t ? e.indent.length : e.indentAtStart,
      lineWidth: e.options.lineWidth,
      minContentWidth: e.options.minContentWidth,
    }),
    ot = (e) => /^(%|---|\.\.\.)/m.test(e)
  function st(e, t, n) {
    if (!t || t < 0) return !1
    const r = t - n,
      i = e.length
    if (i <= r) return !1
    for (let t = 0, n = 0; t < i; ++t)
      if (
        e[t] ===
        `
`
      ) {
        if (t - n > r) return !0
        if (((n = t + 1), i - n <= r)) return !1
      }
    return !0
  }
  function ct(e, t) {
    const n = JSON.stringify(e)
    if (t.options.doubleQuotedAsJSON) return n
    let { implicitKey: r } = t,
      i = t.options.doubleQuotedMinMultiLineLength,
      a = t.indent || (ot(e) ? `  ` : ``),
      o = ``,
      s = 0
    for (let e = 0, t = n[e]; t; t = n[++e])
      if (
        (t === ` ` &&
          n[e + 1] === `\\` &&
          n[e + 2] === `n` &&
          ((o += `${n.slice(s, e)}\\ `), (e += 1), (s = e), (t = `\\`)),
        t === `\\`)
      )
        switch (n[e + 1]) {
          case `u`:
            {
              o += n.slice(s, e)
              const t = n.substr(e + 2, 4)
              switch (t) {
                case `0000`:
                  o += `\\0`
                  break
                case `0007`:
                  o += `\\a`
                  break
                case `000b`:
                  o += `\\v`
                  break
                case `001b`:
                  o += `\\e`
                  break
                case `0085`:
                  o += `\\N`
                  break
                case `00a0`:
                  o += `\\_`
                  break
                case `2028`:
                  o += `\\L`
                  break
                case `2029`:
                  o += `\\P`
                  break
                default:
                  t.substr(0, 2) === `00` ? (o += `\\x${t.substr(2)}`) : (o += n.substr(e, 6))
              }
              ;((e += 5), (s = e + 1))
            }
            break
          case `n`:
            if (r || n[e + 2] === `"` || n.length < i) e += 1
            else {
              for (
                o += `${n.slice(s, e)}

`;
                n[e + 2] === `\\` && n[e + 3] === `n` && n[e + 4] !== `"`;
              )
                ((o += `
`),
                  (e += 2))
              ;((o += a), n[e + 2] === ` ` && (o += `\\`), (e += 1), (s = e + 1))
            }
            break
          default:
            e += 1
        }
    return ((o = s ? o + n.slice(s) : n), r ? o : rt(o, a, `quoted`, at(t, !1)))
  }
  function lt(e, t) {
    if (
      t.options.singleQuote === !1 ||
      (t.implicitKey &&
        e.includes(`
`)) ||
      /[ \t]\n|\n[ \t]/.test(e)
    )
      return ct(e, t)
    const n = t.indent || (ot(e) ? `  ` : ``),
      r = `'` + e.replace(/'/g, `''`).replace(/\n+/g, `$&\n${n}`) + `'`
    return t.implicitKey ? r : rt(r, n, nt, at(t, !1))
  }
  function ut(e, t) {
    let { singleQuote: n } = t.options,
      r
    if (n === !1) r = ct
    else {
      const t = e.includes(`"`),
        i = e.includes(`'`)
      r = t && !i ? lt : i && !t ? ct : n ? lt : ct
    }
    return r(e, t)
  }
  let dt
  try {
    dt = RegExp(
      `(^|(?<!
))
+(?!
|$)`,
      `g`,
    )
  } catch {
    dt = /\n+(?!\n|$)/g
  }
  function ft({ comment: e, type: t, value: n }, r, i, a) {
    const { blockQuote: o, commentString: s, lineWidth: c } = r.options
    if (!o || /\n[\t ]+$/.test(n)) return ut(n, r)
    const l = r.indent || (r.forceBlockIndent || ot(n) ? `  ` : ``),
      u =
        o === `literal`
          ? !0
          : o === `folded` || t === M.BLOCK_FOLDED
            ? !1
            : t === M.BLOCK_LITERAL || !st(n, c, l.length)
    if (!n)
      return u
        ? `|
`
        : `>
`
    let d, f
    for (f = n.length; f > 0; --f) {
      const e = n[f - 1]
      if (
        e !==
          `
` &&
        e !== `	` &&
        e !== ` `
      )
        break
    }
    const p = n.substring(f),
      m = p.indexOf(`
`)
    ;(m === -1 ? (d = `-`) : n === p || m !== p.length - 1 ? ((d = `+`), a && a()) : (d = ``),
      (p &&=
        ((n = n.slice(0, -p.length)),
        p.at(-1) ===
          `
` && (p = p.slice(0, -1)),
        p.replace(dt, `$&${l}`))))
    let h = !1,
      g,
      _ = -1
    for (g = 0; g < n.length; ++g) {
      const e = n[g]
      if (e === ` `) h = !0
      else if (
        e ===
        `
`
      )
        _ = g
      else break
    }
    let v = n.substring(0, _ < g ? _ + 1 : g)
    v &&= ((n = n.substring(v.length)), v.replaceAll(/\n+/g, `$&${l}`))
    let y = (h ? (l ? `2` : `1`) : ``) + d
    if ((e && ((y += ` ${s(e.replace(/ ?[\r\n]+/g, ` `))}`), i && i()), !u)) {
      const e = n
          .replace(
            /\n+/g,
            `
$&`,
          )
          .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, `$1$2`)
          .replace(/\n+/g, `$&${l}`),
        i = !1,
        a = at(r, !0)
      o !== `folded` &&
        t !== M.BLOCK_FOLDED &&
        (a.onOverflow = () => {
          i = !0
        })
      const s = rt(`${v}${e}${p}`, l, `block`, a)
      if (!i) return `>${y}\n${l}${s}`
    }
    return ((n = n.replaceAll(/\n+/g, `$&${l}`)), `|${y}\n${l}${v}${n}${p}`)
  }
  function pt(e, t, n, r) {
    const { type: i, value: a } = e,
      { actualString: o, implicitKey: s, indent: c, indentStep: l, inFlow: u } = t
    if (
      (s &&
        a.includes(`
`)) ||
      (u && /[[\]{},]/.test(a))
    )
      return ut(a, t)
    if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))
      return s ||
        u ||
        !a.includes(`
`)
        ? ut(a, t)
        : ft(e, t, n, r)
    if (
      !s &&
      !u &&
      i !== M.PLAIN &&
      a.includes(`
`)
    )
      return ft(e, t, n, r)
    if (ot(a)) {
      if (c === ``) return ((t.forceBlockIndent = !0), ft(e, t, n, r))
      if (s && c === l) return ut(a, t)
    }
    const d = a.replace(/\n+/g, `$&\n${c}`)
    if (o) {
      const e = (e) => e.default && e.tag !== `tag:yaml.org,2002:str` && e.test?.test(d),
        { compat: n, tags: r } = t.doc.schema
      if (r.some(e) || n?.some(e)) return ut(a, t)
    }
    return s ? d : rt(d, c, nt, at(t, !1))
  }
  function mt(e, t, n, r) {
    let { implicitKey: i, inFlow: a } = t,
      o = typeof e.value == `string` ? e : { ...e, value: String(e.value) },
      { type: s } = e
    s !== M.QUOTE_DOUBLE &&
      /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) &&
      (s = M.QUOTE_DOUBLE)
    let c = (e) => {
        switch (e) {
          case M.BLOCK_FOLDED:
          case M.BLOCK_LITERAL:
            return i || a ? ut(o.value, t) : ft(o, t, n, r)
          case M.QUOTE_DOUBLE:
            return ct(o.value, t)
          case M.QUOTE_SINGLE:
            return lt(o.value, t)
          case M.PLAIN:
            return pt(o, t, n, r)
          default:
            return null
        }
      },
      l = c(s)
    if (l === null) {
      const { defaultKeyType: e, defaultStringType: n } = t.options,
        r = (i && e) || n
      if (((l = c(r)), l === null)) throw new Error(`Unsupported default string type ${r}`)
    }
    return l
  }
  function ht(e, t) {
    let n = {
        blockQuote: !0,
        commentString: et,
        defaultKeyType: null,
        defaultStringType: `PLAIN`,
        directives: null,
        doubleQuotedAsJSON: !1,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: `false`,
        flowCollectionPadding: !0,
        indentSeq: !0,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: `null`,
        simpleKeys: !1,
        singleQuote: null,
        trailingComma: !1,
        trueStr: `true`,
        verifyAliasOrder: !0,
        ...e.schema.toStringOptions,
        ...t,
      },
      r
    switch (n.collectionStyle) {
      case `block`:
        r = !1
        break
      case `flow`:
        r = !0
        break
      default:
        r = null
    }
    return {
      anchors: new Set(),
      doc: e,
      flowCollectionPadding: n.flowCollectionPadding ? ` ` : ``,
      indent: ``,
      indentStep: typeof n.indent == `number` ? ` `.repeat(n.indent) : `  `,
      inFlow: r,
      options: n,
    }
  }
  function gt(e, t) {
    if (t.tag) {
      const n = e.filter((e) => e.tag === t.tag)
      if (n.length > 0) return n.find((e) => e.format === t.format) ?? n[0]
    }
    let n, r
    if (O(t)) {
      r = t.value
      let i = e.filter((e) => e.identify?.(r))
      if (i.length > 1) {
        const e = i.filter((e) => e.test)
        e.length > 0 && (i = e)
      }
      n = i.find((e) => e.format === t.format) ?? i.find((e) => !e.format)
    } else ((r = t), (n = e.find((e) => e.nodeClass && r instanceof e.nodeClass)))
    if (!n) {
      const e = r?.constructor?.name ?? (r === null ? `null` : typeof r)
      throw new Error(`Tag not resolved for ${e} value`)
    }
    return n
  }
  function _t(e, t, { anchors: n, doc: r }) {
    if (!r.directives) return ``
    const i = [],
      a = (O(e) || k(e)) && e.anchor
    a && Be(a) && (n.add(a), i.push(`&${a}`))
    const o = e.tag ?? (t.default ? null : t.tag)
    return (o && i.push(r.directives.tagString(o)), i.join(` `))
  }
  function vt(e, t, n, r) {
    if (D(e)) return e.toString(t, n, r)
    if (we(e)) {
      if (t.doc.directives) return e.toString(t)
      if (t.resolvedAliases?.has(e))
        throw new TypeError(`Cannot stringify circular structure without alias nodes`)
      ;(t.resolvedAliases ? t.resolvedAliases.add(e) : (t.resolvedAliases = new Set([e])),
        (e = e.resolve(t.doc)))
    }
    let i,
      a = A(e) ? e : t.doc.createNode(e, { onTagObj: (e) => (i = e) })
    i ??= gt(t.doc.schema.tags, a)
    const o = _t(a, i, t)
    o.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + o.length + 1)
    const s =
      typeof i.stringify == `function`
        ? i.stringify(a, t, n, r)
        : O(a)
          ? mt(a, t, n, r)
          : a.toString(t, n, r)
    return o ? (O(a) || s[0] === `{` || s[0] === `[` ? `${o} ${s}` : `${o}\n${t.indent}${s}`) : s
  }
  function yt({ key: e, value: t }, n, r, i) {
    let {
        allNullValues: a,
        doc: o,
        indent: s,
        indentStep: c,
        options: { commentString: l, indentSeq: u, simpleKeys: d },
      } = n,
      f = (A(e) && e.comment) || null
    if (d) {
      if (f) throw new Error(`With simple keys, key nodes cannot have comments`)
      if (k(e) || (!A(e) && typeof e == `object`))
        throw new Error(`With simple keys, collection cannot be used as a key value`)
    }
    let p =
      !d &&
      (!e ||
        (f && t == null && !n.inFlow) ||
        k(e) ||
        (O(e) ? e.type === M.BLOCK_FOLDED || e.type === M.BLOCK_LITERAL : typeof e == `object`))
    n = { ...n, allNullValues: !1, implicitKey: !p && (d || !a), indent: s + c }
    let m = !1,
      h = !1,
      g = vt(
        e,
        n,
        () => (m = !0),
        () => (h = !0),
      )
    if (!p && !n.inFlow && g.length > 1024) {
      if (d)
        throw new Error(
          `With simple keys, single line scalar must not span more than 1024 characters`,
        )
      p = !0
    }
    if (n.inFlow) {
      if (a || t == null) return (m && r && r(), g === `` ? `?` : p ? `? ${g}` : g)
    } else if ((a && !d) || (t == null && p))
      return ((g = `? ${g}`), f && !m ? (g += tt(g, n.indent, l(f))) : h && i && i(), g)
    ;(m && (f = null),
      p
        ? (f && (g += tt(g, n.indent, l(f))), (g = `? ${g}\n${s}:`))
        : ((g = `${g}:`), f && (g += tt(g, n.indent, l(f)))))
    let _, v, y
    ;(A(t)
      ? ((_ = Boolean(t.spaceBefore)), (v = t.commentBefore), (y = t.comment))
      : ((_ = !1), (v = null), (y = null), t && typeof t == `object` && (t = o.createNode(t))),
      (n.implicitKey = !1),
      !p && !f && O(t) && (n.indentAtStart = g.length + 1),
      (h = !1),
      !u &&
        c.length >= 2 &&
        !n.inFlow &&
        !p &&
        De(t) &&
        !t.flow &&
        !t.tag &&
        !t.anchor &&
        (n.indent = n.indent.slice(2)))
    let b = !1,
      x = vt(
        t,
        n,
        () => (b = !0),
        () => (h = !0),
      ),
      S = ` `
    if (f || _ || v) {
      if (
        ((S = _
          ? `
`
          : ``),
        v)
      ) {
        const e = l(v)
        S += `\n${N(e, n.indent)}`
      }
      x === `` && !n.inFlow
        ? S ===
            `
` &&
          y &&
          (S = `

`)
        : (S += `\n${n.indent}`)
    } else if (!p && k(t)) {
      const e = x[0],
        r = x.indexOf(`
`),
        i = r !== -1,
        a = n.inFlow ?? t.flow ?? t.items.length === 0
      if (i || !a) {
        let t = !1
        if (i && (e === `&` || e === `!`)) {
          let n = x.indexOf(` `)
          ;(e === `&` && n !== -1 && n < r && x[n + 1] === `!` && (n = x.indexOf(` `, n + 1)),
            (n === -1 || r < n) && (t = !0))
        }
        t || (S = `\n${n.indent}`)
      }
    } else
      (x === `` ||
        x[0] ===
          `
`) &&
        (S = ``)
    return (
      (g += S + x),
      n.inFlow ? b && r && r() : y && !b ? (g += tt(g, n.indent, l(y))) : h && i && i(),
      g
    )
  }
  function bt(e, t) {
    ;(e === `debug` || e === `warn`) && console.warn(t)
  }
  const P = {
      identify: (e) => e === `<<` || (typeof e == `symbol` && e.description === `<<`),
      default: `key`,
      tag: `tag:yaml.org,2002:merge`,
      test: /^<<$/,
      resolve: () => Object.assign(new M(Symbol(`<<`)), { addToJSMap: St }),
      stringify: () => `<<`,
    },
    xt = (e, t) =>
      (P.identify(t) || (O(t) && (!t.type || t.type === M.PLAIN) && P.identify(t.value))) &&
      e?.doc.schema.tags.some((e) => e.tag === P.tag && e.default)
  function St(e, t, n) {
    const r = wt(e, n)
    if (De(r)) for (const n of r.items) Ct(e, t, n)
    else if (Array.isArray(r)) for (const n of r) Ct(e, t, n)
    else Ct(e, t, r)
  }
  function Ct(e, t, n) {
    const r = wt(e, n)
    if (!Ee(r)) throw new Error(`Merge sources must be maps or map aliases`)
    const i = r.toJSON(null, e, Map)
    for (const [e, n] of i)
      t instanceof Map
        ? t.has(e) || t.set(e, n)
        : t instanceof Set
          ? t.add(e)
          : Object.hasOwn(t, e) ||
            Object.defineProperty(t, e, {
              value: n,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
    return t
  }
  function wt(e, t) {
    return e && we(t) ? t.resolve(e.doc, e) : t
  }
  function Tt(e, t, { key: n, value: r }) {
    if (A(n) && n.addToJSMap) n.addToJSMap(e, t, r)
    else if (xt(e, n)) St(e, t, r)
    else {
      const i = j(n, ``, e)
      if (t instanceof Map) t.set(i, j(r, i, e))
      else if (t instanceof Set) t.add(i)
      else {
        const a = Et(n, i, e),
          o = j(r, a, e)
        a in t
          ? Object.defineProperty(t, a, {
              value: o,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : (t[a] = o)
      }
    }
    return t
  }
  function Et(e, t, n) {
    if (t === null) return ``
    if (typeof t != `object`) return String(t)
    if (A(e) && n?.doc) {
      const t = ht(n.doc, {})
      t.anchors = new Set()
      for (const e of n.anchors.keys()) t.anchors.add(e.anchor)
      ;((t.inFlow = !0), (t.inStringifyKey = !0))
      const r = e.toString(t)
      if (!n.mapKeyWarned) {
        let e = JSON.stringify(r)
        ;(e.length > 40 && (e = `${e.substring(0, 36)}..."`),
          bt(
            n.doc.options.logLevel,
            `Keys with collection values will be stringified due to JS Object restrictions: ${e}. Set mapAsMap: true to use object keys.`,
          ),
          (n.mapKeyWarned = !0))
      }
      return r
    }
    return JSON.stringify(t)
  }
  function Dt(e, t, n) {
    return new F(Xe(e, void 0, n), Xe(t, void 0, n))
  }
  const F = class e {
    constructor(e, t = null) {
      ;(Object.defineProperty(this, E, { value: Se }), (this.key = e), (this.value = t))
    }
    clone(t) {
      let { key: n, value: r } = this
      return (A(n) && (n = n.clone(t)), A(r) && (r = r.clone(t)), new e(n, r))
    }
    toJSON(e, t) {
      return Tt(t, t?.mapAsMap ? new Map() : {}, this)
    }
    toString(e, t, n) {
      return e?.doc ? yt(this, e, t, n) : JSON.stringify(this)
    }
  }
  function Ot(e, t, n) {
    return ((t.inFlow ?? e.flow) ? At : kt)(e, t, n)
  }
  function kt(
    { comment: e, items: t },
    n,
    { blockItemPrefix: r, flowChars: i, itemIndent: a, onChompKeep: o, onComment: s },
  ) {
    const {
        indent: c,
        options: { commentString: l },
      } = n,
      u = Object.assign({}, n, { indent: a, type: null }),
      d = !1,
      f = []
    for (let e = 0; e < t.length; ++e) {
      let i = t[e],
        o = null
      if (A(i))
        (!d && i.spaceBefore && f.push(``),
          jt(n, f, i.commentBefore, d),
          i.comment && (o = i.comment))
      else if (D(i)) {
        const e = A(i.key) ? i.key : null
        e && (!d && e.spaceBefore && f.push(``), jt(n, f, e.commentBefore, d))
      }
      d = !1
      let s = vt(
        i,
        u,
        () => (o = null),
        () => (d = !0),
      )
      ;(o && (s += tt(s, a, l(o))), d && o && (d = !1), f.push(r + s))
    }
    let p
    if (f.length === 0) p = i.start + i.end
    else {
      p = f[0]
      for (let e = 1; e < f.length; ++e) {
        const t = f[e]
        p += t
          ? `\n${c}${t}`
          : `
`
      }
    }
    return (
      e
        ? ((p += `
${N(l(e), c)}`),
          s && s())
        : d && o && o(),
      p
    )
  }
  function At({ items: e }, t, { flowChars: n, itemIndent: r }) {
    const {
      indent: i,
      indentStep: a,
      flowCollectionPadding: o,
      options: { commentString: s },
    } = t
    r += a
    const c = Object.assign({}, t, { indent: r, inFlow: !0, type: null }),
      l = !1,
      u = 0,
      d = []
    for (let n = 0; n < e.length; ++n) {
      let i = e[n],
        a = null
      if (A(i))
        (i.spaceBefore && d.push(``), jt(t, d, i.commentBefore, !1), i.comment && (a = i.comment))
      else if (D(i)) {
        const e = A(i.key) ? i.key : null
        e && (e.spaceBefore && d.push(``), jt(t, d, e.commentBefore, !1), e.comment && (l = !0))
        const n = A(i.value) ? i.value : null
        n
          ? (n.comment && (a = n.comment), n.commentBefore && (l = !0))
          : i.value == null && e?.comment && (a = e.comment)
      }
      a && (l = !0)
      let o = vt(i, c, () => (a = null))
      ;((l ||=
        d.length > u ||
        o.includes(`
`)),
        n < e.length - 1
          ? (o += `,`)
          : t.options.trailingComma &&
            (t.options.lineWidth > 0 &&
              (l ||=
                d.reduce((e, t) => e + t.length + 2, 2) + (o.length + 2) > t.options.lineWidth),
            l && (o += `,`)),
        a && (o += tt(o, r, s(a))),
        d.push(o),
        (u = d.length))
    }
    const { start: f, end: p } = n
    if (d.length === 0) return f + p
    if (!l) {
      const e = d.reduce((e, t) => e + t.length + 2, 2)
      l = t.options.lineWidth > 0 && e > t.options.lineWidth
    }
    if (l) {
      let e = f
      for (const t of d)
        e += t
          ? `\n${a}${i}${t}`
          : `
`
      return `${e}\n${i}${p}`
    }
    return `${f}${o}${d.join(` `)}${o}${p}`
  }
  function jt({ indent: e, options: { commentString: t } }, n, r, i) {
    if ((r && i && (r = r.replace(/^\n+/, ``)), r)) {
      const i = N(t(r), e)
      n.push(i.trimStart())
    }
  }
  function Mt(e, t) {
    const n = O(t) ? t.value : t
    for (const r of e)
      if (D(r) && (r.key === t || r.key === n || (O(r.key) && r.key.value === n))) return r
  }
  const I = class extends $e {
    static get tagName() {
      return `tag:yaml.org,2002:map`
    }
    constructor(e) {
      ;(super(w, e), (this.items = []))
    }
    static from(e, t, n) {
      let { keepUndefined: r, replacer: i } = n,
        a = new this(e),
        o = (e, o) => {
          if (typeof i == `function`) o = i.call(t, e, o)
          else if (Array.isArray(i) && !i.includes(e)) return
          ;(o !== void 0 || r) && a.items.push(Dt(e, o, n))
        }
      if (t instanceof Map) for (let [e, n] of t) o(e, n)
      else if (t && typeof t == `object`) for (let e of Object.keys(t)) o(e, t[e])
      return (typeof e.sortMapEntries == `function` && a.items.sort(e.sortMapEntries), a)
    }
    add(e, t) {
      let n
      n = D(e)
        ? e
        : !e || typeof e != `object` || !(`key` in e)
          ? new F(e, e?.value)
          : new F(e.key, e.value)
      let r = Mt(this.items, n.key),
        i = this.schema?.sortMapEntries
      if (r) {
        if (!t) throw Error(`Key ${n.key} already set`)
        O(r.value) && Je(n.value) ? (r.value.value = n.value) : (r.value = n.value)
      } else if (i) {
        let e = this.items.findIndex((e) => i(n, e) < 0)
        e === -1 ? this.items.push(n) : this.items.splice(e, 0, n)
      } else this.items.push(n)
    }
    delete(e) {
      let t = Mt(this.items, e)
      return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1
    }
    get(e, t) {
      let n = Mt(this.items, e)?.value
      return (!t && O(n) ? n.value : n) ?? void 0
    }
    has(e) {
      return !!Mt(this.items, e)
    }
    set(e, t) {
      this.add(new F(e, t), !0)
    }
    toJSON(e, t, n) {
      let r = n ? new n() : t?.mapAsMap ? new Map() : {}
      t?.onCreate && t.onCreate(r)
      for (let e of this.items) Tt(t, r, e)
      return r
    }
    toString(e, t, n) {
      if (!e) return JSON.stringify(this)
      for (let e of this.items)
        if (!D(e)) throw Error(`Map items must all be pairs; found ${JSON.stringify(e)} instead`)
      return (
        !e.allNullValues &&
          this.hasAllNullValues(!1) &&
          (e = Object.assign({}, e, { allNullValues: !0 })),
        Ot(this, e, {
          blockItemPrefix: ``,
          flowChars: { start: `{`, end: `}` },
          itemIndent: e.indent || ``,
          onChompKeep: n,
          onComment: t,
        })
      )
    }
  }
  let Nt = {
    collection: `map`,
    default: !0,
    nodeClass: I,
    tag: `tag:yaml.org,2002:map`,
    resolve(e, t) {
      return (Ee(e) || t(`Expected a mapping for this tag`), e)
    },
    createNode: (e, t, n) => I.from(e, t, n),
  }
  const Pt = class extends $e {
    static get tagName() {
      return `tag:yaml.org,2002:seq`
    }
    constructor(e) {
      ;(super(Ce, e), (this.items = []))
    }
    add(e) {
      this.items.push(e)
    }
    delete(e) {
      let t = Ft(e)
      return typeof t == `number` && this.items.splice(t, 1).length > 0
    }
    get(e, t) {
      let n = Ft(e)
      if (typeof n != `number`) return
      let r = this.items[n]
      return !t && O(r) ? r.value : r
    }
    has(e) {
      let t = Ft(e)
      return typeof t == `number` && t < this.items.length
    }
    set(e, t) {
      let n = Ft(e)
      if (typeof n != `number`) throw Error(`Expected a valid index, not ${e}.`)
      let r = this.items[n]
      O(r) && Je(t) ? (r.value = t) : (this.items[n] = t)
    }
    toJSON(e, t) {
      let n = []
      t?.onCreate && t.onCreate(n)
      let r = 0
      for (let e of this.items) n.push(j(e, String(r++), t))
      return n
    }
    toString(e, t, n) {
      return e
        ? Ot(this, e, {
            blockItemPrefix: `- `,
            flowChars: { start: `[`, end: `]` },
            itemIndent: (e.indent || ``) + `  `,
            onChompKeep: n,
            onComment: t,
          })
        : JSON.stringify(this)
    }
    static from(e, t, n) {
      let { replacer: r } = n,
        i = new this(e)
      if (t && Symbol.iterator in Object(t)) {
        let e = 0
        for (let a of t) {
          if (typeof r == `function`) {
            let n = t instanceof Set ? a : String(e++)
            a = r.call(t, n, a)
          }
          i.items.push(Xe(a, void 0, n))
        }
      }
      return i
    }
  }
  function Ft(e) {
    let t = O(e) ? e.value : e
    return (
      t && typeof t == `string` && (t = Number(t)),
      typeof t == `number` && Number.isInteger(t) && t >= 0 ? t : null
    )
  }
  const It = {
      collection: `seq`,
      default: !0,
      nodeClass: Pt,
      tag: `tag:yaml.org,2002:seq`,
      resolve(e, t) {
        return (De(e) || t(`Expected a sequence for this tag`), e)
      },
      createNode: (e, t, n) => Pt.from(e, t, n),
    },
    Lt = {
      identify: (e) => typeof e == `string`,
      default: !0,
      tag: `tag:yaml.org,2002:str`,
      resolve: (e) => e,
      stringify(e, t, n, r) {
        return ((t = Object.assign({ actualString: !0 }, t)), mt(e, t, n, r))
      },
    },
    Rt = {
      identify: (e) => e == null,
      createNode: () => new M(null),
      default: !0,
      tag: `tag:yaml.org,2002:null`,
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new M(null),
      stringify: ({ source: e }, t) =>
        typeof e == `string` && Rt.test.test(e) ? e : t.options.nullStr,
    },
    zt = {
      identify: (e) => typeof e == `boolean`,
      default: !0,
      tag: `tag:yaml.org,2002:bool`,
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (e) => new M(e[0] === `t` || e[0] === `T`),
      stringify({ source: e, value: t }, n) {
        return e && zt.test.test(e) && t === (e[0] === `t` || e[0] === `T`)
          ? e
          : t
            ? n.options.trueStr
            : n.options.falseStr
      },
    }
  function L({ format: e, minFractionDigits: t, tag: n, value: r }) {
    if (typeof r == `bigint`) return String(r)
    const i = typeof r == `number` ? r : Number(r)
    if (!isFinite(i)) return isNaN(i) ? `.nan` : i < 0 ? `-.inf` : `.inf`
    let a = Object.is(r, -0) ? `-0` : JSON.stringify(r)
    if (!e && t && (!n || n === `tag:yaml.org,2002:float`) && /^-?\d/.test(a) && !a.includes(`e`)) {
      let e = a.indexOf(`.`)
      e < 0 && ((e = a.length), (a += `.`))
      let n = t - (a.length - e - 1)
      for (; n-- > 0;) a += `0`
    }
    return a
  }
  const Bt = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (e) => (e.slice(-3).toLowerCase() === `nan` ? NaN : e[0] === `-` ? -1 / 0 : 1 / 0),
      stringify: L,
    },
    Vt = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      format: `EXP`,
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (e) => parseFloat(e),
      stringify(e) {
        let t = Number(e.value)
        return isFinite(t) ? t.toExponential() : L(e)
      },
    },
    Ht = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(e) {
        let t = new M(parseFloat(e)),
          n = e.indexOf(`.`)
        return (n !== -1 && e[e.length - 1] === `0` && (t.minFractionDigits = e.length - n - 1), t)
      },
      stringify: L,
    },
    Ut = (e) => typeof e == `bigint` || Number.isInteger(e),
    Wt = (e, t, n, { intAsBigInt: r }) => (r ? BigInt(e) : parseInt(e.substring(t), n))
  function Gt(e, t, n) {
    const { value: r } = e
    return Ut(r) && r >= 0 ? n + r.toString(t) : L(e)
  }
  const Kt = {
      identify: (e) => Ut(e) && e >= 0,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `OCT`,
      test: /^0o[0-7]+$/,
      resolve: (e, t, n) => Wt(e, 2, 8, n),
      stringify: (e) => Gt(e, 8, `0o`),
    },
    qt = {
      identify: Ut,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      test: /^[-+]?[0-9]+$/,
      resolve: (e, t, n) => Wt(e, 0, 10, n),
      stringify: L,
    },
    Jt = {
      identify: (e) => Ut(e) && e >= 0,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `HEX`,
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (e, t, n) => Wt(e, 2, 16, n),
      stringify: (e) => Gt(e, 16, `0x`),
    },
    Yt = [Nt, It, Lt, Rt, zt, Kt, qt, Jt, Bt, Vt, Ht]
  function Xt(e) {
    return typeof e == `bigint` || Number.isInteger(e)
  }
  const Zt = ({ value: e }) => JSON.stringify(e),
    Qt = [
      {
        identify: (e) => typeof e == `string`,
        default: !0,
        tag: `tag:yaml.org,2002:str`,
        resolve: (e) => e,
        stringify: Zt,
      },
      {
        identify: (e) => e == null,
        createNode: () => new M(null),
        default: !0,
        tag: `tag:yaml.org,2002:null`,
        test: /^null$/,
        resolve: () => null,
        stringify: Zt,
      },
      {
        identify: (e) => typeof e == `boolean`,
        default: !0,
        tag: `tag:yaml.org,2002:bool`,
        test: /^true$|^false$/,
        resolve: (e) => e === `true`,
        stringify: Zt,
      },
      {
        identify: Xt,
        default: !0,
        tag: `tag:yaml.org,2002:int`,
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (e, t, { intAsBigInt: n }) => (n ? BigInt(e) : parseInt(e, 10)),
        stringify: ({ value: e }) => (Xt(e) ? e.toString() : JSON.stringify(e)),
      },
      {
        identify: (e) => typeof e == `number`,
        default: !0,
        tag: `tag:yaml.org,2002:float`,
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (e) => parseFloat(e),
        stringify: Zt,
      },
    ],
    $t = [Nt, It].concat(Qt, {
      default: !0,
      tag: ``,
      test: /^/,
      resolve(e, t) {
        return (t(`Unresolved plain scalar ${JSON.stringify(e)}`), e)
      },
    }),
    en = {
      identify: (e) => e instanceof Uint8Array,
      default: !1,
      tag: `tag:yaml.org,2002:binary`,
      resolve(e, t) {
        if (typeof atob == `function`) {
          let t = atob(e.replace(/[\n\r]/g, ``)),
            n = new Uint8Array(t.length)
          for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e)
          return n
        }
        return (
          t(
            `This environment does not support reading binary tags; either Buffer or atob is required`,
          ),
          e
        )
      },
      stringify({ comment: e, type: t, value: n }, r, i, a) {
        if (!n) return ``
        let o = n,
          s
        if (typeof btoa == `function`) {
          let e = ``
          for (let t = 0; t < o.length; ++t) e += String.fromCharCode(o[t])
          s = btoa(e)
        } else
          throw Error(
            `This environment does not support writing binary tags; either Buffer or btoa is required`,
          )
        if (((t ??= M.BLOCK_LITERAL), t !== M.QUOTE_DOUBLE)) {
          let e = Math.max(r.options.lineWidth - r.indent.length, r.options.minContentWidth),
            n = Math.ceil(s.length / e),
            i = Array(n)
          for (let t = 0, r = 0; t < n; ++t, r += e) i[t] = s.substr(r, e)
          s = i.join(
            t === M.BLOCK_LITERAL
              ? `
`
              : ` `,
          )
        }
        return mt({ comment: e, type: t, value: s }, r, i, a)
      },
    }
  function tn(e, t) {
    if (De(e))
      for (let n = 0; n < e.items.length; ++n) {
        let r = e.items[n]
        if (!D(r)) {
          if (Ee(r)) {
            r.items.length > 1 && t(`Each pair must have its own sequence indicator`)
            const e = r.items[0] || new F(new M(null))
            if (
              (r.commentBefore &&
                (e.key.commentBefore = e.key.commentBefore
                  ? `${r.commentBefore}\n${e.key.commentBefore}`
                  : r.commentBefore),
              r.comment)
            ) {
              const t = e.value ?? e.key
              t.comment = t.comment ? `${r.comment}\n${t.comment}` : r.comment
            }
            r = e
          }
          e.items[n] = D(r) ? r : new F(r)
        }
      }
    else t(`Expected a sequence for this tag`)
    return e
  }
  function nn(e, t, n) {
    const { replacer: r } = n,
      i = new Pt(e)
    i.tag = `tag:yaml.org,2002:pairs`
    let a = 0
    if (t && Symbol.iterator in Object(t))
      for (let e of t) {
        typeof r == `function` && (e = r.call(t, String(a++), e))
        let o, s
        if (Array.isArray(e)) {
          if (e.length === 2) ((o = e[0]), (s = e[1]))
          else throw new TypeError(`Expected [key, value] tuple: ${e}`)
        } else if (e && e instanceof Object) {
          const t = Object.keys(e)
          if (t.length === 1) ((o = t[0]), (s = e[o]))
          else throw new TypeError(`Expected tuple with one key, not ${t.length} keys`)
        } else o = e
        i.items.push(Dt(o, s, n))
      }
    return i
  }
  const rn = {
    collection: `seq`,
    default: !1,
    tag: `tag:yaml.org,2002:pairs`,
    resolve: tn,
    createNode: nn,
  }
  var an = class e extends Pt {
    constructor() {
      ;(super(),
        (this.add = I.prototype.add.bind(this)),
        (this.delete = I.prototype.delete.bind(this)),
        (this.get = I.prototype.get.bind(this)),
        (this.has = I.prototype.has.bind(this)),
        (this.set = I.prototype.set.bind(this)),
        (this.tag = e.tag))
    }
    toJSON(e, t) {
      if (!t) return super.toJSON(e)
      const n = new Map()
      t?.onCreate && t.onCreate(n)
      for (const e of this.items) {
        let r, i
        if ((D(e) ? ((r = j(e.key, ``, t)), (i = j(e.value, r, t))) : (r = j(e, ``, t)), n.has(r)))
          throw new Error(`Ordered maps must not include duplicate keys`)
        n.set(r, i)
      }
      return n
    }
    static from(e, t, n) {
      const r = nn(e, t, n),
        i = new this()
      return ((i.items = r.items), i)
    }
  }
  an.tag = `tag:yaml.org,2002:omap`
  const on = {
    collection: `seq`,
    identify: (e) => e instanceof Map,
    nodeClass: an,
    default: !1,
    tag: `tag:yaml.org,2002:omap`,
    resolve(e, t) {
      let n = tn(e, t),
        r = []
      for (let { key: e } of n.items)
        O(e) &&
          (r.includes(e.value)
            ? t(`Ordered maps must not include duplicate keys: ${e.value}`)
            : r.push(e.value))
      return Object.assign(new an(), n)
    },
    createNode: (e, t, n) => an.from(e, t, n),
  }
  function sn({ value: e, source: t }, n) {
    return t && (e ? cn : ln).test.test(t) ? t : e ? n.options.trueStr : n.options.falseStr
  }
  const cn = {
      identify: (e) => e === !0,
      default: !0,
      tag: `tag:yaml.org,2002:bool`,
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new M(!0),
      stringify: sn,
    },
    ln = {
      identify: (e) => e === !1,
      default: !0,
      tag: `tag:yaml.org,2002:bool`,
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new M(!1),
      stringify: sn,
    },
    un = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (e) => (e.slice(-3).toLowerCase() === `nan` ? NaN : e[0] === `-` ? -1 / 0 : 1 / 0),
      stringify: L,
    },
    dn = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      format: `EXP`,
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (e) => parseFloat(e.replace(/_/g, ``)),
      stringify(e) {
        let t = Number(e.value)
        return isFinite(t) ? t.toExponential() : L(e)
      },
    },
    fn = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(e) {
        let t = new M(parseFloat(e.replace(/_/g, ``))),
          n = e.indexOf(`.`)
        if (n !== -1) {
          let r = e.substring(n + 1).replace(/_/g, ``)
          r[r.length - 1] === `0` && (t.minFractionDigits = r.length)
        }
        return t
      },
      stringify: L,
    },
    pn = (e) => typeof e == `bigint` || Number.isInteger(e)
  function mn(e, t, n, { intAsBigInt: r }) {
    const i = e[0]
    if (((i === `-` || i === `+`) && (t += 1), (e = e.substring(t).replaceAll("_", ``)), r)) {
      switch (n) {
        case 2:
          e = `0b${e}`
          break
        case 8:
          e = `0o${e}`
          break
        case 16:
          e = `0x${e}`
      }
      const t = BigInt(e)
      return i === `-` ? BigInt(-1) * t : t
    }
    const a = parseInt(e, n)
    return i === `-` ? -1 * a : a
  }
  function hn(e, t, n) {
    const { value: r } = e
    if (pn(r)) {
      const e = r.toString(t)
      return r < 0 ? `-${n}${e.substr(1)}` : n + e
    }
    return L(e)
  }
  const gn = {
      identify: pn,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `BIN`,
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (e, t, n) => mn(e, 2, 2, n),
      stringify: (e) => hn(e, 2, `0b`),
    },
    _n = {
      identify: pn,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `OCT`,
      test: /^[-+]?0[0-7_]+$/,
      resolve: (e, t, n) => mn(e, 1, 8, n),
      stringify: (e) => hn(e, 8, `0`),
    },
    vn = {
      identify: pn,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (e, t, n) => mn(e, 0, 10, n),
      stringify: L,
    },
    yn = {
      identify: pn,
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `HEX`,
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (e, t, n) => mn(e, 2, 16, n),
      stringify: (e) => hn(e, 16, `0x`),
    }
  var bn = class e extends I {
    constructor(t) {
      ;(super(t), (this.tag = e.tag))
    }
    add(e) {
      let t
      ;((t = D(e)
        ? e
        : e && typeof e == `object` && `key` in e && `value` in e && e.value === null
          ? new F(e.key, null)
          : new F(e, null)),
        Mt(this.items, t.key) || this.items.push(t))
    }
    get(e, t) {
      const n = Mt(this.items, e)
      return !t && D(n) ? (O(n.key) ? n.key.value : n.key) : n
    }
    set(e, t) {
      if (typeof t != `boolean`)
        throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`)
      const n = Mt(this.items, e)
      n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new F(e))
    }
    toJSON(e, t) {
      return super.toJSON(e, t, Set)
    }
    toString(e, t, n) {
      if (!e) return JSON.stringify(this)
      if (this.hasAllNullValues(!0)) return super.toString({ ...e, allNullValues: !0 }, t, n)
      throw new Error(`Set items must all have null values`)
    }
    static from(e, t, n) {
      const { replacer: r } = n,
        i = new this(e)
      if (t && Symbol.iterator in Object(t))
        for (let e of t)
          (typeof r == `function` && (e = r.call(t, e, e)), i.items.push(Dt(e, null, n)))
      return i
    }
  }
  bn.tag = `tag:yaml.org,2002:set`
  const xn = {
    collection: `map`,
    identify: (e) => e instanceof Set,
    nodeClass: bn,
    default: !1,
    tag: `tag:yaml.org,2002:set`,
    createNode: (e, t, n) => bn.from(e, t, n),
    resolve(e, t) {
      if (Ee(e)) {
        if (e.hasAllNullValues(!0)) return Object.assign(new bn(), e)
        t(`Set items must all have null values`)
      } else t(`Expected a mapping for this tag`)
      return e
    },
  }
  function Sn(e, t) {
    const n = e[0],
      r = n === `-` || n === `+` ? e.substring(1) : e,
      i = (e) => (t ? BigInt(e) : Number(e)),
      a = r
        .replace(/_/g, ``)
        .split(`:`)
        .reduce((e, t) => e * i(60) + i(t), i(0))
    return n === `-` ? i(-1) * a : a
  }
  function Cn(e) {
    let { value: t } = e,
      n = (e) => e
    if (typeof t == `bigint`) n = (e) => BigInt(e)
    else if (isNaN(t) || !isFinite(t)) return L(e)
    let r = ``
    t < 0 && ((r = `-`), (t *= n(-1)))
    const i = n(60),
      a = [t % i]
    return (
      t < 60
        ? a.unshift(0)
        : ((t = (t - a[0]) / i), a.unshift(t % i), t >= 60 && ((t = (t - a[0]) / i), a.unshift(t))),
      r +
        a
          .map((e) => String(e).padStart(2, `0`))
          .join(`:`)
          .replace(/000000\d*$/, ``)
    )
  }
  const wn = {
      identify: (e) => typeof e == `bigint` || Number.isInteger(e),
      default: !0,
      tag: `tag:yaml.org,2002:int`,
      format: `TIME`,
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (e, t, { intAsBigInt: n }) => Sn(e, n),
      stringify: Cn,
    },
    Tn = {
      identify: (e) => typeof e == `number`,
      default: !0,
      tag: `tag:yaml.org,2002:float`,
      format: `TIME`,
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (e) => Sn(e, !1),
      stringify: Cn,
    },
    En = {
      identify: (e) => e instanceof Date,
      default: !0,
      tag: `tag:yaml.org,2002:timestamp`,
      test: RegExp(
        `^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$`,
      ),
      resolve(e) {
        let t = e.match(En.test)
        if (!t) throw Error(`!!timestamp expects a date, starting with yyyy-mm-dd`)
        let [, n, r, i, a, o, s] = t.map(Number),
          c = t[7] ? Number((t[7] + `00`).substr(1, 3)) : 0,
          l = Date.UTC(n, r - 1, i, a || 0, o || 0, s || 0, c),
          u = t[8]
        if (u && u !== `Z`) {
          let e = Sn(u, !1)
          ;(Math.abs(e) < 30 && (e *= 60), (l -= 6e4 * e))
        }
        return new Date(l)
      },
      stringify: ({ value: e }) => e?.toISOString().replace(/(T00:00:00)?\.000Z$/, ``) ?? ``,
    },
    Dn = [Nt, It, Lt, Rt, cn, ln, gn, _n, vn, yn, un, dn, fn, en, P, on, rn, xn, wn, Tn, En],
    On = new Map([
      [`core`, Yt],
      [`failsafe`, [Nt, It, Lt]],
      [`json`, $t],
      [`yaml11`, Dn],
      [`yaml-1.1`, Dn],
    ]),
    kn = {
      binary: en,
      bool: zt,
      float: Ht,
      floatExp: Vt,
      floatNaN: Bt,
      floatTime: Tn,
      int: qt,
      intHex: Jt,
      intOct: Kt,
      intTime: wn,
      map: Nt,
      merge: P,
      null: Rt,
      omap: on,
      pairs: rn,
      seq: It,
      set: xn,
      timestamp: En,
    },
    An = {
      "tag:yaml.org,2002:binary": en,
      "tag:yaml.org,2002:merge": P,
      "tag:yaml.org,2002:omap": on,
      "tag:yaml.org,2002:pairs": rn,
      "tag:yaml.org,2002:set": xn,
      "tag:yaml.org,2002:timestamp": En,
    }
  function jn(e, t, n) {
    const r = On.get(t)
    if (r && !e) return n && !r.includes(P) ? r.concat(P) : [...r]
    let i = r
    if (!i) {
      if (Array.isArray(e)) i = []
      else {
        const e = Array.from(On.keys())
          .filter((e) => e !== `yaml11`)
          .map((e) => JSON.stringify(e))
          .join(`, `)
        throw new Error(`Unknown schema "${t}"; use one of ${e} or define customTags array`)
      }
    }
    if (Array.isArray(e)) for (const t of e) i = i.concat(t)
    else typeof e == `function` && (i = e([...i]))
    return (
      n && (i = i.concat(P)),
      i.reduce((e, t) => {
        const n = typeof t == `string` ? kn[t] : t
        if (!n) {
          const e = JSON.stringify(t),
            n = Object.keys(kn)
              .map((e) => JSON.stringify(e))
              .join(`, `)
          throw new Error(`Unknown custom tag ${e}; use one of ${n}`)
        }
        return (e.includes(n) || e.push(n), e)
      }, [])
    )
  }
  const Mn = (e, t) => (e.key < t.key ? -1 : +(e.key > t.key))
  var Nn = class e {
    constructor({
      compat: e,
      customTags: t,
      merge: n,
      resolveKnownTags: r,
      schema: i,
      sortMapEntries: a,
      toStringDefaults: o,
    }) {
      ;((this.compat = Array.isArray(e) ? jn(e, `compat`) : e ? jn(null, e) : null),
        (this.name = (typeof i == `string` && i) || `core`),
        (this.knownTags = r ? An : {}),
        (this.tags = jn(t, this.name, n)),
        (this.toStringOptions = o ?? null),
        Object.defineProperty(this, w, { value: Nt }),
        Object.defineProperty(this, T, { value: Lt }),
        Object.defineProperty(this, Ce, { value: It }),
        (this.sortMapEntries = typeof a == `function` ? a : a === !0 ? Mn : null))
    }
    clone() {
      const t = Object.create(e.prototype, Object.getOwnPropertyDescriptors(this))
      return ((t.tags = [...this.tags]), t)
    }
  }
  function Pn(e, t) {
    let n = [],
      r = t.directives === !0
    if (t.directives !== !1 && e.directives) {
      const t = e.directives.toString(e)
      t ? (n.push(t), (r = !0)) : e.directives.docStart && (r = !0)
    }
    r && n.push(`---`)
    const i = ht(e, t),
      { commentString: a } = i.options
    if (e.commentBefore) {
      n.length !== 1 && n.unshift(``)
      const t = a(e.commentBefore)
      n.unshift(N(t, ``))
    }
    let o = !1,
      s = null
    if (e.contents) {
      if (A(e.contents)) {
        if ((e.contents.spaceBefore && r && n.push(``), e.contents.commentBefore)) {
          const t = a(e.contents.commentBefore)
          n.push(N(t, ``))
        }
        ;((i.forceBlockIndent = Boolean(e.comment)), (s = e.contents.comment))
      }
      let t = s ? void 0 : () => (o = !0),
        c = vt(e.contents, i, () => (s = null), t)
      ;(s && (c += tt(c, ``, a(s))),
        (c[0] === `|` || c[0] === `>`) && n.at(-1) === `---`
          ? (n[n.length - 1] = `--- ${c}`)
          : n.push(c))
    } else n.push(vt(e.contents, i))
    if (e.directives?.docEnd) {
      if (e.comment) {
        const t = a(e.comment)
        t.includes(`
`)
          ? (n.push(`...`), n.push(N(t, ``)))
          : n.push(`... ${t}`)
      } else n.push(`...`)
    } else {
      let t = e.comment
      ;(t && o && (t = t.replace(/^\n+/, ``)),
        t && ((!o || s) && n.at(-1) !== `` && n.push(``), n.push(N(a(t), ``))))
    }
    return `${n.join(`
`)}
`
  }
  const Fn = class e {
    constructor(e, t, n) {
      ;((this.commentBefore = null),
        (this.comment = null),
        (this.errors = []),
        (this.warnings = []),
        Object.defineProperty(this, E, { value: xe }))
      let r = null
      typeof t == `function` || Array.isArray(t)
        ? (r = t)
        : n === void 0 && t && ((n = t), (t = void 0))
      let i = Object.assign(
        {
          intAsBigInt: !1,
          keepSourceTokens: !1,
          logLevel: `warn`,
          prettyErrors: !0,
          strict: !0,
          stringKeys: !1,
          uniqueKeys: !0,
          version: `1.2`,
        },
        n,
      )
      this.options = i
      let { version: a } = i
      ;(n?._directives
        ? ((this.directives = n._directives.atDocument()),
          this.directives.yaml.explicit && (a = this.directives.yaml.version))
        : (this.directives = new ze({ version: a })),
        this.setSchema(a, n),
        (this.contents = e === void 0 ? null : this.createNode(e, r, n)))
    }
    clone() {
      let t = Object.create(e.prototype, { [E]: { value: xe } })
      return (
        (t.commentBefore = this.commentBefore),
        (t.comment = this.comment),
        (t.errors = this.errors.slice()),
        (t.warnings = this.warnings.slice()),
        (t.options = Object.assign({}, this.options)),
        this.directives && (t.directives = this.directives.clone()),
        (t.schema = this.schema.clone()),
        (t.contents = A(this.contents) ? this.contents.clone(t.schema) : this.contents),
        this.range && (t.range = this.range.slice()),
        t
      )
    }
    add(e) {
      In(this.contents) && this.contents.add(e)
    }
    addIn(e, t) {
      In(this.contents) && this.contents.addIn(e, t)
    }
    createAlias(e, t) {
      if (!e.anchor) {
        let n = Ve(this)
        e.anchor = !t || n.has(t) ? He(t || `a`, n) : t
      }
      return new Ke(e.anchor)
    }
    createNode(e, t, n) {
      let r
      if (typeof t == `function`) ((e = t.call({ "": e }, ``, e)), (r = t))
      else if (Array.isArray(t)) {
        let e = t
          .filter((e) => typeof e == `number` || e instanceof String || e instanceof Number)
          .map(String)
        ;(e.length > 0 && (t = t.concat(e)), (r = t))
      } else n === void 0 && t && ((n = t), (t = void 0))
      let {
          aliasDuplicateObjects: i,
          anchorPrefix: a,
          flow: o,
          keepUndefined: s,
          onTagObj: c,
          tag: l,
        } = n ?? {},
        { onAnchor: u, setAnchors: d, sourceObjects: f } = Ue(this, a || `a`),
        p = {
          aliasDuplicateObjects: i ?? !0,
          keepUndefined: s ?? !1,
          onAnchor: u,
          onTagObj: c,
          replacer: r,
          schema: this.schema,
          sourceObjects: f,
        },
        m = Xe(e, l, p)
      return (o && k(m) && (m.flow = !0), d(), m)
    }
    createPair(e, t, n = {}) {
      return new F(this.createNode(e, null, n), this.createNode(t, null, n))
    }
    delete(e) {
      return In(this.contents) ? this.contents.delete(e) : !1
    }
    deleteIn(e) {
      return Qe(e)
        ? this.contents != null && ((this.contents = null), !0)
        : In(this.contents)
          ? this.contents.deleteIn(e)
          : !1
    }
    get(e, t) {
      return k(this.contents) ? this.contents.get(e, t) : void 0
    }
    getIn(e, t) {
      return Qe(e)
        ? !t && O(this.contents)
          ? this.contents.value
          : this.contents
        : k(this.contents)
          ? this.contents.getIn(e, t)
          : void 0
    }
    has(e) {
      return k(this.contents) ? this.contents.has(e) : !1
    }
    hasIn(e) {
      return Qe(e) ? this.contents !== void 0 : k(this.contents) ? this.contents.hasIn(e) : !1
    }
    set(e, t) {
      this.contents == null
        ? (this.contents = Ze(this.schema, [e], t))
        : In(this.contents) && this.contents.set(e, t)
    }
    setIn(e, t) {
      Qe(e)
        ? (this.contents = t)
        : this.contents == null
          ? (this.contents = Ze(this.schema, Array.from(e), t))
          : In(this.contents) && this.contents.setIn(e, t)
    }
    setSchema(e, t = {}) {
      typeof e == `number` && (e = String(e))
      let n
      switch (e) {
        case `1.1`:
          ;(this.directives
            ? (this.directives.yaml.version = `1.1`)
            : (this.directives = new ze({ version: `1.1` })),
            (n = { resolveKnownTags: !1, schema: `yaml-1.1` }))
          break
        case `1.2`:
        case `next`:
          ;(this.directives
            ? (this.directives.yaml.version = e)
            : (this.directives = new ze({ version: e })),
            (n = { resolveKnownTags: !0, schema: `core` }))
          break
        case null:
          ;(this.directives && delete this.directives, (n = null))
          break
        default: {
          let t = JSON.stringify(e)
          throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${t}`)
        }
      }
      if (t.schema instanceof Object) this.schema = t.schema
      else if (n) this.schema = new Nn(Object.assign(n, t))
      else throw Error(`With a null YAML version, the { schema: Schema } option is required`)
    }
    toJS({ json: e, jsonArg: t, mapAsMap: n, maxAliasCount: r, onAnchor: i, reviver: a } = {}) {
      let o = {
          anchors: new Map(),
          doc: this,
          keep: !e,
          mapAsMap: n === !0,
          mapKeyWarned: !1,
          maxAliasCount: typeof r == `number` ? r : 100,
        },
        s = j(this.contents, t ?? ``, o)
      if (typeof i == `function`) for (let { count: e, res: t } of o.anchors.values()) i(t, e)
      return typeof a == `function` ? We(a, { "": s }, ``, s) : s
    }
    toJSON(e, t) {
      return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t })
    }
    toString(e = {}) {
      if (this.errors.length > 0) throw Error(`Document with errors cannot be stringified`)
      if (`indent` in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
        let t = JSON.stringify(e.indent)
        throw Error(`"indent" option must be a positive integer, not ${t}`)
      }
      return Pn(this, e)
    }
  }
  function In(e) {
    if (k(e)) return !0
    throw new Error(`Expected a YAML collection as document contents`)
  }
  const Ln = class extends Error {
      constructor(e, t, n, r) {
        ;(super(), (this.name = e), (this.code = n), (this.message = r), (this.pos = t))
      }
    },
    Rn = class extends Ln {
      constructor(e, t, n) {
        super(`YAMLParseError`, e, t, n)
      }
    },
    zn = class extends Ln {
      constructor(e, t, n) {
        super(`YAMLWarning`, e, t, n)
      }
    }
  let Bn = (e, t) => (n) => {
    if (n.pos[0] === -1) return
    n.linePos = n.pos.map((e) => t.linePos(e))
    const { line: r, col: i } = n.linePos[0]
    n.message += ` at line ${r}, column ${i}`
    let a = i - 1,
      o = e.substring(t.lineStarts[r - 1], t.lineStarts[r]).replace(/[\n\r]+$/, ``)
    if (a >= 60 && o.length > 80) {
      const e = Math.min(a - 39, o.length - 79)
      ;((o = `…${o.substring(e)}`), (a -= e - 1))
    }
    if (
      (o.length > 80 && (o = `${o.substring(0, 79)}…`), r > 1 && /^ *$/.test(o.substring(0, a)))
    ) {
      let n = e.substring(t.lineStarts[r - 2], t.lineStarts[r - 1])
      ;(n.length > 80 &&
        (n = `${n.substring(0, 79)}…
`),
        (o = n + o))
    }
    if (/[^ ]/.test(o)) {
      const e = 1,
        t = n.linePos[1]
      t?.line === r && t.col > i && (e = Math.max(1, Math.min(t.col - i, 80 - a)))
      const s = ` `.repeat(a) + `^`.repeat(e)
      n.message += `:\n\n${o}\n${s}\n`
    }
  }
  function Vn(
    e,
    { flow: t, indicator: n, next: r, offset: i, onError: a, parentIndent: o, startOnNewline: s },
  ) {
    let c = !1,
      l = s,
      u = s,
      d = ``,
      f = ``,
      p = !1,
      m = !1,
      h = null,
      g = null,
      _ = null,
      v = null,
      y = null,
      b = null,
      x = null
    for (const i of e)
      switch (
        ((m &&=
          (i.type !== `space` &&
            i.type !== `newline` &&
            i.type !== `comma` &&
            a(
              i.offset,
              `MISSING_CHAR`,
              `Tags and anchors must be separated from the next token by white space`,
            ),
          !1)),
        (h &&=
          (l &&
            i.type !== `comment` &&
            i.type !== `newline` &&
            a(h, `TAB_AS_INDENT`, `Tabs are not allowed as indentation`),
          null)),
        i.type)
      ) {
        case `space`:
          ;(!t &&
            (n !== `doc-start` || r?.type !== `flow-collection`) &&
            i.source.includes(`	`) &&
            (h = i),
            (u = !0))
          break
        case `comment`: {
          u ||
            a(
              i,
              `MISSING_CHAR`,
              `Comments must be separated from other tokens by white space characters`,
            )
          const e = i.source.substring(1) || ` `
          ;(d ? (d += f + e) : (d = e), (f = ``), (l = !1))
          break
        }
        case `newline`:
          ;(l ? (d ? (d += i.source) : (!b || n !== `seq-item-ind`) && (c = !0)) : (f += i.source),
            (l = !0),
            (p = !0),
            (g || _) && (v = i),
            (u = !0))
          break
        case `anchor`:
          ;(g && a(i, `MULTIPLE_ANCHORS`, `A node can have at most one anchor`),
            i.source.endsWith(`:`) &&
              a(i.offset + i.source.length - 1, `BAD_ALIAS`, `Anchor ending in : is ambiguous`, !0),
            (g = i),
            (x ??= i.offset),
            (l = !1),
            (u = !1),
            (m = !0))
          break
        case `tag`:
          ;(_ && a(i, `MULTIPLE_TAGS`, `A node can have at most one tag`),
            (_ = i),
            (x ??= i.offset),
            (l = !1),
            (u = !1),
            (m = !0))
          break
        case n:
          ;((g || _) &&
            a(i, `BAD_PROP_ORDER`, `Anchors and tags must be after the ${i.source} indicator`),
            b && a(i, `UNEXPECTED_TOKEN`, `Unexpected ${i.source} in ${t ?? `collection`}`),
            (b = i),
            (l = n === `seq-item-ind` || n === `explicit-key-ind`),
            (u = !1))
          break
        case `comma`:
          if (t) {
            ;(y && a(i, `UNEXPECTED_TOKEN`, `Unexpected , in ${t}`), (y = i), (l = !1), (u = !1))
            break
          }
        default:
          ;(a(i, `UNEXPECTED_TOKEN`, `Unexpected ${i.type} token`), (l = !1), (u = !1))
      }
    const S = e[e.length - 1],
      ee = S ? S.offset + S.source.length : i
    return (
      m &&
        r &&
        r.type !== `space` &&
        r.type !== `newline` &&
        r.type !== `comma` &&
        (r.type !== `scalar` || r.source !== ``) &&
        a(
          r.offset,
          `MISSING_CHAR`,
          `Tags and anchors must be separated from the next token by white space`,
        ),
      h &&
        ((l && h.indent <= o) || r?.type === `block-map` || r?.type === `block-seq`) &&
        a(h, `TAB_AS_INDENT`, `Tabs are not allowed as indentation`),
      {
        comma: y,
        found: b,
        spaceBefore: c,
        comment: d,
        hasNewline: p,
        anchor: g,
        tag: _,
        newlineAfterProp: v,
        end: ee,
        start: x ?? ee,
      }
    )
  }
  function Hn(e) {
    if (!e) return null
    switch (e.type) {
      case `alias`:
      case `scalar`:
      case `double-quoted-scalar`:
      case `single-quoted-scalar`:
        if (
          e.source.includes(`
`)
        )
          return !0
        if (e.end) {
          for (const t of e.end) if (t.type === `newline`) return !0
        }
        return !1
      case `flow-collection`:
        for (const t of e.items) {
          for (const e of t.start) if (e.type === `newline`) return !0
          if (t.sep) {
            for (const e of t.sep) if (e.type === `newline`) return !0
          }
          if (Hn(t.key) || Hn(t.value)) return !0
        }
        return !1
      default:
        return !0
    }
  }
  function Un(e, t, n) {
    if (t?.type === `flow-collection`) {
      const r = t.end[0]
      r.indent === e &&
        (r.source === `]` || r.source === `}`) &&
        Hn(t) &&
        n(r, `BAD_INDENT`, `Flow end indicator should be more indented than parent`, !0)
    }
  }
  function Wn(e, t, n) {
    const { uniqueKeys: r } = e.options
    if (r === !1) return !1
    const i =
      typeof r == `function` ? r : (e, t) => e === t || (O(e) && O(t) && e.value === t.value)
    return t.some((e) => i(e.key, n))
  }
  const Gn = `All mapping items must start at the same column`
  function Kn({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
    const o = new (a?.nodeClass ?? I)(n.schema)
    n.atRoot &&= !1
    let s = r.offset,
      c = null
    for (const a of r.items) {
      const { start: l, key: u, sep: d, value: f } = a,
        p = Vn(l, {
          indicator: `explicit-key-ind`,
          next: u ?? d?.[0],
          offset: s,
          onError: i,
          parentIndent: r.indent,
          startOnNewline: !0,
        }),
        m = !p.found
      if (m) {
        if (
          (u &&
            (u.type === `block-seq`
              ? i(
                  s,
                  `BLOCK_AS_IMPLICIT_KEY`,
                  `A block sequence may not be used as an implicit map key`,
                )
              : `indent` in u && u.indent !== r.indent && i(s, `BAD_INDENT`, Gn)),
          !p.anchor && !p.tag && !d)
        ) {
          ;((c = p.end),
            p.comment &&
              (o.comment
                ? (o.comment += `
${p.comment}`)
                : (o.comment = p.comment)))
          continue
        }
        ;(p.newlineAfterProp || Hn(u)) &&
          i(u ?? l.at(-1), `MULTILINE_IMPLICIT_KEY`, `Implicit keys need to be on a single line`)
      } else p.found?.indent !== r.indent && i(s, `BAD_INDENT`, Gn)
      n.atKey = !0
      const h = p.end,
        g = u ? e(n, u, p, i) : t(n, h, l, null, p, i)
      ;(n.schema.compat && Un(r.indent, u, i),
        (n.atKey = !1),
        Wn(n, o.items, g) && i(h, `DUPLICATE_KEY`, `Map keys must be unique`))
      const _ = Vn(d ?? [], {
        indicator: `map-value-ind`,
        next: f,
        offset: g.range[2],
        onError: i,
        parentIndent: r.indent,
        startOnNewline: !u || u.type === `block-scalar`,
      })
      if (((s = _.end), _.found)) {
        m &&
          (f?.type === `block-map` &&
            !_.hasNewline &&
            i(s, `BLOCK_AS_IMPLICIT_KEY`, `Nested mappings are not allowed in compact mappings`),
          n.options.strict &&
            p.start < _.found.offset - 1024 &&
            i(
              g.range,
              `KEY_OVER_1024_CHARS`,
              `The : indicator must be at most 1024 chars after the start of an implicit block mapping key`,
            ))
        const c = f ? e(n, f, _, i) : t(n, s, d, null, _, i)
        ;(n.schema.compat && Un(r.indent, f, i), (s = c.range[2]))
        const l = new F(g, c)
        ;(n.options.keepSourceTokens && (l.srcToken = a), o.items.push(l))
      } else {
        ;(m && i(g.range, `MISSING_CHAR`, `Implicit map keys need to be followed by map values`),
          _.comment &&
            (g.comment
              ? (g.comment += `
${_.comment}`)
              : (g.comment = _.comment)))
        const e = new F(g)
        ;(n.options.keepSourceTokens && (e.srcToken = a), o.items.push(e))
      }
    }
    return (
      c && c < s && i(c, `IMPOSSIBLE`, `Map comment with trailing content`),
      (o.range = [r.offset, s, c ?? s]),
      o
    )
  }
  function qn({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
    const o = new (a?.nodeClass ?? Pt)(n.schema)
    ;((n.atRoot &&= !1), (n.atKey &&= !1))
    let s = r.offset,
      c = null
    for (const { start: a, value: l } of r.items) {
      const u = Vn(a, {
        indicator: `seq-item-ind`,
        next: l,
        offset: s,
        onError: i,
        parentIndent: r.indent,
        startOnNewline: !0,
      })
      if (!u.found) {
        if (u.anchor || u.tag || l)
          l?.type === `block-seq`
            ? i(u.end, `BAD_INDENT`, `All sequence items must start at the same column`)
            : i(s, `MISSING_CHAR`, `Sequence item without - indicator`)
        else {
          ;((c = u.end), u.comment && (o.comment = u.comment))
          continue
        }
      }
      const d = l ? e(n, l, u, i) : t(n, u.end, a, null, u, i)
      ;(n.schema.compat && Un(r.indent, l, i), (s = d.range[2]), o.items.push(d))
    }
    return ((o.range = [r.offset, s, c ?? s]), o)
  }
  function Jn(e, t, n, r) {
    let i = ``
    if (e) {
      let a = !1,
        o = ``
      for (const s of e) {
        const { source: e, type: c } = s
        switch (c) {
          case `space`:
            a = !0
            break
          case `comment`: {
            n &&
              !a &&
              r(
                s,
                `MISSING_CHAR`,
                `Comments must be separated from other tokens by white space characters`,
              )
            const t = e.substring(1) || ` `
            ;(i ? (i += o + t) : (i = t), (o = ``))
            break
          }
          case `newline`:
            ;(i && (o += e), (a = !0))
            break
          default:
            r(s, `UNEXPECTED_TOKEN`, `Unexpected ${c} at node end`)
        }
        t += e.length
      }
    }
    return { comment: i, offset: t }
  }
  const Yn = `Block collections are not allowed within flow collections`,
    Xn = (e) => e && (e.type === `block-map` || e.type === `block-seq`)
  function Zn({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
    const o = r.start.source === `{`,
      s = o ? `flow map` : `flow sequence`,
      c = new (a?.nodeClass ?? (o ? I : Pt))(n.schema)
    c.flow = !0
    const l = n.atRoot
    ;(l && (n.atRoot = !1), (n.atKey &&= !1))
    let u = r.offset + r.start.source.length
    for (let a = 0; a < r.items.length; ++a) {
      const l = r.items[a],
        { start: d, key: f, sep: p, value: m } = l,
        h = Vn(d, {
          flow: s,
          indicator: `explicit-key-ind`,
          next: f ?? p?.[0],
          offset: u,
          onError: i,
          parentIndent: r.indent,
          startOnNewline: !1,
        })
      if (!h.found) {
        if (!h.anchor && !h.tag && !p && !m) {
          ;(a === 0 && h.comma
            ? i(h.comma, `UNEXPECTED_TOKEN`, `Unexpected , in ${s}`)
            : a < r.items.length - 1 &&
              i(h.start, `UNEXPECTED_TOKEN`, `Unexpected empty item in ${s}`),
            h.comment &&
              (c.comment
                ? (c.comment += `
${h.comment}`)
                : (c.comment = h.comment)),
            (u = h.end))
          continue
        }
        !o &&
          n.options.strict &&
          Hn(f) &&
          i(
            f,
            `MULTILINE_IMPLICIT_KEY`,
            `Implicit keys of flow sequence pairs need to be on a single line`,
          )
      }
      if (a === 0) h.comma && i(h.comma, `UNEXPECTED_TOKEN`, `Unexpected , in ${s}`)
      else if ((h.comma || i(h.start, `MISSING_CHAR`, `Missing , between ${s} items`), h.comment)) {
        let e = ``
        loop: for (const t of d)
          switch (t.type) {
            case `comma`:
            case `space`:
              break
            case `comment`:
              e = t.source.slice(1)
              break loop
            default:
              break loop
          }
        if (e) {
          let t = c.items.at(-1)
          ;(D(t) && (t = t.value ?? t.key),
            t.comment
              ? (t.comment += `
${e}`)
              : (t.comment = e),
            (h.comment = h.comment.substring(e.length + 1)))
        }
      }
      if (!o && !p && !h.found) {
        const r = m ? e(n, m, h, i) : t(n, h.end, p, null, h, i)
        ;(c.items.push(r), (u = r.range[2]), Xn(m) && i(r.range, `BLOCK_IN_FLOW`, Yn))
      } else {
        n.atKey = !0
        const a = h.end,
          g = f ? e(n, f, h, i) : t(n, a, d, null, h, i)
        ;(Xn(f) && i(g.range, `BLOCK_IN_FLOW`, Yn), (n.atKey = !1))
        const _ = Vn(p ?? [], {
          flow: s,
          indicator: `map-value-ind`,
          next: m,
          offset: g.range[2],
          onError: i,
          parentIndent: r.indent,
          startOnNewline: !1,
        })
        if (_.found) {
          if (!o && !h.found && n.options.strict) {
            if (p)
              for (const e of p) {
                if (e === _.found) break
                if (e.type === `newline`) {
                  i(
                    e,
                    `MULTILINE_IMPLICIT_KEY`,
                    `Implicit keys of flow sequence pairs need to be on a single line`,
                  )
                  break
                }
              }
            h.start < _.found.offset - 1024 &&
              i(
                _.found,
                `KEY_OVER_1024_CHARS`,
                `The : indicator must be at most 1024 chars after the start of an implicit flow sequence key`,
              )
          }
        } else
          m &&
            (`source` in m && m.source?.[0] === `:`
              ? i(m, `MISSING_CHAR`, `Missing space after : in ${s}`)
              : i(_.start, `MISSING_CHAR`, `Missing , or : between ${s} items`))
        const v = m ? e(n, m, _, i) : _.found ? t(n, _.end, p, null, _, i) : null
        v
          ? Xn(m) && i(v.range, `BLOCK_IN_FLOW`, Yn)
          : _.comment &&
            (g.comment
              ? (g.comment += `
${_.comment}`)
              : (g.comment = _.comment))
        const y = new F(g, v)
        if ((n.options.keepSourceTokens && (y.srcToken = l), o)) {
          const e = c
          ;(Wn(n, e.items, g) && i(a, `DUPLICATE_KEY`, `Map keys must be unique`), e.items.push(y))
        } else {
          const e = new I(n.schema)
          ;((e.flow = !0), e.items.push(y))
          const t = (v ?? g).range
          ;((e.range = [g.range[0], t[1], t[2]]), c.items.push(e))
        }
        u = v ? v.range[2] : _.end
      }
    }
    let d = o ? `}` : `]`,
      [f, ...p] = r.end,
      m = u
    if (f?.source === d) m = f.offset + f.source.length
    else {
      const e = s[0].toUpperCase() + s.substring(1),
        t = l
          ? `${e} must end with a ${d}`
          : `${e} in block collection must be sufficiently indented and end with a ${d}`
      ;(i(u, l ? `MISSING_CHAR` : `BAD_INDENT`, t), f && f.source.length !== 1 && p.unshift(f))
    }
    if (p.length > 0) {
      const e = Jn(p, m, n.options.strict, i)
      ;(e.comment &&
        (c.comment
          ? (c.comment += `
${e.comment}`)
          : (c.comment = e.comment)),
        (c.range = [r.offset, m, e.offset]))
    } else c.range = [r.offset, m, m]
    return c
  }
  function Qn(e, t, n, r, i, a) {
    const o =
        n.type === `block-map`
          ? Kn(e, t, n, r, a)
          : n.type === `block-seq`
            ? qn(e, t, n, r, a)
            : Zn(e, t, n, r, a),
      s = o.constructor
    return i === `!` || i === s.tagName ? ((o.tag = s.tagName), o) : (i && (o.tag = i), o)
  }
  function $n(e, t, n, r, i) {
    const a = r.tag,
      o = a ? t.directives.tagName(a.source, (e) => i(a, `TAG_RESOLVE_FAILED`, e)) : null
    if (n.type === `block-seq`) {
      const { anchor: e, newlineAfterProp: t } = r,
        n = e && a ? (e.offset > a.offset ? e : a) : (e ?? a)
      n &&
        (!t || t.offset < n.offset) &&
        i(n, `MISSING_CHAR`, `Missing newline after block sequence props`)
    }
    const s =
      n.type === `block-map`
        ? `map`
        : n.type === `block-seq`
          ? `seq`
          : n.start.source === `{`
            ? `map`
            : `seq`
    if (
      !a ||
      !o ||
      o === `!` ||
      (o === I.tagName && s === `map`) ||
      (o === Pt.tagName && s === `seq`)
    )
      return Qn(e, t, n, i, o)
    let c = t.schema.tags.find((e) => e.tag === o && e.collection === s)
    if (!c) {
      const r = t.schema.knownTags[o]
      if (r?.collection === s) (t.schema.tags.push({ ...r, default: !1 }), (c = r))
      else
        return (
          r
            ? i(
                a,
                `BAD_COLLECTION_TYPE`,
                `${r.tag} used for ${s} collection, but expects ${r.collection ?? `scalar`}`,
                !0,
              )
            : i(a, `TAG_RESOLVE_FAILED`, `Unresolved tag: ${o}`, !0),
          Qn(e, t, n, i, o)
        )
    }
    const l = Qn(e, t, n, i, o, c),
      u = c.resolve?.(l, (e) => i(a, `TAG_RESOLVE_FAILED`, e), t.options) ?? l,
      d = A(u) ? u : new M(u)
    return ((d.range = l.range), (d.tag = o), c?.format && (d.format = c.format), d)
  }
  function er(e, t, n) {
    const r = t.offset,
      i = tr(t, e.options.strict, n)
    if (!i) return { value: ``, type: null, comment: ``, range: [r, r, r] }
    let a = i.mode === `>` ? M.BLOCK_FOLDED : M.BLOCK_LITERAL,
      o = t.source ? nr(t.source) : [],
      s = o.length
    for (let e = o.length - 1; e >= 0; --e) {
      const t = o[e][1]
      if (t === `` || t === `\r`) s = e
      else break
    }
    if (s === 0) {
      let e =
          i.chomp === `+` && o.length > 0
            ? `
`.repeat(Math.max(1, o.length - 1))
            : ``,
        n = r + i.length
      return (
        t.source && (n += t.source.length),
        { value: e, type: a, comment: i.comment, range: [r, n, n] }
      )
    }
    let c = t.indent + i.indent,
      l = t.offset + i.length,
      u = 0
    for (let t = 0; t < s; ++t) {
      const [r, a] = o[t]
      if (a === `` || a === `\r`) i.indent === 0 && r.length > c && (c = r.length)
      else {
        ;(r.length < c &&
          n(
            l + r.length,
            `MISSING_CHAR`,
            `Block scalars with more-indented leading empty lines must use an explicit indentation indicator`,
          ),
          i.indent === 0 && (c = r.length),
          (u = t),
          c === 0 &&
            !e.atRoot &&
            n(l, `BAD_INDENT`, `Block scalar values in collections must be indented`))
        break
      }
      l += r.length + a.length + 1
    }
    for (let e = o.length - 1; e >= s; --e) o[e][0].length > c && (s = e + 1)
    let d = ``,
      f = ``,
      p = !1
    for (let e = 0; e < u; ++e)
      d += `${o[e][0].slice(c)}
`
    for (let e = u; e < s; ++e) {
      let [t, r] = o[e]
      l += t.length + r.length + 1
      const s = r[r.length - 1] === `\r`
      if ((s && (r = r.slice(0, -1)), r && t.length < c)) {
        const e = `Block scalar lines must not be less indented than their ${i.indent ? `explicit indentation indicator` : `first line`}`
        ;(n(l - r.length - (s ? 2 : 1), `BAD_INDENT`, e), (t = ``))
      }
      a === M.BLOCK_LITERAL
        ? ((d += f + t.slice(c) + r),
          (f = `
`))
        : t.length > c || r[0] === `	`
          ? (f === ` `
              ? (f = `
`)
              : !p &&
                f ===
                  `
` &&
                (f = `

`),
            (d += f + t.slice(c) + r),
            (f = `
`),
            (p = !0))
          : r === ``
            ? f ===
              `
`
              ? (d += `
`)
              : (f = `
`)
            : ((d += f + r), (f = ` `), (p = !1))
    }
    switch (i.chomp) {
      case `-`:
        break
      case `+`:
        for (let e = s; e < o.length; ++e)
          d += `
${o[e][0].slice(c)}`
        d.at(-1) !==
          `
` &&
          (d += `
`)
        break
      default:
        d += `
`
    }
    const m = r + i.length + t.source.length
    return { value: d, type: a, comment: i.comment, range: [r, m, m] }
  }
  function tr({ offset: e, props: t }, n, r) {
    if (t[0].type !== `block-scalar-header`)
      return (r(t[0], `IMPOSSIBLE`, `Block scalar header not found`), null)
    let { source: i } = t[0],
      a = i[0],
      o = 0,
      s = ``,
      c = -1
    for (let t = 1; t < i.length; ++t) {
      const n = i[t]
      if (!s && (n === `-` || n === `+`)) s = n
      else {
        const r = Number(n)
        !o && r ? (o = r) : c === -1 && (c = e + t)
      }
    }
    c !== -1 && r(c, `UNEXPECTED_TOKEN`, `Block scalar header includes extra characters: ${i}`)
    let l = !1,
      u = ``,
      d = i.length
    for (let e = 1; e < t.length; ++e) {
      const i = t[e]
      switch (i.type) {
        case `space`:
          l = !0
        case `newline`:
          d += i.source.length
          break
        case `comment`:
          ;(n &&
            !l &&
            r(
              i,
              `MISSING_CHAR`,
              `Comments must be separated from other tokens by white space characters`,
            ),
            (d += i.source.length),
            (u = i.source.slice(1)))
          break
        case `error`:
          ;(r(i, `UNEXPECTED_TOKEN`, i.message), (d += i.source.length))
          break
        default: {
          r(i, `UNEXPECTED_TOKEN`, `Unexpected token in block scalar header: ${i.type}`)
          const e = i.source
          e && typeof e == `string` && (d += e.length)
        }
      }
    }
    return { mode: a, indent: o, chomp: s, comment: u, length: d }
  }
  function nr(e) {
    const t = e.split(/\n( *)/),
      n = t[0],
      r = n.match(/^( *)/),
      i = [r?.[1] ? [r[1], n.slice(r[1].length)] : [``, n]]
    for (let e = 1; e < t.length; e += 2) i.push([t[e], t[e + 1]])
    return i
  }
  function rr(e, t, n) {
    let { offset: r, type: i, source: a, end: o } = e,
      s,
      c,
      l = (e, t, i) => n(r + e, t, i)
    switch (i) {
      case `scalar`:
        ;((s = M.PLAIN), (c = ir(a, l)))
        break
      case `single-quoted-scalar`:
        ;((s = M.QUOTE_SINGLE), (c = ar(a, l)))
        break
      case `double-quoted-scalar`:
        ;((s = M.QUOTE_DOUBLE), (c = sr(a, l)))
        break
      default:
        return (
          n(e, `UNEXPECTED_TOKEN`, `Expected a flow scalar value, but found: ${i}`),
          { value: ``, type: null, comment: ``, range: [r, r + a.length, r + a.length] }
        )
    }
    const u = r + a.length,
      d = Jn(o, u, t, n)
    return { value: c, type: s, comment: d.comment, range: [r, u, d.offset] }
  }
  function ir(e, t) {
    let n = ``
    switch (e[0]) {
      case `	`:
        n = `a tab character`
        break
      case `,`:
        n = `flow indicator character ,`
        break
      case `%`:
        n = `directive indicator character %`
        break
      case `|`:
      case `>`:
        n = `block scalar indicator ${e[0]}`
        break
      case `@`:
      case "`":
        n = `reserved character ${e[0]}`
    }
    return (n && t(0, `BAD_SCALAR_START`, `Plain value cannot start with ${n}`), or(e))
  }
  function ar(e, t) {
    return (
      (e.at(-1) !== `'` || e.length === 1) && t(e.length, `MISSING_CHAR`, `Missing closing 'quote`),
      or(e.slice(1, -1)).replaceAll("''", `'`)
    )
  }
  function or(e) {
    let t, n
    try {
      ;((t = RegExp(
        `(.*?)(?<![ 	])[ 	]*\r?
`,
        `sy`,
      )),
        (n = RegExp(
          `[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,
          `sy`,
        )))
    } catch {
      ;((t = /(.*?)[ \t]*\r?\n/sy), (n = /[ \t]*(.*?)[ \t]*\r?\n/sy))
    }
    let r = t.exec(e)
    if (!r) return e
    let i = r[1],
      a = ` `,
      o = t.lastIndex
    for (n.lastIndex = o; (r = n.exec(e));)
      (r[1] === ``
        ? a ===
          `
`
          ? (i += a)
          : (a = `
`)
        : ((i += a + r[1]), (a = ` `)),
        (o = n.lastIndex))
    const s = /[ \t]*(.*)/sy
    return ((s.lastIndex = o), (r = s.exec(e)), i + a + (r?.[1] ?? ``))
  }
  function sr(e, t) {
    let n = ``
    for (let r = 1; r < e.length - 1; ++r) {
      const i = e[r]
      if (
        i !== `\r` ||
        e[r + 1] !==
          `
`
      ) {
        if (
          i ===
          `
`
        ) {
          const { fold: t, offset: i } = cr(e, r)
          ;((n += t), (r = i))
        } else if (i === `\\`) {
          const i = e[++r],
            a = lr[i]
          if (a) n += a
          else if (
            i ===
            `
`
          )
            for (i = e[r + 1]; i === ` ` || i === `	`;) i = e[++r + 1]
          else if (
            i === `\r` &&
            e[r + 1] ===
              `
`
          )
            for (i = e[++r + 1]; i === ` ` || i === `	`;) i = e[++r + 1]
          else if (i === `x` || i === `u` || i === `U`) {
            const a = i === `x` ? 2 : i === `u` ? 4 : 8
            ;((n += ur(e, r + 1, a, t)), (r += a))
          } else {
            const i = e.substr(r - 1, 2)
            ;(t(r - 1, `BAD_DQ_ESCAPE`, `Invalid escape sequence ${i}`), (n += i))
          }
        } else if (i === ` ` || i === `	`) {
          let t = r,
            a = e[r + 1]
          for (; a === ` ` || a === `	`;) a = e[++r + 1]
          a !==
            `
` &&
            (a !== `\r` ||
              e[r + 2] !==
                `
`) &&
            (n += r > t ? e.slice(t, r + 1) : i)
        } else n += i
      }
    }
    return (
      (e.at(-1) !== `"` || e.length === 1) && t(e.length, `MISSING_CHAR`, `Missing closing "quote`),
      n
    )
  }
  function cr(e, t) {
    let n = ``,
      r = e[t + 1]
    for (
      ;
      (r === ` ` ||
        r === `	` ||
        r ===
          `
` ||
        r === `\r`) &&
      (r !== `\r` ||
        e[t + 2] ===
          `
`);
    )
      (r ===
        `
` &&
        (n += `
`),
        (t += 1),
        (r = e[t + 1]))
    return ((n ||= ` `), { fold: n, offset: t })
  }
  const lr = {
    "0": `\0`,
    "a": `\x07`,
    "b": `\b`,
    "e": `\x1B`,
    "f": `\f`,
    "n": `
`,
    "r": `\r`,
    "t": `	`,
    "v": `\v`,
    "N": ``,
    "_": `\xA0`,
    "L": `\u2028`,
    "P": `\u2029`,
    " ": ` `,
    '"': `"`,
    "/": `/`,
    "\\": `\\`,
    "	": `	`,
  }
  function ur(e, t, n, r) {
    const i = e.substr(t, n),
      a = i.length === n && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN
    try {
      return String.fromCodePoint(a)
    } catch {
      const i = e.substr(t - 2, n + 2)
      return (r(t - 2, `BAD_DQ_ESCAPE`, `Invalid escape sequence ${i}`), i)
    }
  }
  function dr(e, t, n, r) {
    let {
        value: i,
        type: a,
        comment: o,
        range: s,
      } = t.type === `block-scalar` ? er(e, t, r) : rr(t, e.options.strict, r),
      c = n ? e.directives.tagName(n.source, (e) => r(n, `TAG_RESOLVE_FAILED`, e)) : null,
      l
    l =
      e.options.stringKeys && e.atKey
        ? e.schema[T]
        : c
          ? fr(e.schema, i, c, n, r)
          : t.type === `scalar`
            ? pr(e, i, t, r)
            : e.schema[T]
    let u
    try {
      const a = l.resolve(i, (e) => r(n ?? t, `TAG_RESOLVE_FAILED`, e), e.options)
      u = O(a) ? a : new M(a)
    } catch (error) {
      let a = error instanceof Error ? error.message : String(error)
      ;(r(n ?? t, `TAG_RESOLVE_FAILED`, a), (u = new M(i)))
    }
    return (
      (u.range = s),
      (u.source = i),
      a && (u.type = a),
      c && (u.tag = c),
      l.format && (u.format = l.format),
      o && (u.comment = o),
      u
    )
  }
  function fr(e, t, n, r, i) {
    if (n === `!`) return e[T]
    const a = []
    for (const t of e.tags)
      if (!t.collection && t.tag === n) {
        if (t.default && t.test) a.push(t)
        else return t
      }
    for (const e of a) if (e.test?.test(t)) return e
    const o = e.knownTags[n]
    return o && !o.collection
      ? (e.tags.push({ ...o, default: !1, test: void 0 }), o)
      : (i(r, `TAG_RESOLVE_FAILED`, `Unresolved tag: ${n}`, n !== `tag:yaml.org,2002:str`), e[T])
  }
  function pr({ atKey: e, directives: t, schema: n }, r, i, a) {
    const o =
      n.tags.find((t) => (t.default === !0 || (e && t.default === `key`)) && t.test?.test(r)) ||
      n[T]
    if (n.compat) {
      const e = n.compat.find((e) => e.default && e.test?.test(r)) ?? n[T]
      o.tag !== e.tag &&
        a(
          i,
          `TAG_RESOLVE_FAILED`,
          `Value may be parsed as either ${t.tagString(o.tag)} or ${t.tagString(e.tag)}`,
          !0,
        )
    }
    return o
  }
  function mr(e, t, n) {
    if (t) {
      n ??= t.length
      for (let r = n - 1; r >= 0; --r) {
        let n = t[r]
        switch (n.type) {
          case `space`:
          case `comment`:
          case `newline`:
            e -= n.source.length
            continue
        }
        for (n = t[++r]; n?.type === `space`;) ((e += n.source.length), (n = t[++r]))
        break
      }
    }
    return e
  }
  const hr = { composeNode: gr, composeEmptyNode: _r }
  function gr(e, t, n, r) {
    let i = e.atKey,
      { spaceBefore: a, comment: o, anchor: s, tag: c } = n,
      l,
      u = !0
    switch (t.type) {
      case `alias`:
        ;((l = vr(e, t, r)),
          (s || c) && r(t, `ALIAS_PROPS`, `An alias node must not specify any properties`))
        break
      case `scalar`:
      case `single-quoted-scalar`:
      case `double-quoted-scalar`:
      case `block-scalar`:
        ;((l = dr(e, t, c, r)), s && (l.anchor = s.source.slice(1)))
        break
      case `block-map`:
      case `block-seq`:
      case `flow-collection`:
        try {
          ;((l = $n(hr, e, t, n, r)), s && (l.anchor = s.source.slice(1)))
        } catch (error) {
          r(t, `RESOURCE_EXHAUSTION`, error instanceof Error ? error.message : String(error))
        }
        break
      default:
        ;(r(
          t,
          `UNEXPECTED_TOKEN`,
          t.type === `error` ? t.message : `Unsupported token (type: ${t.type})`,
        ),
          (u = !1))
    }
    return (
      (l ??= _r(e, t.offset, void 0, null, n, r)),
      s && l.anchor === `` && r(s, `BAD_ALIAS`, `Anchor cannot be an empty string`),
      i &&
        e.options.stringKeys &&
        (!O(l) || typeof l.value != `string` || (l.tag && l.tag !== `tag:yaml.org,2002:str`)) &&
        r(c ?? t, `NON_STRING_KEY`, `With stringKeys, all keys must be strings`),
      a && (l.spaceBefore = !0),
      o && (t.type === `scalar` && t.source === `` ? (l.comment = o) : (l.commentBefore = o)),
      e.options.keepSourceTokens && u && (l.srcToken = t),
      l
    )
  }
  function _r(e, t, n, r, { spaceBefore: i, comment: a, anchor: o, tag: s, end: c }, l) {
    const u = dr(e, { type: `scalar`, offset: mr(t, n, r), indent: -1, source: `` }, s, l)
    return (
      o &&
        ((u.anchor = o.source.slice(1)),
        u.anchor === `` && l(o, `BAD_ALIAS`, `Anchor cannot be an empty string`)),
      i && (u.spaceBefore = !0),
      a && ((u.comment = a), (u.range[2] = c)),
      u
    )
  }
  function vr({ options: e }, { offset: t, source: n, end: r }, i) {
    const a = new Ke(n.substring(1))
    ;(a.source === `` && i(t, `BAD_ALIAS`, `Alias cannot be an empty string`),
      a.source.endsWith(`:`) &&
        i(t + n.length - 1, `BAD_ALIAS`, `Alias ending in : is ambiguous`, !0))
    const o = t + n.length,
      s = Jn(r, o, e.strict, i)
    return ((a.range = [t, o, s.offset]), s.comment && (a.comment = s.comment), a)
  }
  function yr(e, t, { offset: n, start: r, value: i, end: a }, o) {
    const s = new Fn(void 0, Object.assign({ _directives: t }, e)),
      c = { atKey: !1, atRoot: !0, directives: s.directives, options: s.options, schema: s.schema },
      l = Vn(r, {
        indicator: `doc-start`,
        next: i ?? a?.[0],
        offset: n,
        onError: o,
        parentIndent: 0,
        startOnNewline: !0,
      })
    ;(l.found &&
      ((s.directives.docStart = !0),
      i &&
        (i.type === `block-map` || i.type === `block-seq`) &&
        !l.hasNewline &&
        o(
          l.end,
          `MISSING_CHAR`,
          `Block collection cannot start on same line with directives-end marker`,
        )),
      (s.contents = i ? gr(c, i, l, o) : _r(c, l.end, r, null, l, o)))
    const u = s.contents.range[2],
      d = Jn(a, u, !1, o)
    return (d.comment && (s.comment = d.comment), (s.range = [n, u, d.offset]), s)
  }
  function br(e) {
    if (typeof e == `number`) return [e, e + 1]
    if (Array.isArray(e)) return e.length === 2 ? e : [e[0], e[1]]
    const { offset: t, source: n } = e
    return [t, t + (typeof n == `string` ? n.length : 1)]
  }
  function xr(e) {
    let t = ``,
      n = !1,
      r = !1
    for (let i = 0; i < e.length; ++i) {
      const a = e[i]
      switch (a[0]) {
        case `#`:
          ;((t +=
            (t === ``
              ? ``
              : r
                ? `

`
                : `
`) + (a.slice(1) || ` `)),
            (n = !0),
            (r = !1))
          break
        case `%`:
          ;(e[i + 1]?.[0] !== `#` && (i += 1), (n = !1))
          break
        default:
          ;(n || (r = !0), (n = !1))
      }
    }
    return { comment: t, afterEmptyLine: r }
  }
  const Sr = class {
    constructor(e = {}) {
      ;((this.doc = null),
        (this.atDirectives = !1),
        (this.prelude = []),
        (this.errors = []),
        (this.warnings = []),
        (this.onError = (e, t, n, r) => {
          let i = br(e)
          r ? this.warnings.push(new zn(i, t, n)) : this.errors.push(new Rn(i, t, n))
        }),
        (this.directives = new ze({ version: e.version || `1.2` })),
        (this.options = e))
    }
    decorate(e, t) {
      let { comment: n, afterEmptyLine: r } = xr(this.prelude)
      if (n) {
        let i = e.contents
        if (t) e.comment = e.comment ? `${e.comment}\n${n}` : n
        else if (r || e.directives.docStart || !i) e.commentBefore = n
        else if (k(i) && !i.flow && i.items.length > 0) {
          let e = i.items[0]
          D(e) && (e = e.key)
          let t = e.commentBefore
          e.commentBefore = t ? `${n}\n${t}` : n
        } else {
          let e = i.commentBefore
          i.commentBefore = e ? `${n}\n${e}` : n
        }
      }
      if (t) {
        for (let t = 0; t < this.errors.length; ++t) e.errors.push(this.errors[t])
        for (let t = 0; t < this.warnings.length; ++t) e.warnings.push(this.warnings[t])
      } else ((e.errors = this.errors), (e.warnings = this.warnings))
      ;((this.prelude = []), (this.errors = []), (this.warnings = []))
    }
    streamInfo() {
      return {
        comment: xr(this.prelude).comment,
        directives: this.directives,
        errors: this.errors,
        warnings: this.warnings,
      }
    }
    *compose(e, t = !1, n = -1) {
      for (let t of e) yield* this.next(t)
      yield* this.end(t, n)
    }
    *next(e) {
      switch (e.type) {
        case `directive`:
          ;(this.directives.add(e.source, (t, n, r) => {
            let i = br(e)
            ;((i[0] += t), this.onError(i, `BAD_DIRECTIVE`, n, r))
          }),
            this.prelude.push(e.source),
            (this.atDirectives = !0))
          break
        case `document`: {
          let t = yr(this.options, this.directives, e, this.onError)
          ;(this.atDirectives &&
            !t.directives.docStart &&
            this.onError(e, `MISSING_CHAR`, `Missing directives-end/doc-start indicator line`),
            this.decorate(t, !1),
            this.doc && (yield this.doc),
            (this.doc = t),
            (this.atDirectives = !1))
          break
        }
        case `byte-order-mark`:
        case `space`:
          break
        case `comment`:
        case `newline`:
          this.prelude.push(e.source)
          break
        case `error`: {
          let t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message,
            n = new Rn(br(e), `UNEXPECTED_TOKEN`, t)
          this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n)
          break
        }
        case `doc-end`: {
          if (!this.doc) {
            this.errors.push(
              new Rn(br(e), `UNEXPECTED_TOKEN`, `Unexpected doc-end without preceding document`),
            )
            break
          }
          this.doc.directives.docEnd = !0
          let t = Jn(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError)
          if ((this.decorate(this.doc, !0), t.comment)) {
            let e = this.doc.comment
            this.doc.comment = e ? `${e}\n${t.comment}` : t.comment
          }
          this.doc.range[2] = t.offset
          break
        }
        default:
          this.errors.push(new Rn(br(e), `UNEXPECTED_TOKEN`, `Unsupported token ${e.type}`))
      }
    }
    *end(e = !1, t = -1) {
      if (this.doc) (this.decorate(this.doc, !0), yield this.doc, (this.doc = null))
      else if (e) {
        let e = new Fn(void 0, Object.assign({ _directives: this.directives }, this.options))
        ;(this.atDirectives &&
          this.onError(t, `MISSING_CHAR`, `Missing directives-end indicator line`),
          (e.range = [0, t, t]),
          this.decorate(e, !1),
          yield e)
      }
    }
  }
  let Cr = Symbol(`break visit`),
    wr = Symbol(`skip children`),
    Tr = Symbol(`remove item`)
  function Er(e, t) {
    ;(`type` in e && e.type === `document` && (e = { start: e.start, value: e.value }),
      Dr(Object.freeze([]), e, t))
  }
  ;((Er.BREAK = Cr),
    (Er.SKIP = wr),
    (Er.REMOVE = Tr),
    (Er.itemAtPath = (e, t) => {
      let n = e
      for (const [e, r] of t) {
        const t = n?.[e]
        if (t && `items` in t) n = t.items[r]
        else return
      }
      return n
    }),
    (Er.parentCollection = (e, t) => {
      const n = Er.itemAtPath(e, t.slice(0, -1)),
        r = t[t.length - 1][0],
        i = n?.[r]
      if (i && `items` in i) return i
      throw new Error(`Parent collection not found`)
    }))
  function Dr(e, t, n) {
    let r = n(t, e)
    if (typeof r == `symbol`) return r
    for (const i of [`key`, `value`]) {
      const a = t[i]
      if (a && `items` in a) {
        for (let t = 0; t < a.items.length; ++t) {
          const r = Dr(Object.freeze(e.concat([[i, t]])), a.items[t], n)
          if (typeof r == `number`) t = r - 1
          else if (r === Cr) return Cr
          else r === Tr && (a.items.splice(t, 1), --t)
        }
        typeof r == `function` && i === `key` && (r = r(t, e))
      }
    }
    return typeof r == `function` ? r(t, e) : r
  }
  function Or(e) {
    switch (e) {
      case `﻿`:
        return `byte-order-mark`
      case ``:
        return `doc-mode`
      case ``:
        return `flow-error-end`
      case ``:
        return `scalar`
      case `---`:
        return `doc-start`
      case `...`:
        return `doc-end`
      case ``:
      case `
`:
      case `\r
`:
        return `newline`
      case `-`:
        return `seq-item-ind`
      case `?`:
        return `explicit-key-ind`
      case `:`:
        return `map-value-ind`
      case `{`:
        return `flow-map-start`
      case `}`:
        return `flow-map-end`
      case `[`:
        return `flow-seq-start`
      case `]`:
        return `flow-seq-end`
      case `,`:
        return `comma`
    }
    switch (e[0]) {
      case ` `:
      case `	`:
        return `space`
      case `#`:
        return `comment`
      case `%`:
        return `directive-line`
      case `*`:
        return `alias`
      case `&`:
        return `anchor`
      case `!`:
        return `tag`
      case `'`:
        return `single-quoted-scalar`
      case `"`:
        return `double-quoted-scalar`
      case `|`:
      case `>`:
        return `block-scalar-header`
    }
    return null
  }
  function R(e) {
    switch (e) {
      case void 0:
      case ` `:
      case `
`:
      case `\r`:
      case `	`:
        return !0
      default:
        return !1
    }
  }
  const kr = new Set(`0123456789ABCDEFabcdef`),
    Ar = new Set(
      `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()`,
    ),
    jr = new Set(`,[]{}`),
    Mr = new Set(` ,[]{}
\r	`),
    Nr = (e) => !e || Mr.has(e)
  var Pr = class {
      constructor() {
        ;((this.atEnd = !1),
          (this.blockScalarIndent = -1),
          (this.blockScalarKeep = !1),
          (this.buffer = ``),
          (this.flowKey = !1),
          (this.flowLevel = 0),
          (this.indentNext = 0),
          (this.indentValue = 0),
          (this.lineEndPos = null),
          (this.next = null),
          (this.pos = 0))
      }
      *lex(e, t = !1) {
        if (e) {
          if (typeof e != `string`) throw new TypeError(`source is not a string`)
          ;((this.buffer = this.buffer ? this.buffer + e : e), (this.lineEndPos = null))
        }
        this.atEnd = !t
        let n = this.next ?? `stream`
        for (; n && (t || this.hasChars(1));) n = yield* this.parseNext(n)
      }
      atLineEnd() {
        let e = this.pos,
          t = this.buffer[e]
        for (; t === ` ` || t === `	`;) t = this.buffer[++e]
        return (
          !t ||
          t === `#` ||
          t ===
            `
` ||
          (t === `\r` &&
            this.buffer[e + 1] ===
              `
`)
        )
      }
      charAt(e) {
        return this.buffer[this.pos + e]
      }
      continueScalar(e) {
        let t = this.buffer[e]
        if (this.indentNext > 0) {
          let n = 0
          for (; t === ` `;) t = this.buffer[++n + e]
          if (t === `\r`) {
            const t = this.buffer[n + e + 1]
            if (
              t ===
                `
` ||
              (!t && !this.atEnd)
            )
              return e + n + 1
          }
          return t ===
            `
` ||
            n >= this.indentNext ||
            (!t && !this.atEnd)
            ? e + n
            : -1
        }
        if (t === `-` || t === `.`) {
          const t = this.buffer.substr(e, 3)
          if ((t === `---` || t === `...`) && R(this.buffer[e + 3])) return -1
        }
        return e
      }
      getLine() {
        let e = this.lineEndPos
        return (
          (typeof e != `number` || (e !== -1 && e < this.pos)) &&
            ((e = this.buffer.indexOf(
              `
`,
              this.pos,
            )),
            (this.lineEndPos = e)),
          e === -1
            ? this.atEnd
              ? this.buffer.substring(this.pos)
              : null
            : (this.buffer[e - 1] === `\r` && --e, this.buffer.substring(this.pos, e))
        )
      }
      hasChars(e) {
        return this.pos + e <= this.buffer.length
      }
      setNext(e) {
        return (
          (this.buffer = this.buffer.substring(this.pos)),
          (this.pos = 0),
          (this.lineEndPos = null),
          (this.next = e),
          null
        )
      }
      peek(e) {
        return this.buffer.substr(this.pos, e)
      }
      *parseNext(e) {
        switch (e) {
          case `stream`:
            return yield* this.parseStream()
          case `line-start`:
            return yield* this.parseLineStart()
          case `block-start`:
            return yield* this.parseBlockStart()
          case `doc`:
            return yield* this.parseDocument()
          case `flow`:
            return yield* this.parseFlowCollection()
          case `quoted-scalar`:
            return yield* this.parseQuotedScalar()
          case `block-scalar`:
            return yield* this.parseBlockScalar()
          case `plain-scalar`:
            return yield* this.parsePlainScalar()
        }
      }
      *parseStream() {
        let e = this.getLine()
        if (e === null) return this.setNext(`stream`)
        if ((e[0] === `﻿` && (yield* this.pushCount(1), (e = e.slice(1))), e[0] === `%`)) {
          let t = e.length,
            n = e.indexOf(`#`)
          for (; n !== -1;) {
            const r = e[n - 1]
            if (r === ` ` || r === `	`) {
              t = n - 1
              break
            }
            n = e.indexOf(`#`, n + 1)
          }
          for (;;) {
            const n = e[t - 1]
            if (n === ` ` || n === `	`) --t
            else break
          }
          const r = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0))
          return (yield* this.pushCount(e.length - r), this.pushNewline(), `stream`)
        }
        if (this.atLineEnd()) {
          const t = yield* this.pushSpaces(!0)
          return (yield* this.pushCount(e.length - t), yield* this.pushNewline(), `stream`)
        }
        return (yield ``, yield* this.parseLineStart())
      }
      *parseLineStart() {
        const e = this.charAt(0)
        if (!e && !this.atEnd) return this.setNext(`line-start`)
        if (e === `-` || e === `.`) {
          if (!this.atEnd && !this.hasChars(4)) return this.setNext(`line-start`)
          const e = this.peek(3)
          if ((e === `---` || e === `...`) && R(this.charAt(3)))
            return (
              yield* this.pushCount(3),
              (this.indentValue = 0),
              (this.indentNext = 0),
              e === `---` ? `doc` : `stream`
            )
        }
        return (
          (this.indentValue = yield* this.pushSpaces(!1)),
          this.indentNext > this.indentValue &&
            !R(this.charAt(1)) &&
            (this.indentNext = this.indentValue),
          yield* this.parseBlockStart()
        )
      }
      *parseBlockStart() {
        const [e, t] = this.peek(2)
        if (!t && !this.atEnd) return this.setNext(`block-start`)
        if ((e === `-` || e === `?` || e === `:`) && R(t)) {
          const e = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0))
          return ((this.indentNext = this.indentValue + 1), (this.indentValue += e), `block-start`)
        }
        return `doc`
      }
      *parseDocument() {
        yield* this.pushSpaces(!0)
        const e = this.getLine()
        if (e === null) return this.setNext(`doc`)
        let t = yield* this.pushIndicators()
        switch (e[t]) {
          case `#`:
            yield* this.pushCount(e.length - t)
          case void 0:
            return (yield* this.pushNewline(), yield* this.parseLineStart())
          case `{`:
          case `[`:
            return (yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel = 1), `flow`)
          case `}`:
          case `]`:
            return (yield* this.pushCount(1), `doc`)
          case `*`:
            return (yield* this.pushUntil(Nr), `doc`)
          case `"`:
          case `'`:
            return yield* this.parseQuotedScalar()
          case `|`:
          case `>`:
            return (
              (t += yield* this.parseBlockScalarHeader()),
              (t += yield* this.pushSpaces(!0)),
              yield* this.pushCount(e.length - t),
              yield* this.pushNewline(),
              yield* this.parseBlockScalar()
            )
          default:
            return yield* this.parsePlainScalar()
        }
      }
      *parseFlowCollection() {
        let e,
          t,
          n = -1
        do
          ((e = yield* this.pushNewline()),
            e > 0 ? ((t = yield* this.pushSpaces(!1)), (this.indentValue = n = t)) : (t = 0),
            (t += yield* this.pushSpaces(!0)))
        while (e + t > 0)
        const r = this.getLine()
        if (r === null) return this.setNext(`flow`)
        if (
          ((n !== -1 && n < this.indentNext && r[0] !== `#`) ||
            (n === 0 && (r.startsWith(`---`) || r.startsWith(`...`)) && R(r[3]))) &&
          (n !== this.indentNext - 1 || this.flowLevel !== 1 || (r[0] !== `]` && r[0] !== `}`))
        )
          return ((this.flowLevel = 0), yield ``, yield* this.parseLineStart())
        let i = 0
        for (; r[i] === `,`;)
          ((i += yield* this.pushCount(1)), (i += yield* this.pushSpaces(!0)), (this.flowKey = !1))
        switch (((i += yield* this.pushIndicators()), r[i])) {
          case void 0:
            return `flow`
          case `#`:
            return (yield* this.pushCount(r.length - i), `flow`)
          case `{`:
          case `[`:
            return (yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel += 1), `flow`)
          case `}`:
          case `]`:
            return (
              yield* this.pushCount(1),
              (this.flowKey = !0),
              --this.flowLevel,
              this.flowLevel ? `flow` : `doc`
            )
          case `*`:
            return (yield* this.pushUntil(Nr), `flow`)
          case `"`:
          case `'`:
            return ((this.flowKey = !0), yield* this.parseQuotedScalar())
          case `:`: {
            const e = this.charAt(1)
            if (this.flowKey || R(e) || e === `,`)
              return (
                (this.flowKey = !1), yield* this.pushCount(1), yield* this.pushSpaces(!0), `flow`
              )
          }
          default:
            return ((this.flowKey = !1), yield* this.parsePlainScalar())
        }
      }
      *parseQuotedScalar() {
        let e = this.charAt(0),
          t = this.buffer.indexOf(e, this.pos + 1)
        if (e === `'`)
          for (; t !== -1 && this.buffer[t + 1] === `'`;) t = this.buffer.indexOf(`'`, t + 2)
        else
          for (; t !== -1;) {
            let e = 0
            for (; this.buffer[t - 1 - e] === `\\`;) e += 1
            if (e % 2 == 0) break
            t = this.buffer.indexOf(`"`, t + 1)
          }
        let n = this.buffer.substring(0, t),
          r = n.indexOf(
            `
`,
            this.pos,
          )
        if (r !== -1) {
          for (; r !== -1;) {
            const e = this.continueScalar(r + 1)
            if (e === -1) break
            r = n.indexOf(
              `
`,
              e,
            )
          }
          r !== -1 && (t = r - (n[r - 1] === `\r` ? 2 : 1))
        }
        if (t === -1) {
          if (!this.atEnd) return this.setNext(`quoted-scalar`)
          t = this.buffer.length
        }
        return (yield* this.pushToIndex(t + 1, !1), this.flowLevel ? `flow` : `doc`)
      }
      *parseBlockScalarHeader() {
        ;((this.blockScalarIndent = -1), (this.blockScalarKeep = !1))
        let e = this.pos
        for (;;) {
          const t = this.buffer[++e]
          if (t === `+`) this.blockScalarKeep = !0
          else if (t > `0` && t <= `9`) this.blockScalarIndent = Number(t) - 1
          else if (t !== `-`) break
        }
        return yield* this.pushUntil((e) => R(e) || e === `#`)
      }
      *parseBlockScalar() {
        let e = this.pos - 1,
          t = 0,
          n
        loop: for (let r = this.pos; (n = this.buffer[r]); ++r)
          switch (n) {
            case ` `:
              t += 1
              break
            case `
`:
              ;((e = r), (t = 0))
              break
            case `\r`: {
              const e = this.buffer[r + 1]
              if (!e && !this.atEnd) return this.setNext(`block-scalar`)
              if (
                e ===
                `
`
              )
                break
            }
            default:
              break loop
          }
        if (!n && !this.atEnd) return this.setNext(`block-scalar`)
        if (t >= this.indentNext) {
          this.indentNext =
            this.blockScalarIndent === -1
              ? t
              : this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext)
          do {
            const t = this.continueScalar(e + 1)
            if (t === -1) break
            e = this.buffer.indexOf(
              `
`,
              t,
            )
          } while (e !== -1)
          if (e === -1) {
            if (!this.atEnd) return this.setNext(`block-scalar`)
            e = this.buffer.length
          }
        }
        let r = e + 1
        for (n = this.buffer[r]; n === ` `;) n = this.buffer[++r]
        if (n === `	`) {
          for (
            ;
            n === `	` ||
            n === ` ` ||
            n === `\r` ||
            n ===
              `
`;
          )
            n = this.buffer[++r]
          e = r - 1
        } else if (!this.blockScalarKeep)
          do {
            let n = e - 1,
              r = this.buffer[n]
            r === `\r` && (r = this.buffer[--n])
            const i = n
            for (; r === ` `;) r = this.buffer[--n]
            if (
              r ===
                `
` &&
              n >= this.pos &&
              n + 1 + t > i
            )
              e = n
            else break
          } while (!0)
        return (yield ``, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart())
      }
      *parsePlainScalar() {
        let e = this.flowLevel > 0,
          t = this.pos - 1,
          n = this.pos - 1,
          r
        for (; (r = this.buffer[++n]);)
          if (r === `:`) {
            const r = this.buffer[n + 1]
            if (R(r) || (e && jr.has(r))) break
            t = n
          } else if (R(r)) {
            let i = this.buffer[n + 1]
            if (
              (r === `\r` &&
                (i ===
                `
`
                  ? ((n += 1),
                    (r = `
`),
                    (i = this.buffer[n + 1]))
                  : (t = n)),
              i === `#` || (e && jr.has(i)))
            )
              break
            if (
              r ===
              `
`
            ) {
              const e = this.continueScalar(n + 1)
              if (e === -1) break
              n = Math.max(n, e - 2)
            }
          } else {
            if (e && jr.has(r)) break
            t = n
          }
        return !r && !this.atEnd
          ? this.setNext(`plain-scalar`)
          : (yield ``, yield* this.pushToIndex(t + 1, !0), e ? `flow` : `doc`)
      }
      *pushCount(e) {
        return e > 0 ? (yield this.buffer.substr(this.pos, e), (this.pos += e), e) : 0
      }
      *pushToIndex(e, t) {
        const n = this.buffer.slice(this.pos, e)
        return n ? (yield n, (this.pos += n.length), n.length) : (t && (yield ``), 0)
      }
      *pushIndicators() {
        let e = 0
        loop: for (;;) {
          switch (this.charAt(0)) {
            case `!`:
              ;((e += yield* this.pushTag()), (e += yield* this.pushSpaces(!0)))
              continue loop
            case `&`:
              ;((e += yield* this.pushUntil(Nr)), (e += yield* this.pushSpaces(!0)))
              continue loop
            case `-`:
            case `?`:
            case `:`: {
              const t = this.flowLevel > 0,
                n = this.charAt(1)
              if (R(n) || (t && jr.has(n))) {
                ;(t ? (this.flowKey &&= !1) : (this.indentNext = this.indentValue + 1),
                  (e += yield* this.pushCount(1)),
                  (e += yield* this.pushSpaces(!0)))
                continue loop
              }
            }
          }
          break loop
        }
        return e
      }
      *pushTag() {
        if (this.charAt(1) === `<`) {
          let e = this.pos + 2,
            t = this.buffer[e]
          for (; !R(t) && t !== `>`;) t = this.buffer[++e]
          return yield* this.pushToIndex(t === `>` ? e + 1 : e, !1)
        }
        {
          let e = this.pos + 1,
            t = this.buffer[e]
          for (; t;)
            if (Ar.has(t)) t = this.buffer[++e]
            else if (t === `%` && kr.has(this.buffer[e + 1]) && kr.has(this.buffer[e + 2]))
              t = this.buffer[(e += 3)]
            else break
          return yield* this.pushToIndex(e, !1)
        }
      }
      *pushNewline() {
        const e = this.buffer[this.pos]
        return e ===
          `
`
          ? yield* this.pushCount(1)
          : e === `\r` &&
              this.charAt(1) ===
                `
`
            ? yield* this.pushCount(2)
            : 0
      }
      *pushSpaces(e) {
        let t = this.pos - 1,
          n
        do n = this.buffer[++t]
        while (n === ` ` || (e && n === `	`))
        const r = t - this.pos
        return (r > 0 && (yield this.buffer.substr(this.pos, r), (this.pos = t)), r)
      }
      *pushUntil(e) {
        let t = this.pos,
          n = this.buffer[t]
        for (; !e(n);) n = this.buffer[++t]
        return yield* this.pushToIndex(t, !1)
      }
    },
    Fr = class {
      constructor() {
        ;((this.lineStarts = []),
          (this.addNewLine = (e) => this.lineStarts.push(e)),
          (this.linePos = (e) => {
            let t = 0,
              n = this.lineStarts.length
            for (; t < n;) {
              const r = (t + n) >> 1
              this.lineStarts[r] < e ? (t = r + 1) : (n = r)
            }
            if (this.lineStarts[t] === e) return { line: t + 1, col: 1 }
            if (t === 0) return { line: 0, col: e }
            const r = this.lineStarts[t - 1]
            return { line: t, col: e - r + 1 }
          }))
      }
    }
  function z(e, t) {
    for (let n = 0; n < e.length; ++n) if (e[n].type === t) return !0
    return !1
  }
  function Ir(e) {
    for (let t = 0; t < e.length; ++t)
      switch (e[t].type) {
        case `space`:
        case `comment`:
        case `newline`:
          break
        default:
          return t
      }
    return -1
  }
  function Lr(e) {
    switch (e?.type) {
      case `alias`:
      case `scalar`:
      case `single-quoted-scalar`:
      case `double-quoted-scalar`:
      case `flow-collection`:
        return !0
      default:
        return !1
    }
  }
  function Rr(e) {
    switch (e.type) {
      case `document`:
        return e.start
      case `block-map`: {
        const t = e.items[e.items.length - 1]
        return t.sep ?? t.start
      }
      case `block-seq`:
        return e.items.at(-1).start
      default:
        return []
    }
  }
  function zr(e) {
    if (e.length === 0) return []
    let t = e.length
    loop: for (; --t >= 0;)
      switch (e[t].type) {
        case `doc-start`:
        case `explicit-key-ind`:
        case `map-value-ind`:
        case `seq-item-ind`:
        case `newline`:
          break loop
      }
    for (; e[++t]?.type === `space`;);
    return e.splice(t, e.length)
  }
  function Br(e, t) {
    if (t.length < 1e5) Array.prototype.push.apply(e, t)
    else for (let n = 0; n < t.length; ++n) e.push(t[n])
  }
  function Vr(e) {
    if (e.start.type === `flow-seq-start`)
      for (const t of e.items)
        t.sep &&
          !t.value &&
          !z(t.start, `explicit-key-ind`) &&
          !z(t.sep, `map-value-ind`) &&
          (t.key && (t.value = t.key),
          delete t.key,
          Lr(t.value)
            ? t.value.end
              ? Br(t.value.end, t.sep)
              : (t.value.end = t.sep)
            : Br(t.start, t.sep),
          delete t.sep)
  }
  const Hr = class {
    constructor(e) {
      ;((this.atNewLine = !0),
        (this.atScalar = !1),
        (this.indent = 0),
        (this.offset = 0),
        (this.onKeyLine = !1),
        (this.stack = []),
        (this.source = ``),
        (this.type = ``),
        (this.lexer = new Pr()),
        (this.onNewLine = e))
    }
    *parse(e, t = !1) {
      this.onNewLine && this.offset === 0 && this.onNewLine(0)
      for (let n of this.lexer.lex(e, t)) yield* this.next(n)
      t || (yield* this.end())
    }
    *next(e) {
      if (((this.source = e), this.atScalar)) {
        ;((this.atScalar = !1), yield* this.step(), (this.offset += e.length))
        return
      }
      let t = Or(e)
      if (!t) {
        let t = `Not a YAML token: ${e}`
        ;(yield* this.pop({ type: `error`, offset: this.offset, message: t, source: e }),
          (this.offset += e.length))
      } else if (t === `scalar`)
        ((this.atNewLine = !1), (this.atScalar = !0), (this.type = `scalar`))
      else {
        switch (((this.type = t), yield* this.step(), t)) {
          case `newline`:
            ;((this.atNewLine = !0),
              (this.indent = 0),
              this.onNewLine && this.onNewLine(this.offset + e.length))
            break
          case `space`:
            this.atNewLine && e[0] === ` ` && (this.indent += e.length)
            break
          case `explicit-key-ind`:
          case `map-value-ind`:
          case `seq-item-ind`:
            this.atNewLine && (this.indent += e.length)
            break
          case `doc-mode`:
          case `flow-error-end`:
            return
          default:
            this.atNewLine = !1
        }
        this.offset += e.length
      }
    }
    *end() {
      for (; this.stack.length > 0;) yield* this.pop()
    }
    get sourceToken() {
      return { type: this.type, offset: this.offset, indent: this.indent, source: this.source }
    }
    *step() {
      let e = this.peek(1)
      if (this.type === `doc-end` && e?.type !== `doc-end`) {
        for (; this.stack.length > 0;) yield* this.pop()
        this.stack.push({ type: `doc-end`, offset: this.offset, source: this.source })
        return
      }
      if (!e) return yield* this.stream()
      switch (e.type) {
        case `document`:
          return yield* this.document(e)
        case `alias`:
        case `scalar`:
        case `single-quoted-scalar`:
        case `double-quoted-scalar`:
          return yield* this.scalar(e)
        case `block-scalar`:
          return yield* this.blockScalar(e)
        case `block-map`:
          return yield* this.blockMap(e)
        case `block-seq`:
          return yield* this.blockSequence(e)
        case `flow-collection`:
          return yield* this.flowCollection(e)
        case `doc-end`:
          return yield* this.documentEnd(e)
      }
      yield* this.pop()
    }
    peek(e) {
      return this.stack[this.stack.length - e]
    }
    *pop(e) {
      let t = e ?? this.stack.pop()
      if (!t)
        yield {
          type: `error`,
          offset: this.offset,
          source: ``,
          message: `Tried to pop an empty stack`,
        }
      else if (this.stack.length === 0) yield t
      else {
        let e = this.peek(1)
        switch (
          (t.type === `block-scalar`
            ? (t.indent = `indent` in e ? e.indent : 0)
            : t.type === `flow-collection` && e.type === `document` && (t.indent = 0),
          t.type === `flow-collection` && Vr(t),
          e.type)
        ) {
          case `document`:
            e.value = t
            break
          case `block-scalar`:
            e.props.push(t)
            break
          case `block-map`: {
            let n = e.items[e.items.length - 1]
            if (n.value) {
              ;(e.items.push({ start: [], key: t, sep: [] }), (this.onKeyLine = !0))
              return
            }
            if (n.sep) n.value = t
            else {
              ;(Object.assign(n, { key: t, sep: [] }), (this.onKeyLine = !n.explicitKey))
              return
            }
            break
          }
          case `block-seq`: {
            let n = e.items[e.items.length - 1]
            n.value ? e.items.push({ start: [], value: t }) : (n.value = t)
            break
          }
          case `flow-collection`: {
            let n = e.items[e.items.length - 1]
            !n || n.value
              ? e.items.push({ start: [], key: t, sep: [] })
              : n.sep
                ? (n.value = t)
                : Object.assign(n, { key: t, sep: [] })
            return
          }
          default:
            ;(yield* this.pop(), yield* this.pop(t))
        }
        if (
          (e.type === `document` || e.type === `block-map` || e.type === `block-seq`) &&
          (t.type === `block-map` || t.type === `block-seq`)
        ) {
          let n = t.items[t.items.length - 1]
          n &&
            !n.sep &&
            !n.value &&
            n.start.length > 0 &&
            Ir(n.start) === -1 &&
            (t.indent === 0 || n.start.every((e) => e.type !== `comment` || e.indent < t.indent)) &&
            (e.type === `document` ? (e.end = n.start) : e.items.push({ start: n.start }),
            t.items.splice(-1, 1))
        }
      }
    }
    *stream() {
      switch (this.type) {
        case `directive-line`:
          yield { type: `directive`, offset: this.offset, source: this.source }
          return
        case `byte-order-mark`:
        case `space`:
        case `comment`:
        case `newline`:
          yield this.sourceToken
          return
        case `doc-mode`:
        case `doc-start`: {
          let e = { type: `document`, offset: this.offset, start: [] }
          ;(this.type === `doc-start` && e.start.push(this.sourceToken), this.stack.push(e))
          return
        }
      }
      yield {
        type: `error`,
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML stream`,
        source: this.source,
      }
    }
    *document(e) {
      if (e.value) return yield* this.lineEnd(e)
      switch (this.type) {
        case `doc-start`:
          Ir(e.start) === -1
            ? e.start.push(this.sourceToken)
            : (yield* this.pop(), yield* this.step())
          return
        case `anchor`:
        case `tag`:
        case `space`:
        case `comment`:
        case `newline`:
          e.start.push(this.sourceToken)
          return
      }
      let t = this.startBlockValue(e)
      t
        ? this.stack.push(t)
        : yield {
            type: `error`,
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source,
          }
    }
    *scalar(e) {
      if (this.type === `map-value-ind`) {
        let t = zr(Rr(this.peek(2))),
          n
        e.end ? ((n = e.end), n.push(this.sourceToken), delete e.end) : (n = [this.sourceToken])
        let r = {
          type: `block-map`,
          offset: e.offset,
          indent: e.indent,
          items: [{ start: t, key: e, sep: n }],
        }
        ;((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = r))
      } else yield* this.lineEnd(e)
    }
    *blockScalar(e) {
      switch (this.type) {
        case `space`:
        case `comment`:
        case `newline`:
          e.props.push(this.sourceToken)
          return
        case `scalar`:
          if (
            ((e.source = this.source), (this.atNewLine = !0), (this.indent = 0), this.onNewLine)
          ) {
            let e =
              this.source.indexOf(`
`) + 1
            for (; e !== 0;)
              (this.onNewLine(this.offset + e),
                (e =
                  this.source.indexOf(
                    `
`,
                    e,
                  ) + 1))
          }
          yield* this.pop()
          break
        default:
          ;(yield* this.pop(), yield* this.step())
      }
    }
    *blockMap(e) {
      let t = e.items[e.items.length - 1]
      switch (this.type) {
        case `newline`:
          if (((this.onKeyLine = !1), t.value)) {
            let n = `end` in t.value ? t.value.end : void 0
            ;(Array.isArray(n) ? n[n.length - 1] : void 0)?.type === `comment`
              ? n?.push(this.sourceToken)
              : e.items.push({ start: [this.sourceToken] })
          } else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken)
          return
        case `space`:
        case `comment`:
          if (t.value) e.items.push({ start: [this.sourceToken] })
          else if (t.sep) t.sep.push(this.sourceToken)
          else {
            if (this.atIndentedComment(t.start, e.indent)) {
              let n = e.items[e.items.length - 2]?.value?.end
              if (Array.isArray(n)) {
                ;(Br(n, t.start), n.push(this.sourceToken), e.items.pop())
                return
              }
            }
            t.start.push(this.sourceToken)
          }
          return
      }
      if (this.indent >= e.indent) {
        let n = !this.onKeyLine && this.indent === e.indent,
          r = n && (t.sep || t.explicitKey) && this.type !== `seq-item-ind`,
          i = []
        if (r && t.sep && !t.value) {
          let n = []
          for (let r = 0; r < t.sep.length; ++r) {
            let i = t.sep[r]
            switch (i.type) {
              case `newline`:
                n.push(r)
                break
              case `space`:
                break
              case `comment`:
                i.indent > e.indent && (n.length = 0)
                break
              default:
                n.length = 0
            }
          }
          n.length >= 2 && (i = t.sep.splice(n[1]))
        }
        switch (this.type) {
          case `anchor`:
          case `tag`:
            r || t.value
              ? (i.push(this.sourceToken), e.items.push({ start: i }), (this.onKeyLine = !0))
              : t.sep
                ? t.sep.push(this.sourceToken)
                : t.start.push(this.sourceToken)
            return
          case `explicit-key-ind`:
            ;(!t.sep && !t.explicitKey
              ? (t.start.push(this.sourceToken), (t.explicitKey = !0))
              : r || t.value
                ? (i.push(this.sourceToken), e.items.push({ start: i, explicitKey: !0 }))
                : this.stack.push({
                    type: `block-map`,
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [this.sourceToken], explicitKey: !0 }],
                  }),
              (this.onKeyLine = !0))
            return
          case `map-value-ind`:
            if (t.explicitKey) {
              if (!t.sep) {
                if (z(t.start, `newline`)) Object.assign(t, { key: null, sep: [this.sourceToken] })
                else {
                  let e = zr(t.start)
                  this.stack.push({
                    type: `block-map`,
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: e, key: null, sep: [this.sourceToken] }],
                  })
                }
              } else if (t.value) e.items.push({ start: [], key: null, sep: [this.sourceToken] })
              else if (z(t.sep, `map-value-ind`))
                this.stack.push({
                  type: `block-map`,
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: i, key: null, sep: [this.sourceToken] }],
                })
              else if (Lr(t.key) && !z(t.sep, `newline`)) {
                let e = zr(t.start),
                  n = t.key,
                  r = t.sep
                ;(r.push(this.sourceToken),
                  delete t.key,
                  delete t.sep,
                  this.stack.push({
                    type: `block-map`,
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: e, key: n, sep: r }],
                  }))
              } else
                i.length > 0
                  ? (t.sep = t.sep.concat(i, this.sourceToken))
                  : t.sep.push(this.sourceToken)
            } else
              t.sep
                ? t.value || r
                  ? e.items.push({ start: i, key: null, sep: [this.sourceToken] })
                  : z(t.sep, `map-value-ind`)
                    ? this.stack.push({
                        type: `block-map`,
                        offset: this.offset,
                        indent: this.indent,
                        items: [{ start: [], key: null, sep: [this.sourceToken] }],
                      })
                    : t.sep.push(this.sourceToken)
                : Object.assign(t, { key: null, sep: [this.sourceToken] })
            this.onKeyLine = !0
            return
          case `alias`:
          case `scalar`:
          case `single-quoted-scalar`:
          case `double-quoted-scalar`: {
            let n = this.flowScalar(this.type)
            r || t.value
              ? (e.items.push({ start: i, key: n, sep: [] }), (this.onKeyLine = !0))
              : t.sep
                ? this.stack.push(n)
                : (Object.assign(t, { key: n, sep: [] }), (this.onKeyLine = !0))
            return
          }
          default: {
            let r = this.startBlockValue(e)
            if (r) {
              if (r.type === `block-seq`) {
                if (!t.explicitKey && t.sep && !z(t.sep, `newline`)) {
                  yield* this.pop({
                    type: `error`,
                    offset: this.offset,
                    message: `Unexpected block-seq-ind on same line with key`,
                    source: this.source,
                  })
                  return
                }
              } else n && e.items.push({ start: i })
              this.stack.push(r)
              return
            }
          }
        }
      }
      ;(yield* this.pop(), yield* this.step())
    }
    *blockSequence(e) {
      let t = e.items[e.items.length - 1]
      switch (this.type) {
        case `newline`:
          if (t.value) {
            let n = `end` in t.value ? t.value.end : void 0
            ;(Array.isArray(n) ? n[n.length - 1] : void 0)?.type === `comment`
              ? n?.push(this.sourceToken)
              : e.items.push({ start: [this.sourceToken] })
          } else t.start.push(this.sourceToken)
          return
        case `space`:
        case `comment`:
          if (t.value) e.items.push({ start: [this.sourceToken] })
          else {
            if (this.atIndentedComment(t.start, e.indent)) {
              let n = e.items[e.items.length - 2]?.value?.end
              if (Array.isArray(n)) {
                ;(Br(n, t.start), n.push(this.sourceToken), e.items.pop())
                return
              }
            }
            t.start.push(this.sourceToken)
          }
          return
        case `anchor`:
        case `tag`:
          if (t.value || this.indent <= e.indent) break
          t.start.push(this.sourceToken)
          return
        case `seq-item-ind`:
          if (this.indent !== e.indent) break
          t.value || z(t.start, `seq-item-ind`)
            ? e.items.push({ start: [this.sourceToken] })
            : t.start.push(this.sourceToken)
          return
      }
      if (this.indent > e.indent) {
        let t = this.startBlockValue(e)
        if (t) {
          this.stack.push(t)
          return
        }
      }
      ;(yield* this.pop(), yield* this.step())
    }
    *flowCollection(e) {
      let t = e.items[e.items.length - 1]
      if (this.type === `flow-error-end`) {
        let e
        do (yield* this.pop(), (e = this.peek(1)))
        while (e?.type === `flow-collection`)
      } else if (e.end.length === 0) {
        switch (this.type) {
          case `comma`:
          case `explicit-key-ind`:
            !t || t.sep
              ? e.items.push({ start: [this.sourceToken] })
              : t.start.push(this.sourceToken)
            return
          case `map-value-ind`:
            !t || t.value
              ? e.items.push({ start: [], key: null, sep: [this.sourceToken] })
              : t.sep
                ? t.sep.push(this.sourceToken)
                : Object.assign(t, { key: null, sep: [this.sourceToken] })
            return
          case `space`:
          case `comment`:
          case `newline`:
          case `anchor`:
          case `tag`:
            !t || t.value
              ? e.items.push({ start: [this.sourceToken] })
              : t.sep
                ? t.sep.push(this.sourceToken)
                : t.start.push(this.sourceToken)
            return
          case `alias`:
          case `scalar`:
          case `single-quoted-scalar`:
          case `double-quoted-scalar`: {
            let n = this.flowScalar(this.type)
            !t || t.value
              ? e.items.push({ start: [], key: n, sep: [] })
              : t.sep
                ? this.stack.push(n)
                : Object.assign(t, { key: n, sep: [] })
            return
          }
          case `flow-map-end`:
          case `flow-seq-end`:
            e.end.push(this.sourceToken)
            return
        }
        let n = this.startBlockValue(e)
        n ? this.stack.push(n) : (yield* this.pop(), yield* this.step())
      } else {
        let t = this.peek(2)
        if (
          t.type === `block-map` &&
          ((this.type === `map-value-ind` && t.indent === e.indent) ||
            (this.type === `newline` && !t.items[t.items.length - 1].sep))
        )
          (yield* this.pop(), yield* this.step())
        else if (this.type === `map-value-ind` && t.type !== `flow-collection`) {
          let n = zr(Rr(t))
          Vr(e)
          let r = e.end.splice(1, e.end.length)
          r.push(this.sourceToken)
          let i = {
            type: `block-map`,
            offset: e.offset,
            indent: e.indent,
            items: [{ start: n, key: e, sep: r }],
          }
          ;((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = i))
        } else yield* this.lineEnd(e)
      }
    }
    flowScalar(e) {
      if (this.onNewLine) {
        let e =
          this.source.indexOf(`
`) + 1
        for (; e !== 0;)
          (this.onNewLine(this.offset + e),
            (e =
              this.source.indexOf(
                `
`,
                e,
              ) + 1))
      }
      return { type: e, offset: this.offset, indent: this.indent, source: this.source }
    }
    startBlockValue(e) {
      switch (this.type) {
        case `alias`:
        case `scalar`:
        case `single-quoted-scalar`:
        case `double-quoted-scalar`:
          return this.flowScalar(this.type)
        case `block-scalar-header`:
          return {
            type: `block-scalar`,
            offset: this.offset,
            indent: this.indent,
            props: [this.sourceToken],
            source: ``,
          }
        case `flow-map-start`:
        case `flow-seq-start`:
          return {
            type: `flow-collection`,
            offset: this.offset,
            indent: this.indent,
            start: this.sourceToken,
            items: [],
            end: [],
          }
        case `seq-item-ind`:
          return {
            type: `block-seq`,
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }],
          }
        case `explicit-key-ind`: {
          this.onKeyLine = !0
          let t = zr(Rr(e))
          return (
            t.push(this.sourceToken),
            {
              type: `block-map`,
              offset: this.offset,
              indent: this.indent,
              items: [{ start: t, explicitKey: !0 }],
            }
          )
        }
        case `map-value-ind`: {
          this.onKeyLine = !0
          let t = zr(Rr(e))
          return {
            type: `block-map`,
            offset: this.offset,
            indent: this.indent,
            items: [{ start: t, key: null, sep: [this.sourceToken] }],
          }
        }
      }
      return null
    }
    atIndentedComment(e, t) {
      return this.type !== `comment` || this.indent <= t
        ? !1
        : e.every((e) => e.type === `newline` || e.type === `space`)
    }
    *documentEnd(e) {
      this.type !== `doc-mode` &&
        (e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
        this.type === `newline` && (yield* this.pop()))
    }
    *lineEnd(e) {
      switch (this.type) {
        case `comma`:
        case `doc-start`:
        case `doc-end`:
        case `flow-seq-end`:
        case `flow-map-end`:
        case `map-value-ind`:
          ;(yield* this.pop(), yield* this.step())
          break
        case `newline`:
          this.onKeyLine = !1
        default:
          ;(e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
            this.type === `newline` && (yield* this.pop()))
      }
    }
  }
  function Ur(e) {
    const t = e.prettyErrors !== !1
    return { lineCounter: e.lineCounter || (t && new Fr()) || null, prettyErrors: t }
  }
  function Wr(e, t = {}) {
    let { lineCounter: n, prettyErrors: r } = Ur(t),
      i = new Hr(n?.addNewLine),
      a = new Sr(t),
      o = null
    for (const t of a.compose(i.parse(e), !0, e.length))
      if (!o) o = t
      else if (o.options.logLevel !== `silent`) {
        o.errors.push(
          new Rn(
            t.range.slice(0, 2),
            `MULTIPLE_DOCS`,
            `Source contains multiple documents; please use YAML.parseAllDocuments()`,
          ),
        )
        break
      }
    return (r && n && (o.errors.forEach(Bn(e, n)), o.warnings.forEach(Bn(e, n))), o)
  }
  function Gr(e, t, n) {
    let r
    typeof t == `function` ? (r = t) : n === void 0 && t && typeof t == `object` && (n = t)
    const i = Wr(e, n)
    if (!i) return null
    if ((i.warnings.forEach((e) => bt(i.options.logLevel, e)), i.errors.length > 0)) {
      if (i.options.logLevel !== `silent`) throw i.errors[0]
      i.errors = []
    }
    return i.toJS({ reviver: r, ...n })
  }
  function Kr(e, t, n) {
    let r = null
    if (
      (typeof t == `function` || Array.isArray(t) ? (r = t) : n === void 0 && t && (n = t),
      typeof n == `string` && (n = n.length),
      typeof n == `number`)
    ) {
      const e = Math.round(n)
      n = e < 1 ? void 0 : e > 8 ? { indent: 8 } : { indent: e }
    }
    if (e === void 0) {
      const { keepUndefined: e } = n ?? t ?? {}
      if (!e) return
    }
    return Te(e) && !r ? e.toString(n) : new Fn(e, r, n).toString(n)
  }
  function qr(e) {
    return e.password !== void 0
  }
  function Jr(e) {
    return Number(e.version ?? 1)
  }
  function B(e) {
    return {
      ...e,
      renderNode(t) {
        const n = e.renderNode(t)
        return n === null ? null : Array.isArray(n) ? n : [n]
      },
    }
  }
  const Yr = new Set([
      `aes-128-cfb`,
      `aes-128-ctr`,
      `aes-128-gcm`,
      `aes-192-cfb`,
      `aes-192-ctr`,
      `aes-192-gcm`,
      `aes-256-cfb`,
      `aes-256-ctr`,
      `aes-256-gcm`,
      `chacha20-ietf`,
      `chacha20-ietf-poly1305`,
      `rc4-md5`,
      `xchacha20`,
      `xchacha20-ietf-poly1305`,
    ]),
    Xr = new Set(
      `2022-blake3-aes-128-gcm.2022-blake3-aes-256-gcm.aes-128-cfb.aes-128-ctr.aes-128-gcm.aes-192-cfb.aes-192-ctr.aes-256-cfb.aes-256-ctr.aes-256-gcm.bf-cfb.camellia-128-cfb.camellia-192-cfb.camellia-256-cfb.cast5-cfb.chacha20.chacha20-ietf.chacha20-ietf-poly1305.chacha20-poly1305.des-cfb.idea-cfb.none.rc2-cfb.rc4.rc4-md5.salsa20.seed-cfb.table`.split(
        `.`,
      ),
    ),
    Zr = new Set(
      `2022-blake3-aes-128-gcm.2022-blake3-aes-256-gcm.aes-128-cfb.aes-128-ctr.aes-128-gcm.aes-192-cfb.aes-192-ctr.aes-192-gcm.aes-256-cfb.aes-256-ctr.aes-256-gcm.bf-cfb.camellia-128-cfb.camellia-192-cfb.camellia-256-cfb.cast5-cfb.chacha20.chacha20-ietf.chacha20-ietf-poly1305.des-cfb.idea-cfb.none.rc2-cfb.rc4.rc4-md5.salsa20.seed-cfb.xchacha20-ietf-poly1305`.split(
        `.`,
      ),
    ),
    Qr = new Set(
      [...Zr].filter(
        (e) => ![`cast5-cfb`, `des-cfb`, `idea-cfb`, `none`, `rc2-cfb`, `seed-cfb`].includes(e),
      ),
    )
  function $r(e) {
    return String(e.cipher ?? `none`)
  }
  function V(e) {
    const t = n(e.plugin)
    if (!t) return
    const r = e[`plugin-opts`] ?? {},
      i = n(r[`obfs-host`]) ?? n(r.host),
      a = n(r[`obfs-uri`]) ?? n(r.path)
    return [`obfs`, `obfs-local`, `simple-obfs`].includes(t)
      ? { host: i, mode: n(r.obfs) ?? n(r.mode) ?? `http`, path: a, tls: !1, type: `obfs` }
      : t.includes(`v2ray`)
        ? {
            host: i,
            mode: n(r.mode) ?? n(r.obfs) ?? `websocket`,
            path: a,
            tls: r.tls === !0,
            type: `v2ray`,
          }
        : { host: i, mode: n(r.mode) ?? n(r.obfs), path: a, tls: r.tls === !0, type: `other` }
  }
  function H(e) {
    if (n(e.plugin) !== `shadow-tls`) return
    const t = e[`plugin-opts`] ?? {},
      r = n(t.password)
    if (!r) return
    const i = Number(t.version ?? 3)
    return { host: n(t.host), password: r, version: Number.isInteger(i) && i > 0 ? i : 3 }
  }
  function ei(e) {
    const t = V(e)
    return t === void 0 || t.type === `obfs` ? !1 : H(e) === void 0
  }
  function ti(e) {
    const t = V(e)
    if (!t) return
    if (t.type === `obfs`)
      return [
        `simple-obfs`,
        `obfs=${t.mode}`,
        t.host && `obfs-host=${t.host}`,
        t.path && `obfs-uri=${t.path}`,
      ]
        .filter(Boolean)
        .join(`;`)
    if (t.type === `v2ray`)
      return [
        `v2ray-plugin`,
        `obfs=${t.mode}`,
        `mode=${t.mode}`,
        t.host && `obfs-host=${t.host}`,
        t.host && `host=${t.host}`,
        t.path && `path=${t.path}`,
        t.tls && `tls`,
      ]
        .filter(Boolean)
        .join(`;`)
    const n = e[`plugin-opts`] ?? {}
    return [
      String(e.plugin),
      ...Object.entries(n).map(([e, t]) => (t === !0 ? e : `${e}=${String(t)}`)),
    ].join(`;`)
  }
  function ni(e) {
    const t = V(e)
    if (t) {
      if (t.type === `obfs`)
        return {
          name: `obfs-local`,
          options: [
            `obfs=${t.mode}`,
            t.host && `obfs-host=${t.host}`,
            t.path && `obfs-uri=${t.path}`,
          ]
            .filter(Boolean)
            .join(`;`),
        }
      if (t.type === `v2ray`)
        return {
          name: `v2ray-plugin`,
          options: [
            `mode=${t.mode}`,
            t.host && `host=${t.host}`,
            t.path && `path=${t.path}`,
            t.tls && `tls`,
          ]
            .filter(Boolean)
            .join(`;`),
        }
    }
  }
  function ri(e) {
    return Array.isArray(e)
      ? e.flatMap((e) => ri(e))
      : typeof e == `string`
        ? e
            .split(`,`)
            .map((e) => e.trim())
            .filter(Boolean)
        : []
  }
  function ii(e) {
    const t = /^(.*?)(?:\/(\d+))?$/.exec(e),
      n = (t?.[1] ?? e).replaceAll(/^\[|]$/g, ``),
      r = n.includes(`:`),
      i = r ? 128 : 32,
      a = t?.[2] == null ? void 0 : Number(t[2])
    if (!r) {
      const e = n.split(`.`).map(Number)
      if (e.length !== 4 || e.some((e) => !Number.isInteger(e) || e < 0 || e > 255)) return null
    }
    return a != null && (!Number.isInteger(a) || a < 0 || a > i)
      ? null
      : { host: n, cidr: a, ipv6: r }
  }
  function ai(e, t) {
    const n = [...ri(t), ...ri(e.ip), ...ri(e.ipv6)]
    for (const t of n) {
      const n = ii(t)
      n &&
        (n.ipv6
          ? ((typeof e.ipv6 != `string` || e.ipv6.includes(`/`)) && (e.ipv6 = n.host),
            n.cidr != null && (e[`ipv6-cidr`] = n.cidr))
          : ((typeof e.ip != `string` || e.ip.includes(`/`)) && (e.ip = n.host),
            n.cidr != null && (e[`ip-cidr`] = n.cidr)))
    }
    return e
  }
  function oi(e) {
    const t = { ...e }
    ai(t, t.address)
    const n = []
    return (
      typeof t.ip == `string` &&
        t.ip &&
        n.push(`${t.ip}/${Number.isInteger(t[`ip-cidr`]) ? t[`ip-cidr`] : 32}`),
      typeof t.ipv6 == `string` &&
        t.ipv6 &&
        n.push(`${t.ipv6}/${Number.isInteger(t[`ipv6-cidr`]) ? t[`ipv6-cidr`] : 128}`),
      n
    )
  }
  const si = new Set([`vmess`, `vless`, `http`, `socks5`]),
    ci = new Set([`vmess`, `vless`, `trojan`]),
    li = new Set([`auto`, `none`, `zero`, `aes-128-gcm`, `chacha20-poly1305`])
  function ui(e, t) {
    if (e.type !== `vmess`) return
    const n = e.cipher ?? `auto`
    ;((e.cipher = !t || t.has(String(n)) ? n : `auto`), (e.alterId = Number(e.alterId ?? 0)))
  }
  function di(e, t) {
    const n = e.servername || e.sni
    if (!n) return
    const r = t.includes(String(e.type)) ? `servername` : `sni`
    ;(delete e.servername, delete e.sni, (e[r] = n))
  }
  function fi(e) {
    const t = V(e)
    if (t?.type === `other`) {
      const t = e[`plugin-opts`] ?? {}
      ;((e.plugin = String(e.plugin)), (e[`plugin-opts`] = t))
      return
    }
    if (!t) return
    const n = { mode: t.mode }
    ;(t.host && (n.host = t.host),
      t.type !== `obfs` && t.path && (n.path = t.path),
      t.type !== `obfs` && t.tls && (n.tls = !0),
      (e.plugin = t.type === `obfs` ? `obfs` : `v2ray-plugin`),
      (e[`plugin-opts`] = n))
  }
  function pi(e) {
    ;(si.has(String(e.type)) || delete e.tls,
      ci.has(String(e.type)) || delete e.network,
      e.type === `snell` && Jr(e) < 3 && delete e.udp)
  }
  function mi(e) {
    const t = e[`grpc-opts`]
    if (!t || typeof t != `object` || !(`mode` in t)) return
    const { mode: n, ...r } = t
    e[`grpc-opts`] = r
  }
  function hi(e) {
    if (e.type !== `tuic`) return
    if (
      (e.congestion_control !== void 0 &&
        ((e[`congestion-controller`] = e.congestion_control), delete e.congestion_control),
      e.udp_relay_mode !== void 0 &&
        ((e[`udp-relay-mode`] = e.udp_relay_mode), delete e.udp_relay_mode),
      e.alpn !== void 0 && (e.alpn = u(e.alpn)),
      qr(e))
    ) {
      e.version = e.version ?? 5
      return
    }
    const t = e.token ?? e.uuid
    ;(delete e.uuid, t !== void 0 && (e.token = t))
  }
  function gi(e, t) {
    if (e.type !== `wireguard`) return
    const n = oi(e)
    if (
      (delete e.publickey,
      delete e[`ip-cidr`],
      delete e[`ipv6-cidr`],
      delete e.ip,
      delete e.ipv6,
      n.length === 1)
    ) {
      const [r] = n
      ;(delete e.address,
        (e[r.includes(`:`) ? `ipv6` : `ip`] = t === `keep-prefix` ? r : r.split(`/`)[0]))
    } else n.length > 0 && (e.address = n)
  }
  function _i(e) {
    if (e.network !== `httpupgrade`) return
    const t = e[`httpupgrade-opts`] ?? {},
      n = { ...t.headers }
    ;(t.host && (n.Host = t.host),
      (e.network = `ws`),
      (e[`ws-opts`] = {
        ...(t.path === void 0 ? {} : { path: t.path }),
        ...(Object.keys(n).length === 0 ? {} : { headers: n }),
        "v2ray-http-upgrade": !0,
        ...(t[`max-early-data`] === void 0 ? {} : { "v2ray-http-upgrade-fast-open": !0 }),
      }),
      delete e[`httpupgrade-opts`])
  }
  function vi(e) {
    return Object.fromEntries(
      Object.entries(e).filter(([e, t]) => !e.startsWith(`_`) && t !== void 0),
    )
  }
  function yi(e) {
    const t = vi(e)
    return (
      ui(t, li),
      di(t, [`vmess`]),
      fi(t),
      pi(t),
      mi(t),
      delete t[`client-fingerprint`],
      delete t[`reality-opts`],
      delete t[`packet-encoding`],
      t
    )
  }
  const bi = B({
    id: `clash`,
    label: `Clash Classic`,
    protocols: [`ss`, `ssr`, `vmess`, `trojan`, `http`, `socks5`, `snell`],
    transports: [`tcp`, `ws`, `http`, `h2`, `grpc`],
    notes: `Clash Classic does not support VLESS, Hysteria, TUIC, WireGuard or AnyTLS.`,
    accepts: (e) => (e.type !== `ss` || Yr.has($r(e))) && (e.type !== `snell` || Jr(e) < 4),
    uniqueNames: !0,
    contentType: `text/yaml; charset=utf-8`,
    fileExtension: `yaml`,
    renderNode: (e) => yi(e),
    assemble: (e) => Kr({ proxies: e }, { lineWidth: 0 }),
  })
  function xi(t) {
    const n = e(t[`reality-opts`])
    if (n) return s({ public_key: n[`public-key`], short_id: n[`short-id`] })
  }
  function Si(t) {
    const n = String(t.network ?? `tcp`)
    if (n === `ws`) {
      const n = e(t[`ws-opts`]),
        r = e(n?.headers),
        i = r?.Host ?? r?.host
      return {
        [t.tls ? `wss` : `ws`]: s({
          path: n?.path,
          headers: i === void 0 ? void 0 : { Host: i },
          sni: t.tls ? t.sni : void 0,
          reality: xi(t),
          skip_tls_verify: t.tls ? t[`skip-cert-verify`] : void 0,
        }),
      }
    }
    if (n === `http` || n === `h2`) {
      const r = e(t[`${n}-opts`]),
        i = e(r?.headers),
        a = l(r?.host ?? i?.Host ?? i?.host)
      return {
        [n === `http` ? `http1` : `http2`]: s({
          method: r?.method,
          path: l(r?.path),
          headers: a === void 0 ? void 0 : { Host: a },
          sni: n === `h2` ? t.sni : void 0,
          skip_tls_verify: t[`skip-cert-verify`],
        }),
      }
    }
    if (n === `grpc`)
      return {
        grpc: s({
          service_name: e(t[`grpc-opts`])?.[`grpc-service-name`],
          sni: t.sni,
          reality: xi(t),
          skip_tls_verify: t[`skip-cert-verify`],
        }),
      }
    if (t.tls)
      return { tls: s({ sni: t.sni, reality: xi(t), skip_tls_verify: t[`skip-cert-verify`] }) }
  }
  function U(e, t) {
    return { [e]: s(t) }
  }
  function Ci(t) {
    if (String(t.network ?? `tcp`) !== `grpc`) return !1
    const n = e(t[`grpc-opts`])?.mode
    return n !== void 0 && String(n).toLowerCase() !== `gun`
  }
  function wi(t) {
    if (Ci(t)) return null
    const n = { name: t.name, server: t.server, port: t.port }
    if (t.type === `ss`) {
      if (ei(t)) return null
      const e = H(t)
      if (e && e.version !== 3) return null
      const r = V(t),
        i = r?.type === `obfs` ? r : void 0
      return U(`shadowsocks`, {
        ...n,
        method: t.cipher === `chacha20-ietf-poly1305` ? `chacha20-poly1305` : t.cipher,
        password: t.password,
        udp_relay: t.udp,
        tfo: t.tfo ?? t[`fast-open`],
        obfs: i?.mode,
        obfs_host: i?.host,
        obfs_uri: i?.path,
        shadow_tls: e && s({ password: e.password, sni: e.host }),
      })
    }
    if (t.type === `vmess`)
      return U(`vmess`, {
        ...n,
        user_id: t.uuid,
        security: t.cipher ?? `auto`,
        legacy: Number(t.alterId ?? 0) > 0,
        udp_relay: t.udp,
        transport: Si(t),
      })
    if (t.type === `vless`)
      return U(`vless`, { ...n, user_id: t.uuid, flow: t.flow, udp_relay: t.udp, transport: Si(t) })
    if (t.type === `trojan`) {
      const r = String(t.network ?? `tcp`)
      if (![`tcp`, `ws`].includes(r)) return null
      const i = e(t[`ws-opts`]),
        a = e(i?.headers)
      return U(`trojan`, {
        ...n,
        password: t.password,
        udp_relay: t.udp,
        sni: t.sni,
        skip_tls_verify: t[`skip-cert-verify`],
        websocket: r === `ws` ? s({ path: i?.path, host: a?.Host ?? a?.host }) : void 0,
      })
    }
    if ([`hysteria2`, `tuic`, `anytls`].includes(t.type))
      return U(t.type, {
        ...n,
        auth: t.type === `hysteria2` ? t.password : void 0,
        uuid: t.type === `tuic` ? t.uuid : void 0,
        password: t.type === `hysteria2` ? void 0 : t.password,
        sni: t.sni,
        alpn: t.alpn === void 0 ? void 0 : [t.alpn].flat(),
        skip_tls_verify: t[`skip-cert-verify`],
        udp_relay: t.type === `tuic` ? void 0 : t.udp,
      })
    if (t.type === `ssh`)
      return U(`ssh`, {
        ...n,
        username: t.username,
        password: t.password,
        private_key: t[`private-key`],
        tfo: t.tfo ?? t[`fast-open`],
      })
    if (t.type === `snell`) {
      const r = e(t[`obfs-opts`])
      return U(`snell`, {
        ...n,
        psk: t.psk ?? t.password,
        version: t.version,
        udp_relay: Jr(t) >= 3 ? t.udp : void 0,
        reuse: t.reuse,
        obfs: r?.mode ?? t.obfs,
        obfs_host: r?.host ?? t[`obfs-host`],
        tfo: t.tfo ?? t[`fast-open`],
      })
    }
    return t.type === `http` || t.type === `socks5`
      ? U(t.type === `http` && t.tls ? `https` : t.type, {
          ...n,
          username: t.username,
          password: t.password,
          udp_relay: t.type === `socks5` ? t.udp : void 0,
          sni: t.tls ? t.sni : void 0,
          skip_tls_verify: t.tls ? t[`skip-cert-verify`] : void 0,
        })
      : null
  }
  const Ti = B({
      id: `egern`,
      label: `Egern`,
      protocols: [
        `ss`,
        `vmess`,
        `vless`,
        `trojan`,
        `hysteria2`,
        `tuic`,
        `anytls`,
        `http`,
        `socks5`,
        `snell`,
        `ssh`,
      ],
      transports: [`tcp`, `ws`, `http`, `h2`, `grpc`],
      accepts: (e) =>
        (e.type !== `ss` || Xr.has($r(e))) &&
        (e.type !== `snell` || Jr(e) <= 5) &&
        (e.type !== `tuic` || qr(e)),
      uniqueNames: !0,
      contentType: `text/yaml; charset=utf-8`,
      fileExtension: `yaml`,
      renderNode: (e) => wi(e),
      assemble: (e) => Kr({ proxies: e }, { lineWidth: 0 }),
    }),
    Ei = B({
      id: `json`,
      label: `Canonical JSON`,
      protocols: `all`,
      transports: `all`,
      selectable: !1,
      uniqueNames: !1,
      contentType: `application/json; charset=utf-8`,
      fileExtension: `json`,
      renderNode: (e) => vi(e),
      assemble: (e) => JSON.stringify(e, null, 2),
    })
  function W(e) {
    return e == null ? `` : String(e).replaceAll(/[\r\n]/g, ` `)
  }
  function G(e) {
    return `${e.server.includes(`:`) ? `[${e.server}]` : e.server}:${e.port}`
  }
  function Di(e, t) {
    return t == null || t === `` ? null : `${e}=${W(t)}`
  }
  function K(e) {
    return e.flatMap(([e, t]) => {
      const n = Di(e, t)
      return n ? [n] : []
    })
  }
  function Oi(t) {
    const n = e(t[`ws-opts`]),
      r = e(n?.headers)
    return { path: n?.path, host: r?.Host ?? r?.host, headers: r }
  }
  function ki(e) {
    const t = V(e)
    return t?.type === `obfs` ? t : void 0
  }
  function Ai(t, n) {
    if (n === `ws`) {
      const e = Oi(t)
      return { path: e.path, host: e.host }
    }
    if (n === `http`) {
      const n = e(t[`http-opts`]),
        r = e(n?.headers)
      return { path: l(n?.path), host: l(r?.Host ?? r?.host) }
    }
    return { path: void 0, host: void 0 }
  }
  function ji(e) {
    if (e)
      return (
        Object.entries(e)
          .map(([e, t]) => `${e}:${W(t)}`)
          .join(`|`) || void 0
      )
  }
  function q(e) {
    return `"${W(e).replaceAll(`\\`, `\\\\`).replaceAll(`"`, `\\"`)}"`
  }
  function Mi(e) {
    return `"${W(e)}"`
  }
  const Ni = [`password`, `psk`, `username`, `uuid`, `token`, `private-key`, `obfs-password`]
  function Pi(e, t) {
    return Ni.every((n) => !t.test(String(e[n] ?? ``)))
  }
  function J(e) {
    return W(e.name).replaceAll(/[=,]/g, ` `).trim() || `${e.type}-${e.port}`
  }
  function Fi(t) {
    const n = e(t[`reality-opts`])
    return K([
      [`over-tls`, t.tls],
      [n ? `sni` : `tls-name`, t.sni],
      [`skip-cert-verify`, t.tls ? t[`skip-cert-verify`] === !0 : null],
      [`alpn`, t.tls && t.alpn !== void 0 ? q(u(t.alpn)?.join(`,`)) : null],
      [`tls-profile`, t[`client-fingerprint`]],
      [`public-key`, n ? q(n[`public-key`]) : null],
      [`short-id`, n ? n[`short-id`] : null],
    ])
  }
  function Ii(e) {
    if (!Pi(e, /"/)) return null
    let t = W(e.network || `tcp`),
      n = Ai(e, t),
      r
    switch (e.type) {
      case `ss`: {
        if (t !== `tcp` || ei(e)) return null
        const n = H(e)
        if (n && n.version < 2) return null
        const i = V(e)
        ;((r = [`shadowsocks`, e.server, e.port, W(e.cipher), q(e.password)]),
          i?.type === `obfs` &&
            r.push(
              ...K([
                [`obfs-name`, i.mode],
                [`obfs-host`, i.host],
              ]),
            ),
          r.push(
            ...K([
              [`shadow-tls-password`, n?.password],
              [`shadow-tls-sni`, n?.host],
              [`shadow-tls-version`, n?.version],
            ]),
          ))
        break
      }
      case `ssr`:
        if (t !== `tcp`) return null
        r = [
          `shadowsocksr`,
          e.server,
          e.port,
          W(e.cipher),
          q(e.password),
          ...K([
            [`protocol`, e.protocol],
            [`protocol-param`, e[`protocol-param`]],
            [`obfs`, e.obfs],
            [`obfs-param`, e[`obfs-param`]],
          ]),
        ]
        break
      case `vmess`:
        if (![`tcp`, `ws`, `http`].includes(t)) return null
        r = [
          `vmess`,
          e.server,
          e.port,
          W(e.cipher ?? `auto`),
          q(e.uuid),
          ...K([
            [`alterId`, Number(e.alterId ?? 0)],
            [`transport`, t],
            [`path`, n.path],
            [`host`, n.host],
          ]),
          ...Fi(e),
        ]
        break
      case `trojan`:
        if (![`tcp`, `ws`].includes(t)) return null
        r = [
          `trojan`,
          e.server,
          e.port,
          q(e.password),
          ...K([
            [`transport`, t],
            [`path`, n.path],
            [`host`, n.host],
          ]),
          ...Fi(e),
        ]
        break
      case `vless`:
        if (![`tcp`, `ws`, `http`].includes(t)) return null
        r = [
          `vless`,
          e.server,
          e.port,
          q(e.uuid),
          ...K([
            [`transport`, t],
            [`path`, n.path],
            [`host`, n.host],
            [`flow`, e.flow],
          ]),
          ...Fi(e),
        ]
        break
      case `hysteria2`:
        r = [
          `Hysteria2`,
          e.server,
          e.port,
          q(e.password),
          ...K([
            [`tls-name`, e.sni],
            [`skip-cert-verify`, e[`skip-cert-verify`]],
            [`obfs`, e.obfs],
            [`obfs-password`, e[`obfs-password`]],
          ]),
        ]
        break
      case `anytls`:
        r = [`anytls`, e.server, e.port, q(e.password), ...Fi(e)]
        break
      case `http`:
        if (t !== `tcp`) return null
        r = [e.tls ? `https` : `http`, e.server, e.port, W(e.username), q(e.password)]
        break
      case `socks5`:
        r = [`socks5`, e.server, e.port, W(e.username), q(e.password)]
        break
      case `wireguard`: {
        const t = oi(e),
          n = [
            `public-key=${q(e[`public-key`])}`,
            `allowed-ips=${q(e[`allowed-ips`] ?? e.allowed_ips ?? `0.0.0.0/0,::/0`)}`,
            e[`pre-shared-key`] ? `pre-shared-key=${q(e[`pre-shared-key`])}` : void 0,
            `endpoint=${e.server}:${e.port}`,
          ].filter(Boolean)
        r = [
          `wireguard`,
          ...K([
            [`interface-ip`, t.length === 1 ? t[0].split(`/`)[0] : void 0],
            [`private-key`, q(e[`private-key`])],
            [`mtu`, e.mtu],
          ]),
          `peers=[{${n.join(`,`)}}]`,
        ]
        break
      }
      default:
        return null
    }
    const i =
      e.udp === !0 && ![`http`, `wireguard`].includes(String(e.type)) ? K([[`udp`, !0]]) : []
    return `${J(e)} = ${[...r, ...i].join(`, `)}`
  }
  const Li = B({
    id: `loon`,
    label: `Loon`,
    protocols: [
      `ss`,
      `ssr`,
      `vmess`,
      `vless`,
      `trojan`,
      `hysteria2`,
      `anytls`,
      `http`,
      `socks5`,
      `wireguard`,
    ],
    transports: [`tcp`, `ws`, `http`],
    uniqueNames: !0,
    renderedName: J,
    contentType: `text/plain; charset=utf-8`,
    fileExtension: `conf`,
    renderNode: Ii,
    assemble: (e) =>
      e.join(`
`),
  })
  function Ri(e) {
    const t = vi(e)
    return (
      ui(t, li),
      di(t, [`vmess`, `vless`]),
      fi(t),
      pi(t),
      t.type === `hysteria` && t.alpn !== void 0 && (t.alpn = u(t.alpn)),
      t.type === `hysteria2` && delete t.username,
      hi(t),
      gi(t, `keep-prefix`),
      _i(t),
      mi(t),
      t
    )
  }
  const zi = B({
    id: `mihomo`,
    label: `Mihomo`,
    protocols: `all`,
    transports: `all`,
    uniqueNames: !0,
    contentType: `text/yaml; charset=utf-8`,
    fileExtension: `yaml`,
    renderNode: (e) => Ri(e),
    assemble: (e) => Kr({ proxies: e }, { lineWidth: 0 }),
  })
  function Bi(t) {
    const n = e(t[`reality-opts`]),
      r = W(t.network || `tcp`),
      i = Ai(t, r),
      a =
        r === `ws`
          ? t.tls
            ? `wss`
            : `ws`
          : r === `http`
            ? `http`
            : t.tls && [`ss`, `vmess`, `vless`].includes(t.type)
              ? `over-tls`
              : null,
      o = t.tls && !a && [`trojan`, `anytls`, `http`, `socks5`].includes(t.type)
    return K([
      [`obfs`, a],
      [`obfs-host`, r === `ws` ? (i.host ?? t.sni) : (i.host ?? null)],
      [`obfs-uri`, i.path],
      [`over-tls`, o ? !0 : null],
      [`tls-host`, t.tls ? t.sni : null],
      [`tls-verification`, t.tls ? !t[`skip-cert-verify`] : null],
      [`reality-base64-pubkey`, n?.[`public-key`]],
      [`reality-hex-shortid`, n?.[`short-id`]],
      [`udp-relay`, t.udp ?? !1],
    ])
  }
  function Vi(e) {
    const t = W(e.network || `tcp`)
    if (![`tcp`, `ws`, `http`].includes(t) || !Pi(e, /,/)) return null
    let n = `${G(e)}`,
      r = Bi(e),
      i,
      a
    switch (e.type) {
      case `ss`: {
        const t = V(e),
          n =
            t?.type === `obfs` ? t.mode : t?.mode === `websocket` ? (t.tls ? `wss` : `ws`) : void 0
        if (t && n === void 0) return null
        ;((i = `shadowsocks`),
          (a = K([
            [`method`, e.cipher],
            [`password`, e.password],
            [`obfs`, n],
            [`obfs-host`, t?.host],
            [`obfs-uri`, t?.path],
          ])))
        break
      }
      case `ssr`:
        ;((i = `shadowsocks`),
          (a = K([
            [`method`, e.cipher],
            [`password`, e.password],
            [`ssr-protocol`, e.protocol],
            [`ssr-protocol-param`, e[`protocol-param`]],
            [`obfs`, e.obfs],
            [`obfs-host`, e[`obfs-param`]],
          ])))
        break
      case `vmess`:
        ;((i = `vmess`),
          (a = K([
            [`method`, !e.cipher || e.cipher === `auto` ? `chacha20-poly1305` : e.cipher],
            [`password`, e.uuid],
            [`aead`, Number(e.alterId ?? 0) === 0],
          ])))
        break
      case `vless`:
        ;((i = `vless`),
          (a = K([
            [`method`, `none`],
            [`password`, e.uuid],
            [`vless-flow`, e.flow],
          ])))
        break
      case `trojan`:
        ;((i = `trojan`), (a = K([[`password`, e.password]])))
        break
      case `anytls`:
        ;((i = `anytls`), (a = K([[`password`, e.password]])))
        break
      case `http`:
      case `socks5`:
        ;((i = e.type),
          (a = K([
            [`username`, e.username],
            [`password`, e.password],
          ])))
        break
      default:
        return null
    }
    return `${i}=${[n, ...a, ...r, `tag=${J(e)}`].join(`, `)}`
  }
  const Hi = B({
    id: `quantumult-x`,
    label: `Quantumult X`,
    protocols: [`ss`, `ssr`, `vmess`, `vless`, `trojan`, `anytls`, `http`, `socks5`],
    transports: [`tcp`, `ws`, `http`],
    uniqueNames: !0,
    renderedName: J,
    contentType: `text/plain; charset=utf-8`,
    fileExtension: `conf`,
    renderNode: Vi,
    assemble: (e) =>
      e.join(`
`),
  })
  function Ui(e) {
    const t = e.replaceAll(/\s+/g, ``).replaceAll(`-`, `+`).replaceAll(`_`, `/`)
    return t.padEnd(Math.ceil(t.length / 4) * 4, `=`)
  }
  function Y(e) {
    const t = atob(Ui(e)),
      n = Uint8Array.from(t, (e) => e.charCodeAt(0))
    return new TextDecoder().decode(n)
  }
  function X(e, t = !1) {
    let n = new TextEncoder().encode(e),
      r = ``
    for (const e of n) r += String.fromCharCode(e)
    const i = btoa(r)
    return t ? i.replaceAll(`+`, `-`).replaceAll(`/`, `_`).replaceAll(/=+$/g, ``) : i
  }
  function Wi(e) {
    const t = e.trim().replaceAll(/\s+/g, ``)
    if (!t || t.length < 8 || !/^[A-Za-z0-9+/_=-]+$/.test(t)) return null
    try {
      const e = Y(t).trim()
      return /(?:^|\n)(?:ss|ssr|vmess|vless|trojan|hysteria2?|hy2|tuic|wireguard|wg|anytls|socks5?|https?):\/\//m.test(
        e,
      ) || /(?:^|\n)(?:proxies\s*:|[^\n=]+\s*=\s*[^\n,]+,)/m.test(e)
        ? e
        : null
    } catch {
      return null
    }
  }
  function Gi(e) {
    if (e == null || e === ``) return
    const t = Number(e)
    return Number.isSafeInteger(t) && t >= 0 ? t : void 0
  }
  function Ki(e) {
    const t = e.indexOf(`#`),
      n = t === -1 ? `` : e.slice(t),
      r = t === -1 ? e : e.slice(0, t),
      i = r.indexOf(`?`)
    return {
      pathname: i === -1 ? r : r.slice(0, i),
      params: new URLSearchParams(i === -1 ? `` : r.slice(i + 1)),
      fragment: n,
    }
  }
  function qi({ fragment: e, params: t, pathname: n }) {
    const r = t.toString()
    return `${n || `/`}${r ? `?${r}` : ``}${e}`
  }
  function Ji(e, t) {
    const n = Ki(typeof e == `string` && e ? e : `/`),
      r = Gi(t) ?? Gi(n.params.get(`ed`))
    return (n.params.delete(`ed`), { path: qi(n), maxEarlyData: r })
  }
  function Yi(e, t) {
    const n = Ji(e),
      r = Gi(t)
    if (r == null) return n.path
    const i = Ki(n.path)
    return (i.params.set(`ed`, String(r)), qi(i))
  }
  function Xi(e) {
    if (!e.tls) return
    const t = e.sni ?? e.servername
    if (typeof t == `string` && t) return t
    const n = e[`ws-opts`] ?? e[`httpupgrade-opts`],
      r = n?.headers ?? {},
      i = n?.host ?? r.Host ?? r.host
    if (!(typeof i != `string` || !i) && !(/^[\d.]+$/.test(i) || i.includes(`:`))) return i
  }
  const Zi = [
    `ss`,
    `ssr`,
    `vmess`,
    `vless`,
    `trojan`,
    `hysteria`,
    `hysteria2`,
    `tuic`,
    `wireguard`,
    `anytls`,
    `http`,
    `socks5`,
  ]
  function Qi(e) {
    const t = new URLSearchParams()
    for (const [n, r] of e)
      if (Array.isArray(r)) for (const e of r) t.append(n, String(e))
      else r != null && r !== `` && t.set(n, typeof r == `object` ? JSON.stringify(r) : String(r))
    const n = t.toString()
    return n ? `?${n}` : ``
  }
  function $i(t) {
    const n = `#${encodeURIComponent(t.name)}`
    switch (t.type) {
      case `ss`:
        return `ss://${String(t.cipher).startsWith(`2022-blake3-`) ? `${encodeURIComponent(String(t.cipher))}:${encodeURIComponent(String(t.password ?? ``))}` : X(`${t.cipher}:${t.password}`)}@${G(t)}${Qi([[`plugin`, ti(t)]])}${n}`
      case `ssr`: {
        const e = X(String(t.password ?? ``), !0),
          n = Qi([
            [`remarks`, X(t.name, !0)],
            [`protoparam`, t[`protocol-param`] ? X(String(t[`protocol-param`]), !0) : null],
            [`obfsparam`, t[`obfs-param`] ? X(String(t[`obfs-param`]), !0) : null],
          ])
        return `ssr://${X(`${G(t)}:${t.protocol}:${t.cipher}:${t.obfs}:${e}/${n}`, !0)}`
      }
      case `vmess`: {
        const n = e(t[`ws-opts`]),
          r = e(n?.headers),
          i = String(t.network ?? `tcp`),
          a = e(t[`grpc-opts`]),
          o = e(t[`${i}-opts`]),
          s = e(o?.headers) ?? r,
          c = s?.Host ?? s?.host ?? o?.host ?? r?.Host,
          l =
            i === `ws`
              ? Yi(n?.path, n?.[`max-early-data`])
              : i === `grpc`
                ? a?.[`grpc-service-name`]
                : o?.path
        return `vmess://${X(JSON.stringify({ v: `2`, ps: t.name, add: t.server, port: String(t.port), id: t.uuid, aid: String(t.alterId ?? 0), scy: t.cipher ?? `auto`, net: i === `http` ? `tcp` : i, type: i === `http` ? `http` : i === `grpc` ? (a?.mode ?? `gun`) : void 0, host: Array.isArray(c) ? c[0] : c, path: Array.isArray(l) ? l[0] : l, eh: n?.[`early-data-header-name`], tls: t.tls ? `tls` : ``, sni: t.sni, fp: t[`client-fingerprint`] }))}`
      }
      case `vless`:
      case `trojan`: {
        const r = e(t[`ws-opts`]),
          i = e(r?.headers),
          a = e(t[`grpc-opts`]),
          o = e(t[`reality-opts`]),
          s = e(t[`${String(t.network)}-opts`]),
          c = Qi([
            [`security`, o ? `reality` : t.type === `trojan` ? void 0 : t.tls ? `tls` : `none`],
            [`encryption`, t.type === `vless` ? t.encryption : void 0],
            [`type`, t.network ?? `tcp`],
            [`sni`, t.sni],
            [`fp`, t[`client-fingerprint`]],
            [`alpn`, u(t.alpn)?.join(`,`)],
            [`allowInsecure`, t[`skip-cert-verify`] ? 1 : void 0],
            [`flow`, t.flow],
            [`host`, i?.Host ?? i?.host ?? s?.host],
            [
              `path`,
              [`ws`, `httpupgrade`].includes(String(t.network))
                ? Yi(r?.path ?? s?.path, r?.[`max-early-data`] ?? s?.[`max-early-data`])
                : (r?.path ?? s?.path),
            ],
            [`eh`, r?.[`early-data-header-name`] ?? s?.[`early-data-header-name`]],
            [`serviceName`, a?.[`grpc-service-name`]],
            [`mode`, s?.mode ?? a?.mode ?? (t.network === `grpc` ? `gun` : void 0)],
            [`extra`, s?.extra],
            [`pbk`, o?.[`public-key`]],
            [`sid`, o?.[`short-id`]],
            [`spx`, o?.[`spider-x`]],
          ]),
          l = t.type === `vless` ? t.uuid : t.password
        return `${t.type}://${encodeURIComponent(String(l ?? ``))}@${G(t)}${c}${n}`
      }
      case `hysteria`:
        return `hysteria://${G(t)}${Qi([
          [`protocol`, t.protocol],
          [`auth`, t[`auth-str`]],
          [`peer`, t.sni],
          [`insecure`, t[`skip-cert-verify`] ? 1 : void 0],
          [`upmbps`, t.up],
          [`downmbps`, t.down],
          [`alpn`, u(t.alpn)?.join(`,`)],
          [`obfs`, t.obfs],
          [`udp`, t.udp],
        ])}${n}`
      case `hysteria2`:
        return `hysteria2://${encodeURIComponent(String(t.password ?? ``))}@${G(t)}${Qi([
          [`sni`, t.sni],
          [`insecure`, t[`skip-cert-verify`] ? 1 : void 0],
          [`obfs`, t.obfs],
          [`obfs-password`, t[`obfs-password`]],
        ])}${n}`
      case `tuic`:
        return `tuic://${encodeURIComponent(String(t.uuid ?? t.token ?? ``))}:${encodeURIComponent(String(t.password ?? ``))}@${G(t)}${Qi(
          [
            [`sni`, t.sni],
            [`congestion_control`, t[`congestion-controller`] ?? t.congestion_control],
            [`alpn`, u(t.alpn)?.join(`,`)],
            [`udp_relay_mode`, t[`udp-relay-mode`] ?? t.udp_relay_mode],
            [`udp`, t.udp],
            [`allow_insecure`, t[`skip-cert-verify`]],
          ],
        )}${n}`
      case `wireguard`: {
        const e = oi(t)
        return `wireguard://${encodeURIComponent(String(t[`private-key`] ?? ``))}@${G(t)}${Qi([
          [`publickey`, t[`public-key`]],
          [`presharedkey`, t[`pre-shared-key`]],
          [`address`, e.length > 0 ? e.join(`,`) : t.address],
          [`reserved`, t.reserved],
          [`mtu`, t.mtu],
          [`udp`, t.udp ? 1 : void 0],
        ])}${n}`
      }
      case `socks5`:
        return `socks://${t.username ? `${X(`${String(t.username)}:${String(t.password ?? ``)}`)}@` : ``}${G(t)}${n}`
      case `http`:
        return `${t.tls ? `https` : `http`}://${t.username ? `${encodeURIComponent(String(t.username))}:${encodeURIComponent(String(t.password ?? ``))}@` : ``}${G(t)}${n}`
      case `anytls`:
        return `anytls://${encodeURIComponent(String(t.password ?? ``))}@${G(t)}${Qi([
          [`sni`, t.sni],
          [`insecure`, t[`skip-cert-verify`] ? 1 : void 0],
        ])}${n}`
      default:
        return null
    }
  }
  const ea = B({
      id: `shadowrocket`,
      label: `Shadowrocket`,
      protocols: Zi,
      transports: `all`,
      notes: `Writes a Base64-encoded list of protocol URIs, not a YAML configuration.`,
      uniqueNames: !1,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `txt`,
      renderNode: (e) => $i(e),
      assemble: (e) =>
        X(
          e.join(`
`),
        ),
    }),
    ta = { ss: `shadowsocks`, socks5: `socks` }
  function na(t) {
    const n = e(t)
    if (n)
      return Object.entries(n)
        .map(([e, t]) => (t === !0 ? e : `${e}=${String(t)}`))
        .join(`;`)
  }
  function ra(e) {
    const t = Object.fromEntries(Object.entries(e).filter(([e]) => e.toLowerCase() !== `host`))
    return Object.keys(t).length > 0 ? t : void 0
  }
  function ia(t) {
    const r = n(t.network)
    if (!(!r || r === `tcp`)) {
      if (r === `ws` || r === `websocket`) {
        const r = e(t[`ws-opts`])
        return s({
          type: `ws`,
          path: n(r?.path),
          headers: e(r?.headers),
          max_early_data: r?.[`max-early-data`],
          early_data_header_name: n(r?.[`early-data-header-name`]),
        })
      }
      if (r === `grpc`) {
        const r = e(t[`grpc-opts`])
        return s({
          type: `grpc`,
          service_name: n(r?.[`grpc-service-name`]),
          idle_timeout: n(r?.[`idle-timeout`]),
          ping_timeout: n(r?.[`ping-timeout`]),
          permit_without_stream: o(r?.[`permit-without-stream`]),
        })
      }
      if (r === `http` || r === `h2`) {
        const i = e(t[`${r}-opts`]),
          a = e(i?.headers)
        return s({
          type: `http`,
          host: d(i?.host ?? a?.Host ?? a?.host),
          path: n(l(i?.path)),
          method: n(i?.method),
          headers: a && ra(a),
        })
      }
      if (r === `httpupgrade`) {
        const r = e(t[`httpupgrade-opts`])
        return s({
          type: `httpupgrade`,
          host: n(r?.host),
          path: n(r?.path),
          headers: e(r?.headers),
        })
      }
      if (r === `quic`) return { type: `quic` }
    }
  }
  function aa(t) {
    const r = e(t[`reality-opts`])
    if (!t.tls && !r) return
    const i = n(t[`client-fingerprint`])
    return s({
      enabled: !0,
      server_name: n(t.sni),
      insecure: o(t[`skip-cert-verify`]),
      alpn: d(t.alpn),
      utls: i ? { enabled: !0, fingerprint: i } : void 0,
      reality: r
        ? s({ enabled: !0, public_key: n(r[`public-key`]), short_id: n(r[`short-id`]) })
        : void 0,
    })
  }
  function oa(e) {
    if ((e.type === `ss` && e.plugin && !ni(e) && !H(e)) || (e.type === `tuic` && !qr(e)))
      return null
    const t = { type: ta[e.type] ?? e.type, tag: e.name, server: e.server, server_port: e.port }
    if (e.type === `ss`) {
      const r = H(e)
      ;(r && (delete t.server, delete t.server_port, (t.detour = sa(e))),
        Object.assign(t, {
          method: n(e.cipher),
          password: n(e.password),
          plugin: r ? void 0 : (ni(e)?.name ?? n(e.plugin)),
          plugin_opts: r ? void 0 : (ni(e)?.options ?? na(e[`plugin-opts`])),
        }))
    } else
      e.type === `socks5` || e.type === `http`
        ? Object.assign(t, {
            username: n(e.username),
            password: n(e.password),
            ...(e.type === `socks5` ? { version: `5` } : {}),
          })
        : e.type === `vmess`
          ? Object.assign(t, {
              uuid: n(e.uuid),
              security: n(e.cipher) ?? `auto`,
              alter_id: e.alterId,
              packet_encoding: n(e[`packet-encoding`]),
            })
          : e.type === `vless`
            ? Object.assign(t, {
                uuid: n(e.uuid),
                flow: n(e.flow),
                packet_encoding: n(e[`packet-encoding`]),
              })
            : [`trojan`, `hysteria2`, `tuic`, `anytls`].includes(e.type)
              ? (t.password = n(e.password))
              : e.type === `hysteria`
                ? Object.assign(t, {
                    auth_str: n(e[`auth-str`] ?? e.password),
                    obfs: n(e.obfs),
                    up_mbps: a(e.up),
                    down_mbps: a(e.down),
                  })
                : e.type === `ssh`
                  ? Object.assign(t, {
                      user: n(e.username),
                      password: n(e.password),
                      private_key: n(e[`private-key`]),
                    })
                  : e.type === `wireguard` &&
                    Object.assign(t, {
                      private_key: n(e[`private-key`]),
                      peer_public_key: n(e[`public-key`]),
                      pre_shared_key: n(e[`pre-shared-key`]),
                      local_address: oi(e),
                      reserved: e.reserved,
                      mtu: e.mtu,
                    })
    return (
      e.type === `hysteria2`
        ? ((t.obfs = e.obfs ? s({ type: n(e.obfs), password: n(e[`obfs-password`]) }) : void 0),
          (t.up_mbps = a(e.up)),
          (t.down_mbps = a(e.down)))
        : e.type === `tuic` &&
          Object.assign(t, {
            uuid: n(e.uuid),
            congestion_control: n(e[`congestion-controller`] ?? e.congestion_control),
            udp_relay_mode: n(e[`udp-relay-mode`] ?? e.udp_relay_mode),
            zero_rtt_handshake: o(e[`zero-rtt`]),
          }),
      e.udp === !1 && ![`http`, `ssh`, `anytls`].includes(e.type) && (t.network = `tcp`),
      e.type !== `wireguard` && ((t.tls = aa(e)), (t.transport = ia(e))),
      s(t)
    )
  }
  function sa(e) {
    return `${e.name}_shadowtls`
  }
  function ca(e) {
    const t = H(e)
    return t
      ? s({
          type: `shadowtls`,
          tag: sa(e),
          server: e.server,
          server_port: e.port,
          version: t.version,
          password: t.password,
          tls: s({ enabled: !0, server_name: t.host }),
        })
      : null
  }
  function la(e) {
    if (!e.server || !e.port) return null
    const t = e[`allowed-ips`] ?? e.allowed_ips
    return {
      type: `wireguard`,
      tag: e.name,
      address: oi(e),
      private_key: n(e[`private-key`]),
      mtu: e.mtu,
      peers: [
        {
          address: e.server,
          port: e.port,
          public_key: n(e[`public-key`]),
          pre_shared_key: n(e[`pre-shared-key`]),
          allowed_ips:
            t === void 0
              ? [`0.0.0.0/0`, `::/0`]
              : String(t)
                  .split(`,`)
                  .map((e) => e.trim())
                  .filter(Boolean),
          reserved: e.reserved,
        },
      ],
    }
  }
  const ua = B({
    id: `sing-box`,
    label: `sing-box`,
    protocols: [
      `ss`,
      `socks5`,
      `http`,
      `vmess`,
      `vless`,
      `trojan`,
      `hysteria`,
      `hysteria2`,
      `tuic`,
      `anytls`,
      `wireguard`,
      `ssh`,
    ],
    transports: [`tcp`, `ws`, `grpc`, `http`, `h2`, `httpupgrade`, `quic`],
    uniqueNames: !0,
    derivedNames: (e) => (H(e) ? [sa(e)] : []),
    contentType: `application/json; charset=utf-8`,
    fileExtension: `json`,
    renderNode: (e) => {
      if (e.type === `wireguard`) return la(e)
      let t = oa(e)
      if (!t) return null
      let n = ca(e)
      return n ? [t, n] : [t]
    },
    assemble: (e) => {
      let t = e.filter((e) => e.type === `wireguard`),
        n = e.filter((e) => e.type !== `wireguard`)
      return JSON.stringify(
        t.length > 0 ? { endpoints: t, outbounds: n } : { outbounds: n },
        null,
        2,
      )
    },
  })
  function da(e) {
    const t = vi(e)
    return (
      ui(t),
      t.type === `vless` && t.network === `xhttp` && !t[`xhttp-opts`] && (t[`xhttp-opts`] = {}),
      di(t, [`vmess`, `vless`]),
      fi(t),
      pi(t),
      t.type === `hysteria` &&
        (t.alpn !== void 0 && (t.alpn = u(t.alpn)),
        (t[`up-speed`] = t[`up-speed`] ?? t.up),
        (t[`down-speed`] = t[`down-speed`] ?? t.down),
        delete t.up,
        delete t.down),
      t.type === `hysteria2` &&
        (delete t.username, (t.auth = t.auth ?? t.password), delete t.password),
      hi(t),
      gi(t, `drop-prefix`),
      _i(t),
      mi(t),
      t
    )
  }
  const fa = B({
    id: `stash`,
    label: `Stash`,
    protocols: [
      `ss`,
      `ssr`,
      `vmess`,
      `vless`,
      `trojan`,
      `http`,
      `socks5`,
      `hysteria`,
      `hysteria2`,
      `tuic`,
      `wireguard`,
      `snell`,
      `anytls`,
      `mieru`,
      `ssh`,
    ],
    transports: `all`,
    accepts: (e) => e.type !== `snell` || Jr(e) < 4,
    uniqueNames: !0,
    contentType: `text/yaml; charset=utf-8`,
    fileExtension: `yaml`,
    renderNode: (e) => da(e),
    assemble: (e) => Kr({ proxies: e }, { lineWidth: 0 }),
  })
  function pa(e) {
    const t = u(e.alpn)?.join(`;`)
    return K([
      [`sni`, e.sni],
      [`skip-cert-verify`, e.tls ? Boolean(e[`skip-cert-verify`]) : null],
      [`alpn`, t],
      [`udp-relay`, [`hysteria2`, `tuic`].includes(String(e.type)) ? null : (e.udp ?? !1)],
    ])
  }
  function ma(t, n = `surge`) {
    if (e(t[`reality-opts`]) || !Pi(t, /,/)) return null
    const r = W(t.network || `tcp`)
    if (r !== `tcp` && !(r === `ws` && [`vmess`, `trojan`].includes(t.type))) return null
    let i = Oi(t),
      a,
      o
    switch (t.type) {
      case `ss`: {
        if (ei(t)) return null
        const e = n === `surge` ? H(t) : void 0
        if ((n === `surfboard` && H(t)) || (e && e.version < 2)) return null
        const r = ki(t)
        ;((a = `ss`),
          (o = K([
            [`encrypt-method`, t.cipher],
            [`password`, Mi(t.password)],
            [`obfs`, r?.mode],
            [`obfs-host`, r?.host],
            [`obfs-uri`, r?.path],
            [`shadow-tls-password`, e && Mi(e.password)],
            [`shadow-tls-sni`, e?.host],
            [`shadow-tls-version`, e?.version],
          ])))
        break
      }
      case `vmess`:
        ;((a = `vmess`),
          (o = K([
            [`username`, t.uuid],
            [`encrypt-method`, t.cipher === `auto` ? void 0 : t.cipher],
            [`vmess-aead`, Number(t.alterId ?? 0) === 0],
            [`tls`, t.tls],
            [`ws`, r === `ws`],
            [`ws-path`, i.path],
            [`ws-headers`, ji(i.headers)],
          ])))
        break
      case `trojan`:
        ;((a = `trojan`),
          (o = K([
            [`password`, Mi(t.password)],
            [`tls`, t.tls !== !1 || null],
            [`ws`, r === `ws`],
            [`ws-path`, i.path],
            [`ws-headers`, ji(i.headers)],
          ])))
        break
      case `tuic`: {
        const e = qr(t)
        ;((a = e ? `tuic-v5` : `tuic`),
          (o = K(
            e
              ? [
                  [`uuid`, t.uuid],
                  [`password`, t.password],
                ]
              : [[`token`, t.token ?? t.uuid]],
          )))
        break
      }
      case `hysteria2`:
        ;((a = `hysteria2`),
          (o = K([
            [`password`, t.password],
            [`download-bandwidth`, t.down],
            [t.obfs === `gecko` ? `gecko-password` : `salamander-password`, t[`obfs-password`]],
          ])))
        break
      case `anytls`:
        ;((a = `anytls`), (o = K([[`password`, t.password]])))
        break
      case `http`:
        ;((a = t.tls ? `https` : `http`),
          (o = K([
            [`username`, t.username],
            [`password`, t.password],
          ])))
        break
      case `socks5`:
        ;((a = t.tls ? `socks5-tls` : `socks5`),
          (o = K([
            [`username`, t.username],
            [`password`, t.password],
          ])))
        break
      case `snell`: {
        const n = e(t[`obfs-opts`])
        ;((a = `snell`),
          (o = K([
            [`psk`, Mi(t.psk ?? t.password)],
            [`version`, t.version],
            [`obfs`, n?.mode ?? t.obfs],
            [`obfs-host`, n?.host ?? t[`obfs-host`]],
          ])))
        break
      }
      case `ssh`:
        ;((a = `ssh`),
          (o = K([
            [`username`, t.username],
            [`password`, t.password],
            [`private-key`, t[`private-key`]],
            [`server-fingerprint`, t[`server-fingerprint`]],
          ])))
        break
      default:
        return null
    }
    return `${J(t)} = ${[a, t.server, t.port, ...o, ...pa(t)].join(`, `)}`
  }
  const ha = {
      protocols: [
        `ss`,
        `vmess`,
        `trojan`,
        `tuic`,
        `hysteria2`,
        `anytls`,
        `http`,
        `socks5`,
        `snell`,
        `ssh`,
      ],
      transports: [`tcp`, `ws`],
      accepts: (e) => e.type !== `ss` || Zr.has($r(e)),
    },
    ga = B({
      id: `surge`,
      label: `Surge`,
      ...ha,
      uniqueNames: !0,
      renderedName: J,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `conf`,
      renderNode: (e) => ma(e),
      assemble: (e) =>
        e.join(`
`),
    })
  function _a(e) {
    if ((e.type === `socks5` || e.type === `http`) && W(e.network || `tcp`) === `tcp`) {
      const t = e.type === `socks5` ? (e.tls ? `socks5-tls` : `socks5`) : e.tls ? `https` : `http`,
        n = [e.username, e.password].filter(Boolean).map((e) => W(e))
      return `${J(e)} = ${[t, e.server, e.port, ...n, ...K([[`udp-relay`, e.udp]])].join(`, `)}`
    }
    const t = ma(e, `surfboard`)
    return t && [`hysteria2`, `tuic`].includes(String(e.type)) && e.udp !== void 0
      ? `${t}, udp-relay=${String(e.udp)}`
      : t
  }
  const va = B({
      id: `surfboard`,
      label: `Surfboard`,
      protocols: [
        `ss`,
        `vmess`,
        `trojan`,
        `tuic`,
        `hysteria2`,
        `anytls`,
        `http`,
        `socks5`,
        `snell`,
      ],
      transports: [`tcp`, `ws`],
      accepts: (e) => (e.type !== `ss` || Qr.has($r(e))) && (e.type !== `tuic` || qr(e)),
      uniqueNames: !0,
      renderedName: J,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `conf`,
      renderNode: _a,
      assemble: (e) =>
        e.join(`
`),
    }),
    ya = B({
      id: `surge-mac`,
      label: `Surge Mac`,
      ...ha,
      uniqueNames: !0,
      renderedName: J,
      notes: `Writes native Surge for macOS node lines; not a full configuration and not the mihomo external-proxy bridge.`,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `conf`,
      renderNode: (e) => ma(e),
      assemble: (e) =>
        e.join(`
`),
    }),
    ba = B({
      id: `uri`,
      label: `URI`,
      protocols: Zi,
      transports: `all`,
      uniqueNames: !1,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `txt`,
      renderNode: (e) => $i(e),
      assemble: (e) =>
        e.join(`
`),
    }),
    xa = B({
      id: `v2ray`,
      label: `V2Ray`,
      protocols: Zi,
      transports: `all`,
      notes: `Writes a Base64-encoded list of protocol URIs, not a V2Ray JSON configuration.`,
      uniqueNames: !1,
      contentType: `text/plain; charset=utf-8`,
      fileExtension: `txt`,
      renderNode: (e) => $i(e),
      assemble: (e) =>
        X(
          e.join(`
`),
        ),
    }),
    Sa = { ss: `shadowsocks`, socks5: `socks` }
  function Ca(t) {
    const r = n(t.network) ?? `tcp`,
      i = { method: r === `tcp` ? `raw` : r === `ws` ? `websocket` : r === `kcp` ? `mkcp` : r }
    if (r === `ws`) {
      const r = e(t[`ws-opts`])
      i.wsSettings = s({
        path: n(r?.path),
        headers: e(r?.headers) ?? void 0,
        maxEarlyData: r?.[`max-early-data`],
        earlyDataHeaderName: n(r?.[`early-data-header-name`]),
      })
    } else if (r === `grpc`) {
      const r = e(t[`grpc-opts`])
      i.grpcSettings = s({
        serviceName: n(r?.[`grpc-service-name`]),
        multiMode: o(r?.[`multi-mode`]),
        idle_timeout: r?.[`idle-timeout`],
        health_check_timeout: r?.[`health-check-timeout`],
      })
    } else if (r === `xhttp`) i.xhttpSettings = e(t[`xhttp-opts`]) ?? {}
    else if (r === `httpupgrade`) {
      const r = e(t[`httpupgrade-opts`])
      i.httpupgradeSettings = s({
        host: n(r?.host),
        path: n(r?.path),
        headers: e(r?.headers) ?? void 0,
        maxEarlyData: r?.[`max-early-data`],
        earlyDataHeaderName: n(r?.[`early-data-header-name`]),
      })
    } else r === `kcp` && (i.kcpSettings = e(t[`kcp-opts`]) ?? {})
    const a = e(t[`reality-opts`])
    return (
      a
        ? ((i.security = `reality`),
          (i.realitySettings = s({
            serverName: n(t.sni),
            fingerprint: n(t[`client-fingerprint`]),
            publicKey: n(a[`public-key`]),
            shortId: n(a[`short-id`]),
            spiderX: n(a[`spider-x`]),
          })))
        : t.tls
          ? ((i.security = `tls`),
            (i.tlsSettings = s({
              serverName: n(t.sni),
              allowInsecure: o(t[`skip-cert-verify`]),
              alpn: d(t.alpn),
              fingerprint: n(t[`client-fingerprint`]),
            })))
          : (i.security = `none`),
      i
    )
  }
  function wa(e) {
    if (e.type === `ss` && e.plugin) return null
    let t = Sa[e.type] ?? e.type,
      r
    return (
      (r =
        e.type === `vmess`
          ? s({ address: e.server, port: e.port, id: n(e.uuid), security: n(e.cipher) ?? `auto` })
          : e.type === `vless`
            ? s({
                address: e.server,
                port: e.port,
                id: n(e.uuid),
                encryption: n(e.encryption) ?? `none`,
                flow: n(e.flow),
              })
            : e.type === `ss`
              ? s({ address: e.server, port: e.port, method: n(e.cipher), password: n(e.password) })
              : e.type === `trojan`
                ? s({ address: e.server, port: e.port, password: n(e.password) })
                : s({ address: e.server, port: e.port, user: n(e.username), pass: n(e.password) })),
      { tag: e.name, protocol: t, settings: r, streamSettings: Ca(e) }
    )
  }
  const Ta = [
    Ei,
    ba,
    zi,
    bi,
    ua,
    B({
      id: `xray`,
      label: `Xray`,
      protocols: [`ss`, `socks5`, `http`, `vmess`, `vless`, `trojan`],
      transports: [`tcp`, `ws`, `grpc`, `xhttp`, `httpupgrade`, `kcp`],
      uniqueNames: !0,
      contentType: `application/json; charset=utf-8`,
      fileExtension: `json`,
      renderNode: (e) => wa(e),
      assemble: (e) => JSON.stringify({ outbounds: e }, null, 2),
    }),
    Hi,
    ga,
    ya,
    Ti,
    fa,
    Li,
    ea,
    va,
    xa,
  ]
  ;(Ta.map((e) => e.id), new Map(Ta.map((e) => [e.id, e])))
  const Ea = {
      "hy2": `hysteria2`,
      "https": `http`,
      "shadowsocks": `ss`,
      "shadowsocksr": `ssr`,
      "socks": `socks5`,
      "socks5-tls": `socks5`,
      "tuic-v5": `tuic`,
    },
    Da = new Set([`https`, `socks5-tls`])
  function Oa(e) {
    return e.toLowerCase().replaceAll(`_`, `-`)
  }
  function ka(e) {
    return Ea[Oa(e)] ?? e.toLowerCase()
  }
  function Aa(e) {
    return Da.has(Oa(e))
  }
  const ja = new Set([`trojan`, `hysteria`, `hysteria2`, `tuic`, `anytls`])
  function Ma(e) {
    return ja.has(e)
  }
  const Na = new Set([`vmess`, `vless`, `trojan`])
  function Z(e) {
    return e == null || e === `` ? void 0 : e
  }
  function Pa(e) {
    const t = String(e.type ?? ``),
      n = ka(t),
      r = String(Z(e.server) ?? Z(e.address) ?? ``),
      i = f(e.port, f(e.server_port)),
      a = structuredClone(e)
    ;((a.type = n),
      (a.server = r),
      (a.port = i),
      (a.name = String(Z(e.name) ?? Z(e.tag) ?? `${n} ${r}:${i}`)),
      e.server_port != null && delete a.server_port,
      typeof e.udp == `string` && (a.udp = p(e.udp)),
      typeof e.tls == `string` && (a.tls = p(e.tls)),
      (Ma(n) || Aa(t)) && (a.tls = a.tls ?? !0),
      n === `hysteria2` &&
        a.auth !== void 0 &&
        ((a.password = Z(a.password) ?? a.auth), delete a.auth),
      n === `hysteria` &&
        ((a[`auth-str`] = Z(a[`auth-str`]) ?? Z(a.auth_str) ?? Z(a.auth) ?? Z(a.password)),
        delete a.auth_str,
        delete a.auth,
        delete a.password),
      Na.has(n) && !a.network && (a.network = `tcp`),
      n === `wireguard` && ai(a, e.address ?? e.local_address),
      n === `vmess` && ((a.cipher = Z(a.cipher) ?? `auto`), (a.alterId = f(a.alterId, 0))))
    for (const e of Object.keys(a))
      !e.toLowerCase().endsWith(`-opts`) ||
        e === e.toLowerCase() ||
        ((a[e.toLowerCase()] = a[e]), delete a[e])
    ;((a.udp = a.udp ?? n !== `http`), n === `ss` && (a.cipher = Z(a.cipher) ?? `none`))
    const o = Xi(a)
    return (o !== void 0 && (a.sni = o), a)
  }
  function Fa(e) {
    return (
      e.match(/^\[(?:Proxy|server_local)\]\s*\r?\n([\s\S]*?)(?=^\[|$(?![\s\S]))/im)?.[1]?.trim() ||
      e
    )
  }
  function Ia(e) {
    if (typeof e != `string`) throw new m(`source must be a string`)
    if (new TextEncoder().encode(e).byteLength > 2097152)
      throw new m(`Subscription content must not exceed 2 MiB`)
    let t = Wi(e),
      n = Fa(t ?? e).trim(),
      r = !1,
      i = null
    return {
      text: n,
      encoded: t !== null,
      document() {
        if (r) return i
        r = !0
        try {
          const e = n.startsWith(`{`) || n.startsWith(`[`) ? JSON.parse(n) : Gr(n)
          i = e && typeof e == `object` ? e : null
        } catch {
          i = null
        }
        return i
      },
    }
  }
  const La = {
      id: `empty`,
      parse: ({ text: e }) => (e ? null : { format: `empty`, drafts: [], diagnostics: [] }),
    },
    Ra = /^(?:<!doctype\s+html|<html[\s>])/i,
    za = {
      id: `html`,
      parse: ({ text: e }) =>
        Ra.test(e)
          ? {
              format: `html`,
              drafts: [],
              diagnostics: [
                {
                  level: `error`,
                  stage: `parse`,
                  code: `html-input`,
                  message: `The input is HTML, not a valid subscription.`,
                },
              ],
            }
          : null,
    }
  function Ba(t) {
    const n = e(t)
    returnBoolean(n && (e(n.user) || Array.isArray(n.servers)))
  }
  function Va(n) {
    return t(e(n)?.profiles).some((e) => Ba(e))
  }
  function Ha(e) {
    return e == null || e === `` ? void 0 : e
  }
  function Ua(e, t, r) {
    return n(t[r]) ?? n(e[r])
  }
  function Wa(t) {
    return n(e(t)?.level) ?? n(t)
  }
  function Ga(n) {
    const r = t(n.portBindings)
    return r.length > 0 ? r.map((t) => e(t) ?? {}) : [n]
  }
  function Ka(t, r, a, o, s, c, l) {
    const u = n(r.domainName) ?? n(r.ipAddress) ?? n(r.domain) ?? n(r.ip),
      d = e(t.user),
      f = n(d?.name) ?? n(d?.username),
      p = []
    for (const [e, m] of Ga(r).entries()) {
      const h = i(m.port ?? r.port),
        g = l + e
      if (!u || !h) {
        c.push({
          level: `warning`,
          stage: `parse`,
          code: `invalid-mieru-node`,
          message: `Mieru server #${g + 1} is missing address or port; skipped.`,
        })
        continue
      }
      const _ = a && s > 1 ? `${a} ${o + e + 1}` : a,
        v = {
          type: `mieru`,
          ...(_ ? { name: _ } : {}),
          server: u,
          port: h,
          username: f,
          password: n(d?.password),
          transport: n(m.protocol) ?? n(r.transportProtocol),
          multiplexing: Wa(m.multiplexing) ?? Wa(r.multiplexing) ?? Wa(t.multiplexing),
          congestionControl:
            n(m.congestionControl) ?? n(r.congestionControl) ?? n(t.congestionControl),
          handshakeMode: n(t.handshakeMode),
        }
      for (const e of [`mtu`, `pacingWindow`, `streamTimeout`]) {
        const n = Ha(t[e])
        n !== void 0 && (v[e] = n)
      }
      const y = Ua(t, r, `transportProtocol`)
      ;(y !== void 0 && v.transport === void 0 && (v.transport = y), p.push({ value: v, index: g }))
    }
    return p
  }
  function qa(r) {
    let i = [],
      a = [],
      o = 0
    for (const s of t(e(r)?.profiles)) {
      const r = e(s)
      if (!r) continue
      let c = t(r.servers),
        l = n(r.profileName),
        u = c.reduce((n, r) => {
          const i = e(r)
          return n + ((i ? t(i.portBindings) : []).length || 1)
        }, 0),
        d = 0
      for (const t of c) {
        const n = e(t) ?? {},
          s = Ka(r, n, l, d, u, i, o)
        a.push(...s)
        const c = Ga(n).length
        ;((o += c), (d += c))
      }
    }
    return { format: `mieru`, drafts: a, diagnostics: i }
  }
  const Ja = {
    id: `mieru`,
    parse: (e) => {
      let t = e.document()
      return Va(t) ? qa(t) : null
    },
  }
  function Q(e) {
    const t = e?.trim() ?? ``
    return (t.startsWith(`"`) && t.endsWith(`"`)) || (t.startsWith(`'`) && t.endsWith(`'`))
      ? t.slice(1, -1).replaceAll(`\\"`, `"`).replaceAll(`\\'`, `'`)
      : t.startsWith(`{`) && t.endsWith(`}`)
        ? t.slice(1, -1)
        : t
  }
  function Ya(e) {
    return e == null ? void 0 : p(Q(e))
  }
  function Xa(e) {
    let t = [],
      n = ``,
      r = ``,
      i = 0
    for (let a = 0; a < e.length; a += 1) {
      const o = e[a]
      if (r) {
        ;((n += o), o === r && e[a - 1] !== `\\` && (r = ``))
        continue
      }
      o === `"` || o === `'`
        ? ((r = o), (n += o))
        : o === `{` || o === `[`
          ? ((i += 1), (n += o))
          : o === `}` || o === `]`
            ? ((i = Math.max(0, i - 1)), (n += o))
            : o === `,` && i === 0
              ? (t.push(n.trim()), (n = ``))
              : (n += o)
    }
    return (t.push(n.trim()), t)
  }
  function Za(e) {
    return /^[A-Za-z][\w-]*\s*=/.test(e.trim())
  }
  function Qa(e) {
    const t = {}
    for (const n of e) {
      if (!Za(n)) continue
      const e = n.indexOf(`=`)
      t[n.slice(0, e).trim().toLowerCase()] = Q(n.slice(e + 1))
    }
    return t
  }
  function $a(e) {
    const t = Q(e).match(/^\[([^\]]+)]:(\d+)$/) ?? Q(e).match(/^(.+):(\d+)$/)
    return t ? { server: t[1], port: Number(t[2]) } : null
  }
  function eo(e, t) {
    ;((e.udp = Ya(t[`udp-relay`] ?? t.udp)),
      (e.tfo = Ya(t[`fast-open`] ?? t.tfo)),
      (e.sni = t.sni ?? t[`tls-name`] ?? t[`tls-host`] ?? t.servername),
      (e[`skip-cert-verify`] =
        Ya(t[`skip-cert-verify`]) ??
        (t[`tls-verification`] == null ? void 0 : !Ya(t[`tls-verification`]))))
    const n = t.alpn
      ?.split(/[;,]/)
      .map((e) => e.trim())
      .filter(Boolean)
    n?.length && (e.alpn = n)
    const r = (t.transport ?? ``).toLowerCase(),
      i = (t.obfs ?? ``).toLowerCase(),
      a =
        (i === `ws` || i === `wss`) && ![`ss`, `ssr`].includes(String(e.type))
          ? `ws`
          : i === `http` && [`vmess`, `vless`, `trojan`].includes(String(e.type))
            ? `http`
            : `tcp`,
      o = r || (Ya(t.ws) ? `ws` : a)
    if (
      ((e.network = o),
      (e.tls =
        Ya(t[`over-tls`] ?? t.tls) ?? e.tls ?? ([`wss`, `over-tls`].includes(i) || Ma(e.type))),
      o === `ws`)
    )
      ((e[`ws-opts`] = {
        path: t.path ?? t[`ws-path`] ?? t[`obfs-uri`] ?? `/`,
        headers:
          (t.host ?? t[`ws-host`] ?? t[`obfs-host`])
            ? { Host: t.host ?? t[`ws-host`] ?? t[`obfs-host`] }
            : void 0,
      }),
        t[`ws-headers`] &&
          (e[`ws-opts`] = {
            ...e[`ws-opts`],
            headers: Object.fromEntries(
              t[`ws-headers`].split(`|`).flatMap((e) => {
                const t = e.indexOf(`:`)
                return t === -1 ? [] : [[e.slice(0, t), e.slice(t + 1)]]
              }),
            ),
          }))
    else if (o === `http`) {
      const n = t.path ?? t[`obfs-uri`],
        r = t.host ?? t[`obfs-host`]
      e[`http-opts`] = {
        path: n === void 0 ? void 0 : [n],
        headers: r === void 0 ? void 0 : { Host: [r] },
      }
    } else
      o === `grpc` &&
        (e[`grpc-opts`] = { "grpc-service-name": t[`service-name`] ?? t[`grpc-service-name`] })
    return (
      t[`reality-base64-pubkey`] &&
        ((e[`reality-opts`] = {
          "public-key": t[`reality-base64-pubkey`],
          "short-id": t[`reality-hex-shortid`] ?? ``,
        }),
        (e.tls = !0)),
      e
    )
  }
  function to(e, t) {
    const n = $a(t[0])
    if (!n) return null
    const r = Qa(t.slice(1)),
      i = e.toLowerCase(),
      a = i === `shadowsocks` && r[`ssr-protocol`] ? `ssr` : ka(i),
      o = { type: a, name: r.tag, ...n }
    if (a === `ss` || a === `ssr`) {
      ;((o.cipher = r.method), (o.password = r.password))
      const e = (r.obfs ?? ``).toLowerCase()
      a === `ssr`
        ? ((o.protocol = r[`ssr-protocol`]),
          (o[`protocol-param`] = r[`ssr-protocol-param`]),
          (o.obfs = r.obfs),
          (o[`obfs-param`] = r[`obfs-host`]))
        : [`http`, `tls`].includes(e)
          ? ((o.plugin = `obfs`),
            (o[`plugin-opts`] = { mode: e, host: r[`obfs-host`], path: r[`obfs-uri`] }))
          : [`ws`, `wss`].includes(e) &&
            ((o.plugin = `v2ray-plugin`),
            (o[`plugin-opts`] = {
              mode: `websocket`,
              host: r[`obfs-host`],
              path: r[`obfs-uri`],
              tls: e === `wss`,
            }))
    } else
      a === `vmess` || a === `vless`
        ? ((o.uuid = r.password),
          (o.cipher = r.method ?? (a === `vless` ? `none` : void 0)),
          (o.flow = r[`vless-flow`]),
          (o.alterId = Number(Ya(r.aead) === !1)))
        : [`trojan`, `anytls`, `hysteria2`, `tuic`].includes(a)
          ? (a === `tuic` && (o.token = r.token),
            (o.password = r.password ?? (a === `tuic` ? void 0 : r.token)),
            (o.uuid = r.uuid))
          : ((o.username = r.username), (o.password = r.password), Aa(i) && (o.tls = !0))
    return { node: eo(o, r), format: `quantumult-x` }
  }
  const no = new Set([
    `shadowsocks`,
    `vmess`,
    `vless`,
    `trojan`,
    `anytls`,
    `hysteria2`,
    `tuic`,
    `http`,
    `https`,
    `socks5`,
    `socks5-tls`,
  ])
  function ro(e, t) {
    const n = Qa(t.slice(1)),
      r = Qa(
        Xa(
          (n.peers ?? ``).replace(/^\[/, ``).replace(/]$/, ``).replace(/^{/, ``).replace(/}$/, ``),
        ),
      ),
      i = $a(r.endpoint ?? ``)
    return i
      ? {
          node: {
            "type": `wireguard`,
            "name": Q(e),
            ...i,
            "private-key": n[`private-key`],
            "public-key": r[`public-key`],
            "pre-shared-key": r[`pre-shared-key`],
            "allowed-ips": r[`allowed-ips`],
            "ip": n[`interface-ip`],
            "mtu": Number(n.mtu) || void 0,
            "udp": !0,
          },
          format: `loon`,
        }
      : null
  }
  function io(e, t) {
    const n = Q(t[0]),
      r = ka(n)
    if (r === `wireguard` && !Number(t[2])) return ro(e, t)
    if (!t[1] || !Number(t[2])) return null
    let i =
        [`shadowsocks`, `shadowsocksr`, `vless`, `hysteria2`, `wireguard`].includes(
          n.toLowerCase(),
        ) ||
        ([`vmess`, `vless`, `trojan`, `anytls`, `hysteria2`, `http`, `https`, `socks5`].includes(
          n.toLowerCase(),
        ) &&
          t.slice(3).some((e) => !Za(e)))
          ? `loon`
          : `surge`,
      a = 3
    for (; a < t.length && !Za(t[a]);) a += 1
    const o = t.slice(3, a).map((e) => Q(e)),
      s = Qa(t.slice(a)),
      c = { type: r, name: Q(e), server: Q(t[1]), port: Number(t[2]) }
    if (r === `ss`) {
      ;((c.cipher = s[`encrypt-method`] ?? o[0]), (c.password = s.password ?? o[1]))
      const e = s.obfs ?? s[`obfs-name`]
      ;(e &&
        ((c.plugin = `obfs`),
        (c[`plugin-opts`] = { mode: e, host: s[`obfs-host`], path: s[`obfs-uri`] })),
        s[`shadow-tls-password`] &&
          ((c.plugin = `shadow-tls`),
          (c[`plugin-opts`] = {
            host: s[`shadow-tls-sni`],
            password: s[`shadow-tls-password`],
            version: Number(s[`shadow-tls-version`] ?? 3),
          })))
    } else
      r === `ssr`
        ? ([c.cipher, c.password, c.protocol, c[`protocol-param`], c.obfs, c[`obfs-param`]] = o)
        : r === `vmess`
          ? ((c.cipher = s[`encrypt-method`] ?? o[0]),
            (c.uuid = s.username ?? o[1]),
            (c.alterId = Number(s.alterid ?? Number(Ya(s[`vmess-aead`]) === !1))))
          : r === `vless`
            ? ((c.uuid = s.username ?? o[0]), (c.flow = s.flow))
            : [`trojan`, `anytls`, `hysteria2`, `tuic`].includes(r)
              ? (r === `tuic` && (c.token = s.token),
                (c.password = s.password ?? (r === `tuic` ? void 0 : s.token) ?? o[0]),
                (c.uuid = s.uuid),
                (c.obfs = s.obfs),
                (c[`obfs-password`] = s[`obfs-password`] ?? s[`salamander-password`]),
                (c.down = s[`download-bandwidth`]))
              : r === `snell`
                ? ((c.psk = s.psk ?? o[0]),
                  (c.version = Number(s.version ?? 3)),
                  (c.obfs = s.obfs),
                  (c[`obfs-host`] = s[`obfs-host`]))
                : r === `ssh`
                  ? ((c.username = s.username),
                    (c.password = s.password),
                    (c[`private-key`] = s[`private-key`]),
                    (c[`server-fingerprint`] = s[`server-fingerprint`]))
                  : r === `wireguard`
                    ? ((c[`private-key`] = o[0] ?? s[`private-key`]),
                      (c[`public-key`] = s[`public-key`]),
                      (c[`pre-shared-key`] = s[`pre-shared-key`]),
                      (c.ip = s[`interface-ip`]),
                      (c.mtu = Number(s.mtu) || void 0))
                    : ((c.username = s.username ?? o[0]),
                      (c.password = s.password ?? o[1]),
                      Aa(n) && (c.tls = !0))
    return { node: eo(c, s), format: i }
  }
  function ao(e) {
    const t = e.indexOf(`=`)
    if (t === -1) return null
    const n = e.slice(0, t).trim(),
      r = Xa(e.slice(t + 1))
    return no.has(n.toLowerCase()) && $a(r[0]) ? to(n, r) : io(n, r)
  }
  const oo = {
    anytls: `anytls`,
    http: `http`,
    https: `http`,
    hysteria2: `hysteria2`,
    shadowsocks: `ss`,
    snell: `snell`,
    socks5: `socks5`,
    ssh: `ssh`,
    trojan: `trojan`,
    tuic: `tuic`,
    vless: `vless`,
    vmess: `vmess`,
  }
  function so(t) {
    const n = e(t)
    if (n) return { "public-key": n.public_key, "short-id": n.short_id }
  }
  function co(t, r) {
    const [i] = Object.keys(r),
      a = e(r[i]) ?? {},
      o = e(a.headers),
      s = l(a.host ?? o?.Host ?? o?.host),
      c = so(a.reality)
    ;((t.sni = n(a.sni) ?? t.sni),
      a.skip_tls_verify !== void 0 && (t[`skip-cert-verify`] = a.skip_tls_verify),
      c && (t[`reality-opts`] = c),
      i === `ws` || i === `wss`
        ? ((t.network = `ws`),
          (t.tls = i === `wss`),
          (t[`ws-opts`] = { path: a.path, headers: s === void 0 ? void 0 : { Host: s } }))
        : i === `http1` || i === `http2`
          ? ((t.network = i === `http1` ? `http` : `h2`),
            (t[`${t.network}-opts`] = {
              method: a.method,
              path: a.path === void 0 ? void 0 : [a.path],
              ...(i === `http1`
                ? { headers: s === void 0 ? void 0 : { Host: [s] } }
                : { host: s === void 0 ? void 0 : [s] }),
            }))
          : i === `grpc`
            ? ((t.network = `grpc`),
              (t[`grpc-opts`] = { "grpc-service-name": a.service_name }),
              (t.tls = !0))
            : i === `tls` && (t.tls = !0))
  }
  function lo(t) {
    const r = e(t),
      i = r ? Object.keys(r) : []
    if (!r || i.length !== 1) return null
    const a = oo[i[0]],
      o = e(r[i[0]]),
      s = n(o?.server),
      c = Number(o?.port)
    if (!a || !o || !s || !Number.isInteger(c)) return null
    const l = {
      type: a,
      name: n(o.name) ?? ``,
      server: s,
      port: c,
      udp: typeof o.udp_relay == `boolean` ? o.udp_relay : void 0,
      tfo: o.tfo,
      sni: n(o.sni),
      alpn: o.alpn,
      tls: i[0] === `https` || void 0,
    }
    ;(o.skip_tls_verify !== void 0 && (l[`skip-cert-verify`] = o.skip_tls_verify),
      a === `ss`
        ? ((l.cipher = n(o.method)),
          (l.password = n(o.password)),
          o.obfs &&
            ((l.plugin = `obfs`),
            (l[`plugin-opts`] = { mode: o.obfs, host: o.obfs_host, path: o.obfs_uri })))
        : a === `vmess` || a === `vless`
          ? ((l.uuid = n(o.user_id)),
            (l.cipher = n(o.security)),
            (l.flow = n(o.flow)),
            (l.alterId = Number(o.legacy === !0)))
          : a === `hysteria2`
            ? ((l.password = n(o.auth)),
              (l.up = o.bandwidth),
              (l.obfs = n(o.obfs)),
              (l[`obfs-password`] = n(o.obfs_password)))
            : a === `tuic`
              ? ((l.uuid = n(o.uuid)), (l.password = n(o.password)))
              : a === `snell`
                ? ((l.psk = n(o.psk)),
                  (l.version = o.version),
                  (l.obfs = n(o.obfs)),
                  (l[`obfs-host`] = n(o.obfs_host)))
                : a === `ssh`
                  ? ((l.username = n(o.username)),
                    (l.password = n(o.password)),
                    (l[`private-key`] = n(o.private_key)))
                  : ((a === `http` || a === `socks5`) && (l.username = n(o.username)),
                    (l.password = n(o.password))))
    const u = e(o.websocket)
    u &&
      ((l.network = `ws`),
      (l[`ws-opts`] = { path: u.path, headers: u.host === void 0 ? void 0 : { Host: u.host } }))
    const d = e(o.transport)
    d && co(l, d)
    const f = e(o.shadow_tls)
    f &&
      ((l.plugin = `shadow-tls`),
      (l[`plugin-opts`] = { host: f.sni, password: f.password, version: 3 }))
    const p = so(o.reality)
    return (p && (l[`reality-opts`] = p), l)
  }
  function uo(t) {
    const n = e(t)
    return !n || String(n.type ?? ``).length === 0 ? null : n
  }
  function $(e, t = ``) {
    if (!e) return t
    try {
      return decodeURIComponent(e)
    } catch {
      return e
    }
  }
  function fo(e) {
    return { ...e, name: e.name?.trim() || `${e.type} ${e.server}:${e.port}` }
  }
  function po(e, t) {
    const n = e.searchParams,
      r = fo({
        type: t,
        name: $(e.hash.slice(1)),
        server: e.hostname,
        port: f(e.port, n.get(`security`) === `tls` ? 443 : 0),
      })
    if (
      (e.username && (r.username = $(e.username)),
      e.password && (r.password = $(e.password)),
      t === `socks5` && e.username && !e.password)
    ) {
      const t = Y($(e.username)),
        n = t?.indexOf(`:`) ?? -1
      t &&
        n > 0 &&
        !t.slice(n + 1).includes(`:`) &&
        ((r.username = t.slice(0, n)), (r.password = t.slice(n + 1)))
    }
    for (const [e, t] of n) r[e] = t
    const i = p(n.get(`udp`))
    i != null && (r.udp = i)
    const a = p(n.get(`insecure`) ?? n.get(`allowInsecure`) ?? n.get(`allow_insecure`))
    return (
      a != null && (r[`skip-cert-verify`] = a),
      delete r.insecure,
      delete r.allowInsecure,
      delete r.allow_insecure,
      r
    )
  }
  function mo(e) {
    const t = e.slice(5),
      n = t.indexOf(`#`),
      r = n === -1 ? `` : $(t.slice(n + 1))
    n !== -1 && (t = t.slice(0, n))
    const i = t.indexOf(`?`),
      a = new URLSearchParams(i === -1 ? `` : t.slice(i + 1))
    ;(i !== -1 && (t = t.slice(0, i)), t.includes(`@`) || (t = Y(t)))
    const o = t.lastIndexOf(`@`)
    if (o === -1) throw new Error(`Shadowsocks URI is missing its server information`)
    let s = $(t.slice(0, o))
    s.includes(`:`) || (s = Y(s))
    const c = s.indexOf(`:`),
      l = new URL(`http://${t.slice(o + 1)}`),
      u = fo({
        type: `ss`,
        name: r,
        server: l.hostname,
        port: f(l.port),
        cipher: s.slice(0, c),
        password: s.slice(c + 1),
        udp: !1,
      }),
      d = p(a.get(`udp`))
    d != null && (u.udp = d)
    const m = a.get(`plugin`)
    if (m) {
      const [e, ...t] = $(m).split(`;`)
      ;((u.plugin = e),
        (u[`plugin-opts`] = Object.fromEntries(
          t.map((t) => {
            const [n, ...r] = t.split(`=`)
            if (r.length === 0) return [n, !0]
            const i = r.join(`=`)
            return [n, e === `shadow-tls` && n === `version` && /^\d+$/.test(i) ? Number(i) : i]
          }),
        )))
    }
    return u
  }
  function ho(e) {
    const [t, n = ``] = Y(e.slice(6)).split(`/?`),
      r = t.split(`:`)
    if (r.length < 6) throw new Error(`ShadowsocksR URI has too few fields`)
    const [i, a, o, s, c, ...l] = r,
      u = new URLSearchParams(n)
    return fo({
      "type": `ssr`,
      "name": u.get(`remarks`) ? Y(u.get(`remarks`) ?? ``) : ``,
      "server": i,
      "port": f(a),
      "protocol": o,
      "cipher": s,
      "obfs": c,
      "password": Y(l.join(`:`)),
      "protocol-param": u.get(`protoparam`) ? Y(u.get(`protoparam`) ?? ``) : void 0,
      "obfs-param": u.get(`obfsparam`) ? Y(u.get(`obfsparam`) ?? ``) : void 0,
    })
  }
  function go(e) {
    const t = JSON.parse(Y(e.slice(8))),
      n = String(t.net ?? `tcp`),
      r = String(t.type ?? ``),
      i = n === `tcp` && r === `http` ? `http` : n === `http` ? `h2` : n,
      a = fo({
        type: `vmess`,
        name: String(t.ps ?? ``),
        server: String(t.add ?? ``),
        port: f(t.port),
        uuid: String(t.id ?? ``),
        alterId: t.aid,
        cipher: String(t.scy ?? ``),
        network: i,
        tls: t.tls === `tls` || t.tls === !0,
        udp: !0,
      })
    if (
      (t.sni && (a.sni = String(t.sni)),
      t.fp && (a[`client-fingerprint`] = String(t.fp)),
      t.alpn && (a.alpn = String(t.alpn).split(`,`)),
      i === `ws`)
    ) {
      const e = Ji(t.path, t.ed)
      a[`ws-opts`] = {
        "path": e.path,
        "headers": t.host ? { Host: String(t.host) } : void 0,
        "max-early-data": e.maxEarlyData,
        "early-data-header-name":
          e.maxEarlyData == null ? void 0 : String(t.eh ?? `Sec-WebSocket-Protocol`),
      }
    }
    if (
      (i === `grpc` && (a[`grpc-opts`] = { "grpc-service-name": String(t.path ?? ``) }),
      i === `http` || i === `h2`)
    ) {
      const e = t.host
        ? String(t.host)
            .split(`,`)
            .map((e) => e.trim())
        : void 0
      a[`${i}-opts`] = {
        path: t.path === void 0 ? void 0 : [String(t.path)],
        ...(i === `h2` ? { host: e } : { headers: e ? { Host: e } : void 0 }),
      }
    }
    return a
  }
  function _o(e, t) {
    const n = new URL(e),
      r = n.searchParams,
      i = r.get(`type`) || `tcp`,
      a = fo({
        type: t,
        name: $(n.hash.slice(1)),
        server: n.hostname,
        port: f(n.port, 443),
        network: i,
        tls:
          t === `trojan`
            ? r.get(`security`) !== `none`
            : [`tls`, `reality`].includes(r.get(`security`) ?? ``),
        udp: !0,
      })
    t === `vless` ? (a.uuid = $(n.username)) : (a.password = $(n.username))
    const o = t === `vless` ? r.get(`encryption`) : null,
      s = r.get(`flow`),
      c = r.get(`sni`),
      l = r.get(`fp`)
    ;(o && (a.encryption = o),
      s && (a.flow = s),
      c && (a.sni = c),
      l && (a[`client-fingerprint`] = l))
    const d = r.get(`alpn`)
    d && (a.alpn = u(d))
    const m = p(r.get(`allowInsecure`) ?? r.get(`insecure`))
    if (
      (m != null && (a[`skip-cert-verify`] = m),
      r.get(`security`) === `reality` &&
        (a[`reality-opts`] = {
          "public-key": r.get(`pbk`) ?? ``,
          "short-id": r.get(`sid`) ?? ``,
          "spider-x": r.get(`spx`) ?? void 0,
        }),
      i === `ws`)
    ) {
      const e = Ji(r.get(`path`), r.get(`ed`))
      a[`ws-opts`] = {
        "path": e.path,
        "headers": r.get(`host`) ? { Host: r.get(`host`) } : void 0,
        "max-early-data": e.maxEarlyData,
        "early-data-header-name":
          e.maxEarlyData == null ? void 0 : (r.get(`eh`) ?? `Sec-WebSocket-Protocol`),
      }
    } else if (i === `grpc`)
      a[`grpc-opts`] = {
        "grpc-service-name": r.get(`serviceName`) ?? ``,
        ...(r.get(`mode`) ? { mode: r.get(`mode`) } : {}),
      }
    else if (i === `xhttp` || i === `splithttp`)
      ((a.network = `xhttp`),
        (a[`xhttp-opts`] = Object.fromEntries(
          [`host`, `path`, `mode`, `extra`].flatMap((e) => {
            const t = r.get(e)
            if (t == null) return []
            if (e !== `extra`) return [[e, t]]
            try {
              return [[e, JSON.parse(t)]]
            } catch {
              return [[e, t]]
            }
          }),
        )))
    else if (i === `httpupgrade`) {
      const e = Ji(r.get(`path`), r.get(`ed`))
      a[`httpupgrade-opts`] = {
        "host": r.get(`host`) ?? void 0,
        "path": e.path,
        "max-early-data": e.maxEarlyData,
        "early-data-header-name":
          e.maxEarlyData == null ? void 0 : (r.get(`eh`) ?? `Sec-WebSocket-Protocol`),
      }
    }
    return a
  }
  function vo(e) {
    const t = new URL(e.replace(/^hy2:/, `hysteria2:`)),
      n = po(t, `hysteria2`)
    return ((n.password = $(t.username || t.password)), n)
  }
  function yo(e) {
    const t = new URL(e),
      n = t.searchParams,
      r = po(t, `hysteria`)
    ;((r[`auth-str`] = $(t.username || t.password || n.get(`auth`)) || void 0),
      (r.protocol = n.get(`protocol`) ?? `udp`),
      (r.sni = n.get(`peer`) ?? n.get(`sni`) ?? void 0),
      (r.up = n.get(`upmbps`) ?? n.get(`up`) ?? void 0),
      (r.down = n.get(`downmbps`) ?? n.get(`down`) ?? void 0),
      (r.obfs = n.get(`obfs`) ?? void 0),
      r.alpn !== void 0 && (r.alpn = u(r.alpn)))
    for (const e of [`auth`, `peer`, `upmbps`, `downmbps`, `password`]) delete r[e]
    return r
  }
  function bo(e) {
    const t = new URL(e.replace(/^wg:/, `wireguard:`)),
      n = po(t, `wireguard`)
    return (
      (n[`private-key`] = $(t.username)),
      delete n.username,
      (n[`public-key`] =
        t.searchParams.get(`publickey`) ?? t.searchParams.get(`public-key`) ?? void 0),
      (n[`pre-shared-key`] =
        t.searchParams.get(`presharedkey`) ?? t.searchParams.get(`pre-shared-key`) ?? void 0),
      ai(n, t.searchParams.getAll(`address`)),
      (n.reserved = t.searchParams
        .get(`reserved`)
        ?.split(/[-,]/)
        .map((e) => f(e))),
      (n.mtu = f(t.searchParams.get(`mtu`), 0) || void 0),
      n
    )
  }
  function xo(e) {
    const t = po(new URL(e), `tuic`)
    return ((t.uuid = t.username), delete t.username, t)
  }
  function So(e) {
    const t = /^([a-zA-Z][\w+.-]*):\/\//.exec(e)?.[1]?.toLowerCase()
    switch (t) {
      case `ss`:
        return mo(e)
      case `ssr`:
        return ho(e)
      case `vmess`:
        return go(e)
      case `vless`:
        return _o(e, `vless`)
      case `trojan`:
        return _o(e, `trojan`)
      case `hysteria2`:
      case `hy2`:
        return vo(e)
      case `hysteria`:
        return yo(e)
      case `tuic`:
        return xo(e)
      case `wireguard`:
      case `wg`:
        return bo(e)
      case `socks`:
      case `socks5`:
        return po(new URL(e), `socks5`)
      case `http`:
      case `https`: {
        const n = po(new URL(e), `http`)
        return ((n.tls = t === `https`), n)
      }
      case `anytls`: {
        const t = po(new URL(e), `anytls`)
        return ((t.password = t.username), delete t.username, t)
      }
      default:
        return null
    }
  }
  const Co = /^[a-z][a-z0-9+.-]*:\/\//i,
    wo = /\s+(?=[a-z][a-z0-9+.-]*:\/\/)/i
  function To(e) {
    return Co.test(e) ? e.split(wo) : [e]
  }
  function Eo(e, t) {
    const n = e.size === 1 ? [...e][0] : null,
      r = n === `uri` ? `uri-list` : (n ?? `mixed`)
    return t ? `base64-${r}` : r
  }
  const Do = {
      id: `node-lines`,
      parse: ({ encoded: e, text: t }) => {
        let n = [],
          r = [],
          i = new Set()
        for (let [e, a] of t.split(/\r?\n/).entries()) {
          let t = a.trim().replace(/^\s*-\s*/, ``)
          if (!(!t || t.startsWith(`#`) || t.startsWith(`//`)))
            for (let a of To(t))
              try {
                let t = a.startsWith(`{`) ? null : ao(a),
                  o = a.startsWith(`{`) ? uo(JSON.parse(a)) : (So(a) ?? t?.node ?? null)
                ;(t && o === t.node ? i.add(t.format) : o && i.add(`uri`),
                  o
                    ? n.push({ value: o, line: e + 1 })
                    : r.push({
                        level: `warning`,
                        stage: `parse`,
                        code: `unsupported-input-line`,
                        message: `Unrecognised node format on this line.`,
                        line: e + 1,
                      }))
              } catch (t) {
                r.push({
                  level: `warning`,
                  stage: `parse`,
                  code: `invalid-input-line`,
                  message: t instanceof Error ? t.message : `Node parsing failed.`,
                  line: e + 1,
                })
              }
        }
        return { format: Eo(i, e), drafts: n, diagnostics: r }
      },
    },
    Oo = new Set([`direct`, `block`, `dns`, `selector`, `urltest`, `bridge`]),
    ko = { shadowsocks: `ss`, socks: `socks5` }
  function Ao(t) {
    const n = e(t)
    if (n) return s(n)
    if (!(typeof t != `string` || !t))
      return Object.fromEntries(
        t.split(`;`).map((e) => {
          const [t, ...n] = e.split(`=`)
          return [t, n.length > 0 ? n.join(`=`) : !0]
        }),
      )
  }
  function jo(t, r) {
    const i = e(r),
      a = n(i?.type)
    if (!(!i || !a)) {
      if (((t.network = a === `websocket` ? `ws` : a), a === `ws` || a === `websocket`)) {
        const r = Ji(i.path, i.max_early_data)
        t[`ws-opts`] = s({
          "path": r.path,
          "headers": e(i.headers),
          "max-early-data": r.maxEarlyData,
          "early-data-header-name": n(i.early_data_header_name),
        })
      } else if (a === `grpc`)
        t[`grpc-opts`] = s({
          "grpc-service-name": n(i.service_name),
          "idle-timeout": n(i.idle_timeout),
          "ping-timeout": n(i.ping_timeout),
          "permit-without-stream": o(i.permit_without_stream),
        })
      else if (a === `http`)
        t[`http-opts`] = s({
          host: d(i.host),
          path: n(i.path),
          method: n(i.method),
          headers: e(i.headers),
        })
      else if (a === `httpupgrade`) {
        const r = Ji(i.path)
        t[`httpupgrade-opts`] = s({ host: n(i.host), path: r.path, headers: e(i.headers) })
      }
    }
  }
  function Mo(t, r) {
    const i = e(r)
    if (!i) return
    if (i.enabled === !1) {
      t.tls = !1
      return
    }
    t.tls = !0
    const a = n(i.server_name),
      c = o(i.insecure),
      l = d(i.alpn),
      u = e(i.utls),
      f = e(i.reality)
    ;(a && (t.sni = a),
      c !== void 0 && (t[`skip-cert-verify`] = c),
      l && (t.alpn = l),
      n(u?.fingerprint) && (t[`client-fingerprint`] = u?.fingerprint),
      f?.enabled !== !1 &&
        (f?.public_key || f?.short_id) &&
        (t[`reality-opts`] = s({ "public-key": n(f.public_key), "short-id": n(f.short_id) })))
  }
  function No(r) {
    const a = n(r.type)
    if (!a) return null
    const s = a === `wireguard` ? (e(t(r.peers)[0]) ?? {}) : {},
      l = n(r.server ?? s.address),
      u = i(r.server_port ?? s.port)
    if (!l || !u) return null
    const d = ko[a] ?? a,
      f = c(r, d, l, u)
    if (
      (d === `ss`
        ? ((f.cipher = n(r.method)),
          (f.password = n(r.password)),
          (f.plugin = n(r.plugin)),
          (f[`plugin-opts`] = Ao(r.plugin_opts ?? r.plugin_options)))
        : d === `socks5` || d === `http`
          ? ((f.username = n(r.username)), (f.password = n(r.password)))
          : d === `vmess`
            ? ((f.uuid = n(r.uuid)),
              (f.cipher = n(r.security) ?? `auto`),
              (f.alterId = r.alter_id),
              (f[`packet-encoding`] = n(r.packet_encoding)))
            : d === `vless`
              ? ((f.uuid = n(r.uuid)),
                (f.flow = n(r.flow)),
                (f[`packet-encoding`] = n(r.packet_encoding)))
              : [`trojan`, `hysteria2`, `tuic`, `anytls`].includes(d)
                ? (f.password = n(r.password))
                : d === `hysteria`
                  ? ((f[`auth-str`] = n(r.auth_str)),
                    (f.obfs = n(r.obfs)),
                    (f.up = r.up ?? r.up_mbps),
                    (f.down = r.down ?? r.down_mbps))
                  : d === `ssh`
                    ? ((f.username = n(r.user)),
                      (f.password = n(r.password)),
                      (f[`private-key`] = n(r.private_key)))
                    : d === `wireguard` &&
                      ((f[`private-key`] = n(r.private_key)),
                      (f[`public-key`] = n(r.peer_public_key ?? s.public_key)),
                      (f[`pre-shared-key`] = n(r.pre_shared_key ?? s.pre_shared_key)),
                      (f.reserved = Array.isArray(r.reserved ?? s.reserved)
                        ? (r.reserved ?? s.reserved)
                        : void 0),
                      (f.mtu = r.mtu),
                      Array.isArray(s.allowed_ips) && (f[`allowed-ips`] = s.allowed_ips.join(`,`)),
                      ai(f, r.local_address ?? r.address)),
      d === `hysteria2`)
    ) {
      const t = e(r.obfs)
      ;((f.obfs = n(t?.type)),
        (f[`obfs-password`] = n(t?.password)),
        (f.up = r.up_mbps),
        (f.down = r.down_mbps))
    } else
      d === `tuic` &&
        ((f.uuid = n(r.uuid)),
        (f[`congestion-controller`] = n(r.congestion_control)),
        (f[`udp-relay-mode`] = n(r.udp_relay_mode)),
        (f[`zero-rtt`] = o(r.zero_rtt_handshake)))
    return (Mo(f, r.tls), jo(f, r.transport), f)
  }
  function Po(t, r) {
    const i = n(t?.detour),
      a = i === void 0 ? void 0 : r.get(i)
    return !t || !a
      ? t
      : {
          ...t,
          server: t.server ?? a.server,
          server_port: t.server_port ?? a.server_port,
          detour: void 0,
          plugin: `shadow-tls`,
          plugin_opts: {
            host: n(e(a.tls)?.server_name),
            password: n(a.password),
            version: a.version,
          },
        }
  }
  function Fo(r) {
    const i = e(r)
    return [...t(i?.outbounds), ...t(i?.endpoints)].some((t) => Boolean(n(e(t)?.type)))
  }
  function Io(r) {
    const i = [],
      a = e(r),
      o = [...t(a?.outbounds), ...t(a?.endpoints)],
      s = new Map()
    for (const t of o) {
      const r = e(t),
        i = n(r?.tag)
      r && i && n(r.type) === `shadowtls` && s.set(i, r)
    }
    return {
      drafts: o.flatMap((t, r) => {
        const a = Po(e(t), s),
          o = n(a?.type)
        if (o === `shadowtls` || (o && Oo.has(o))) return []
        const c = a ? No(a) : null
        return c
          ? [{ value: c, index: r }]
          : (i.push({
              level: `warning`,
              stage: `parse`,
              code: `invalid-sing-box-outbound`,
              message: `sing-box outbound #${r + 1} is unsupported or missing server/server_port; skipped.`,
            }),
            [])
      }),
      diagnostics: i,
    }
  }
  const Lo = {
    id: `sing-box`,
    parse: (e) => {
      let t = e.document()
      if (!Fo(t)) return null
      let { drafts: n, diagnostics: r } = Io(t)
      return { format: `sing-box`, drafts: n, diagnostics: r }
    },
  }
  function Ro(e) {
    if (!(typeof e != `string` || !e))
      return Object.fromEntries(
        e.split(`;`).flatMap((e) => {
          const [t, ...n] = e.split(`=`)
          return t ? [[t, n.length > 0 ? n.join(`=`) : !0]] : []
        }),
      )
  }
  function zo(e) {
    if (!e.trim().startsWith(`ssd://`)) return null
    const t = []
    try {
      const n = JSON.parse(Y(e.trim().slice(6)))
      return {
        format: `ssd`,
        drafts: (n.servers ?? []).flatMap((e, r) => {
          const i = String(e.server ?? ``),
            a = Number(e.port ?? n.port)
          if (!i || !Number.isInteger(a) || a <= 0)
            return (
              t.push({
                level: `warning`,
                stage: `parse`,
                code: `invalid-ssd-node`,
                message: `SSD node #${r + 1} is missing server or port; skipped.`,
              }),
              []
            )
          const o = String(e.plugin ?? n.plugin ?? ``) || void 0,
            s = {
              type: `ss`,
              name: String(e.remarks ?? `${n.airport ?? `SSD`} ${r + 1}`),
              server: i,
              port: a,
              cipher: String(e.encryption ?? n.encryption ?? ``),
              password: String(e.password ?? n.password ?? ``),
              udp: !0,
            }
          return (
            o && ((s.plugin = o), (s[`plugin-opts`] = Ro(e.plugin_options ?? n.plugin_options))),
            [{ value: s, index: r }]
          )
        }),
        diagnostics: t,
      }
    } catch (error) {
      return {
        format: `ssd`,
        drafts: [],
        diagnostics: [
          {
            level: `error`,
            stage: `parse`,
            code: `invalid-ssd`,
            message:
              error instanceof Error
                ? `SSD subscription could not be parsed: ${error.message}`
                : `SSD subscription could not be parsed.`,
          },
        ],
      }
    }
  }
  const Bo = { id: `ssd`, parse: ({ text: e }) => zo(e) }
  function Vo(e) {
    if (Array.isArray(e)) return e
    if (!e || typeof e != `object`) return null
    const t = e
    return Array.isArray(t.proxies)
      ? t.proxies
      : Array.isArray(t.outbounds)
        ? t.outbounds.filter((e) => e && typeof e == `object`)
        : null
  }
  const Ho = {
      id: `structured`,
      parse: ({ text: t, document: n }) => {
        let r = n()
        if (r === null) return null
        let i = Vo(r)
        if (!i) return null
        let a = !1,
          o = i.map((t, n) => {
            let r = uo(t),
              i = r === null ? lo(t) : null
            return (i && (a = !0), { value: r ?? i ?? e(t) ?? {}, index: n })
          })
        return {
          format: a ? `egern` : t.startsWith(`{`) || t.startsWith(`[`) ? `json` : `yaml`,
          drafts: o,
          diagnostics: [],
        }
      },
    },
    Uo = new Set([`freedom`, `blackhole`, `dns`, `loopback`]),
    Wo = { shadowsocks: `ss`, socks: `socks5` }
  function Go(t, r) {
    const i = e(r)
    if (!i) return
    const a = n(i.method) ?? n(i.network) ?? `raw`,
      c = a === `raw` || a === `tcp` ? `tcp` : a === `websocket` ? `ws` : a === `mkcp` ? `kcp` : a
    if (((t.network = c), c === `ws`)) {
      const r = e(i.wsSettings),
        a = Ji(r?.path, r?.maxEarlyData)
      t[`ws-opts`] = s({
        "path": a.path,
        "headers": e(r?.headers) ?? void 0,
        "max-early-data": a.maxEarlyData,
        "early-data-header-name": n(r?.earlyDataHeaderName),
      })
    } else if (c === `grpc`) {
      const r = e(i.grpcSettings)
      t[`grpc-opts`] = s({
        "grpc-service-name": n(r?.serviceName),
        "multi-mode": o(r?.multiMode),
        "idle-timeout": r?.idle_timeout,
        "health-check-timeout": r?.health_check_timeout,
      })
    } else if (c === `xhttp`) t[`xhttp-opts`] = e(i.xhttpSettings) ?? {}
    else if (c === `httpupgrade`) {
      const r = e(i.httpupgradeSettings),
        a = Ji(r?.path, r?.maxEarlyData)
      t[`httpupgrade-opts`] = s({
        "host": n(r?.host),
        "path": a.path,
        "headers": e(r?.headers) ?? void 0,
        "max-early-data": a.maxEarlyData,
        "early-data-header-name": n(r?.earlyDataHeaderName),
      })
    } else c === `kcp` && (t[`kcp-opts`] = e(i.kcpSettings) ?? {})
    const l = n(i.security)
    if (l === `tls`) {
      const r = e(i.tlsSettings)
      ;((t.tls = !0),
        (t.sni = n(r?.serverName)),
        (t[`skip-cert-verify`] = o(r?.allowInsecure)),
        (t.alpn = d(r?.alpn)),
        (t[`client-fingerprint`] = n(r?.fingerprint)))
    } else if (l === `reality`) {
      const r = e(i.realitySettings)
      ;((t.tls = !0),
        (t.sni = n(r?.serverName)),
        (t[`client-fingerprint`] = n(r?.fingerprint)),
        (t[`reality-opts`] = s({
          "public-key": n(r?.publicKey),
          "short-id": n(r?.shortId),
          "spider-x": n(r?.spiderX),
        })))
    }
  }
  function Ko(t) {
    const r = e(t.settings),
      a = n(r?.address),
      o = i(r?.port)
    return a && o ? [{ server: a, port: o, user: r }] : []
  }
  function qo(r, a) {
    const o = e(r.settings)
    return o
      ? a === `vmess` || a === `vless`
        ? t(o.vnext).flatMap((r) => {
            const a = e(r),
              o = n(a?.address),
              s = i(a?.port)
            if (!o || !s) return []
            const c = t(a?.users)
            return (c.length > 0 ? c : [{}]).flatMap((t) => {
              const n = e(t)
              return n ? [{ server: o, port: s, user: n }] : []
            })
          })
        : t(o.servers).flatMap((r) => {
            const a = e(r),
              o = n(a?.address),
              s = i(a?.port)
            if (!a || !o || !s) return []
            const c = t(a.users)
            return c.length > 0
              ? c.flatMap((t) => {
                  const n = e(t)
                  return n ? [{ server: o, port: s, user: { ...a, ...n } }] : []
                })
              : [{ server: o, port: s, user: a }]
          })
      : []
  }
  function Jo(e) {
    const t = n(e.protocol)
    if (!t) return []
    const r = Wo[t] ?? t,
      i = [...Ko(e), ...qo(e, t)]
    return i.map(({ server: t, port: a, user: o }, s) => {
      const l = c(e, r, t, a)
      return (
        i.length > 1 && (l.name = `${l.name} ${s + 1}`),
        r === `vmess`
          ? ((l.uuid = n(o.id)), (l.cipher = n(o.security) ?? `auto`), (l.alterId = o.alterId))
          : r === `vless`
            ? ((l.uuid = n(o.id)), (l.flow = n(o.flow)), (l.encryption = n(o.encryption) ?? `none`))
            : r === `ss`
              ? ((l.cipher = n(o.method)), (l.password = n(o.password)))
              : r === `trojan`
                ? (l.password = n(o.password))
                : (r === `socks5` || r === `http`) &&
                  ((l.username = n(o.user)), (l.password = n(o.pass))),
        Go(l, e.streamSettings),
        l
      )
    })
  }
  function Yo(r) {
    return t(e(r)?.outbounds).some((t) => Boolean(n(e(t)?.protocol)))
  }
  function Xo(r) {
    const i = []
    return {
      drafts: t(e(r)?.outbounds).flatMap((t, r) => {
        const a = e(t),
          o = n(a?.protocol)
        if (o && Uo.has(o)) return []
        const s = a ? Jo(a) : []
        return s.length > 0
          ? s.map((e) => ({ value: e, index: r }))
          : (i.push({
              level: `warning`,
              stage: `parse`,
              code: `invalid-xray-outbound`,
              message: `Xray outbound #${r + 1} is unsupported or missing connection parameters; skipped.`,
            }),
            [])
      }),
      diagnostics: i,
    }
  }
  const Zo = [
    La,
    za,
    Bo,
    Lo,
    {
      id: `v2ray`,
      parse: (n) => {
        let r = n.document()
        if (
          !t(e(r)?.outbounds).some((t) => {
            let n = e(e(t)?.settings)
            return Array.isArray(n?.vnext) || Array.isArray(n?.servers)
          })
        )
          return null
        let { drafts: i, diagnostics: a } = Xo(r)
        return { format: `v2ray`, drafts: i, diagnostics: a }
      },
    },
    {
      id: `xray`,
      parse: (e) => {
        let t = e.document()
        if (!Yo(t)) return null
        let { drafts: n, diagnostics: r } = Xo(t)
        return { format: `xray`, drafts: n, diagnostics: r }
      },
    },
    Ja,
    Ho,
    Do,
  ]
  function Qo(e) {
    for (const t of Zo) {
      const n = t.parse(e)
      if (n) return n
    }
    return { format: `mixed`, drafts: [], diagnostics: [] }
  }
  function $o(e) {
    returnBoolean(
      n(String(e.type ?? ``)) &&
        n(String(e.server ?? e.address ?? ``)) &&
        i(e.port ?? e.server_port),
    )
  }
  function es(e) {
    const t = []
    return {
      drafts: e.filter((e) => {
        if ($o(e.value)) return !0
        const n = e.index === void 0 ? `` : ` #${e.index + 1}`
        return (
          t.push({
            level: `warning`,
            stage: `parse-validation`,
            code: `incomplete-node`,
            message: `Node${n} is missing type, server or port; skipped.`,
            ...(e.line === void 0 ? {} : { line: e.line }),
          }),
          !1
        )
      }),
      diagnostics: t,
    }
  }
  function ts(e) {
    const t = Qo(Ia(e)),
      n = es(t.drafts)
    return {
      nodes: n.drafts.map((e) => Pa(e.value)),
      detectedFormat: t.format,
      diagnostics: [...t.diagnostics, ...n.diagnostics],
    }
  }
  function ns(e) {
    try {
      return { error: ``, nodes: ts(e).nodes }
    } catch (error) {
      return { error: error instanceof Error ? error.message : `解析失败`, nodes: [] }
    }
  }
  self.addEventListener(`message`, (e) => {
    const { content: t, id: n } = e.data,
      r = { ...ns(t), id: n }
    self.postMessage(r)
  })
})()
