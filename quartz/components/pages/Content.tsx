import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  // 確保每個欄位存在且是正確型別
  const Tags = Array.isArray(fileData.frontmatter?.Tags) ? fileData.frontmatter?.Tags : []
  const style = fileData.frontmatter?.style ?? ""
  const bpm = fileData.frontmatter?.bpm ?? ""

  return (
    <article class={classString}>
      <div class="meta-block">
        {/* Singer&Key */}
        {Tags.length > 0 && (
          <div class="meta-line">
            <span class="meta-label">🎤 Singer&Key:</span>
            {Tags.map((tag: string) => (
              <span class="tag-badge">{tag}</span>
            ))}
          </div>
        )}

        {/* Style */}
        <div class="meta-line">
          <span class="meta-label">🎵 Style:</span>
          <span class="meta-inline">{style || "[ ]"}</span>
        </div>

        {/* BPM */}
        <div class="meta-line">
          <span class="meta-label">🧭 BPM:</span>
          <span class="meta-inline">{bpm || "--"}</span>
        </div>

        {/* 分隔線 */}
        <hr style="margin: 1em 0; border: 0; border-top: 1px solid var(--gray);" />
      </div>

      {content}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor