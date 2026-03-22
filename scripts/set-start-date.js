// scripts/set-start-date.js
// Run this once when all surahs are reviewed and ready:
//   node scripts/set-start-date.js 2025-06-01
// Or to start tomorrow:
//   node scripts/set-start-date.js tomorrow

const fs   = require('fs')
const path = require('path')

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

// Count what the schedule looks like
const pending    = schedule.surahs.filter(s => s.status === 'pending')
const beginners  = pending.filter(s => s.difficulty === 1)
const inter      = pending.filter(s => s.difficulty === 2)
const advanced   = pending.filter(s => s.difficulty === 3)

const daysB = Math.ceil(beginners.length / 3)
const daysI = Math.ceil(inter.length / 2)
const daysA = advanced.length

console.log(`✓ Start date set to: ${dateArg}`)
console.log(``)
console.log(`Release timeline:`)
console.log(`  ${beginners.length} beginner surahs  @ 3/day = ${daysB} days`)
console.log(`  ${inter.length} intermediate surahs @ 2/day = ${daysI} days`)
console.log(`  ${advanced.length} advanced surahs    @ 1/day = ${daysA} days`)
console.log(`  Total: ~${daysB + daysI + daysA} days to complete all 114 surahs`)
console.log(``)
console.log(`Estimated completion: ${(() => {
  const end = new Date(dateArg)
  end.setDate(end.getDate() + daysB + daysI + daysA)
  return end.toISOString().split('T')[0]
})()}`)
console.log(``)
console.log(`Now commit release-schedule.json and push.`)
