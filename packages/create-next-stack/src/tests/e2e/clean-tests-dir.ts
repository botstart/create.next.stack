import fs from "fs/promises"
import path from "path"
;(async () => {
  process.env["TEST"] = "true"

  const testsDirectory = path.resolve(
    __dirname,
    "../../../../../../create-next-stack-tests"
  )

  try {
    const stat = await fs.stat(testsDirectory)
    if (!stat.isDirectory()) {
      console.error(
        "Path lead to a file instead of a directory. Path:",
        testsDirectory
      )
      return
    }
  } catch (error) {
    console.log("Tests directory not found.")
    return
  }

  const subDirectories = await fs.readdir(testsDirectory)

  if (subDirectories.length === 0) {
    console.log("Tests directory already empty.")
    return
  }

  const total = subDirectories.length
  let completedCount = 0
  console.log(`${completedCount}/${total} deleted.`)
  const promises = subDirectories.map(async (subDirectory) => {
    const path = `${testsDirectory}/${subDirectory}`
    await fs.rm(path, { recursive: true })
    completedCount++
    console.log(`${completedCount}/${total} deleted.`)
  })
  await Promise.all(promises)
})()
