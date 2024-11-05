import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const goToPage = (page: number) => {
    onPageChange(page)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1)
      let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (startPage > 1) {
        pageNumbers.unshift('...')
        pageNumbers.unshift(1)
      }

      if (endPage < totalPages) {
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`} aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => goToPage(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}