import Button from './Button'
import TimeAgo from 'react-timeago';
import styles from './modules/CommentCard.module.css'
import {useState } from 'react'

function CommentCard({obj,currentUser,editingId,action}) {

    const {id,createdAt,score,content,user} = obj
    const {like,deslike,update,edit,delete:remove,reply} = action
    const isCurrentUser = user.username === currentUser.username
    const [editText, setEditText] = useState(content);

    return(
        <article className={`${styles.card} card
        ${obj.parentId && 'cardIsReply'}`}>
            <div className={`${styles.cardLikes} ${styles.cardDisplayOk}`}>
                <Button
                onClick={!isCurrentUser ? ()=>like(id) : undefined} aria-label="Upvote comment">
                    <img src={'./images/icon-plus.svg'} alt="like score"/>
                </Button>
                {score}
                <Button
                onClick={!isCurrentUser ?()=> deslike(id) : undefined} aria-label="Downvote comment">
                <img src={'./images/icon-minus.svg'} alt="remove like"/>
                </Button>
            </div>
            <div className={styles.cardHeader}>
                <header>
                    <img src={user?.image?.png} 
                    alt={user.username}/>
                    <p>
                        {user.username}
                        {isCurrentUser && <span> you</span>}
                    </p>
                    <div className={styles.cardTime}>
                        <time>
                            <TimeAgo date={createdAt}/>
                        </time>
                    </div>
                </header>
                {editingId === id ?
                    (
                        <div className={styles.cardUpdate}>
                            <textarea rows={4}
                            value={editText} onChange={(e)=> setEditText(e.target.value)}
                            />
                        </div>
                    ):( 
                        <p className={styles.content}>{content}</p>
                    )
                }
            </div>
            <section className={styles.cardSection}>
                <div className={`${styles.cardLikes} ${styles.cardDisplay}`}>
                    <Button
                    onClick={!isCurrentUser ? ()=>like(id) : undefined} aria-label="Upvote comment">
                     <img src={'./images/icon-plus.svg'} alt="like score"/>
                    </Button>
                    {score}
                    <Button
                    onClick={!isCurrentUser ?()=> deslike(id) : undefined} aria-label="Downvote comment">
                    <img src={'./images/icon-minus.svg'} alt="remove like"/>
                    </Button>
                </div>
                <div className={styles.cardButtons}>
                    {
                        isCurrentUser ? (
                            editingId === id ?(
                            <Button className={"cardButton"}
                            onClick={()=> update(editingId, editText)}>
                                update
                            </Button>):
                            (<div className={styles.cardButtonsUser}>
                                <Button onClick={()=> remove(id)}
                                className={styles.cardDelete}>
                                    <img src='./images/icon-delete.svg' alt="Delete comment"/>
                                    <span>Delete</span>
                                </Button>
                                <Button onClick={()=> edit(id)}
                                    className={styles.cardEdit}>
                                    <img src='./images/icon-edit.svg' alt="Edit comment"/>
                                    <span>Edit</span>
                                </Button>
                            </div>)
                        ):(
                            <Button onClick ={()=>reply(obj)}
                            className={styles.reply}
                            >
                                <img src='./images/icon-reply.svg' alt="Reply to comment"/> <span>Reply</span>
                            </Button>
                        )
                    }
                </div>
            </section>
        </article>
    )}export default CommentCard