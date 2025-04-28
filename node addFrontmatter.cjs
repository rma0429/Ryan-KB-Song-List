const fs = require("fs");
const path = require("path");

// 修改這裡成你的資料夾
const folderPath = "./content/Ryan KB-Song List";

const frontmatter = `---
tags: []
style: ""
bpm: ""
---
`;

function addFrontmatterToFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (content.startsWith("---")) {
    // 已經有frontmatter，不處理
    console.log(`[跳過] 已有Frontmatter: ${filePath}`);
    return;
  }
  const newContent = `${frontmatter}\n${content}`;
  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`[新增] Frontmatter完成: ${filePath}`);
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath); // 遞迴子資料夾
    } else if (path.extname(fullPath) === ".md") {
      addFrontmatterToFile(fullPath);
    }
  }
}

walkDir(folderPath);