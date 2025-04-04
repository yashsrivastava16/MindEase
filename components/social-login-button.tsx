"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface SocialLoginButtonProps {
  icon: LucideIcon
  provider: string
  onClick: () => void
}

export function SocialLoginButton({ icon: Icon, provider, onClick }: SocialLoginButtonProps) {
  return (
    <Button variant="outline" type="button" className="w-full flex items-center justify-center gap-2" onClick={onClick}>
      <Icon className="h-4 w-4" />
      <span>Continue with {provider}</span>
    </Button>
  )
}

