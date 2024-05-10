

export default function ChatPortal({ params }){
  const { id } = params
  return(
    <div className="grid place-items-center">
      <div>
        { id }
        chat
      </div>
    </div>
  )
}