import { Button } from "@/components/ui/button"
import { FAQ } from "./faqs"
import { useOptimistic, useState, useTransition } from "react"
import { deleteQuestion, updateQuestion } from "@/lib/actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

type Props = {
    faq: FAQ
}

export default function FaqQuestion({ faq }: Props)
{
    const [faqData, setFaqData] = useOptimistic(faq ? faq : null, (state, newData: FAQ | null) => {
        return newData ? state ? {...state, newData} : { ...newData } : null
    })
    const [editedValues, setEditedValues] = useState({ question: faqData?.question, answer: faqData?.answer })
    const [isPending, startTransition] = useTransition()
    const [editMode, setEditMode] = useState(false)

    const handleEditQuestion = async () => {
        const { question, answer } = editedValues
        
        if (!question || !answer) {
            return
        }

        if(!faqData) return

        setFaqData({ ...faqData, question, answer })
        
        setEditMode(false)

        await updateQuestion({answer, question, id: faqData.id!, tab: faqData.tab!})

        setEditedValues({ question: question, answer: answer })
    }

    const handleDeleteQuestion = async () => {
        setFaqData(null)

        await deleteQuestion(faqData!.id)
    }

    if (!faqData) return null
    else return (
        <div key={faqData?.id} className='flex flex-col items-start justify-center gap-4 max-w-[1240px] xl:min-w-[1240px] rounded-[8px] border p-6'>
            {editMode ? (
                <>
                    <input
                        className='w-full border border-[#D0D5DD] rounded-[8px] px-4 py-2'
                        value={editedValues.question}
                        onChange={(e) => setEditedValues(prev => ({ ...prev, question: e.target.value }))}
                    />
                    <textarea
                        className='w-full border border-[#D0D5DD] rounded-[8px] px-4 py-2'
                        value={editedValues.answer!}
                        rows={4}
                        onChange={(e) => setEditedValues(prev => ({ ...prev, answer: e.target.value }))}
                    />
                    <Button onClick={() => startTransition(() => handleEditQuestion())} className='mt-4 ml-auto px-8'>Save</Button>
                </>
            ) : (
                <>
                    <p className='text-xl font-semibold text-main-gray'>
                        {faqData?.question}
                    </p>
                    <p className='text-lg text-main-gray'>
                        {faqData?.answer}
                    </p>
                    <div className='flex gap-2 items-center justify-end w-full'>
                        <Button disabled={isPending} onClick={() => setEditMode(true)} className='mt-4 w-24'>Edit</Button>
                        <AlertDialog>
                            <AlertDialogTrigger disabled={isPending} className='mt-4 w-24 text-red-600 font-medium text-sm text-[0.95rem]'>Delete</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this question.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => startTransition(() => handleDeleteQuestion())}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </>
            )}

        </div>
    )
}