import { loadNote, Library } from '../shnort.js'

const { DOM } = Library

export const $body = `
  <div>
    <h1>${document.title}</h1>
    <div class=description></div>
    <div class=noteButtons></div>
    <div class=noteTitle></div>
    <div class=noteBody></div>
  </div>
`

const notes = [
  'graphic',
  'generator',
]

export const currentNoteMutableInit = notes[0]

export function description(html) {
  return html`
    <p>select a note below
  `
}

export function noteButtons(html, currentNote, currentNoteMutable) {
  const container = html`<div/>`
  for (const note of notes) {
    const button = getNoteButton(note)
    container.appendChild(button)
  }
  return container

  function getNoteButton(note) {
    const button = html`<button>${note}</button>`
    button.onclick = () => {
      currentNoteMutable.value = note
    }
    return button
  }
}

export function noteTitle(md, currentNote) {
  return md`# ${currentNote}`
}

export function noteBody($el, currentNote) {
  //@ts-ignore
  loadNote(`./${currentNote}.note.js`, import.meta.url, $el, '.noteBody')
}
