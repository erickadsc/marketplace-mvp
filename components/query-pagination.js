import Link from "next/link";

function createHref(pathname, searchParams, page, pageParam) {
  const params = new URLSearchParams(searchParams);
  params.set(pageParam, String(page));
  return `${pathname}?${params.toString()}`;
}

export function QueryPagination({ pathname, searchParams, page, totalPages, pageParam = "page" }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <Link
        className={`page-link ${page <= 1 ? "disabled" : ""}`}
        aria-disabled={page <= 1}
        href={page <= 1 ? "#" : createHref(pathname, searchParams, page - 1, pageParam)}
      >
        Anterior
      </Link>
      <span className="page-current">
        Pagina {page} de {totalPages}
      </span>
      <Link
        className={`page-link ${page >= totalPages ? "disabled" : ""}`}
        aria-disabled={page >= totalPages}
        href={page >= totalPages ? "#" : createHref(pathname, searchParams, page + 1, pageParam)}
      >
        Proxima
      </Link>
    </div>
  );
}
