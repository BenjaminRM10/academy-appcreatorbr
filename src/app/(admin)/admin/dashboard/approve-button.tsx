'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'

export function ApproveButton({ enrollmentId }: { enrollmentId: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleApprove = async () => {
        if (!confirm('¿Confirmar que recibiste el pago?')) return
        setLoading(true)
        try {
            const res = await fetch('/api/admin/approve-payment', {
                method: 'POST',
                body: JSON.stringify({ enrollmentId }),
            })
            if (!res.ok) throw new Error('Error')
            router.refresh()
        } catch (e) {
            alert('Error al aprobar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button 
            onClick={handleApprove} 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
            Confirmar Pago
        </Button>
    )
}
