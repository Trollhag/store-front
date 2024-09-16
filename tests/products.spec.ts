import { test, expect } from '@playwright/test'
import { Category, ProductsApiResponse } from '@/lib/services/productsApi'

test.describe('Products', () => {
  test('automatically loads 20 products on load', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId(/^ProductGrid:Product:.*$/)).toHaveCount(20)
  })

  test('loads 20 more products on scroll to end', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId(/^ProductGrid:Product:.*$/)).toHaveCount(20)

    // Scroll to load more product
    await page.getByTestId('InfiniteScroll:Detector').scrollIntoViewIfNeeded()
    await expect(page.getByTestId(/^ProductGrid:Product:.*$/)).toHaveCount(40)

    // Expect not to have loaded same products twice
    const firstProductTestId = await page
      .getByTestId(/^ProductGrid:Product:.*$/)
      .first()
      .getAttribute('data-testid')
    await expect(firstProductTestId).toBeTruthy()
    await expect(page.getByTestId(String(firstProductTestId))).toHaveCount(1)
  })

  test('replace existing products and load only selected category', async ({ page }) => {
    await page.goto('/')
    const categoriesResponse = await page.waitForResponse(/\/products\/categories/)
    const categories = (await categoriesResponse.json()) as Category[]
    // Pick random category
    const category = categories[Math.floor(Math.random() * categories.length)]

    // Select category
    const categorySelect = page.getByTestId('CategorySelect')
    await categorySelect.click()
    const categoryOption = page.getByTestId(`CategorySelect:Option:${category.slug}`)
    await categoryOption.scrollIntoViewIfNeeded()
    await categoryOption.click()

    // Wait for product to load
    const response = await page.waitForResponse(/\/products\/category/)
    const data = (await response.json()) as ProductsApiResponse
    for (const product of data.products) {
      await expect(page.getByTestId(`ProductGrid:Product:${product.id}`)).toHaveCount(1)
      await expect(page.getByTestId(`ProductGrid:Product:${product.id}`).getByTestId('Product:Category')).toHaveText(
        category.name,
      )
    }
  })

  test('show only specific products when searching', async ({ page }) => {
    await page.goto('/')
    const response = await page.waitForResponse(/\/products\?/)
    const data = (await response.json()) as ProductsApiResponse
    const product = data.products[0]

    await page.getByTestId('Search').fill(product.title)
    await page.waitForResponse(/\/products\/search/)
    await expect(page.getByTestId(/^ProductGrid:Product:.*$/)).toHaveCount(1)
  })
})
