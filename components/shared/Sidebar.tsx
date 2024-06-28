'use client'
import { Building2, MessageCircleQuestion, Settings, Users2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
  } from "@/components/ui/tooltip"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <TooltipProvider>

            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {/* <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
            </Link> */}
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/faqs"
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", pathname === '/faqs' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}
                >
                    <MessageCircleQuestion className="h-5 w-5" />
                    <span className="sr-only">FAQs</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">FAQs</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/startups"
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", pathname === '/startups' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}
                >
                    <Building2 className="h-5 w-5" />
                    <span className="sr-only">Startups</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Startups</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/investors"
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", pathname === '/investors' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}
                >
                    <Users2 className="h-5 w-5" />
                    <span className="sr-only">Investors</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Investors</TooltipContent>
            </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            </nav>
        </aside>
        </TooltipProvider>
    )    
}