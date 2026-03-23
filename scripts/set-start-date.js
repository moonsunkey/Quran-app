// scripts/set-start-date.js
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scheduleFile = path.join(__dirname, '..', 'release-schedule.json')
const schedule = JSON.parse(fs.readFileSync(scheduleFile, 'utf8'))

let dateArg = process.argv[2]
if (!dateArg) {
  console.log('Usage: node scripts/set-start-date.js YYYY-MM-DD')
  console.log('       node scripts/set-start-date.js tomorrow')
  process.exit(1)
}

if (dateArg === 'tomorrow') {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  dateArg = d.toISOString().split('T')[0]
}

schedule.startDate = dateArg
fs.writeFileSync(scheduleFile, JSON.stringify(schedule, null, 2))

const pending   = schedule.surahs.filter(s => s.status === 'pending')
const beginners = pending.filter(s => s.difficulty === 1)
const inter     = pending.filter(s => s.difficulty === 2)
const advanced  = pending.filter(s => s.difficulty === 3)
const daysB = Math.ceil(beginners.length / 3)
const daysI = Math.ceil(inter.length / 2)
const daysA = advanced.length

console.log(`✓ Start date set to: ${dateArg}`)
console.log(`\nRelease timeline:`)
console.log(`  ${beginners.length} beginner surahs  @ 3/day = ${daysB} days`)
console.log(`  ${inter.length} intermediate surahs @ 2/day = ${daysI} days`)
console.log(`  ${advanced.length} advanced surahs    @ 1/day = ${daysA} days`)
console.log(`  Total: ~${daysB + daysI + daysA} days`)

const end = new Date(dateArg)
end.setDate(end.getDate() + daysB + daysI + daysA)
console.log(`\nEstimated completion: ${end.toISOString().split('T')[0]}`)
console.log(`\nNow commit release-schedule.json and push.`)
