import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  const { singerkey, style, bpm } = fileData.frontmatter || {}

  return (
    <article class={classString}>
      <div class="meta-line">
        {singerkey && <span class="meta-inline">Singer&Key: {singerkey}</span>}
        {style && <span class="meta-inline">Style: {style}</span>}
        {bpm && <span class="meta-inline">BPM: {bpm}</span>}
      </div>
      {content}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor