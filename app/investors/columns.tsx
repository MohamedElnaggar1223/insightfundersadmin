'use client'

import { Database } from "@/types/supabase"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Investor = {
    accepted: boolean
    company_email: string | null
    company_name: string | null
    company_website: string | null
    geographies_served:
    | Database["public"]["Enums"]["geographies_served"][]
    | null
    id: number
    max_facility_size:
    | Database["public"]["Enums"]["max_facility_size"]
    | null
    minimum_revenue_requirement:
    | Database["public"]["Enums"]["minimum_revenue_requirement"]
    | null
    products_offered:
    | Database["public"]["Enums"]["products_offered"][]
    | null
    submitted: boolean | null
    user_id: string
}

export const columns: ColumnDef<Investor>[] = [
    {
        accessorKey: "company_name",
        header: "Company Name",
    },
    {
        accessorKey: "company_email",
        header: "Company Email",
    },
    {
        accessorKey: "company_website",
        header: "Company Website",
        cell: ({ row }) => {
            const website = row.getValue('company_website') as string | null
            return website ? (
                <Link
                    href={website}
                    target="_blank"
                    className='underline'
                >
                    {website}
                </Link>
            ) : null
        }
    },
    {
        accessorKey: "geographies_served",
        header: "Geographies Served",
    },
    {
        accessorKey: "max_facility_size",
        header: "Max Facility Size",
    },
    {
        accessorKey: "minimum_revenue_requirement",
        header: "Minimum Revenue Requirement",
    },
    {
        accessorKey: "products_offered",
        header: "Products Offered",
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