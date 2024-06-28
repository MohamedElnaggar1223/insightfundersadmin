import { createClient } from "@/utils/supabase/server"
import FAQSTabs from "./faqs"
import { redirect } from "next/navigation"

export default async function FaqsPage() {
    
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()

    if(!user) return redirect('/login')

    const data = await supabase.from('faqs').select()

    return (
        <section className='flex items-center justify-center p-12 flex-col gap-8'>
            <FAQSTabs data={data.data!} />
        </section>
    )
}