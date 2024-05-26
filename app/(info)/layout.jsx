import Header from "@/components/app/info/header"
export default function InfoLayout({ children }){
  return(
    <main>
      <div>
        <Header/>
        {children}
      </div>
    </main>
  )
}