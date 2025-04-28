import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  const { tags = [], style = "", bpm = "" } = fileData.frontmatter ?? {}

  return (
    <article class={classString}>
      <div class="meta-block">
        {/* Singer/Key */}
        {tags.length > 0 && (
          <div class="meta-line">
            <span class="meta-label">🎤 Singer&Key:</span>
            {tags.map((tag: string) => (
              <span class="tag-badge">{tag}</span>
            ))}
          </div>
        )}

        {/* Style */}
        <div class="meta-line">
          <span class="meta-label">🎵 Style:</span>
          {style ? (
            <span class="meta-inline">{style}</span>
          ) : (
            <span class="meta-inline">[ ]</span>
          )}
        </div>

        {/* BPM */}
        {bpm && (
          <div class="meta-line">
            <span class="meta-label">🧭 BPM:</span>
            <span class="meta-inline">{bpm}</span>
          </div>
        )}
      </div>

      {content}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor