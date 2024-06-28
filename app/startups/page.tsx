import { createClient } from "@/utils/supabase/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { redirect } from "next/navigation"

export default async function InvestorsPage() 
{
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if(!user) return redirect('/login')

    const data = await supabase.from('startups').select().eq('accepted', 'false').eq('submitted', 'true')

    return (
        <section className='flex flex-col items-center justify-center'>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data.data!} />
            </div>
        </section>
    )
}