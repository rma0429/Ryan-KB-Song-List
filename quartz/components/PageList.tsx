import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export function byDateAndAlphabetical(cfg: GlobalConfiguration) {
  return (f1: QuartzPluginData, f2: QuartzPluginData) => {
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        const style = page.frontmatter?.style ?? ""
        const bpm = page.frontmatter?.bpm ?? ""

        return (
          <li class="list-item">
            <div class="section-line">
              <h3 class="title-line">
                <a href={resolveRelative(fileData.slug!, page.slug!)} class="title-link">
                  {title}
                </a>
              </h3>

              <div class="meta-line">
                {style && (
                  <span class="meta-inline">{style}</span>
                )}
                {bpm && (
                  <span class="meta-inline">{bpm}</span>
                )}
                {tags.length > 0 && (
                  <span class="meta-inline">{tags.join(" ")}</span>
                )}
              </div>

              <hr class="section-divider" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// 🔥 這邊注意 這段字串包起來，結尾有反引號，不能漏
PageList.css = `
ul.section-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li.list-item {
  padding: 12px 0;
}

h3.title-line {
  margin: 0 0 6px 0;
}

a.title-link {
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

div.meta-line {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 6px;
}

span.meta-inline {
  background: #333;
  color: white;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 1em;
}

hr.section-divider {
  border: none;
  border-top: 1px solid var(--gray);
  margin: 8px 0 0 0;
}
`