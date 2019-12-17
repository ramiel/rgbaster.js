import {
  getImageData,
  getCounts
} from './helpers'

interface Opts {
  ignore?: string[]
  scale?: number
  skipTransparentPixels?: boolean
  raw?: boolean
}

const defaultOpts: Opts = {
  ignore: [],
  scale: 1,
  raw: false
}

export default async function (src: string, opts: Opts = defaultOpts): Promise<{ color: string | number[], count: number }[] > {
  opts = { ...defaultOpts, ...opts }

  const {
    ignore, // for example, to ignore white and black:  [ 'rgb(0,0,0)', 'rgb(255,255,255)' ]
    scale,   // 0 = best performance, lowest fidelity
            // 1 = best fidelity, worst performance
    raw
  } = opts

  if (scale > 1 || scale <= 0) {
    console.warn(`You set scale to ${scale}, which isn't between 0-1. This is either pointless (> 1) or a no-op (≤ 0)`)
  }

  const data = await getImageData(src, scale)
  return getCounts(data, ignore, raw)
}
