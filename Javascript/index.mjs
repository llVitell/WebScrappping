import { firefox } from "playwright"

const browser = await firefox.launch({ headless: true })

const page = await browser.newPage()

const url = 'https://listado.mercadolibre.com.pe'
const itemToFilter = 'celular'

await page.goto(`${url}/${itemToFilter}`)

await page.waitForSelector('.poly-card')

const products = await page.$$eval('.poly-card', items => {
    return items.map(item => {
        const title = item.querySelector('.poly-component__title').innerText
        const price = item.querySelector('.poly-price__current').innerText.replace(/\n/g, ' ')
        const image = item.querySelector('.poly-component__picture').getAttribute('data-src')
        const url = item.querySelector('.poly-component__title a').getAttribute('href')
        return { title , price, image, url}
    })
})

console.log(products)

await browser.close()