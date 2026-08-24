import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import { adminToken } from "../support/admin-token"

/**
 * The admin session, end to end: how a password gets verified before it is committed, what it opens,
 * what happens when the API turns it down, and how it leaves. These are the paths no other kind of test
 * in this repository can reach —
 * `tests/unit` has no DOM and `tests/integration` has no browser — and every one of them is a hinge
 * the session hangs on rather than a permutation.
 *
 * They run against the dev server, so they exercise the server render and the hydration that has to
 * match it. That pairing is the point: the key is seeded from sessionStorage while the module is
 * evaluated (`src/features/session/token.ts`), which is only safe because the reads pin hydration to
 * the value the server rendered.
 */

const STORAGE_KEY = "cuttle:token"
const GOOD_KEY = adminToken()
const BAD_KEY = "not-the-admin-key"

/**
 * Puts a key in storage before the document loads. It has to be before: the session seeds itself
 * while its module is evaluated, so a key written after that is a key this page load never sees.
 *
 * The script runs on every document load in the page, and on none of the client-side navigations —
 * which is what lets a test disconnect and then assert that storage stayed empty. A restored password is
 * unverified until the gate's server probe accepts it.
 */
async function armSession(page: Page, key: string) {
  await page.addInitScript(
    ({ storageKey, value }: { storageKey: string; value: string }) =>
      sessionStorage.setItem(storageKey, value),
    { storageKey: STORAGE_KEY, value: key },
  )
}

function storedKey(page: Page) {
  return page.evaluate((storageKey: string) => sessionStorage.getItem(storageKey), STORAGE_KEY)
}

/** The header's connection button, which is also the session's state in one word. */
function connectionState(page: Page) {
  return page.getByRole("banner").getByRole("button", { name: /连接$/ })
}

function keyField(page: Page) {
  return page.getByLabel("访问密码")
}

function submitButton(page: Page) {
  return page.getByRole("button", { name: "进入", exact: true })
}

function disconnectButton(page: Page) {
  return page.getByRole("button", { name: "断开连接" })
}

function adminNavEntry(page: Page) {
  return page.getByRole("banner").getByRole("link", { name: "订阅管理" })
}

function adminPageHeading(page: Page) {
  return page.getByRole("heading", { name: "全部订阅" })
}

async function openPanel(page: Page) {
  await connectionState(page).click()
  await expect(keyField(page)).toBeVisible()
}

test("a stored key opens the admin page on a hard reload, without a hydration complaint", async ({
  page,
}) => {
  const complaints: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") complaints.push(message.text())
  })
  page.on("pageerror", (error) => complaints.push(`uncaught: ${error.message}`))

  await armSession(page, GOOD_KEY)
  await page.goto("/subscriptions")

  await expect(adminPageHeading(page)).toBeVisible()
  await expect(connectionState(page)).toHaveText("已连接")

  // The server rendered with no key and the hydration render has to match that HTML, one frame before
  // the seeded key takes over. A mismatch here is the one way the seeding could be wrong.
  expect(complaints.filter((text) => /hydrat|did not match|#418|#423|#425/i.test(text))).toEqual([])
  expect(complaints.filter((text) => text.startsWith("uncaught:"))).toEqual([])
})

test("a wrong password stays in the panel until the server accepts it", async ({ page }) => {
  await page.goto("/")

  await expect(connectionState(page)).toHaveText("未连接")
  await expect(adminNavEntry(page)).toBeHidden()

  await openPanel(page)
  await keyField(page).fill(BAD_KEY)
  await submitButton(page).click()

  await expect(keyField(page)).toBeVisible()
  await expect(page.getByText("Unauthorized.")).toBeVisible()
  await expect(connectionState(page)).toHaveText("未连接")

  await keyField(page).fill(GOOD_KEY)
  await submitButton(page).click()
  await expect(keyField(page)).toBeHidden()
  await expect(connectionState(page)).toHaveText("已连接")

  await adminNavEntry(page).click()
  await expect(page).toHaveURL("/subscriptions")
  await expect(adminPageHeading(page)).toBeVisible()
})

test("disconnecting closes the panel and leaves the admin page", async ({ page }) => {
  await armSession(page, GOOD_KEY)
  await page.goto("/subscriptions")
  await expect(adminPageHeading(page)).toBeVisible()

  await openPanel(page)
  await expect(page).toHaveURL("/subscriptions?connect=true")
  await disconnectButton(page).click()

  // One navigation does both jobs: `/` is the one page that works without a key, and leaving for it
  // drops the search param the panel lives in.
  await expect(page).toHaveURL("/")
  await expect(keyField(page)).toBeHidden()
  await expect(connectionState(page)).toHaveText("未连接")
  await expect(adminNavEntry(page)).toBeHidden()
  await expect(page.getByRole("dialog", { name: "已断开连接" })).toBeVisible()
  expect(await storedKey(page)).toBeNull()
})

test("a stored wrong password is rejected before protected content renders", async ({ page }) => {
  await armSession(page, BAD_KEY)
  await page.goto("/")

  await expect(keyField(page)).toBeVisible()
  await expect(connectionState(page)).toHaveText("未连接")
  await expect(adminNavEntry(page)).toBeHidden()
  expect(await storedKey(page)).toBeNull()

  await keyField(page).fill(GOOD_KEY)
  await submitButton(page).click()
  await expect(connectionState(page)).toHaveText("已连接")
  await expect(adminNavEntry(page)).toBeVisible()
})

test("going back closes the panel instead of leaving the page", async ({ page }) => {
  await armSession(page, GOOD_KEY)
  await page.goto("/subscriptions")

  await openPanel(page)
  await expect(page).toHaveURL("/subscriptions?connect=true")

  await page.goBack()

  await expect(keyField(page)).toBeHidden()
  await expect(page).toHaveURL("/subscriptions")
  await expect(adminPageHeading(page)).toBeVisible()
})
