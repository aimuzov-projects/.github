// Баннеры профиля и infra-site-template: `node profile/banner-src/render.mjs`.
// Картинки проектов и Playwright берутся из соседних клонов организации.
// Знак и надпись слева -- из текущего banner*.jpg, правую половину перекрывает мозаика.
import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const assets = path.resolve(dir, '../assets')
const workspace = path.resolve(dir, '../../..')
const img = path.join(dir, 'img')

const require = createRequire(path.join(workspace, 'infra-site-template/package.json'))
const { chromium } = require('playwright')

const projects = [
	'codenames',
	'community-taplist',
	'prestige-logist',
	'shkatova-psychologist',
	'sublya',
	'infra-server',
	'infra-site-kit',
]

// В репозиториях русский баннер называется `banner.jpg`, английский -- `banner.en.jpg`.
const suffix = { ru: '', en: '.en' }

mkdirSync(img, { recursive: true })
for (const lang of ['en', 'ru']) {
	for (const name of projects) {
		copyFileSync(path.join(workspace, name, `.github/assets/banner${suffix[lang]}.jpg`), path.join(img, `${name}.${lang}.jpg`))
	}
	copyFileSync(path.join(assets, `banner${suffix[lang]}.jpg`), path.join(img, `profile.${lang}.jpg`))
}

const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] })
const page = await browser.newPage({ viewport: { width: 2560, height: 960 } })

// Сначала карточка шаблона: она нужна мозаике как одна из картинок.
for (const lang of ['en', 'ru']) {
	await page.goto(`file://${dir}/template.html?lang=${lang}`)
	await page.evaluate(() => document.fonts.ready)
	await page.waitForTimeout(300)
	const file = path.join(assets, `infra-site-template${suffix[lang]}.jpg`)
	await page.screenshot({ path: file, type: 'jpeg', quality: 92 })
	copyFileSync(file, path.join(img, `infra-site-template.${lang}.jpg`))
}

for (const lang of ['en', 'ru']) {
	await page.goto(`file://${dir}/banner.html?lang=${lang}`)
	// Фон правой части -- цвет прежнего баннера у шва, чтобы стык не был виден.
	await page.evaluate(async (lang) => {
		const image = new Image()
		image.src = `img/profile.${lang}.jpg`
		await image.decode()
		const canvas = document.createElement('canvas')
		canvas.width = 2560
		canvas.height = 960
		const ctx = canvas.getContext('2d')
		ctx.drawImage(image, 0, 0)
		const [r, g, b] = ctx.getImageData(1100, 900, 1, 1).data
		document.body.style.setProperty('--bg', `rgb(${r}, ${g}, ${b})`)
	}, lang)
	await page.waitForTimeout(500)
	await page.screenshot({ path: path.join(assets, `banner${suffix[lang]}.jpg`), type: 'jpeg', quality: 90 })
}

await browser.close()
