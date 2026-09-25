import { Construction } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { PageHeader } from '../../components/ui/PageHeader'

/** Temporary placeholder for screens not yet built in the incremental UI rollout. */
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} />
      <Card>
        <EmptyState icon={Construction} title="Screen in progress" description="This screen is part of the next UI increment." />
      </Card>
    </>
  )
}
