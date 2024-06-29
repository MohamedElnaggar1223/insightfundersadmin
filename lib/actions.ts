'use server'

import { FAQ } from "@/app/faqs/faqs"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const addQuestion = async (question: { question: string, answer: string, tab: "General Questions" | "For Startups" | "For Investors" }) => {
    const supabase = createClient()

    await supabase.from('faqs').insert(question)

    revalidatePath('/faqs')
}

export const updateQuestion = async (faq: FAQ) => {
    const supabase = createClient()

    await supabase.from('faqs').update(faq).eq('id', faq.id)

    revalidatePath('/faqs')
}

export const deleteQuestion = async (id: number) => {
    const supabase = createClient()

    await supabase.from('faqs').delete().eq('id', id)

    revalidatePath('/faqs')
}