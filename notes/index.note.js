const notes = [
  'graphic',
  'generator',
]

export const $layout = `
  <div>
    <h1>${document.title}</h1>
    <div class=description></div>
    <div class=noteButtons></div>
    <div class=noteTitle></div>
    <div class=noteBodyLoader style=display:none></div>
    <div class=noteBody></div>
  </div>
`

export const currentNote_mutable = notes[0]

export function description(html) {
  return html`
    <p>select a note below
  `
}

export function noteButtons(html, currentNote_mutable) {
  const container = html`<div/>`
  for (const note of notes) {
    const button = getNoteButton(note)
    container.appendChild(button)
  }
  return container

  function getNoteButton(note) {
    const button = html`<button>${note}</button>`
    button.onclick = () => {
      currentNote_mutable.value = note
    }
    return button
  }
}

export function noteTitle(md, currentNote) {
  return md`# ${currentNote}`
}

let currentModule = null

export async function noteBodyLoader($el, currentNote, loadNote) {
  if (!$el || !currentNote) return

  if (currentModule != null) {
    currentModule.runtime.dispose()
    currentModule = null

    const el = $el.querySelector('.noteBody')
    if (el) el.innerHTML = ''
  }

  currentModule = await loadNote(`${import.meta.url}/../${currentNote}.note.js`, $el, '.noteBody')
}
