/**
 * RUBRIC-BASED CONTENT EVALUATOR
 * Gut Health x Hyrox Blog Posts
 *
 * Usage:
 *   node eval.mjs content/posts/gut-quit-station-3.md
 *   node eval.mjs content/posts/learning-agentic-ai-20-hours.md
 *   node eval.mjs                  ← evaluates all posts
 */

import fs from 'fs'
import path from 'path'

// ─── RUBRIC DEFINITION ───────────────────────────────────────────────────────

const RUBRIC = {
  scientific_accuracy: {
    label: 'Scientific Accuracy',
    max: 3,
    criteria: {
      0: 'Factual errors, unsubstantiated claims, or misleading statements',
      1: 'Generally correct but no sources or evidence mentioned',
      2: 'Correct claims with references implied or paraphrased',
      3: 'Accurate claims with explicit peer-reviewed citations or named studies',
    },
  },
  india_specificity: {
    label: 'India Specificity',
    max: 2,
    criteria: {
      0: 'Generic or Western-centric (US brands, American foods, £/$ prices)',
      1: 'Partially India-specific — some Indian context but gaps remain',
      2: 'Fully India-specific: dahi, ghee, kanji, ₹ prices, Indian brands, Indian race context',
    },
  },
  athlete_relevance: {
    label: 'Athlete Relevance',
    max: 3,
    criteria: {
      0: 'Generic health advice with no sport-specific angle',
      1: 'Mentions sports or fitness but not functional fitness or Hyrox',
      2: 'Specific to endurance or functional fitness athletes',
      3: 'Directly applicable to Hyrox race conditions, stations, or training blocks',
    },
  },
  tone_match: {
    label: 'Tone Match',
    max: 2,
    criteria: {
      0: 'Fluffy, motivational, or generic wellness voice — no precision',
      1: 'Mostly direct but has filler phrases or unnecessary hedging',
      2: 'Military-precise: no fluff, every sentence earns its place, direct action framing',
    },
  },
  actionability: {
    label: 'Actionability',
    max: 2,
    criteria: {
      0: 'Interesting but gives reader nothing concrete to do',
      1: 'Some implied actions — reader has to figure out the next step themselves',
      2: 'Clear, specific, immediate actions the reader can take today',
    },
  },
  completeness: {
    label: 'Completeness',
    max: 2,
    criteria: {
      0: 'Misses core elements of the topic — significant gaps',
      1: 'Covers main points but lacks depth on key sections',
      2: 'Comprehensive — no important angle left uncovered for this topic',
    },
  },
}

const MAX_TOTAL = Object.values(RUBRIC).reduce((s, r) => s + r.max, 0) // 14

// ─── VERDICT THRESHOLDS ───────────────────────────────────────────────────────

function verdict(total) {
  if (total >= 12) return { label: '✅ PUBLISH', color: '\x1b[32m', advice: 'Ready. Ship it.' }
  if (total >= 9)  return { label: '⚠️  REVISE MINOR', color: '\x1b[33m', advice: 'Good bones. Fix the flagged dimensions.' }
  if (total >= 6)  return { label: '🔧 REVISE MAJOR', color: '\x1b[33m', advice: 'Needs significant work before publishing.' }
  return             { label: '🚫 REWRITE', color: '\x1b[31m', advice: 'Start over with the rubric in hand.' }
}

// ─── RULE-BASED SCORER ────────────────────────────────────────────────────────

