export const applyPagination = (documents, page, rowsPerPage) => {
    return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}