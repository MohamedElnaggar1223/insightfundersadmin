'use server'

import { createClient } from "@/utils/supabase/server"

export const addQuestion = async (question: { question: string, answer: string, tab: "General Questions" | "For Startups" | "For Investors" }) => {
    const supabase = createClient()

    setTimeout(async () => {
        const { error } = await supabase.from('faqs').insert(question)

        console.log(error)
    }, 5000)

}