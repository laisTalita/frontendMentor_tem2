import {useReducer, useState} from "react";
import data from './data/data.json'
import CommentCard from "./Components/CommentCard";
import CommentReply from "./Components/CommentReply";
import Delete from "./Components/Delete";

let initialState = data.comments

function reducer(list,action) {
  if (action.type ==='LIKE'){

  return list.map(item =>{
      if(item.id === action.payload && item.vote === 0) {
        return{
        ...item, score: item.score +1, vote:1
      }}
      return{
      ...item,
      replies : item.replies.map(reply =>{
        if (reply.id === action.payload && reply.vote === 0) {
          return { ...reply, score: reply.score + 1, vote: 1 }
        }
        return reply
      })}
        
  })}
  if (action.type ==='DESLIKE'){
    return list.map(item =>{
      if(item.id === action.payload && item.vote === 1) {
        return{
        ...item, score: item.score - 1, vote:0
      }}
      return{
        ...item,
        replies : item.replies.map(reply =>{
          if (reply.id === action.payload && reply.vote === 1) {
            return { ...reply, score: reply.score -1, vote: 0 }
          }
          return reply
        })
      }
  })}
  if (action.type ==='REPLY'){
    const newReply={
      id:crypto.randomUUID(), 
      content: action.payload.reply,
      createdAt: new Date(),
      score: Math.floor(Math.random()*6) ,
      vote:0,
      replyingTo: action.payload.replyingTo,
      user: data.currentUser,
      parentId: action.payload.parentId
    }
    
    return list.map(comment => {
    if (comment.id === action.payload.parentId) {
      return {
        ...comment,
        replies: [...comment.replies, newReply]
      }
    }

    return comment
  })
  }
  if (action.type ==='EDIT'){
    return list.map(item =>{
       if (item.id === action.payload.commentID){
          return{
            ... item, 
            content: action.payload.text
          }
       }
       return {
          ...item,
          replies : item.replies.map(reply =>{
            if (action.payload.commentID === reply.id) {
              return{
                ...reply,
                content : action.payload.text
              }
            }
             return reply; 
          })
       }
    })
  }
  if (action.type ==='DELETE'){
    return list
    .filter(item =>
      item.id !== action.payload.commentID
    )
    .map(item =>({
      ...item,
      replies: item.replies.filter(
        reply => reply.id !== action.payload.commentID
      ) 
    }))
  }
  if (action.type ==='POST') {
     const newReply={
      id:crypto.randomUUID(), 
      content: action.payload.newComment,
      createdAt: new Date(),
      score: Math.floor(Math.random()*6) ,
      vote:0,
      user: data.currentUser,
      replies: []
    }
    return [...list, newReply]
  }
}
function App() {

const [list, dispatch] = useReducer(reducer,initialState);
const [replyingToId, setReplyingToId] = useState(null)
const [editingId, setEditingId] = useState(null)
const [deleteID, setDeleteID] = useState(null)

function like(id) {
  dispatch({type:"LIKE" , payload: id})
}
function deslike(id) {
  dispatch({type:"DESLIKE", payload:id})
}
function onReply(reply) {
  dispatch({type:"REPLY", 
    payload:{
      parentId: replyingToId.parentId ?? replyingToId.id, 
      replyingTo: replyingToId.user.username,
      reply: reply
  }})
 setReplyingToId(null)
}
function onUpdate(id, text) {
  if (!text) return
  dispatch({type:'EDIT',
    payload:{
     commentID: id,
     text: text
    }
  })
  setEditingId(null)
}
function onDelete(id){
dispatch({type:'DELETE',
   payload:{
     commentID: id
   }
})
 setDeleteID(null)
}
function newReply(text){
  dispatch({type:'POST',
    payload:{
      newComment: text
    }
  })
}
const actions= {
  like,
  deslike,
  update : onUpdate,
  edit: setEditingId,
  delete: setDeleteID,
  reply: setReplyingToId,
} 
  return (
    
      <main className="App">
        {deleteID && (
        <Delete onConfirm={()=>onDelete(deleteID)} onCancel={setDeleteID}/>
        )}
        {list.map(comment => (
          <article key={comment.id}>
            <CommentCard 
            obj={comment}
            currentUser={data.currentUser} 
            editingId={editingId} 
            action={actions}/>

                {comment?.replies.map(reply =>(
                  <article key={reply.id}>
                    <CommentCard 
                    obj={reply}                  
                    currentUser={data.currentUser}
                    editingId={editingId} 
                    action={actions}/>

                    {replyingToId?.id === reply.id &&(
                        <CommentReply 
                        name={reply?.user?.username} 
                        currentUser={data.currentUser}
                        onReply={onReply}/>
                      )}
                  </article>
                ))
                }
            {replyingToId?.id === comment.id &&(
              <CommentReply 
              name={comment?.user?.username} 
              currentUser={data.currentUser} 
              onReply={onReply}/>
            )}
          </article>
        ))}
        <CommentReply currentUser={data.currentUser} onReply={newReply}/>

         <div className="sub_footer">
           <p>Challenge by <a href="https://www.frontendmentor.io/home" target="_blank">Frontend Mentor</a>. Coded by <a href="https://portifolio-two-tawny-40.vercel.app/" target="_blank">Lais Talita</a>.</p>
         </div>
      </main>
    
  )
}export default App;
