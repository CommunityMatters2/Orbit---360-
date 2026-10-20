import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="rise">
        <div className="eyebrow">Off course · 404</div>
        <h1 className="mt-4 text-[48px] font-normal leading-tight sm:text-[64px]">
          This page has left <em className="italic">orbit.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Link to="/" className="btn-ink mt-8">
          Back to the suite <ArrowRight size={16} className="arrow-r" />
        </Link>
      </div>
    </div>
  )
}
