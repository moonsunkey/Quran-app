// scripts/release-today.js
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const scheduleFile = path.join(__dirname, '..', 'release-schedule.json')
const homePageFile = path.join(__dirname, '..', 'src', 'pages', 'HomePage.jsx')
const msgFile      = path.join(__dirname, '..', '.release-message')

const schedule = JSON.parse(fs.readFileSync(scheduleFile, 'utf8'))

if (!schedule.startDate) {
  console.log('No startDate set in release-schedule.json — nothing to release.')
  fs.writeFileSync(msgFile, 'chore: scheduled run — no start date set')
  process.exit(0)
}

const start = new Date(schedule.startDate)
const today = new Date()
today.setHours(0, 0, 0, 0)
start.setHours(0, 0, 0, 0)

if (today < start) {
  console.log(`Release starts on ${schedule.startDate} — not yet.`)
  fs.writeFileSync(msgFile, 'chore: scheduled run — not started yet')
  process.exit(0)
}

const dayNumber = Math.floor((today - start) / 86400000) + 1
console.log(`Day ${dayNumber} of release schedule`)

const phases  = schedule.phases
let pending   = schedule.surahs.filter(s => s.status === 'pending')
let toRelease = []
let day = 1

outer:
for (const phase of phases) {
  const diffLevel     = phases.indexOf(phase) + 1
  const phaseSurahs   = pending.filter(s => s.difficulty === diffLevel)
  for (let i = 0; i < phaseSurahs.length; i += phase.perDay) {
    const batch = phaseSurahs.slice(i, i + phase.perDay)
    if (day <= dayNumber) toRelease.push(...batch)
    day++
    if (day > dayNumber) break outer
  }
}

const alreadyReleased = new Set(schedule.surahs.filter(s => s.status === 'released').map(s => s.id))
const newToday = toRelease.filter(s => !alreadyReleased.has(s.id))

if (newToday.length === 0) {
  console.log('No new surahs to release today.')
  fs.writeFileSync(msgFile, 'chore: scheduled run — no new surahs today')
  process.exit(0)
}

console.log(`Releasing today: ${newToday.map(s => s.id).join(', ')}`)

const updatedSurahs = schedule.surahs.map(s =>
  newToday.find(n => n.id === s.id)
    ? { ...s, status: 'released', releasedOn: today.toISOString().split('T')[0] }
    : s
)
schedule.surahs = updatedSurahs
fs.writeFileSync(scheduleFile, JSON.stringify(schedule, null, 2))

let homePage = fs.readFileSync(homePageFile, 'utf8')
for (const surah of newToday) {
  const pattern = new RegExp(`(\\{ id:'${surah.id}',[^}]*?)status:\\s*'coming-soon'`, 'g')
  const updated = homePage.replace(pattern, `$1status: 'available'`)
  if (updated !== homePage) {
    homePage = updated
    console.log(`  ✓ Unlocked: ${surah.id}`)
  } else {
    console.log(`  ⚠ Could not find '${surah.id}' in HomePage.jsx — add it manually`)
  }
}
fs.writeFileSync(homePageFile, homePage)

const names = newToday.map(s => s.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
fs.writeFileSync(msgFile, `Release surahs: ${names.join(', ')}`)
console.log('Done.')
