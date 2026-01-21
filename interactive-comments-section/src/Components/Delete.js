import { useEffect } from 'react'
import Button from './Button'
import styles from './modules/Delete.module.css'
function Delete({onConfirm,onCancel}) {

    useEffect(()=>{
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onCancel(null)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return ()=> document.removeEventListener('keydown',handleKeyDown)
    },[onCancel])

    return(
        <> 
            <div className={styles.background}></div>
            <section  
            className={styles.delete}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            >
                <h2 id='delete-title'>Delete comment</h2>
                <p id='delete-description'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <small>Press ESC to cancel</small>

                <div className={styles.containerButtons}>
                    <Button className={styles.cancel} onClick={()=> onCancel(null)}>
                        No, cancel
                    </Button>
                    <Button className={styles.confirm}  onClick={onConfirm}>
                        Yes, delete
                    </Button>
                </div>
            </section>
        </>
       
    )}export default Delete