import { runCommand } from "../../../main/helpers/run-command"
import { logTestError, logTestInfo } from "../test-logging"

/**
 * If not set already, sets Git name and email so `git commit` doesn't fail during create-next-app
 * Missing git name and email is mainly a problem in CI/CD environments
 */
export const setGitNameAndEmailIfMissing = async (): Promise<void> => {
  try {
    await runCommand("git", ["config", "--global", "user.name"])
      .then((result) => {
        logTestInfo(`user.name found: ${result.stdout}`)
      })
      .catch(async () => {
        logTestInfo(`user.name didn't exist. Setting user.name="Test user"`)
        await runCommand("git", [
          "config",
          "--global",
          "user.name",
          "Test user",
        ])
      })
    await runCommand("git", ["config", "--global", "user.email"])
      .then((result) => {
        logTestInfo(`user.email found: ${result.stdout}`)
      })
      .catch(async () => {
        logTestInfo(
          `user.email didn't exist. Setting user.email="test-user@create-next-stack.com"`
        )
        await runCommand("git", [
          "config",
          "--global",
          "user.email",
          "test-user@create-next-stack.com",
        ])
      })
  } catch (error) {
    logTestError("An error occurred while setting git name and email.")
    throw error
  }
}
