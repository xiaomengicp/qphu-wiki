import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * QPHU Wiki 配置
 * 基于 Quartz 4.0
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "QPHU Wiki",
    pageTitleSuffix: " | 影子世界",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "qphu-wiki", // 部署时改成你的仓库名或自定义域名
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif SC", // 中文衬线字体
        body: "Noto Sans SC",    // 中文无衬线字体
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f5",      // 背景：温暖的米白
          lightgray: "#e8e4df",
          gray: "#9a8f82",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#5c4d7d",  // 强调色：深紫（影子感）
          tertiary: "#7a6b9e",
          highlight: "rgba(92, 77, 125, 0.12)",
          textHighlight: "#fff8dc88",
        },
        darkMode: {
          light: "#1a1a2e",      // 背景：深蓝黑（梦境感）
          lightgray: "#2d2d44",
          gray: "#646464",
          darkgray: "#b8b8b8",
          dark: "#e8e8e8",
          secondary: "#9d8ec9",  // 强调色：淡紫
          tertiary: "#b4a7d6",
          highlight: "rgba(157, 142, 201, 0.15)",
          textHighlight: "#b3aa0088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
