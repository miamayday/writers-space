import React, { useState } from 'react'
import './App.css'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { FaUndoAlt } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

function cleanInput(word) {
  return word.trim().replace(/\s\s+/g, ' ')
}

function Word({ word, remove }) {
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
      <span>remove</span>
      {clicked && (
        <AiOutlineCheckCircle
          className={active ? 'icon-check fadeIn' : 'icon-check fadeOut'}
        />
      )}
    </div>
  )
}

function WordOnEdit(props) {
  const [word, setWord] = useState(props.word)
  const [input, setInput] = useState(props.word)
  const [edit, setEdit] = useState(false)

  const toggleEdit = () => setEdit(!edit)
  const undoEdit = () => setInput(word)

  const handleChange = (event) => setInput(event.target.value)
  const handleRemove = () => props.remove(props.word)

  const handleKeyPress = (event) => {
    let code = event.keyCode || event.which
    if (code === 13) {
      if (input !== '') {
        let cleaned = cleanInput(input)
        setWord(cleaned)
        setEdit(false)
        setInput(cleaned)
        props.edit(props.word, cleaned)
      } else {
        setEdit(false)
        setInput(word)
      }
    }
  }

  return (
    <div className={edit ? 'wb-row active' : 'wb-row'}>
      {edit ? (
        <span className="wb-input">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <FaUndoAlt className="input-icon" onClick={undoEdit} />
        </span>
      ) : (
        <span className="wb-word edit">{word}</span>
      )}
      <MdEdit className="icon edit" onClick={toggleEdit} />
      <TiDelete className="icon delete" onClick={handleRemove} />
    </div>
  )
}

function WordBundlePreview({ title, words, editWord, removeWord }) {
  return (
    <>
      <div className="wb-title">{title}</div>
      <div className="wb-content">
        {words.map((w) => {
          return (
            <WordOnEdit key={w} word={w} edit={editWord} remove={removeWord} />
          )
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
      setWordList(wordList.concat(cleanInput(word)))
      setWord('')
    }
  }

  const editWord = (word, value) => {
    console.log('edit', word, 'to', value)
    let index = wordList.indexOf(word)
    let newList = wordList
    newList[index] = value
    setWordList(newList)
    console.log(newList)
  }

  const removeWord = (word) => {
    console.log('remove', word)
    let newList = wordList.filter((w) => w !== word)
    setWordList(newList)
    console.log(newList)
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
        <WordBundlePreview
          title={title}
          words={wordList}
          editWord={editWord}
          removeWord={removeWord}
        />
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
