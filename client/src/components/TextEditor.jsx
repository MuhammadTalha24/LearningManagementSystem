import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ input, setInput }) => {
    const [value, setValue] = useState('')
    const handleChange = (content) => {
        setInput({ ...input, description: content })
    }
    return (
        <ReactQuill theme='snow' value={input.description} onChange={handleChange} />
    )
}

export default TextEditor