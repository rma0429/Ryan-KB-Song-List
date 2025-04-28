import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
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

        return (
          <li class="section-li">
            <div class="section">
              <div class="meta-line">
                <h3 class="title-inline">
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
                {page.frontmatter?.singerkey && (
                  <span class="meta-inline">| Singer&Key: {page.frontmatter.singerkey}</span>
                )}
                {page.frontmatter?.style && (
                  <span class="meta-inline">| Style: {page.frontmatter.style}</span>
                )}
                {page.frontmatter?.bpm && (
                  <span class="meta-inline">| BPM: {page.frontmatter.bpm}</span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.meta-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.title-inline {
  margin: 0;
}

.meta-inline {
  font-size: 0.9em;
  color: #555;
}
`