function scoreContent(content) {
  const text = content.toLowerCase()
  const words = content.split(/\s+/).length
  const sentences = content.split(/[.!?]+/).filter(Boolean).length
  const avgWordPerSentence = words / sentences

  // 1. Scientific Accuracy (0-3)
  const citationPatterns = /et al\.|pubmed|journal of|study found|research shows|\(\d{4}\)|doi:|ncbi|peer.review/i
  const evidenceWords = /research|study|evidence|clinical|data|findings|demonstrated|shown to|according to/gi
  const evidenceCount = (content.match(evidenceWords) || []).length
  let scientific_accuracy = 0
  let scientific_feedback = ''
  if (citationPatterns.test(content)) {
    scientific_accuracy = 3
    scientific_feedback = 'Contains explicit citations or named studies — maximum score.'
  } else if (evidenceCount >= 3) {
    scientific_accuracy = 2
    scientific_feedback = `References evidence ${evidenceCount} times but no formal citations — add one named study to reach 3.`
  } else if (evidenceCount >= 1) {
    scientific_accuracy = 1
    scientific_feedback = 'Mentions research generally but needs more evidence grounding — add specific study references.'
  } else {
    scientific_accuracy = 0
    scientific_feedback = 'No evidence or research mentioned — add at least one named study or citation.'
  }

  // 2. India Specificity (0-2)
  const indiaFoods = /dahi|ghee|kanji|rajma|paneer|roti|idli|dosa|curd|hyrox india|₹|rupee|mumbai|delhi|bengaluru|bangalore|indian/gi
  const indiaCount = (content.match(indiaFoods) || []).length
  let india_specificity = 0
  let india_feedback = ''
  if (indiaCount >= 4) {
    india_specificity = 2
    india_feedback = `Strongly India-specific — found ${indiaCount} Indian references (foods, places, currency).`
  } else if (indiaCount >= 1) {
    india_specificity = 1
    india_feedback = `Has some Indian context (${indiaCount} references) but could use more — add Indian foods, brands, or ₹ prices.`
  } else {
    india_specificity = 0
    india_feedback = 'No India-specific content detected — add Indian foods, context, or pricing to localise.'
  }

  // 3. Athlete Relevance (0-3)
  const hyroxTerms = /hyrox|skierg|sled push|sled pull|wall ball|burpee broad jump|station \d|race day|race morning/gi
  const fitnessTerms = /endurance|crossfit|functional fitness|ocr|marathon|triathlon|training block|vo2|lactate/gi
  const athleteTerms = /athlete|performance|race|competition|training|workout|session/gi
  const hyroxCount = (content.match(hyroxTerms) || []).length
  const fitnessCount = (content.match(fitnessTerms) || []).length
  let athlete_relevance = 0
  let athlete_feedback = ''
  if (hyroxCount >= 3) {
    athlete_relevance = 3
    athlete_feedback = `Highly Hyrox-specific — ${hyroxCount} race/station references. Maximum relevance.`
  } else if (hyroxCount >= 1 || fitnessCount >= 2) {
    athlete_relevance = 2
    athlete_feedback = `Good functional fitness relevance. Add more Hyrox-specific language (station names, race scenarios) to reach 3.`
  } else if ((content.match(athleteTerms) || []).length >= 2) {
    athlete_relevance = 1
    athlete_feedback = 'Mentions athletes but not functional fitness or Hyrox specifically — add sport-specific context.'
  } else {
    athlete_relevance = 0
    athlete_feedback = 'No athlete-specific framing — needs Hyrox or endurance sport context throughout.'
  }

  // 4. Tone Match (0-2) — military-precise = short sentences, no fluff
  const fluffPhrases = /it's important to|you should consider|it can be helpful|remember to|don't forget|make sure to|as we know|needless to say|at the end of the day|in order to/gi
  const fluffCount = (content.match(fluffPhrases) || []).length
  let tone_match = 0
  let tone_feedback = ''
  if (fluffCount === 0 && avgWordPerSentence < 18) {
    tone_match = 2
    tone_feedback = `Tight, direct writing — avg ${Math.round(avgWordPerSentence)} words/sentence, zero filler phrases detected.`
  } else if (fluffCount <= 2 && avgWordPerSentence < 25) {
    tone_match = 1
    tone_feedback = `Mostly direct but has ${fluffCount} filler phrase(s) and avg ${Math.round(avgWordPerSentence)} words/sentence — tighten further.`
  } else {
    tone_match = 0
    tone_feedback = `${fluffCount} filler phrases and avg ${Math.round(avgWordPerSentence)} words/sentence — significantly too wordy or vague.`
  }

  // 5. Actionability (0-2)
  const actionSignals = /\d+\s*(hours?|minutes?|ml|g|mg|days?|weeks?|times?)|per (hour|day|session|week)|before (training|race|session)|within \d+/gi
  const actionCount = (content.match(actionSignals) || []).length
  const imperativeVerbs = /^(take|drink|eat|avoid|skip|add|remove|run|do|start|stop|cut|reduce|increase)/gmi
  const imperativeCount = (content.match(imperativeVerbs) || []).length
  let actionability = 0
  let actionability_feedback = ''
  if (actionCount >= 4 || imperativeCount >= 3) {
    actionability = 2
    actionability_feedback = `Strong actionability — ${actionCount} specific measurements and ${imperativeCount} direct action statements.`
  } else if (actionCount >= 1 || imperativeCount >= 1) {
    actionability = 1
    actionability_feedback = `Some specifics (${actionCount} measurements, ${imperativeCount} imperatives) but reader needs clearer next steps.`
  } else {
    actionability = 0
    actionability_feedback = 'No specific actions, measurements, or directives — add exact numbers and clear instructions.'
  }

  // 6. Completeness (0-2)
  const headingCount = (content.match(/^#{1,3} .+/gm) || []).length
  let completeness = 0
  let completeness_feedback = ''
  if (words >= 600 && headingCount >= 3) {
    completeness = 2
    completeness_feedback = `Comprehensive — ${words} words across ${headingCount} sections. Good coverage.`
  } else if (words >= 300 && headingCount >= 1) {
    completeness = 1
    completeness_feedback = `Decent length (${words} words, ${headingCount} section(s)) but could go deeper — aim for 600+ words with 3+ sections.`
  } else {
    completeness = 0
    completeness_feedback = `Too brief (${words} words, ${headingCount} sections) — needs more depth and structure.`
  }

  // Build result object
  const scores = { scientific_accuracy, india_specificity, athlete_relevance, tone_match, actionability, completeness }
  const feedback = { scientific_accuracy: scientific_feedback, india_specificity: india_feedback, athlete_relevance: athlete_feedback, tone_match: tone_feedback, actionability: actionability_feedback, completeness: completeness_feedback }

  // Top fix: lowest scoring dimension relative to max
  const pcts = Object.entries(scores).map(([k, v]) => ({ k, pct: v / RUBRIC[k].max }))
  pcts.sort((a, b) => a.pct - b.pct)
  const weakest = pcts[0].k
  const top_fix = `Lowest score: ${RUBRIC[weakest].label}. ${feedback[weakest]}`

  const total = Object.values(scores).reduce((s, v) => s + v, 0)
  const publish_blocker = total < 9
    ? `Score is ${total}/${MAX_TOTAL} — below publishable threshold. Fix ${RUBRIC[weakest].label} first.`
    : 'NONE'

  return { scores, feedback, top_fix, publish_blocker }
}

// ─── RENDERER ─────────────────────────────────────────────────────────────────

function renderScorecard(filename, result, rubric) {
  const { scores, feedback, top_fix, publish_blocker } = result
  const total = Object.values(scores).reduce((s, v) => s + v, 0)
  const v = verdict(total)
  const reset = '\x1b[0m'
  const bold = '\x1b[1m'
  const dim = '\x1b[2m'
  const red = '\x1b[31m'
  const line = '─'.repeat(56)

  console.log(`\n${bold}${line}${reset}`)
  console.log(`${bold} EVAL: ${path.basename(filename)}${reset}`)
  console.log(`${line}`)

  // Scores table
  for (const [key, dim] of Object.entries(rubric)) {
    const score = scores[key] ?? 0
    const bar = '█'.repeat(score) + '░'.repeat(dim.max - score)
    const pct = Math.round((score / dim.max) * 100)
    const color = pct === 100 ? '\x1b[32m' : pct >= 50 ? '\x1b[33m' : red
    console.log(
      ` ${dim.label.padEnd(22)} ${color}${bar}${reset} ${String(score).padStart(1)}/${dim.max}  ${dim}${feedback[key]}${reset}`
    )
  }

  console.log(`${line}`)

  // Total
  const totalPct = Math.round((total / MAX_TOTAL) * 100)
  console.log(` ${bold}TOTAL SCORE:${reset}           ${v.color}${bold}${total}/${MAX_TOTAL} (${totalPct}%)${reset}`)
  console.log(` ${bold}VERDICT:${reset}               ${v.color}${bold}${v.label}${reset}`)
  console.log(` ${v.advice}`)
  console.log(`${line}`)

  // Fixes
  console.log(` ${bold}TOP FIX:${reset}`)
  console.log(`   ${top_fix}`)
  console.log(``)
  if (publish_blocker && publish_blocker !== 'NONE') {
    console.log(` ${bold}${red}PUBLISH BLOCKER:${reset}`)
    console.log(`   ${publish_blocker}`)
  } else {
    console.log(` ${bold}\x1b[32mNO PUBLISH BLOCKER${reset}`)
  }
  console.log(`${line}\n`)
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

function evalPost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const content = raw.replace(/^---[\s\S]*?---\n/, '')
  process.stdout.write(` Evaluating ${path.basename(filePath)}... done\n`)
  const result = scoreContent(content)
  renderScorecard(filePath, result, RUBRIC)
  return result
}

function main() {
  const arg = process.argv[2]
  let files = []

  if (arg) {
    files = [arg]
  } else {
    const dir = 'content/posts'
    files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(dir, f))
  }

  if (files.length === 0) { console.log('No posts found.'); return }

  console.log(`\n\x1b[1mRUBRIC-BASED CONTENT EVALUATOR\x1b[0m`)
  console.log(`Gut Health x Hyrox · ${files.length} post(s)\n`)

  for (const file of files) evalPost(file)
}

main()
