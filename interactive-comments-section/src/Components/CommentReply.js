import { useState } from "react"
import Button from "./Button"
import styles from './modules/CommentReply.module.css'

function CommentReply({name,currentUser,onReply}) {

    const[text, setText] = useState("")
    function handleSubmit(e) {
        e.preventDefault()

        const newName = name ? `@${name} `:''
        if (!text.trim()) return 
        onReply(newName + text)
        setText('')
    }
    return(
        <form className={`${styles.replyForm} ${name? 'card cardIsReply':''}`}
         onSubmit={handleSubmit}>
            <img className={styles.replyImg}
            src={currentUser?.image?.png} 
            alt={`Avatar of ${currentUser?.username}`}/> 

            <label htmlFor="comment-input" className="sr-only">
                {name ? `Reply to ${name}` : 'Write a comment'}
            </label>

            <textarea 
            rows={3}
            id="comment-input"
            type="text" 
            value={text} 
            onChange={(e)=> setText(e.target.value)}
            placeholder={name ?`reply to @${name}`:"Add a comment"}/>
            
            <Button type="submit" disabled ={!text.trim()} className={"cardButton"}>
                <span>{name?'Reply':'Send'}</span>
            </Button>
        </form>
    )}export default CommentReply