'use client'
import { useOptimistic, useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { addQuestion } from "@/lib/actions"
import { Loader2 } from "lucide-react"
import FaqQuestion from "./faqquestion"

export type FAQ = {
    answer: string | null;
    id: number;
    question: string;
    tab: "General Questions" | "For Startups" | "For Investors" | null;
}

type Props = {
    data: FAQ[]
}

export default function FAQSTabs({ data }: Props)
{
    const [optimisticData, setOptimisticData] = useOptimistic(data, (state, newData: FAQ) => {
        return [...state, newData]
    })
    const [isPending, startTransition] = useTransition()

    const [activeTab, setActiveTab] = useState<"General Questions" | "For Startups" | "For Investors">('General Questions')
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        answer: '',
        tab: activeTab
    })

    const handleAddNewQuestion = async () => {
        const { question, answer, tab } = newQuestion

        if (!question || !answer) {
            return
        }

        setOptimisticData({ id: (data[data.length - 1]?.id ?? 0) + 1, question, answer, tab })

        await addQuestion(newQuestion)

        setNewQuestion({
            question: '',
            answer: '',
            tab: activeTab
        })
    }

    return (
        <AnimatePresence>
            <div className='flex flex-col items-center justify-center gap-8 lg:w-screen lg:max-w-[768px]'>
                <div className='divide-x border border-[#D0D5DD] rounded-[8px] flex overflow-hidden'>
                    <div role="tab" onClick={() => setActiveTab('General Questions')} className={cn('relative cursor-pointer text-main-gray font-semibold text-xs text-center lg:text-sm px-4 py-2')}>
                        <p className='z-20'>
                            General Questions
                        </p>
                        {activeTab === 'General Questions' && <motion.div layoutId="bg" className={cn('absolute w-full h-full z-[-1] top-0 left-0 bg-slate-100')} />}
                    </div>
                    <div role="tab" onClick={() => setActiveTab('For Startups')} className={cn('relative cursor-pointer text-main-gray font-semibold text-xs text-center lg:text-sm px-4 py-2')}>
                        <p className='z-20'>
                            For Startups
                        </p>
                        {activeTab === 'For Startups' && <motion.div layoutId="bg" className={cn('absolute w-full h-full z-[-1] top-0 left-0 bg-slate-100')} />}                    
                    </div>
                    <div role="tab" onClick={() => setActiveTab("For Investors")} className={cn('relative cursor-pointer text-main-gray font-semibold text-xs text-center lg:text-sm px-4 py-2')}>
                        <p className='z-20'>
                            For Investors
                        </p>
                        {activeTab === "For Investors" && <motion.div layoutId="bg" className={cn('absolute w-full h-full z-[-1] top-0 left-0 bg-slate-100')} />}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-8 border rounded-[8px] p-4'>
                <h1 className='text-2xl font-semibold'>Add a new question</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="question" className='text-main-gray text-sm'>Question</label>
                    <input
                        type="text"
                        placeholder="Question"
                        disabled={isPending}
                        id="question"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        className='border border-[#D0D5DD] outline-none rounded-[8px] p-2 min-w-[720px]'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="answer" className='text-main-gray text-sm'>Answer</label>
                    <textarea
                        placeholder="Answer"
                        disabled={isPending}
                        id="answer"
                        value={newQuestion.answer}
                        rows={5}
                        onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                        className='border border-[#D0D5DD] outline-none rounded-[8px] p-2 min-w-[720px]'
                    />
                </div>
                <Button disabled={isPending} onClick={() => startTransition(() => handleAddNewQuestion())}>{isPending ? <Loader2 stroke="#fff" className='animate-spin mx-auto' /> : 'Add'}</Button>
            </div>
            {activeTab === 'General Questions' && optimisticData.filter((faq) => faq.tab === 'General Questions').map((faq) => (
                <FaqQuestion faq={faq} />
            ))}
            {activeTab === 'For Startups' && optimisticData.filter((faq) => faq.tab === 'For Startups').map((faq) => (
                <div key={faq.id} className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-lg font-semibold text-main-gray'>
                        {faq.question}
                    </h2>
                    <p className='text-sm text-main-gray'>
                        {faq.answer}
                    </p>
                </div>
            ))}
            {activeTab === "For Investors" && optimisticData.filter((faq) => faq.tab === 'For Investors').map((faq) => (
                <div key={faq.id} className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-lg font-semibold text-main-gray'>
                        {faq.question}
                    </h2>
                    <p className='text-sm text-main-gray'>
                        {faq.answer}
                    </p>
                </div>
            ))}
        </AnimatePresence>
    )
}