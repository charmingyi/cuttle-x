import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import { adminToken } from "../support/admin-token"

/**
 * The node QR surface, which is the one dialog on the node page whose open state is not a URL.
 *
 * It shares `useDeferredClose` with every other sheet and dialog here, and that hook only gives the
 * close back through `onOpenChangeComplete`. A surface that consumes the hook without wiring that
 * callback never reports its close, so the record stays set and the flag stays held — the dialog
 * cannot be opened a second time in the same page load. That is not a styling detail: the operator
 * has to scan one node, close, and get to the next one.
 */

const STORAGE_KEY = "cuttle:token"

async function armSession(page: Page, key: string) {
  await page.addInitScript(
    ({ storageKey, value }: { storageKey: string; value: string }) =>
      sessionStorage.setItem(storageKey, value),
    { storageKey: STORAGE_KEY, value: key },
  )
}

function qrDialog(page: Page) {
  return page.getByRole("dialog", { name: "节点二维码" })
}

test("the QR dialog opens again after it has been closed", async ({ page }) => {
  await armSession(page, adminToken())
  await page.goto("/nodes")

  const rows = page.getByRole("button", { name: /^二维码 / })
  await expect(rows.first()).toBeVisible()

  await rows.first().click()
  await expect(qrDialog(page)).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(qrDialog(page)).toBeHidden()

  // The second open is the whole test: a surface that never reported its close is open in name only.
  await rows.first().click()
  await expect(qrDialog(page)).toBeVisible()

  // And it still closes from the header button rather than only through the keyboard.
  await qrDialog(page).getByRole("button", { name: "Close" }).click()
  await expect(qrDialog(page)).toBeHidden()

  await rows.nth(1).click()
  await expect(qrDialog(page)).toBeVisible()
})
