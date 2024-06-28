'use client'

import { Database } from "@/types/supabase"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type StartUp = {
    accepted: boolean
    address: string | null
    business_structure:
    | Database["public"]["Enums"]["business_structure"]
    | null
    company_name: string | null
    EIN: string | null
    email: string | null
    id: number
    industry_sector:
    | Database["public"]["Enums"]["industry_and_sector"]
    | null
    other_industry_and_sector: string | null
    phone_number: string | null
    submitted: boolean
    user_id: string
}

export const columns: ColumnDef<StartUp>[] = [
    {
        accessorKey: "company_name",
        header: "Company Name",
    },
    {
        accessorKey: "email",
        header: "Company Email",
    },
    {
        accessorKey: "Ein",
        header: "Ein",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "industry_sector",
        header: "Industry Sector",
    },
    {
        accessorKey: "other_industry_and_sector",
        header: "Other Industry Sector",
    },
    {
        id: "accpet",
        cell: ({ row }) => {
            return (
                <button className='rounded-[4px] border border-[#AAEFC6] bg-[#ECFDF3] text-[#067647] font-medium px-4 py-1.5'>
                    Accept
                </button>
            )
        }
    },
    {
        id: "delete",
        cell: ({ row }) => {
            return (
                <button className='rounded-[4px] border border-[#F86C6C] bg-[#FEF2F2] text-[#F86C6C] font-medium px-4 py-1.5'>
                    Decline
                </button>
            )
        }
    }
]