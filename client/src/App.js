import React, { useState } from 'react'
import './App.css'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import copy from 'copy-to-clipboard'

function Word({ word }) {
  const [clicked, setClicked] = useState(false)
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setClicked(true)
    copy(word)
    setTimeout(function () {
      setActive(true)
      setTimeout(function () {
        setActive(false)
        setTimeout(function () {
          setClicked(false)
        }, 100)
      }, 1200)
    }, 1)
  }

  return (
    <div className="wb-row">
      <span className="wb-word" onClick={handleClick}>
        {word}
      </span>
      {clicked && (
        <AiOutlineCheckCircle
          className={active ? 'icon-check fadeIn' : 'icon-check fadeOut'}
        />
      )}
    </div>
  )
}

function WordBundle({ title, words }) {
  return (
    <>
      <div className="wb-title">{title}</div>
      <div className="wb-content">
        {words.map((w) => {
          return <Word key={w} word={w} />
        })}
      </div>
    </>
  )
}

function WordBundleForm() {
  const [title, setTitle] = useState('')
  const [word, setWord] = useState('')
  const [wordList, setWordList] = useState([])

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleWordChange = (event) => setWord(event.target.value)

  const handleKeyPress = (event) => {
    let code = event.keyCode || event.which
    if (code === 13 && word !== '' && !wordList.includes(word)) {
      let trimmed = word.trim()
      setWordList(wordList.concat(trimmed))
      setWord('')
    }
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <div className="wbf">
      <div className="wbf-main">
        <>
          <label className="wbf-label">
            <span>T I T L E</span>
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <label className="wbf-label">
            <span>W O R D S</span>
            <input
              type="text"
              value={word}
              placeholder="*separated by Enter key"
              onChange={handleWordChange}
              onKeyPress={handleKeyPress}
            />
          </label>
        </>
        <div>
          <button className="wbf-submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
      <div className="wbf-preview">
        <WordBundle title={title} words={wordList} />
      </div>
    </div>
  )
}

function WordBundleFormToggler() {
  const [visible, setVisible] = useState(false)

  const handleClick = () => setVisible(!visible)

  return (
    <>
      <div className="wbf-toggler">
        <button
          className={visible ? 'wbf-leaf active' : 'wbf-leaf'}
          onClick={handleClick}
        >
          add a word bundle
        </button>
      </div>
      {visible && <WordBundleForm />}
    </>
  )
}

function App() {
  return (
    <div id="app">
      <WordBundleFormToggler />
    </div>
  )
}

export default App
