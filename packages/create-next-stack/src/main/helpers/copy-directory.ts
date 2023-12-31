import fs from "fs/promises"
import path from "path"
import { makeDirectory } from "./io"

export const copyDirectory = async (
  src: string,
  dest: string
): Promise<void> => {
  const [entries] = await Promise.all([
    fs.readdir(src, { withFileTypes: true }),
    makeDirectory(dest),
  ])

  await Promise.all(
    entries.map((entry) => {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      return entry.isDirectory()
        ? copyDirectory(srcPath, destPath)
        : fs.copyFile(srcPath, destPath)
    })
  )
}
